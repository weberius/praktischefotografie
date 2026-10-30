# Code-Review-Analyse: Termin in den Gerätekalender (SERVICE-14-STORY-01)

**Ticket:** SERVICE-14  
**Analysiert:** 2026-10-30  
**Scope:** Pfade (uncommittete Änderungen auf `feature/SERVICE-14-termin-in-den-kalender`)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-018 (außerdem ADR-002, ADR-003) / `web/kalender-export.feature`; EARS `web/kalender-export.md`, Quality `web/kalender-export.md`

**Betroffene Dateien:**
- `web/src/app/core/ics.ts`, `web/src/app/core/ics.spec.ts`
- `web/src/app/pages/event-detail/event-detail.{ts,html,css,spec.ts}`

Hinweis: `context/AI_CONTEXT.md` und `eslint.config.js` wurden nicht gelesen (`context/` existiert im Repo nicht; ESLint nicht ausgewertet). Der Skill nennt Pfade (`docs/product/planning/...`), die in diesem Repo anders liegen; verwendet wurde der vorgegebene Ausgabeordner.

Ausgeführt: `ng test` für `ics.spec.ts` (8 von 8 grün) und `event-detail.spec.ts` (8 von 8 grün, Chrome Headless). Mutationstests wurden nicht ausgeführt (keine Dateiänderungen erlaubt); die Aussagen zur Fehlerfang-Fähigkeit der Tests beruhen auf Lesen des Codes.

---

## A. Zusammenfassung (Executive Summary)

### Gesamtbewertung der menschlichen Nachvollziehbarkeit

`ics.ts` ist klein, rein und gut kommentiert. Maskierungsreihenfolge (Backslash zuerst), Faltung nach Oktetten über Codepunkte (`for…of`) und Datumsrechnung per `Date.UTC` sind korrekt; im Code wurde kein Korrektheitsfehler gefunden. Die stillen Fallen liegen in den Tests und im Download: Eine Strukturprüfung (`TextDecoder` fatal) kann nie fehlschlagen, mehrere Randfälle (Zeilenumbruch im Titel, `\;`-Folge, Zeichen jenseits der BMP, Faltung exakt an der 75-Oktett-Grenze) sind nicht abgedeckt, und mehrere Test-Erwartungen spiegeln die Implementierung. Die Blob-URL wird sofort nach `click()` freigegeben, was auf Smartphones (Zielgruppe) riskant sein kann (Annahme, nicht verifiziert).

- **Nachvollziehbarkeit:** Hoch
- **Einschätzung:** hybrid – klare Struktur und Dokumentbezug, aber Tests teils als Spiegel der Implementierung formuliert.

---

## B. Konkrete Befunde

### CODE-01: Strukturprüfung „kein Mehrbyte-Zeichen getrennt“ ist wirkungslos

- **Kategorie:** Semantik (Testaussage)
- **Priorität:** Mittel
- **Code-Referenz:** `web/src/app/core/ics.spec.ts:37-38` – `expectValid`
- **Beobachtung:** `new TextDecoder('utf-8', {fatal: true}).decode(new TextEncoder().encode(ics))` kodiert einen JS-String und dekodiert ihn wieder. Das kann nicht fehlschlagen (lone Surrogates werden beim Kodieren zu U+FFFD ersetzt, nicht abgelehnt). Der Kommentar „nie mitten in einem Zeichen“ behauptet eine Prüfung, die nicht stattfindet. Das Szenario „kein Mehrbyte-Zeichen ist getrennt“ (Gherkin „Maskierung und Faltung“) ist nur indirekt über `unfold(...)`-Gleichheit abgesichert, und nur mit BMP-Zeichen (Ä, Ö, Ü, ß, –). Zeichen außerhalb der BMP (Emoji, 4 Byte, Surrogatpaar) fehlen: Würde `foldLine` über UTF-16-Einheiten statt Codepunkte iterieren, bliebe das unbemerkt.
- **Warum problematisch:** Genau diese Art Fehler blieb früher unbemerkt (`\;`). Ein grüner Test vermittelt hier falsche Sicherheit.
- **Typisches KI-Ursachenmuster:** Plausibel aussehende Assertion ohne Gegenprobe.
- **ADR-/Gherkin-Bezug:** ICS-UB-4, Q-IOP-1.

Weitere Lücken im selben Testblock (Randfälle der Prüffrage):

- Titel mit Zeilenumbruch: nur die Beschreibung ist getestet (`ics.spec.ts:79-83`), `SUMMARY` nicht. Gleiche Funktion, aber der Anforderung ICS-UB-4 nach gilt es für alle Textwerte.
- Alleinstehendes `\r` (ohne `\n`) wird von `escapeText` (`ics.ts:31`, Regex `/\r?\n/`) nicht maskiert und bricht die Zeile (Annahme: kommt in den YAML/JSON-Daten praktisch nicht vor; `expectValid` würde es aber fangen, wenn ein Test es hätte).
- Sehr langer Titel (> 75 Oktett): `SUMMARY` wird nur über die Beschreibung indirekt geprüft; ein langer Titel samt Umlaut-Grenze fehlt.
- Eingabe `\;` (Backslash direkt vor Semikolon) fehlt; sie prüft die Reihenfolge der Ersetzungen gezielter als `A; B, C\D`, in dem Backslash und Semikolon getrennt stehen. Der `\;`-Fehler der Vergangenheit wird nur durch die Reihenfolge-Reihe `\\` → `;` → `,` abgedeckt, wenn beide Zeichen aufeinanderfolgen.
- Das Erwartungsergebnis der Beschreibung wird im Test mit denselben Regex-Ersetzungen wie in der Implementierung gebildet (`ics.spec.ts:75`); bei Änderung der Implementierung ändert sich die Erwartung mit. Festes Literal ist belastbarer.
- Faltung exakt an der Grenze (Zeile mit genau 75 Oktetten bleibt ungefaltet, 76 wird gefaltet; Mehrbyte-Zeichen auf Position 74/75) ist nicht getestet.
- Die Assertion `ics.split('\r\n').some(line => line.startsWith(' '))` (`ics.spec.ts:77`) bestätigt nur, dass irgendeine Faltung stattfand.

### CODE-02: Blob-URL wird synchron nach `click()` freigegeben; Test zementiert das

- **Kategorie:** Semantik (Ressourcenverwaltung)
- **Priorität:** Mittel
- **Code-Referenz:** `web/src/app/pages/event-detail/event-detail.ts:62-65`, `event-detail.spec.ts:84`
- **Beobachtung:** `createObjectURL` → `link.click()` → sofort `revokeObjectURL(url)`. Freigabe ist vorhanden (kein Leck), und in aktuellen Chrome/Firefox startet der Download synchron. Auf Safari/iOS (Smartphones sind erklärte Zielgeräte laut Hinweistext) berichten Bibliotheken wie FileSaver.js von abgebrochenen Downloads bei sofortigem Revoke und verzögern ihn daher (Annahme, nicht im Repo verifiziert; Handprobe nötig). Der Link wird zudem nicht in das DOM eingehängt; für ältere Firefox-Versionen war das nötig (Annahme). Der Test erwartet `revoke` synchron (`expect(revoke).toHaveBeenCalledWith('blob:test')` direkt nach `click()`) und würde eine verzögerte Freigabe als Fehler melden.
- **Warum problematisch:** Ein stiller Ausfall nur auf dem Zielgerät, den keine Unit-Tests zeigen.
- **Typisches KI-Ursachenmuster:** Kopiertes Standardmuster ohne Plattformwissen.
- **ADR-/Gherkin-Bezug:** ICS-EV-1, Q-IOP-1 (Handprobe Apple/Google noch offen).

### CODE-03: Absolute URL aus `document.baseURI` – hartcodierter Pfad, Test spiegelt Implementierung

- **Kategorie:** Duplikation / Semantik
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/pages/event-detail/event-detail.ts:57`, `event-detail.spec.ts:81`, `web/src/index.html:7` (`<base href="/">`), `web/src/app/app.routes.ts:54`
- **Beobachtung:** `new URL(`events/${e.id}`, this.document.baseURI).href`. Mit `<base href="/praktisch/">` ergibt das korrekt `…/praktisch/events/<id>`. Ohne abschließenden Slash im `base href` (`/praktisch`) entstünde `/events/<id>` ohne Unterpfad (Angular verlangt in der Regel den Slash; Annahme). Der Routenpfad `events/:id` steht damit an zwei Stellen (Routen und Komponente). Der Test bildet die Erwartung mit derselben Formel nach (`new URL('events/e-talk', document.baseURI)`) und fängt weder einen falschen Pfad noch einen Unterpfad-Fehler; ein Test mit anderem `baseURI` fehlt. Nachvollziehbar ist, dass im Karma-Lauf kein `<base>` gesetzt ist, die Erwartung also zufällig gleich bleibt.
- **Warum problematisch:** Tautologischer Test; Routenänderung würde die URL in der Kalenderdatei still brechen.
- **Typisches KI-Ursachenmuster:** Erwartungswert aus Implementierung abgeleitet.
- **ADR-/Gherkin-Bezug:** ICS-UB-2 („absolute Adresse der Detailseite“).

### CODE-04: Kleinere Wartbarkeitspunkte

- **Kategorie:** Funktions-Überladung / Varianz
- **Priorität:** Niedrig
- **Code-Referenz:** `event-detail.ts:44-66`, `ics.ts:19, 69, 76`
- **Beobachtung:**
  - `saveToCalendar` mischt Mapping Event → Eingabe und DOM-Download (Blob, Anker, Revoke). Der Download-Teil ist generisch und wäre als kleine Hilfsfunktion testbar (z. B. neben `ics.ts`), statt in der Komponente `URL`/`HTMLAnchorElement`-Spies zu brauchen.
  - `now` in `IcsEventInput` ist ein reiner Test-Seam; der Produktivcode nutzt `new Date()` am Clock-Dienst (`Clock`) vorbei, obwohl die Komponente `Clock` bereits injiziert. Für `DTSTAMP` ist das fachlich unkritisch, aber uneinheitlich zu „heute“-Logik der Seite.
  - Keine Validierung der Datumsstrings: ungültiges `startDate` ergibt `NaNNaNNaN` in `DTSTART` (`ics.ts:44-48`). Daten werden vom Schema geprüft (ADR-003; Annahme), daher nur Hinweis, ob ein Test oder Kommentar genügt. Ein `endDate` vor `startDate` erzeugt einen ungültigen Zeitraum.
  - `if (!e) return;` im Handler ist nötig, weil der Button nur bei vorhandenem Event gerendert wird; defensiv, aber vertretbar.
- **Warum problematisch:** Geringe Auswirkung; erhöht aber die Testlast in der Komponente.
- **Typisches KI-Ursachenmuster:** Alles im Handler erledigt.

---

## C. Bewusst nicht gemeldet

- Eigene ICS-Erzeugung ohne Bibliothek, ganztägiger Eintrag, stabile UID: durch ADR-018 entschieden.
- `RFC 5545` verlangt Maskierung von `,`/`;` auch in `LOCATION`; der Code tut das (`ics.ts:55`). Keine Maskierung für `URL` (Werttyp URI, korrekt).
- Datumsrechnung (`Date.UTC`, Tag + 1, Schaltjahr 2028-02-28 → 02-29, Jahreswechsel) ist korrekt und getestet (`ics.spec.ts:59-62`).
- Faltung: Ziel 75 Oktett inkl. führendem Leerzeichen (74 + 1) und Codepunktiteration sind korrekt; Zeilenende CRLF inkl. letzter Zeile korrekt.
- Event ohne Beschreibung: `filter` in `ics.ts:37` lässt nur den Typ stehen, getestet (`ics.spec.ts:96`).
- Kein Netzzugriff: durch Spies auf `fetch`/`XMLHttpRequest.open` abgesichert (`event-detail.spec.ts:78-79`); ein Aufruf von `navigator.sendBeacon` oder `Image` wäre nicht erfasst, aber unplausibel.
- JSDoc/Kommentare in `ics.ts` erklären das Warum (RFC, ADR) und sind nicht trivial.

---

## D. Abgeleitete Tasks

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| [TASK-11](TASK-11-ics-tests-randfaelle-haerten.md) | ICS-Tests: wirkungslose Prüfung ersetzen, Randfälle ergänzen | Medium | ~45 min | CODE-01 |
| [TASK-12](TASK-12-blob-url-verzoegert-freigeben.md) | Blob-URL verzögert freigeben und auf Zielgeräten prüfen | Medium | ~30 min | CODE-02 |
| [TASK-13](TASK-13-event-url-test-und-pfad.md) | Event-URL: Test mit anderem `base href`, Pfad nicht doppelt führen | Low | ~30 min | CODE-03 |
| [TASK-14](TASK-14-download-helfer-und-kleinigkeiten.md) | Download-Helfer extrahieren, Datumsannahmen dokumentieren | Low | ~30 min | CODE-04 |

---

## E. Meta-Bewertung

- **Gut automatisiert behebbar:** TASK-11, TASK-13, TASK-14.
- **Erfordert menschliche Entscheidung:** TASK-12 (Verzögerung ja/nein und Handprobe auf iOS Safari/Android; nur ein Mensch kann auf Gerät prüfen), TASK-13 (Route aus Router erzeugen oder Konstante).
- **Empfehlung für künftige KI-Codegenerierung:** Für Format-Erzeuger (ICS, CSV) Erwartungswerte als feste Literale schreiben, nie mit den Implementierungsfunktionen bilden; Tests für Strukturprüfungen vorab durch einen absichtlich fehlerhaften Fall („Mutation“) beweisen lassen.

---

## F. Nicht bewertbar

- Import in echte Kalender-Apps (Q-IOP-1: Handprobe Apple/Google) – nicht ausführbar.
- Verhalten von Safari/iOS beim sofortigen Revoke – nicht verifiziert.
- ESLint-Regeln und `context/AI_CONTEXT.md` nicht ausgewertet; axe-Prüfung (Q-USE-3) nicht ausgeführt.
- Keine Mutationstests (Dateiänderungen nicht erlaubt).

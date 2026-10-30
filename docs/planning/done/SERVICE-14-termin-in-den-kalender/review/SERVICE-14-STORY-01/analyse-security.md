# Security-Analyse: Kalenderexport (.ics) auf der Eventdetailseite

**Ticket:** SERVICE-14  
**Analysiert:** 2026-10-30  
**Scope:** Uncommittete Änderungen zu SERVICE-14-STORY-01: `web/src/app/core/ics.ts`, `web/src/app/pages/event-detail/event-detail.{ts,html}` (plus Datenfluss zu `schema/events.schema.json`, `data/events.json`)  
**Methode:** Statische Code-Analyse (SAST) + Konfigurations-Review; kein `npm audit` (keine neue Abhängigkeit, ADR-018)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-018, ADR-006, ADR-007 / `web/kalender-export.feature`; EARS `web/kalender-export.md`, Quality Q-SEC-6

---

## Executive Summary

**Gesamtrisiko:** Low bis Medium

Der Export ist rein clientseitig, ohne Netzanfrage, ohne `innerHTML` und ohne neue Abhängigkeit (Q-SEC-6 erfüllt). Das Hauptrisiko ist die Injection in die iCalendar-Struktur: `escapeText` maskiert `\n` und `\r\n`, aber kein alleinstehendes `\r` und keine weiteren Zeilenumbruch-Zeichen (U+0085, U+2028/2029, `\v`, `\f`). Parser, die diese als Zeilenende werten, lesen dann eingeschleuste Zeilen wie `END:VEVENT` oder `BEGIN:VALARM`. Quelle sind Freitextfelder (`title`, `description`, Ortsdaten) aus `data/*.json`, die teils per KI aus Webseiten extrahiert werden (ADR-006/007, mit Freigabe und Schemaprüfung, aber ohne Zeichenfilter). Die Wahrscheinlichkeit ist niedrig bis mittel, die Auswirkung begrenzt auf Integrität in der Kalender-App der Besucher:innen.

| Schweregrad | Anzahl |
|---|---|
| Critical | 0 |
| High | 0 |
| Medium | 1 |
| Low | 2 |

---

## Identifizierte Sicherheitsrisiken

### SEC-01: Unvollständige Maskierung von Zeilenumbrüchen und Steuerzeichen in `.ics` (Property-Injection)

- **Kategorie:** Injection (Format-/Zeileninjection in iCalendar)
- **OWASP-Bezug:** A05:2025 – Injection
- **Schweregrad:** Medium
- **Exploit-Wahrscheinlichkeit:** Niedrig
- **Betroffene Stelle:** `web/src/app/core/ics.ts:34` (`escapeText`), angewandt in `ics.ts:78-80` auf `SUMMARY`, `LOCATION`, `DESCRIPTION`
- **Beschreibung des Risikos:** `escapeText` ersetzt nur `/\r?\n/g`. Ein einzelnes `\r` (und U+0085, U+2028, U+2029, `\v`, `\f`, `\0`) bleibt unmaskiert im Wert. `foldLine` (`ics.ts:39-55`) trennt nur nach Länge und lässt diese Zeichen ebenfalls stehen. Spezifikationskonform ist nur CRLF das Zeilenende, aber viele Parser (u. a. solche, die `splitlines()`-artig arbeiten, sowie tolerante Kalender-Importe) behandeln ein alleinstehendes CR oder weitere Zeichen als Zeilenende. Der bestehende Test (`ics.spec.ts:83-87`) prüft nur `\n`; `expectValid` (`ics.spec.ts:25`) prüft nur `\r\n`-bereinigten Text auf `[\r\n]`, nicht andere Zeichen.
- **Angriffsszenario:** (1) Eine Quellwebseite oder ein manipulierter/halluzinierter KI-Extrakt liefert eine Beschreibung mit `Text\rEND:VEVENT\rBEGIN:VEVENT\rSUMMARY:Gefälschter Termin\rURL:https://phishing.example` oder `\rBEGIN:VALARM\rACTION:DISPLAY\rDESCRIPTION:...`. (2) Der Text besteht die Schemaprüfung (`description` ist ein freier String, `title` nur `minLength: 1`, `schema/events.schema.json:12,21`) und wird bei der Freigabe übersehen, weil CR unsichtbar ist. (3) Besucher:in lädt die `.ics` und importiert sie; ein tolerantes Programm legt einen zweiten Termin, eine Erinnerung oder ein manipuliertes `URL`/`ATTACH`-Feld an.
- **Auswirkung:** Integrität (gefälschte Termine/Erinnerungen, Phishing-Links in der Kalender-App der Besucher:innen). Keine Auswirkung auf Vertraulichkeit der Webanwendung; kein Skript im Browser (reine Textdatei).
- **Begründung:** Medium statt Low, weil die Ursache eine echte Lücke in einer sicherheitsrelevanten Maskierung ist, die Daten teils KI-extrahiert sind und das Ergebnis in Fremdsoftware verarbeitet wird. Nicht High, weil Voraussetzung manipulierte Daten sind (Freigabe an H2/ADR-007, Datenpflege im eigenen Repo), Nutzer:in den Import selbst auslösen muss und die Wirkung vom Parser des Zielprogramms abhängt (**Annahme:** Apple/Google/Outlook-Verhalten bei CR wurde nicht getestet, nicht bewertbar).
- **Empfohlene Mitigation:** Vor dem Maskieren alle C0-Steuerzeichen außer Tab sowie U+0085, U+2028, U+2029 entfernen oder durch Leerzeichen ersetzen; `\r\n`, `\r` und `\n` einheitlich zu `\\n` normalisieren (Reihenfolge: Backslash zuerst, dann Umbrüche). Defensiv am Ende zusätzlich prüfen, dass jede ungefaltete logische Zeile mit einem erlaubten Property-Namen beginnt bzw. dass der Gesamttext nur die erwartete Anzahl `BEGIN:`/`END:` enthält.

### SEC-02: Nicht maskierte Felder `UID`, `URL` und Dateiname verlassen sich allein auf die Schema-Pattern der `id`

- **Kategorie:** Injection / Insecure Design (fehlende Defense-in-Depth)
- **OWASP-Bezug:** A05:2025 – Injection, A06:2025 – Insecure Design
- **Schweregrad:** Low
- **Exploit-Wahrscheinlichkeit:** Niedrig
- **Betroffene Stelle:** `web/src/app/core/ics.ts:73` (`UID`), `ics.ts:81` (`URL:${input.eventUrl}` ohne Maskierung), `web/src/app/pages/event-detail/event-detail.ts:56-61` (`new URL('events/${e.id}', baseURI)`, `link.download = icsFileName(e.id)`)
- **Beschreibung des Risikos:** `id` wird ungeprüft in UID, URL und Dateiname übernommen. Sicher ist das nur, solange `schema/events.schema.json:11` (`^[a-z0-9]+(-[a-z0-9]+)*$`) zur Laufzeit der Daten gilt. Die Anwendung prüft das im Browser nicht; die Schutzwirkung hängt an `validate:data` im Datenworkflow. `buildEventIcs` ist als reine Funktion mit beliebigem `id`/`eventUrl` aufrufbar. `document.baseURI` stammt aus `<base href="/">` (`web/src/index.html:7`), nicht aus Nutzereingaben; `new URL` kodiert Sonderzeichen im Pfad (CR/LF werden entfernt bzw. kodiert), sodass derzeit kein Exploit erkennbar ist.
- **Angriffsszenario:** Nur bei umgangener Schemaprüfung (z. B. Datei manuell eingespielt): `id` mit Steuerzeichen würde in `UID` landen. Der Dateiname wird vom Browser bereinigt.
- **Auswirkung:** Integrität (gering).
- **Begründung:** Heute durch Schema abgesichert; Beobachtung mit Hardening-Empfehlung. Kein Task-Pflicht (unter Medium), Task als optional vorgeschlagen.
- **Empfohlene Mitigation:** In `buildEventIcs` Steuerzeichen aus `UID`/`URL` entfernen bzw. die URL über `new URL(...).href` normalisieren und nur `https:`/`http:` zulassen; `id` gegen das Schema-Muster prüfen, sonst Dateinamen `termin.ics` verwenden.

### SEC-03: Testlücke – keine Injection-Fälle in `ics.spec.ts`

- **Kategorie:** Software- und Datenintegrität (fehlende Absicherung)
- **OWASP-Bezug:** A08:2025 – Software or Data Integrity Failures (Test-Absicherung)
- **Schweregrad:** Low
- **Exploit-Wahrscheinlichkeit:** Niedrig
- **Betroffene Stelle:** `web/src/app/core/ics.spec.ts:83-87`
- **Beschreibung des Risikos:** Es gibt keinen Test mit `END:VEVENT`, `BEGIN:VALARM`, `\r`, U+2028 oder Steuerzeichen im Text. SEC-01 blieb deshalb unentdeckt und könnte nach einer Korrektur wieder auftreten.
- **Angriffsszenario:** Regression bei späterer Änderung der Maskierung.
- **Auswirkung:** Integrität (mittelbar).
- **Begründung:** Low, da keine direkte Ausnutzung; Gehört zur Mitigation von SEC-01.
- **Empfohlene Mitigation:** Injection-Fixtures ergänzen und `expectValid` um Prüfung auf genau ein `BEGIN:VEVENT`/`END:VEVENT`, nur erlaubte Property-Namen und Abwesenheit von Zeilenumbruch-Zeichen außer CRLF erweitern.

---

## Regressionen und bekannte Risiken

Keine früheren Security-Analysen zu diesem Scope vorhanden (Review-Ordner war leer). Nichts zu prüfen.

---

## Beobachtungen ohne akutes Risiko

- `URL.revokeObjectURL(url)` direkt nach `link.click()` (`event-detail.ts:64-65`) ist sicherheitlich unkritisch (Blob-URL ist ursprungsgebunden und kurzlebig). Funktional ist ein sofortiger Widerruf in manchen Browsern riskant; das ist keine Security-Frage und gehört ins Code-Review.
- Der `<a>`-Link wird nicht in den DOM eingehängt und trägt nur eine `blob:`-URL; keine Navigation auf fremde Ziele, kein `target`/`rel`-Thema.
- `text/calendar` mit Download-Attribut: die Datei wird vom Betriebssystem an die Kalender-App übergeben; die Webanwendung hat darauf keinen Einfluss (**Annahme**).
- Das Template verwendet Interpolation (`{{ e.description }}`), keine `innerHTML`/`bypassSecurityTrust*`; der Export ändert das nicht.
- `PRODID`/`UID_DOMAIN` sind Konstanten ohne Personenbezug.

---

## Positive Sicherheitsmaßnahmen

- Keine Netzanfrage, keine externen Dienste, keine neue Abhängigkeit (Q-SEC-6, ADR-018).
- Backslash wird vor Semikolon, Komma und Zeilenumbruch maskiert (richtige Reihenfolge, `ics.ts:34`).
- CRLF-Beendigung und Zeilenfaltung nach Oktetten ohne Trennen von Mehrbyte-Zeichen (`ics.ts:39-55`) verhindern Zeilenüberlauf-Tricks mit UTF-8.
- Datumswerte werden über `Date.UTC` und Formatierung ausgegeben, nicht als Rohstring (`ics.ts:58-61`): kein Einschleusen über `startDate`/`endDate` (bei ungültigem Wert `NaN`, aber ohne Steuerzeichen).
- `id` ist per Schema auf `[a-z0-9-]` begrenzt; `eventUrl` wird über `new URL` aus `baseURI` gebildet.
- Datenpipeline mit Schemaprüfung und Freigabe (ADR-001, ADR-007).

---

## Abgeleitete Tasks

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| [TASK-21](TASK-21-ics-zeilenumbrueche-und-steuerzeichen-neutralisieren.md) | Zeilenumbrüche und Steuerzeichen in `.ics`-Textwerten neutralisieren | Medium | ~45 min | SEC-01 |
| [TASK-22](TASK-22-ics-injection-tests.md) | Injection-Tests für die Kalenderdatei ergänzen | Medium | ~45 min | SEC-01, SEC-03 |
| [TASK-23](TASK-23-ics-uid-url-dateiname-absichern.md) | `UID`, `URL` und Dateiname defensiv absichern (optional) | Low | ~30 min | SEC-02 |

---

## Nicht bewertbar

- Verhalten von Apple Kalender, Google Kalender, Outlook und weiteren Apps bei alleinstehendem CR oder U+2028 (Handprobe nötig).
- Wie streng die Freigabe an H2/ADR-007 Steuerzeichen in KI-extrahierten Texten tatsächlich erkennt; `scripts/scrape/check-proposals.mjs` wurde nicht auf Zeichenfilter geprüft.
- Ob `validate:data` vor jeder Veröffentlichung der `data/*.json` läuft (CI/Deployment nicht Teil des Scopes).
- `npm audit`: nicht ausgeführt, da keine neue Abhängigkeit.

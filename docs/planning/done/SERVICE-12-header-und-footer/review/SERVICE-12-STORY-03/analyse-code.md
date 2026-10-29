# Code-Review-Analyse: SERVICE-12-STORY-03 Kopfbereich im Vordergrund

**Ticket:** SERVICE-12  
**Analysiert:** 2026-10-29  
**Scope:** Änderungen der Story gegen `main` plus nicht committete Änderungen (`git diff HEAD -- web`), nur STORY-03  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-002, ADR-003, ADR-004, ADR-016, ADR-017 / `web/seitenrahmen.feature` (Kopfbereich bleibt beim Scrollen im Vordergrund, Kopfbereich verdeckt keinen Inhalt)

**Betroffene Dateien:**
- `web/src/styles.css`
- `web/src/app/app.config.ts`
- `web/src/app/app.spec.ts`

---

## A. Zusammenfassung (Executive Summary)

### Gesamtbewertung der menschlichen Nachvollziehbarkeit

Die Änderung ist klein und gut kommentiert; der Grund für `ViewportScroller.setOffset` ist in Kommentar und PIPELINE.md (Annahme) dokumentiert. Die stille Falle ist die Kopplung: Dieselbe Höhe steht als `6rem` in CSS und als `96` in TypeScript, die tatsächliche Kopfhöhe (3,56 bis 4,06 rem) ist ein dritter, unverbundener Wert. Die Tests prüfen nur die CSS-Seite; der Router-Versatz, der den eigentlichen Fehler behob, ist ungeschützt. Die z-index-Werte sind Literale ohne gemeinsame Skala.

- **Nachvollziehbarkeit:** Hoch
- **Einschätzung:** hybrid – gezielt und begründet, mit typischer KI-Neigung zu Literalen und Kommentaren statt gemeinsamer Quelle.

Keine kritischen Befunde. Die dokumentierte Annahme zum Versatz (PIPELINE.md, „ANNAHME (Umsetzung)“) wird nicht als Mangel gewertet; gemeldet wird nur, dass die Kopplung nicht technisch abgesichert ist.

---

## B. Konkrete Befunde

### CODE-01: Versatz für Anker-Sprünge doppelt als Literal (6rem und 96) gepflegt

- **Kategorie:** Duplikation
- **Priorität:** Mittel
- **Code-Referenz:** `web/src/styles.css:30` – `html { scroll-padding-top: 6rem }`; `web/src/app/app.config.ts:15` – `setOffset([0, 96])`
- **Beobachtung:** Zwei Werte in zwei Sprachen müssen übereinstimmen; der Kommentar in `app.config.ts:13` fordert „bei geänderter Kopfhöhe beides anpassen“. `96` setzt zudem 1 rem = 16 px voraus (Nutzer:innen mit größerer Basisschrift bekommen im CSS mehr, im Router den festen Versatz).
- **Warum problematisch:** Ein Kommentar ist die einzige Absicherung. Wer nur eines ändert, erzeugt einen Unterschied zwischen Sprunglink/Tab-Fokus (CSS) und Router-Anker (TS), der nur im Browser auffällt.
- **Typisches KI-Ursachenmuster:** Fehlerbehebung an der Stelle des Symptoms, ohne gemeinsame Quelle.
- **ADR-/Gherkin-Bezug:** FRM-UB-5, Q-USE-13 (kein Widerspruch zur Spezifikation)

### CODE-02: Tests schützen den Router-Versatz und „im Seitenfluss“ nicht

- **Kategorie:** Verständlichkeit (Testabdeckung)
- **Priorität:** Mittel
- **Code-Referenz:** `web/src/app/app.spec.ts:293` und `:301`
- **Beobachtung:** Der Test zu FRM-UB-5 heißt „Sprungziele und Fokus liegen unterhalb des Kopfbereichs“, prüft aber nur `scroll-padding-top` ≥ Kopfhöhe und den z-index des Sprunglinks. Der Versatz in `app.config.ts:15` (der Fix für den im Browser gemessenen Fehler) hat keinen Test; der Changelog nennt das ausdrücklich als „Nicht geprüft“. Der Test zu FRM-UB-2 trägt „bleibt im Seitenfluss“ im Titel, prüft das aber nicht (z. B. `position` ≠ `fixed` ist durch `sticky` impliziert, der Fluss selbst wird nicht gemessen).
- **Warum problematisch:** Entfernt jemand `provideAppInitializer`, bleibt die Suite grün; der Titel verspricht mehr als die Assertions.
- **Typisches KI-Ursachenmuster:** Test spiegelt die Implementierung (berechnete Stile) statt des Verhaltens.
- **ADR-/Gherkin-Bezug:** Gherkin „Kopfbereich verdeckt keinen Inhalt“

### CODE-03: z-index-Werte als unverbundene Literale (1000 / 1100 / 1200)

- **Kategorie:** Semantik
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/styles.css:26`, `:28`; `web/src/app/app.spec.ts:298` (`toBeGreaterThan(1000)`)
- **Beobachtung:** Die Leaflet-Obergrenze 1000 steht nur im Kommentar (`styles.css:29`) und als Literal im Test. Header 1100 und Sprunglink 1200 sind ohne benannte Skala gesetzt. Zusätzlich steht der erklärende Kommentar zu `.site-header` erst nach der Regel, getrennt durch die Regel `html { scroll-padding-top }` (`:30`) von der Gruppe `.brand` (`:31`, `:33` als zwei getrennte Regeln, Kontext STORY-02).
- **Warum problematisch:** Beim nächsten Overlay (z. B. Dialog) wird erneut geraten; die Reihenfolge der Regeln erschwert das Finden der Zusammengehörigen.
- **Typisches KI-Ursachenmuster:** Inkrementelles Anfügen am Stylesheet.
- **ADR-/Gherkin-Bezug:** ADR-004 (Leaflet), ADR-016

---

## C. Bewusst nicht gemeldet

- `ViewportScroller.setOffset` per `provideAppInitializer` statt Router-Option: in PIPELINE.md als „ANNAHME (Umsetzung)“ begründet (Router ignoriert `scroll-padding` beim Anker-Sprung); auf dem Server ist der Aufruf wirkungslos (ADR-002 unberührt).
- Sprunglink verweist auf `/#inhalt` über `<base href="/">`: vorher so, in PIPELINE.md dokumentiert.
- `position: sticky` statt `fixed`: ADR-016 und PIPELINE.md (ADR-Begründung) entscheiden das so.
- Scroll-Padding 6 rem bei Kopfhöhe 3,56 bis 4,06 rem: bewusst mit Reserve; Maß in Q-USE-13 begrenzt den Kopf auf ≤ 6 rem.
- Kopfhöhen- und Messungen im Browser: im Changelog dokumentiert; nicht Gegenstand dieses Reviews (keine Ausführung).

---

## D. Abgeleitete Tasks

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| [TASK-21](TASK-21-kopfhoehe-als-gemeinsame-quelle.md) | Kopfhöhe für Anker-Versatz aus einer Quelle ableiten | Medium | ~45 min | CODE-01 |
| [TASK-22](TASK-22-tests-fuer-anker-versatz-und-fluss.md) | Test für Router-Versatz ergänzen und Testtitel angleichen | Medium | ~30 min | CODE-02 |
| [TASK-23](TASK-23-stapelreihenfolge-benennen.md) | Stapelreihenfolge benennen und Stylesheet ordnen | Low | ~20 min | CODE-03 |

---

## E. Meta-Bewertung

- **Gut automatisiert behebbar:** CODE-02, CODE-03.
- **Erfordert menschliche Entscheidung:** CODE-01 (CSS-Variable lesen oder Konstante teilen).
- **Empfehlung für künftige KI-Codegenerierung:** Werte, die in CSS und TypeScript übereinstimmen müssen, als gemeinsame Quelle anlegen; Testtitel nur mit dem, was die Assertions prüfen.

---

## F. Nicht bewertbar

Laufzeitverhalten (Scrollen, Fokus, Anker) wurde vereinbarungsgemäß nicht ausgeführt, sondern nur aus Code und Changelog beurteilt.

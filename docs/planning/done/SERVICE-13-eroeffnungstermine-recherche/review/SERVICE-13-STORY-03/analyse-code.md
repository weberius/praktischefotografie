# Code-Review-Analyse: SERVICE-13-STORY-03 – Finissage als Event-Typ (Schema, Web, Tests)

**Ticket:** SERVICE-13  
**Analysiert:** 2026-10-30  
**Scope:** Pfade (uncommittete Änderungen): Story SERVICE-13-STORY-03  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-001, ADR-002 / `content/daten.feature`, `web/events.feature`, `web/kalender.feature` (nur CAL-UB-7)

**Betroffene Dateien:**
- `schema/events.schema.json`
- `web/src/app/core/models.ts`
- `web/src/app/pages/event-list/event-list.ts`
- `web/src/app/pages/event-list/event-list.spec.ts`
- `test/event-typ.test.mjs`
- Kontext: `docs/ears/content/datenmodell.md`, `docs/ears/web/events.md`, beide Feature-Dateien, `web/src/app/testing/test-data.ts`, `web/src/app/core/agenda.ts`, `README.md`

**Hinweis zur Ausführbarkeit:** Der Skill nennt `context/AI_CONTEXT.md`, `docs/product/planning/…` und `src/app/`. Diese Pfade gibt es im Repo nicht (Struktur laut AGENTS.md); Ablageort wurde auftragsgemäß überschrieben, ADRs und Gherkin wurden am tatsächlichen Ort gelesen. Tests und Lint wurden nicht ausgeführt (nur Lesen erlaubt).

---

## A. Zusammenfassung (Executive Summary)

### Gesamtbewertung der menschlichen Nachvollziehbarkeit

Die Code-Änderung ist minimal und gut nachvollziehbar: `finissage` kommt in Enum, Union-Typ und Label-Map. Der Typ-Filter und das Badge werden aus `EVENT_TYPE_LABEL` abgeleitet (`event-list.ts:24`, `event-list.html:22`, `event-detail.html:6`), daher wurde keine Stelle in `web/src` vergessen. Die stillen Fallen liegen in der Spezifikation (kaputte Tabellenzeile) und in einer Lücke zwischen EARS und Gherkin (Detailseite). Dazu kommen kleine Duplikationen in den Tests.

- **Nachvollziehbarkeit:** Hoch
- **Einschätzung:** hybrid – Umsetzung konsistent mit dem Bestand, Dokumentationsanhängsel (EARS-Zeile) mechanisch angehängt.

---

## B. Konkrete Befunde

### CODE-01: DAT-UB-7 steht außerhalb der EARS-Tabelle

- **Kategorie:** Konvention
- **Priorität:** Mittel
- **Code-Referenz:** `docs/ears/content/datenmodell.md:17-18`
- **Beobachtung:** Auf die Tabelle folgt die Zeile „Ergänzung (Beitragsvorschau): …“ (Absatz) und danach, ohne Leerzeile, die Tabellenzeile `| DAT-UB-7 | … |`. In Markdown beendet der Absatz die Tabelle, die Zeile wird als Fließtext mit senkrechten Strichen gerendert.
- **Warum problematisch:** Die Anforderung ist in der gerenderten Ansicht keine Tabellenzeile; Tools, die die Tabelle parsen (z. B. Trace-Prüfungen), könnten DAT-UB-7 übersehen. Die Zeile folgt zudem nicht dem Muster der anderen Dateien (Zeile in die Tabelle, bei Bedarf Ergänzungsvermerk darunter).
- **Typisches KI-Ursachenmuster:** Anhängen am Dateiende (Kontextblindheit gegenüber der Dokumentstruktur).
- **ADR-/Gherkin-Bezug:** DAT-UB-7, `content/daten.feature` „Event-Typ Finissage ist gültig“

### CODE-02: Detailseite in EVT-UB-5 ohne Gherkin-Szenario, Test trägt erfundenes „Szenario“

- **Kategorie:** Semantik
- **Priorität:** Mittel
- **Code-Referenz:** `docs/ears/web/events.md:14`; `docs/contracts/gherkin/web/events.feature:32-43`; `web/src/app/pages/event-list/event-list.spec.ts:98`
- **Beobachtung:** EVT-UB-5 verlangt die Kennzeichnung „in Liste und Detail“. Beide verlinkten Szenarien prüfen nur die Liste bzw. den Filter. Der Test `'Szenario: Detail zeigt den Typ als Text'` (Zeile 98) hat kein Gegenstück im Feature; der Kopfkommentar (Zeile 1) listet ihn auch nicht. Der Test liegt zudem in `event-list.spec.ts`, prüft aber `EventDetailPage` (`/events/e-finissage`).
- **Warum problematisch:** Ein Teil der Anforderung ist nicht durch einen Vertrag abgedeckt; das Präfix „Szenario:“ suggeriert eine Abdeckung, die es nicht gibt. Leitprinzip: Quelle (Gherkin) korrigieren, nicht nur den Test.
- **Typisches KI-Ursachenmuster:** Test ohne Rückbindung an den Vertrag ergänzt.
- **ADR-/Gherkin-Bezug:** EVT-UB-5, Q-USE-4

### CODE-03: Eigene Fixtures statt `test-data.ts`; Abweichung vom Task nicht dokumentiert

- **Kategorie:** Duplikation
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/pages/event-list/event-list.spec.ts:78-82`; `web/src/app/testing/test-data.ts:89-94`
- **Beobachtung:** TASK-01 der Story verlangt „`test-data.ts` um Vernissage und Finissage ergänzen“. Umgesetzt wurde ein lokales Array `termine` im Spec, `test-data.ts` blieb unverändert (laut `git status`). Der Changelog erwähnt das nicht. Die Tests hängen außerdem implizit an der Sortierung nach `startDate` (`const [vernissage, finissage] = cards(el)`, Zeile 85).
- **Warum problematisch:** Andere Specs (Kalender, Venue-Detail) sehen die neuen Typen nie; Abweichung vom Plan ist nicht begründet. Gering, da lokale Fixtures die Tests isolieren und die Reihenfolge fachlich korrekt ist.
- **Typisches KI-Ursachenmuster:** Lokale Abkürzung statt gemeinsamer Fixture.

### CODE-04: Aufzählung der Event-Typen an drei Stellen von Hand dupliziert

- **Kategorie:** Duplikation
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/pages/event-list/event-list.ts:45`; `test/event-typ.test.mjs:9`; `schema/events.schema.json:12` und `web/src/app/core/models.ts:31` (bewusst, siehe C)
- **Beobachtung:** Die Meta-Beschreibung zählt die Typen als Fließtext auf (hier wurde „Finissagen“ ergänzt; ein künftiger Typ muss wieder von Hand ergänzt werden, kein Test fängt das). `event-typ.test.mjs` führt die sieben Werte nochmals als Literal; ein achter Schema-Wert bliebe ungetestet, solange niemand die Liste pflegt.
- **Warum problematisch:** Drei Quellen der Wahrheit für dieselbe Liste. Geringes Risiko, aber genau die Stelle, an der `finissage` ursprünglich fehlte.
- **Typisches KI-Ursachenmuster:** Aufzählung kopiert statt abgeleitet.

### CODE-05: README nennt Event-Inhalt ohne Finissage

- **Kategorie:** Semantik
- **Priorität:** Niedrig
- **Code-Referenz:** `README.md:40` – „Einzel-Events, Vernissagen, Messen“
- **Beobachtung:** Beschreibung von `data/events.json` nennt Vernissagen, nicht Finissagen; `README.md:17` (Produktbeschreibung) analog. Beides ist keine vollständige Aufzählung, aber nach SERVICE-13 sind Finissagen reguläre Events.
- **Warum problematisch:** Leichte Unschärfe in der Dokumentation; kein Funktionsfehler.

---

## C. Bewusst nicht gemeldet

- **Schema und `EventType` getrennt gepflegt** (`events.schema.json:12`, `models.ts:31`): bewusste Trennung von Datenvertrag und Webanwendung (ADR-001/ADR-002); beide Stellen wurden synchron geändert.
- **Kalender/Agenda zeigt Events nur als „Event“** (`agenda.ts:52`): durch CAL-UB-7 ausdrücklich so festgelegt, Finissage wird dort nicht vergessen. Ob Vernissage/Finissage im Kalender den Typ tragen sollen, wäre eine Produktentscheidung (siehe Offene Fragen), kein Befund.
- **Filter, Badge in Liste/Detail, Detail-Meta** (`event-detail.ts:45`): leiten sich aus `EVENT_TYPE_LABEL` ab; vollständig.
- **Sitemap/Prerender** (`prerender-params.ts`): arbeiten mit Event-IDs, nicht mit Typen.
- **Venue-Detail** (`venue-detail.ts:39`): filtert nicht nach Typ.
- **`terminEvent`-Helper** (`test/helpers.mjs`): gehört zu Story 01 und wird dort verwendet; nur als Kontext gelesen.
- Lint-abgedeckte Punkte wurden nicht erneut geprüft.

---

## D. Abgeleitete Tasks

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| [TASK-01](TASK-01-spezifikation-datenmodell-und-detail.md) | EARS-Tabelle reparieren, Detail-Szenario ergänzen | Medium | ~20 min | CODE-01, CODE-02, CODE-05 |
| [TASK-02](TASK-02-testfixtures-und-typliste.md) | Fixtures und Typliste in Tests vereinheitlichen | Low | ~30 min | CODE-03, CODE-04 |

---

## E. Meta-Bewertung

- **Gut automatisiert behebbar:** CODE-01, CODE-03, CODE-05.
- **Erfordert menschliche Entscheidung:** CODE-02 (Gherkin ergänzen oder EVT-UB-5 auf „Liste“ kürzen); Kalender-Kennzeichnung (siehe Offene Fragen).
- **Empfehlung für künftige KI-Codegenerierung:** Bei neuen EARS-Zeilen die Tabelle nicht am Dateiende anhängen, sondern in die Tabelle einfügen. Tests nur mit „Szenario:“ benennen, wenn ein Gherkin-Szenario existiert.

---

## F. Nicht bewertbar

- Tests, Lint und Build wurden nicht ausgeführt (Review nur lesend); die im Changelog genannten Ergebnisse (224 bzw. 272 grün) sind nicht verifiziert.
- Sichtprüfung im Browser fehlt (laut Changelog ebenfalls nicht erfolgt).
- Skill-Referenzen (`context/AI_CONTEXT.md`, `eslint.config.js` des Skill-Kontexts) wurden nicht gefunden bzw. nicht herangezogen.

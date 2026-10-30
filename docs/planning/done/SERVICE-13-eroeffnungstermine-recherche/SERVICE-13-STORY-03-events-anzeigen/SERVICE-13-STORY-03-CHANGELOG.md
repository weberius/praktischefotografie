# Changelog: SERVICE-13-STORY-03 – Vernissage und Finissage unter Events anzeigen

## 2026-10-30 – REVIEW-TASK-01: Spezifikation korrigiert

- **Status:** Umgesetzt
- **Änderungen:** DAT-UB-7 steht in der Tabelle von `datenmodell.md`; neues Gherkin-Szenario „Vernissage und Finissage in der Detailansicht“ zu EVT-UB-5, Test daran gebunden; README nennt Finissagen.
- **Quelle:** EARS DAT-UB-7 (Darstellungsfehler), Gherkin `web/events.feature`
- **Dateien:** `docs/ears/content/datenmodell.md`, `docs/ears/web/events.md`, `docs/contracts/gherkin/web/events.feature`, `web/src/app/pages/event-list/event-list.spec.ts`, `README.md`
- **Prüfung:** Gate grün (272 Web-Tests).

## 2026-10-30 – TASK-01: Typ Finissage in Schema und Webanwendung

- **Status:** Umgesetzt
- **Änderungen:** `finissage` im Enum von `events.schema.json`; `EventType` und `EVENT_TYPE_LABEL` („Finissage“) in `models.ts`, daraus folgen Badge in Liste und Detail sowie Typ-Filter; Meta-Beschreibung der Eventliste nennt Finissagen.
- **Dateien:** `schema/events.schema.json`, `web/src/app/core/models.ts`, `web/src/app/pages/event-list/event-list.ts`, `web/src/app/pages/event-list/event-list.spec.ts`, `test/event-typ.test.mjs`, `test/helpers.mjs`
- **Prüfung:** Tests zu „Event-Typ Finissage ist gültig“ (alle sieben Typen gültig, unbekannter ungültig), „Vernissage und Finissage in der Liste“, „… filterbar“ und Detail-Badge. Gate: `npm run build`, `npm test` (224, 0 Fehler), `npm run web:test` (272 von 272, vorher 261; Chrome über `CHROME_BIN` aus dem Playwright-Cache), `npm run lint:all`, `npm run validate:data` grün. **Nicht geprüft:** Sichtprüfung im Browser.

# SERVICE-03-STORY-01-TASK-03 – Snapshots, Cache, Offline und Ausfälle
- **Story:** STORY-01
- **EARS:** FET-UB-4, FET-OP-1, FET-UN-1
- **Gherkin:** `setup/webseiten-abruf.feature` · „Snapshot wird gespeichert“, „Cache und Offline-Modus“, „Seite nicht erreichbar“
- **Quality:** Q-REL-1, Q-DATA-3, Q-MAIN-2
- **ADR:** ADR-006
- **Aufgabe:** `lib/snapshots.mjs`; Zusammenfassung je Ort; CLI `fetch-venues.mjs` (`--venue`, `--offline`, `--max-age`, `--date`).
- **Prüfkriterium:** Node-Tests grün; ein Ausfall stoppt den Lauf nicht; alter Snapshot bleibt.

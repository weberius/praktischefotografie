# SERVICE-26-STORY-01-TASK-01 – Schema, Validator und Webmodell

- **Story:** SERVICE-26-STORY-01
- **Spezifikation:** DAT-UB-9, DAT-UB-10, VAL-UN-6, VAL-UN-7, VAL-UN-8, Q-DATA-19, ADR-027, ADR-001
- **Prüfkriterium:** `events.schema.json` kennt `startTime`, `endTime` (`HH:MM`) und `timeZone`; der Validator meldet Endzeit/Zeitzone ohne Startzeit, ungültige Zeitzone und Ende nicht nach Beginn am selben Tag; der Bestand bleibt gültig; `PhotoEvent` in `models.ts` trägt die Felder; Tests in `test/validate-data.test.mjs` bzw. `test/event-typ.test.mjs`.
- **Dateien:** `schema/events.schema.json`, `scripts/validate-data.mjs`, `web/src/app/core/models.ts`, `data/README.md`, `test/`
- **Status:** Umgesetzt

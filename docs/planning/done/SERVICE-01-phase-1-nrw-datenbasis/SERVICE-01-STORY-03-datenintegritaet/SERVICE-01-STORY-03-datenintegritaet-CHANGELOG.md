# Changelog: SERVICE-01-STORY-03 – Datenintegrität absichern

## 2026-10-27 – TASK-01 bis TASK-03
- **Status:** Umgesetzt
- **Änderungen:** Referenz-, Duplikat-, Datums-, Koordinaten- und Prüfdatumsregeln im Validator; Fixture-Korpus mit 16 ungültigen Fällen (Q-DATA-1); Datenpflege-Regeln.
- **Dateien:** `scripts/validate-data.mjs`, `test/q-data-1.test.mjs`, `data/README.md`
- **Prüfung:** `npm test` 50/50 grün, `npm run lint` grün.

# Changelog: SERVICE-27-STORY-01 – Bestandsrahmen für Orte

## 2026-11-11 – TASK-01: Bestandsgrenze im Test auf 20 bis 60

- **Status:** Umgesetzt
- **Änderungen:** Test „20 bis 30 Venues“ durch „20 bis 60 Venues“ ersetzt (VEN-UB-8, Q-DATA-21).
- **Dateien:** `test/bestand.test.mjs`
- **Prüfung:** `npm run build`, `npm test` (276 grün), `npm run web:test`, `npm run lint:all` grün. Die Grenzfälle 19/61 wurden nicht gesondert durchgespielt.

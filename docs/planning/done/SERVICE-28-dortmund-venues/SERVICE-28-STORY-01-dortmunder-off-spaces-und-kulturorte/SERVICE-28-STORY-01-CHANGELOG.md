# Changelog: SERVICE-28-STORY-01 – Dortmunder Off-Spaces und Kulturorte

## 2026-11-11 – TASK-01: Off-Spaces und Kulturorte erfassen

- **Status:** Umgesetzt
- **Änderungen:** Projektraum Fotografie und Kulturort Depot in `data/venues.json` (Status `recherchiert`, `checkedAt` 2026-11-11); Test für die Dortmunder Orte (Typ, Koordinatenbereich, Quelle, Museum Ostwall genau einmal) in `test/bestand.test.mjs`, gemeinsam mit STORY-02.
- **Dateien:** `data/venues.json`, `test/bestand.test.mjs`
- **Prüfung:** Build, `npm run validate:data`, `npm test` (277 grün), `npm run lint:all` grün. Nicht geprüft: `npm run web:test` (in dieser Umgebung fehlt Chrome, `CHROME_BIN`; die Webtests nutzen Fixtures und lesen `data/` nicht). Schwach belegt: Fotografie-Bezug des Depots (Kulturzentrum mit Märkten, Konzerten, Ausstellungen; auf der Startseite keine Fotoausstellung gefunden). Koordinaten per OpenStreetMap-Geokodierung der Anschrift.

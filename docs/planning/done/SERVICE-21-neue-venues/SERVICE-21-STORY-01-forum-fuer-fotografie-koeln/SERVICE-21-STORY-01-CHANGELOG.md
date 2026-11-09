# Changelog: SERVICE-21-STORY-01 – Forum für Fotografie Köln als Venue

## 2026-11-09 – TASK-01: Venue Forum für Fotografie Köln erfassen

- **Status:** Umgesetzt
- **Änderungen:** Venue `forum-fuer-fotografie-koeln` (Typ `gallery`, Bayenthal, Schönhauser Straße 8, 50968 Köln; Koordinaten aus OpenStreetMap/Nominatim) in den Katalog aufgenommen; keine ständige Sammlung, keine Präsenzbibliothek.
- **Dateien:** `data/venues.json`, `test/bestand.test.mjs` (Test siehe STORY-02-TASK-02)
- **Prüfung:** `npm run validate:data` grün, `npm test` grün (249/249), `npm run build` grün (Sitemap 176 Adressen), `npm run lint:all` grün; `npm run web:test` **nicht geprüft** (kein Chrome-Binary im Container, `CHROME_BIN` fehlt).

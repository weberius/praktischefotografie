# Changelog: SERVICE-21-STORY-02 – Kunstmuseum Bonn als Venue

## 2026-11-09 – TASK-02: Test „Neue Venues sind im Katalog“

- **Status:** Umgesetzt
- **Änderungen:** Bestandstest für beide neuen Venues (id, Typ, Stadt, Website, Quelle).
- **Dateien:** `test/bestand.test.mjs`
- **Prüfung:** `npm test` grün (249/249).

## 2026-11-09 – TASK-01: Venue Kunstmuseum Bonn erfassen

- **Status:** Umgesetzt
- **Änderungen:** Venue `kunstmuseum-bonn` (Typ `museum`, Gronau, Helmut-Kohl-Allee 2, 53113 Bonn; Koordinaten aus OpenStreetMap/Nominatim; ständige Sammlung: ja). Fotografiebezug: Ausstellung „Herlinde Koelbl. Fadenkreuze für das Leben“ (Quelle: `source.url`).
- **Dateien:** `data/venues.json`
- **Prüfung:** `npm run validate:data` grün, `npm test` grün (249/249), `npm run build` grün (Sitemap 176 Adressen), `npm run lint:all` grün; `npm run web:test` **nicht geprüft** (kein Chrome-Binary im Container, `CHROME_BIN` fehlt).

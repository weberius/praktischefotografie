# Changelog: SERVICE-30-STORY-01 – Weitere NRW-Orte im Ortskatalog

## 2026-11-11 – TASK-01: Weitere NRW-Orte erfassen

- **Status:** Umgesetzt
- **Änderungen:** Sechs Orte in `data/venues.json` (Bestand 41 → 47); Bestandstest für die Orte samt Stadtrahmen.
- **Dateien:** `data/venues.json`, `test/bestand.test.mjs`
- **Prüfung:** `npm run build`, `npm test` (279 von 279), `npm run lint:all`, `npm run validate:data` grün. Nicht geprüft: `npm run web:test` (nicht ausgeführt). Hinweise: Koordinaten per Geokodierung (Photon/OSM). Anschriften auf den Seiten der Häuser belegt für Köln, Mülheim, Wuppertal, Krefeld, Münster; Gasometer (Arenastraße 11) nur über die Tourismusseite Oberhausen, das Impressum von gasometer.de nennt die Betreibergesellschaft in der Essener Straße 3. Fotografiebezug auf der Startseite belegt nur für Camera Obscura (Fotografie-Ausstellung) und Von der Heydt-Museum (rund 800 Fotografien); für Krefeld, Münster, Gasometer und das Institut stützt er sich auf die Idee. Das Institut hat laut Website einen Saal, der bis November 2026 vorübergehend geschlossen ist. Bibliotheken: Von der Heydt-Museum (Burgstraße 2) und Institut (Umfang nicht belegt) mit `libraryNotes`. Das Institut ist über `co.jpf.go.jp` erfasst; `jki.de` war nicht abrufbar.

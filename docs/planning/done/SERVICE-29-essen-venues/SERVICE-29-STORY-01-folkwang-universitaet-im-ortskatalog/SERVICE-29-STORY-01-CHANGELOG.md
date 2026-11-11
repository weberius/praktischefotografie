# Changelog: SERVICE-29-STORY-01 – Folkwang Universität im Ortskatalog

## 2026-11-11 – TASK-01: Folkwang Universität erfassen

- **Status:** Umgesetzt
- **Änderungen:** Folkwang Universität der Künste (Fachbereich Gestaltung mit Fotografie, Campus Welterbe Zollverein, Quartier Nord) in `data/venues.json`; Bestandstest für Essener Orte.
- **Dateien:** `data/venues.json`, `test/bestand.test.mjs`
- **Prüfung:** `npm run build`, `npm test` (0 Fehler), `npm run lint:all`, `npm run validate:data` grün. Nicht geprüft: `npm run web:test` (nicht ausgeführt, in SERVICE-28 mangels Chrome nicht lauffähig). Hinweis: Anschrift laut Kontaktseite der Hochschule (Fachbereich 4, Martin-Kremmer-Straße 21, 45327 Essen); Koordinaten per Geokodierung (Photon/OSM). Die Studiengangsseite zu Fotografie wurde nur über die Navigation der Startseite belegt (Studiengang „Fotografie“ im Fachbereich Gestaltung). Der Hauptsitz (Alte Abtei, Klemensborn 39, Werden; Fachbereiche 1–3) ist bewusst nicht der Ortsstandort.

# Changelog: SERVICE-27-STORY-02 – Düsseldorfer Museen

## 2026-11-11 – TASK-01: Museen erfassen

- **Status:** Umgesetzt
- **Änderungen:** K20, K21, Stadtmuseum, Filmmuseum in `data/venues.json` (Status `recherchiert`, `checkedAt` 2026-11-11); Test für alle zwölf Düsseldorfer Orte (Typ, Stadt, Koordinatenbereich, Quelle).
- **Dateien:** `data/venues.json`, `test/bestand.test.mjs`
- **Prüfung:** Gate (Build, `npm test`, `npm run web:test`, `npm run lint:all`) grün. Nicht geprüft: Foto-Bezug des Filmmuseums (nur Fotoausstellung zu Tarkowski, Dauerausstellung zum Film).

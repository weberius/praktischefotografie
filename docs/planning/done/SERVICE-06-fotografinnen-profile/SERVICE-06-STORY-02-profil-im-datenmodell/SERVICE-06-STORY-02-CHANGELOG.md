# Changelog: SERVICE-06-STORY-02 – Profil im Datenmodell

## 2026-10-28 – TASK-02: Validierung der Profile und Build

- **Status:** Umgesetzt
- **Änderungen:** Wortzahl 40 bis 90, Quellen auf `<lang>.wikipedia.org`, Portrait (Host, Datei, ≤ 200 kB, ≤ 400 px), Lebensdaten; Build kopiert `data/portraits/` nach `portraits/`; `/web/public/portraits/` ignoriert.
- **Dateien:** `scripts/validate-data.mjs`, `web/tools/sync-data.mjs`, `.gitignore`, `test/photographer-profiles.test.mjs`
- **Prüfung:** Node-Tests grün (17 neue, 9 ungültige Fixtures zu Q-DATA-7).

## 2026-10-28 – TASK-01: Schema der Profile

- **Status:** Umgesetzt
- **Änderungen:** `occupation`, `life`, `wikipedia`, `portrait` im Schema (Breite und Höhe Pflicht).
- **Dateien:** `schema/photographers.schema.json`
- **Prüfung:** Schema-Tests grün.

# Changelog: SERVICE-15-STORY-02 – Kurztext aus neuen Ergebnissen vorschlagen, prüfen und übernehmen

## 2026-10-31 – TASK-02: Webkurztext prüfen und übernehmen

- **Status:** Umgesetzt
- **Änderungen:** `checkWebProposal`/`checkWebFile` und `applyWebFile` (Freigabe, `--force`, Rücknahme bei Validierungsfehler, neue Person) in `websearch.mjs`; Befehle `check`, `apply`.
- **Dateien:** siehe Task `SERVICE-15-STORY-02-TASK-02-pruefung-und-uebernahme-web.md`
- **Prüfung:** Tests zu den Szenarien (≥ 6 ungültige Fixtures) grün. Build, `npm test`, `npm run web:test`, `npm run lint:all`, `npm run validate:data` grün. Nicht geprüft: echte Suchmaschine und Sachrichtigkeit der Texte (Handtest).

## 2026-10-31 – TASK-01: Feld `web` in Schema und Validierung

- **Status:** Umgesetzt
- **Änderungen:** `schema/photographers.schema.json` (`web`, 1–5 Quellen mit `title`, `url` http/https), Wortzahl 40–90 in `scripts/validate-data.mjs`.
- **Dateien:** siehe Task `SERVICE-15-STORY-02-TASK-01-schema-und-validierung-web.md`
- **Prüfung:** Tests in `test/photographer-profiles.test.mjs` grün; `npm run validate:data` grün. Build, `npm test`, `npm run web:test`, `npm run lint:all`, `npm run validate:data` grün. Nicht geprüft: echte Suchmaschine und Sachrichtigkeit der Texte (Handtest).

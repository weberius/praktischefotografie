# SERVICE-15-STORY-02-TASK-01 – Feld `web` in Schema und Validierung

**Story:** SERVICE-15-STORY-02  ·  **Status:** Umgesetzt
**EARS:** PRF-UB-6, PRF-UN-4
**Gherkin:** Webkurztext mit Quellen · Ungültiger Webkurztext
**Quality:** Q-DATA-7
**ADR:** ADR-019

## Vorgehen
- `schema/photographers.schema.json` (`web`, 1–5 Quellen mit `title`, `url` http/https), Wortzahl 40–90 in `scripts/validate-data.mjs`.

## Prüfkriterium
Tests in `test/photographer-profiles.test.mjs` grün; `npm run validate:data` grün. Prüf-Gate grün.

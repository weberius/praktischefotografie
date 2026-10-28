# Changelog: SERVICE-05-STORY-01 – Dreistufiges Datenmodell

## 2026-10-28 – TASK-02: Validator, Verweise und Build-Synchronisation

- **Status:** Umgesetzt
- **Änderungen:** `festivals` in `DATASETS`; Zeitraum und `organizerId` der Festivals; `festivalId` verweist auf Festivals (nicht mehr auf Veranstalter); Partnerkennzeichnung nur mit `festivalId`; doppelte ID bei Ort und Veranstalter; Build-Synchronisation und Testhilfen kennen `festivals`.
- **Dateien:** `scripts/validate-data.mjs`, `web/tools/sync-data.mjs`, `test/helpers.mjs`, `test/festivals.test.mjs`
- **Prüfung:** Node-Tests grün (19 neue Prüfungen, 11 ungültige Fixtures zu Q-DATA-5 werden erkannt); `npm run validate:data` grün.

## 2026-10-28 – TASK-01: Schemas und leere Festivaldatei

- **Status:** Umgesetzt
- **Änderungen:** `schema/festivals.schema.json`; Veranstalter um `shortName`, `description`, `social.instagram`; Ausstellung um `isOfficialFestivalPartner`; `data/festivals.json`.
- **Dateien:** `schema/festivals.schema.json`, `schema/organizers.schema.json`, `schema/exhibitions.schema.json`, `data/festivals.json`
- **Prüfung:** Schema-Tests mit gültigen und ungültigen Fixtures grün.

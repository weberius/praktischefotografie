# Changelog: SERVICE-22-STORY-03 – Führungen in der Webanwendung

## 2026-11-10 – TASK-01: Eventtyp `guided_tour`

- **Status:** Umgesetzt
- **Änderungen:** Neuer `eventType` `guided_tour` (Label „Führung“) in Schema und Webmodell; Tests für Datenmodell und Eventliste.
- **Dateien:** `schema/events.schema.json`, `web/src/app/core/models.ts`, `test/event-typ.test.mjs`, `web/src/app/pages/event-list/event-list.spec.ts`
- **Prüfung:** `npm test` (259 grün), `npm run lint:all`, `npm run build`, `npm run validate:data` grün. **Nicht geprüft:** `npm run web:test` – in der Umgebung fehlt Chrome/Chromium („No binary for ChromeHeadless“); der Test-Build kompilierte, die drei neuen Specs (EVT-UB-6) wurden nicht ausgeführt.

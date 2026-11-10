# Changelog: SERVICE-24-STORY-01 – Nur aktuelle Events und Ausstellungen in den Listen

## 2026-11-10 – TASK-02: Ausstellungsliste
- **Status:** Umgesetzt
- **Änderungen:** Beendete Ausstellungen fehlen in der Liste; Statusfilter ohne „Beendet“; `status=beendet` wird ignoriert.
- **Dateien:** `web/src/app/pages/exhibition-list/exhibition-list.ts`, `exhibition-list.spec.ts`
- **Prüfung:** `npm run web:test` 333/333 grün (Chrome aus Playwright-Cache via `CHROME_BIN`)

## 2026-11-10 – TASK-01: Eventliste
- **Status:** Umgesetzt
- **Änderungen:** Beendete Events fehlen in der Liste; „Beendet“-Badge der Liste entfernt; Detailseite unverändert.
- **Dateien:** `web/src/app/pages/event-list/event-list.ts`, `event-list.html`, `event-list.spec.ts`
- **Prüfung:** `npm run build`, `npm test` (265 grün), `npm run web:test` (333 grün), `npm run lint:all` grün. Nicht geprüft: Playwright-E2E, axe-Lauf.

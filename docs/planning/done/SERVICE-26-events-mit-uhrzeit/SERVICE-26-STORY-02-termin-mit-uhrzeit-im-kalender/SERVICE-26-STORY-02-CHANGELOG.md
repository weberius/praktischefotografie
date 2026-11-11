# Changelog: SERVICE-26-STORY-02 – Termin mit Uhrzeit im Kalender

## 2026-11-11 – TASK-01: ICS mit Uhrzeit, Zeitzone und Dauer

- **Status:** Umgesetzt
- **Änderungen:** `buildEventIcs` schreibt Termine mit `startTime` zeitgebunden (`DTSTART;TZID=Europe/Berlin` mit eingebautem `VTIMEZONE`), ohne `endTime` eintägig 2 Stunden Dauer (auch über Mitternacht), mehrtägig mit `endTime` zeitgebunden, sonst ganztägig; andere Zonen werden per `Intl` nach UTC umgerechnet. Die Detailseite reicht die Felder durch.
- **Dateien:** `web/src/app/core/ics.ts`, `web/src/app/core/ics.spec.ts`, `web/src/app/pages/event-detail/event-detail.ts`
- **Prüfung:** Jasmine-Tests zu allen Szenarien aus `kalender-export.feature` (Uhrzeit, ganztägig, 2 Stunden, Mitternacht, mehrtägig, VTIMEZONE, UTC) grün; Build, `npm test`, `npm run web:test` (359 Tests, Chromium aus Playwright via `CHROME_BIN`), Lint grün. Nicht geprüft: Import in echten Kalender-Apps (Apple, Google, Outlook); Größe der Datei ≤ 5 kB nicht automatisiert gemessen.

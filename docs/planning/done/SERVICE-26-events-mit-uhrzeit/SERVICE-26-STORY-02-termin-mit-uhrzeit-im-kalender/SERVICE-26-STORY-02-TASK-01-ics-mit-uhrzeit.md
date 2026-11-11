# SERVICE-26-STORY-02-TASK-01 – ICS mit Uhrzeit, Zeitzone und Dauer

- **Story:** SERVICE-26-STORY-02
- **Spezifikation:** ICS-UB-8, ICS-UB-9, ICS-UB-10, ICS-UN-2, ICS-UB-2 (eingeschränkt), Q-IOP-2, Q-IOP-1, Q-SEC-6, ADR-027, ADR-018
- **Prüfkriterium:** `buildEventIcs` schreibt zeitgebundene Termine (`TZID=Europe/Berlin` mit `VTIMEZONE`, sonst UTC), 2-Stunden-Dauer über Mitternacht, ganztägig ohne Startzeit und mehrtägig ohne Endzeit; Detailseite reicht die Felder durch; Fixtures aus Q-IOP-2 grün.
- **Dateien:** `web/src/app/core/ics.ts`, `web/src/app/core/ics.spec.ts`, `web/src/app/pages/event-detail/event-detail.ts`
- **Status:** Umgesetzt

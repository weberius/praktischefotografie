# SERVICE-26-STORY-03-TASK-02 – Agenda mit Uhrzeit und Sortierung

- **Story:** SERVICE-26-STORY-03
- **Spezifikation:** CAL-UB-8, CAL-UB-9, Q-USE-21, ADR-027
- **Prüfkriterium:** `/calendar` und `/calendar/:year/:month` zeigen die Uhrzeit nach EVT-UB-7 (mehrtägig ohne); gleiche Beginndaten sind nach `startTime` geordnet, Einträge ohne Zeit zuerst; Komponententests grün.
- **Dateien:** `web/src/app/pages/calendar/`
- **Status:** Umgesetzt

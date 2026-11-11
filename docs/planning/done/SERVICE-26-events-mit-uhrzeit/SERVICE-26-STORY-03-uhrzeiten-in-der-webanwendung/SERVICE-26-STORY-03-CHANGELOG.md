# Changelog: SERVICE-26-STORY-03 – Uhrzeiten in der Webanwendung

## 2026-11-11 – TASK-02: Agenda mit Uhrzeit und Sortierung

- **Status:** Umgesetzt
- **Änderungen:** Die Agenda zeigt die Uhrzeit von Events (mehrtägig ohne) und ordnet Einträge gleichen Beginns nach `startTime`, Einträge ohne Uhrzeit zuerst.
- **Dateien:** `web/src/app/core/agenda.ts`, `web/src/app/pages/calendar/calendar.html`, `web/src/app/pages/calendar/calendar.ts`, zugehörige Specs
- **Prüfung:** Tests „Gleicher Tag nach Startzeit“ und „Agenda zeigt die Uhrzeit“ grün; Gate grün.

## 2026-11-11 – TASK-01: Zeitangabe in Liste und Detailseite

- **Status:** Umgesetzt
- **Änderungen:** `eventTimeLines` und Komponente `app-event-time`: „16:00–18:00 Uhr“, „ab 16:00 Uhr“, Zonenname bei Abweichung, mehrtägig nur im Detail „Start …/Ende …“; zugänglicher Name „von … bis … Uhr“ über ein verstecktes Element.
- **Dateien:** `web/src/app/core/event-time.ts`, `web/src/app/shared/event-time/event-time.ts`, `web/src/app/pages/event-list/`, `web/src/app/pages/event-detail/`, Specs
- **Prüfung:** Komponenten- und Funktionstests grün; Gate grün. Nicht geprüft: axe-Prüfung (Q-USE-21) und manuelle Screenreader-Probe; Layout im Browser nicht visuell geprüft.

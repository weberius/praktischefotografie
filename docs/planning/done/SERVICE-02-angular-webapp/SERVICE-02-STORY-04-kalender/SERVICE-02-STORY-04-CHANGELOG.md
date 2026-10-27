# Changelog: SERVICE-02-STORY-04 – Kalender- und Agenda-Ansicht

## 2026-10-27 – TASK-02: Kalenderseite
**Status:** umgesetzt (Phase 5), offen für H2
**Änderungen:** Seite `/calendar` und `/calendar/:year/:month` mit Monatsnavigation (Links `/calendar/JJJJ/M`), Option „Beendete anzeigen“ (Checkbox, Query-Parameter `ended=1`, nur in der Agenda ab heute), Art-Text „Ausstellung“/„Event“, Status „Endet bald“ bzw. „Beendet“ über `<app-status-badge>` (Ausstellungen) und Text „Beendet“ (Events), Leerzustand-Hinweis, ungültiger Monat/Jahr zeigt `<app-not-found />` samt Titel „Nicht gefunden“.
**Dateien:** `web/src/app/pages/calendar/calendar.ts`, `calendar.html`, `calendar.css`, `calendar.spec.ts`
**Prüfung:** `ng test` (Teilmenge Kalender, Events, Agenda): 31 von 31 grün. `ng lint` ohne Befund. Nicht geprüft: `ng build`, Gesamt-Testlauf, axe/Browser-Test (Q-USE-2, Q-USE-3), visuelle Darstellung.

## 2026-10-27 – TASK-01: Agenda-Logik
**Status:** umgesetzt (Phase 5), offen für H2
**Änderungen:** `core/agenda.ts` mit `buildAgenda` (Zusammenführen, Sortierung nach Beginn, Ende, Titel), `filterByMonth` (Zeitraum berührt Monat, auch beendete), `filterFromToday` (Standardansicht ohne Beendete, optional mit), `parseMonth` (Jahr vierstellig, Monat 1–12) und `shiftMonth`.
**Dateien:** `web/src/app/core/agenda.ts`, `web/src/app/core/agenda.spec.ts`
**Prüfung:** Jasmine-Tests grün (siehe TASK-02), Lint ohne Befund. Nicht geprüft: Verhalten bei Jahren außerhalb 0000–9999 beim Monatswechsel.

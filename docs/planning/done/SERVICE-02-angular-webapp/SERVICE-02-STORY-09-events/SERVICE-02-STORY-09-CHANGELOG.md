# Changelog: SERVICE-02-STORY-09 – Events und Messen ansehen

## 2026-10-27 – TASK-02: Eventdetail
**Status:** umgesetzt (Phase 5), offen für H2
**Änderungen:** Seite `/events/:id` mit Beschreibung, Highlights, Ort (Link `/venues/:id`), Website (extern, `rel="noopener"`), Kennzeichnungen „Kommerziell“ und „Beendet“; unbekannte ID zeigt `<app-not-found />` mit Titel „Nicht gefunden“.
**Dateien:** `web/src/app/pages/event-detail/event-detail.ts`, `event-detail.html`, `event-detail.css`, `event-detail.spec.ts`
**Prüfung:** `ng test` (Teilmenge Kalender, Events, Agenda): 31 von 31 grün. `ng lint` ohne Befund. Nicht geprüft: `ng build`, Gesamt-Testlauf, axe/Browser-Test, visuelle Darstellung.

## 2026-10-27 – TASK-01: Eventliste
**Status:** umgesetzt (Phase 5), offen für H2
**Änderungen:** Seite `/events`: Liste nach Beginn aufsteigend mit Titel, Typ-Text, Ort und Zeitraum; Typfilter als Select mit Label (Query-Parameter `type`); Kennzeichnungen „Kommerziell“ und „Beendet“ als Text; Hinweis bei leerer Auswahl.
**Dateien:** `web/src/app/pages/event-list/event-list.ts`, `event-list.html`, `event-list.spec.ts`
**Prüfung:** siehe TASK-02 (gleicher Testlauf), Lint ohne Befund. Nicht geprüft: `ng build`, axe, visuelle Darstellung.

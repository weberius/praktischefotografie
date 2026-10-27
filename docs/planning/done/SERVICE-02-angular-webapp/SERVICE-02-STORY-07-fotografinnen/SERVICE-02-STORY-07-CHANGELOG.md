# Changelog: SERVICE-02-STORY-07 – Fotograf:innen-Index mit eigener Seite

## 2026-10-27 – TASK-02: Personenseite

**Status:** umgesetzt (Abnahme an H2 offen)

**Änderungen:**
- `/photographers/:id` zeigt Name, Kurzbiografie, Website (extern, `rel="noopener"`) und alle Ausstellungen der Person (Titel, Ort, Zeitraum, Status-Badge, Link) absteigend nach Beginn.
- Hinweis ohne Ausstellung; unbekannte ID zeigt `<app-not-found />`.

**Dateien:** `web/src/app/pages/photographer-detail/photographer-detail.{ts,html,spec.ts}`

**Prüfung:** `ng test` (nur Specs der Seiten Orte, Fotograf:innen, Ausstellungen): 25 von 25 grün. `ng lint`: keine Befunde in diesen Dateien (ein Fehler in `map.spec.ts` stammt nicht aus diesem Ticket). Nicht geprüft: `ng build`, vollständiger Testlauf, axe-/Browser-Test (Q-USE-2, Q-USE-3), visuelle Kontrolle.

## 2026-10-27 – TASK-01: Fotograf:innen-Übersicht

**Status:** umgesetzt (Abnahme an H2 offen)

**Änderungen:**
- `/photographers` listet alle Personen alphabetisch (`localeCompare` mit `de`) als Links.

**Dateien:** `web/src/app/pages/photographer-list/photographer-list.{ts,html,spec.ts}`

**Prüfung:** `ng test` (nur Specs der Seiten Orte, Fotograf:innen, Ausstellungen): 25 von 25 grün. `ng lint`: keine Befunde in diesen Dateien (ein Fehler in `map.spec.ts` stammt nicht aus diesem Ticket). Nicht geprüft: `ng build`, vollständiger Testlauf, axe-/Browser-Test (Q-USE-2, Q-USE-3), visuelle Kontrolle.

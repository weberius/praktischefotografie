# Changelog: SERVICE-02-STORY-06 – Orte entdecken

## 2026-10-27 – TASK-02: Ortsdetailseite

**Status:** umgesetzt (Abnahme an H2 offen)

**Änderungen:**
- `/venues/:id` zeigt Adresse, Website (extern, `rel="noopener"`), Eigenschaften, Quelle (Link) und Prüfstand (Status, Prüfdatum formatiert).
- Laufende und kommende Ausstellungen (Status ≠ beendet, mit Status-Badge) und Events (Ende nicht vor heute) des Ortes; Hinweis ohne Programm; verlinkte veröffentlichte Beiträge.
- Unbekannte ID zeigt `<app-not-found />`; Titel und Beschreibung werden je Ort gesetzt.
- Routenparameter `id` ist ein nicht-erforderliches `input('')`, weil ein `effect` vor der Eingabebindung läuft.

**Dateien:** `web/src/app/pages/venue-detail/venue-detail.{ts,html,spec.ts}`

**Prüfung:** `ng test` (nur Specs der Seiten Orte, Fotograf:innen, Ausstellungen): 25 von 25 grün. `ng lint`: keine Befunde in diesen Dateien (ein Fehler in `map.spec.ts` stammt nicht aus diesem Ticket). Nicht geprüft: `ng build`, vollständiger Testlauf, axe-/Browser-Test (Q-USE-2, Q-USE-3), visuelle Kontrolle.

## 2026-10-27 – TASK-01: Ortsverzeichnis

**Status:** umgesetzt (Abnahme an H2 offen)

**Änderungen:**
- `/venues` listet alle Orte mit Name (Link), Typ (Symbol `aria-hidden` plus Text), Stadt und Besonderheiten als Text.
- Filter Stadt und Typ (Selects mit Labels), Filter `organizer` mit Hinweis „Gefiltert nach Veranstalter: <Name>“ und Link zum Aufheben; Zustand in Query-Parametern (`filterToParams`/`paramsToFilter`, `replaceUrl`).

**Dateien:** `web/src/app/pages/venue-list/venue-list.{ts,html,css,spec.ts}`

**Prüfung:** `ng test` (nur Specs der Seiten Orte, Fotograf:innen, Ausstellungen): 25 von 25 grün. `ng lint`: keine Befunde in diesen Dateien (ein Fehler in `map.spec.ts` stammt nicht aus diesem Ticket). Nicht geprüft: `ng build`, vollständiger Testlauf, axe-/Browser-Test (Q-USE-2, Q-USE-3), visuelle Kontrolle.

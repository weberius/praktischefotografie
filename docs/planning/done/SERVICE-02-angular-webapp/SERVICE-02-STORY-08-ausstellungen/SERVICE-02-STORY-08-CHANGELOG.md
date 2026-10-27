# Changelog: SERVICE-02-STORY-08 – Ausstellungen ansehen

## 2026-10-27 – TASK-02: Ausstellungsdetail

**Status:** umgesetzt (Abnahme an H2 offen)

**Änderungen:**
- `/exhibitions/:id` zeigt Beschreibung, Typ als Text, Status-Badge, Zeitraum, Ort mit Link, beteiligte Fotograf:innen mit Links, bei `festivalId` den Veranstalter mit Link auf `/organizers/:id` und verlinkte veröffentlichte Beiträge.
- Unbekannte ID zeigt `<app-not-found />`.

**Dateien:** `web/src/app/pages/exhibition-detail/exhibition-detail.{ts,html,spec.ts}`

**Prüfung:** `ng test` (nur Specs der Seiten Orte, Fotograf:innen, Ausstellungen): 25 von 25 grün. `ng lint`: keine Befunde in diesen Dateien (ein Fehler in `map.spec.ts` stammt nicht aus diesem Ticket). Nicht geprüft: `ng build`, vollständiger Testlauf, axe-/Browser-Test (Q-USE-2, Q-USE-3), visuelle Kontrolle.

## 2026-10-27 – TASK-01: Ausstellungsliste

**Status:** umgesetzt (Abnahme an H2 offen)

**Änderungen:**
- `/exhibitions` listet Titel, Ort (Link), Zeitraum und Status (Badge mit Text), sortiert nach Beginn absteigend.
- Statusfilter (Select: Alle, Kommend, Endet bald, Laufend, Beendet) im Query-Parameter `status`; ungültige Werte werden ignoriert.

**Dateien:** `web/src/app/pages/exhibition-list/exhibition-list.{ts,html,spec.ts}`

**Prüfung:** `ng test` (nur Specs der Seiten Orte, Fotograf:innen, Ausstellungen): 25 von 25 grün. `ng lint`: keine Befunde in diesen Dateien (ein Fehler in `map.spec.ts` stammt nicht aus diesem Ticket). Nicht geprüft: `ng build`, vollständiger Testlauf, axe-/Browser-Test (Q-USE-2, Q-USE-3), visuelle Kontrolle.

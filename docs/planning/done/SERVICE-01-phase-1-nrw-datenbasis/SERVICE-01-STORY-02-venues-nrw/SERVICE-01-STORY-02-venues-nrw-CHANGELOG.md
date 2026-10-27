# Changelog: SERVICE-01-STORY-02 – Venues in NRW erfassen

## 2026-10-27 – TASK-02: Tests auf dem Datenbestand
- **Status:** Umgesetzt
- **Dateien:** `test/bestand.test.mjs`
- **Prüfung:** Alle Bestandsszenarien, Q-DATA-2, Q-PERF-1, Q-USE-1 grün.

## 2026-10-27 – TASK-01: Venues recherchieren und erfassen
- **Status:** Umgesetzt (mit Einschränkungen)
- **Änderungen:** 20 Venues per Web-Recherche (Subagent), Status `recherchiert`; übrige Dateien leere Listen. Aachen und Bochum fehlen. Nicht erfasst: Fotobezug von Moyland ist schwach.
- **Dateien:** `data/venues.json`, `data/{exhibitions,events,organizers,photographers,posts}.json`
- **Prüfung:** Validator grün. **Nicht geprüft:** Inhaltliche Richtigkeit, Adressen und Koordinaten (Nominatim), siehe Prüfpaket.

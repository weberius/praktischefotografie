# Changelog: SERVICE-22-STORY-02 – Veranstaltungen aller Orte aktualisieren

## 2026-11-10 – TASK-01: Bericht je Ort

- **Status:** Umgesetzt
- **Änderungen:** `buildEventsReport`/`writeEventsReport` und `--events` für `data:report`. Der Lauf über alle Orte nutzt `resolveEventVenues` ohne `--venue` (STORY-01-TASK-01).
- **Dateien:** `scripts/scrape/lib/report.mjs`, `scripts/scrape/report.mjs`, `test/scrape/veranstaltungen-recherche.test.mjs`
- **Prüfung:** Berichtstest (VRS-EV-2, VRS-UN-2) grün; Gesamt-Gate grün. **Nicht geprüft:** ein vollständiger Lauf über alle 24 Orte gegen das echte Netz; Ausfalltoleranz über den vorhandenen Fetcher-Test (FET-UN-1), nicht über einen eigenen Mehrorte-Test.

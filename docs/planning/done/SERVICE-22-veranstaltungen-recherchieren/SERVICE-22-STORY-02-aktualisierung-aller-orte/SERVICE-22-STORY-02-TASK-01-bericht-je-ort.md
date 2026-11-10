# SERVICE-22-STORY-02-TASK-01 – Bericht je Ort und Ausfalltoleranz

- **Story:** SERVICE-22-STORY-02
- **Spezifikation:** VRS-EV-2, VRS-UN-2, Q-REL-3
- **Prüfkriterium:** `data:report -- --events` schreibt `updates/<Datum>/events/REPORT.md` mit je Ort Seiten, Vorschlägen, verworfenen Vorschlägen samt Grund und einer Liste nicht erreichbarer/gesperrter Orte; Ausfall eines Ortes stoppt den Lauf nicht (vorhandene Abruflogik, FET-UN-1).
- **Dateien:** `scripts/scrape/lib/report.mjs`, `scripts/scrape/report.mjs`
- **Status:** Umgesetzt

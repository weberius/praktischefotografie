# SERVICE-22-STORY-01-TASK-01 – Abrufmodus `--events`

- **Story:** SERVICE-22-STORY-01
- **Spezifikation:** VRS-OP-1, VRS-UN-1, VRS-EV-1, Q-SEC-12, ADR-026
- **Prüfkriterium:** `fetchVenues(..., { events: true })` ruft bis zu 10 Seiten mit Veranstaltungslinks zuerst ab, Standard bleibt bei 6; `--venue` mit Veranstalter- oder unbekannter ID bricht mit Liste der Orts-IDs ab; Zusammenfassung unter `updates/<Datum>/events/`.
- **Dateien:** `scripts/scrape/lib/fetcher.mjs`, `scripts/scrape/lib/common.mjs`, `scripts/scrape/fetch-venues.mjs`
- **Status:** Umgesetzt

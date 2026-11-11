# SERVICE-26-STORY-01-TASK-02 – Vorschlagsprüfung für Uhrzeiten und `op: "update"`

- **Story:** SERVICE-26-STORY-01
- **Spezifikation:** VRS-UB-8, VRS-UB-9, VRS-UB-10, VRS-EV-3, VRS-UN-3, OPN-UB-9, OPN-UN-3, Q-DATA-20, Q-DATA-12, ADR-027, ADR-007, ADR-026
- **Prüfkriterium:** Neue Events und Terminevents mit Zeitfeldern werden nur akzeptiert, wenn der Textauszug die Uhrzeit nennt („Uhrzeit nicht belegt“ sonst); `op: "update"` ergänzt im Veranstaltungsmodus nur fehlende `startTime`/`endTime`/`timeZone` eines Bestandsevents (Titel und Datum im Auszug belegt), nie vorhandene Werte oder andere Felder; `data:apply` übernimmt sie mit Freigabe; Tests in `test/scrape/`.
- **Dateien:** `scripts/scrape/lib/proposals.mjs`, `scripts/scrape/lib/termine.mjs`, `test/scrape/veranstaltungen-recherche.test.mjs`, `test/scrape/termine.test.mjs`
- **Status:** Umgesetzt

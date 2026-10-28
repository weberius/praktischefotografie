# SERVICE-05-STORY-01-TASK-02 – Validator, Verweise und Build-Synchronisation
- **Story:** STORY-01
- **EARS:** FES-UN-1, FES-UN-2, FES-UN-3, FES-UB-3, FES-OP-1, FES-UB-4
- **Gherkin:** `content/festivals.feature` · alle Szenarien zu Zeitraum, Verweisen, Partnerkennzeichnung, doppelter ID und Build
- **Quality:** Q-DATA-5, Q-DATA-1
- **ADR:** ADR-009, ADR-010
- **Aufgabe:** `validate-data.mjs` und `web/tools/sync-data.mjs`: Datensatz `festivals`, `festivalId` auf Festivals, Zeitraum und `organizerId`, Partner nur mit Festival, ID-Kollision Ort/Veranstalter; Testhilfen anpassen.
- **Prüfkriterium:** Node-Tests grün; `npm run validate:data` grün; Daten werden nach `web/public/data/festivals.json` synchronisiert.

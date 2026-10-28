# SERVICE-05-STORY-04-TASK-01 – Veranstalter als Quellen abrufen
- **Story:** STORY-04
- **EARS:** FET-OP-2, UPD-OP-2, UPD-UN-2
- **Gherkin:** `setup/webseiten-abruf.feature` · Abruf der Website eines Veranstalters; `setup/datenaktualisierung.feature` · Einzelner Veranstalter
- **Quality:** Q-SEC-4, Q-MAIN-2
- **ADR:** ADR-010, ADR-006
- **Aufgabe:** `common.mjs` (Quellen, `resolveSources`), `fetch-venues`, `check-proposals`, `apply-proposals`, Bericht: Orte und Veranstalter mit `website`; `--venue` nimmt beide.
- **Prüfkriterium:** Node-Tests mit Testserver grün.

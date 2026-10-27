# SERVICE-03-STORY-03-TASK-01 – Übernahme mit Freigabe und Rollback
- **Story:** STORY-03
- **EARS:** UPD-UB-3, UPD-EV-2, UPD-UB-4, UPD-UN-1
- **Gherkin:** `setup/datenaktualisierung.feature` · „Keine Überschreibung ohne Freigabe“, „Freigegebene Vorschläge werden übernommen“, „Verifizierte Orte bleiben geschützt“, „Übernahme wird zurückgerollt“
- **Quality:** Q-DATA-3, Q-DATA-1
- **ADR:** ADR-007
- **Aufgabe:** `lib/proposals.mjs` (`applyProposals`): nur `approved`, Quelle und Prüfdatum, Status unverändert, Konflikte überspringen, Validierung vor dem Schreiben; CLI `apply-proposals.mjs`.
- **Prüfkriterium:** Node-Tests grün.

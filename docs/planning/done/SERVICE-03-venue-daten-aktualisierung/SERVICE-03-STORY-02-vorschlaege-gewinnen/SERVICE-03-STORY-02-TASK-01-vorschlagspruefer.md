# SERVICE-03-STORY-02-TASK-01 – Vorschlagsformat und Prüfer
- **Story:** STORY-02
- **EARS:** UPD-EV-1, UPD-UB-1, UPD-UB-2, UPD-UB-4
- **Gherkin:** `setup/datenaktualisierung.feature` · „Vorschlagsdatei wird erzeugt“, „Nur schemakonforme Vorschläge“, „Vorschlag ohne Fundstelle“, „Verifizierte Orte bleiben geschützt“
- **Quality:** Q-DATA-1, Q-DATA-3
- **ADR:** ADR-007
- **Aufgabe:** `lib/proposals.mjs` (`checkProposals`): Format laut `updates/README.md`, Schemaprüfung je Änderung, Fundstelle im Snapshot, Wert im Textauszug, Art „ergänzt“/„geändert“, Konfliktkennzeichnung; CLI `check-proposals.mjs`.
- **Prüfkriterium:** Node-Tests grün.

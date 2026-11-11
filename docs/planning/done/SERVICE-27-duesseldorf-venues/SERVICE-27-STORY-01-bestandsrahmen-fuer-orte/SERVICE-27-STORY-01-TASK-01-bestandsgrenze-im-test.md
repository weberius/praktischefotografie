# SERVICE-27-STORY-01-TASK-01 – Bestandsgrenze im Test auf 20 bis 60 setzen

- **Status:** Umgesetzt
- **Story:** [SERVICE-27-STORY-01](SERVICE-27-STORY-01-bestandsrahmen-fuer-orte.md)
- **Spezifikation:** VEN-UB-8, Q-DATA-21, Gherkin „Datenbestand enthält 20 bis 60 Venues“

## Aufgabe
Der Test „20 bis 30 Venues (VEN-UB-1)“ in `test/bestand.test.mjs` wird durch einen Test mit der Grenze 20 bis 60 (VEN-UB-8, Q-DATA-21) ersetzt.

## Prüfkriterium
`npm test` ist grün; der Test schlägt bei 19 oder 61 Venues fehl (Grenzfälle aus Q-DATA-21).

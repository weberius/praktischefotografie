# SERVICE-28-STORY-01-TASK-01 – Off-Spaces und Kulturorte erfassen

- **Status:** Umgesetzt
- **Story:** [SERVICE-28-STORY-01](SERVICE-28-STORY-01-dortmunder-off-spaces-und-kulturorte.md)
- **Spezifikation:** VEN-UB-12, VEN-UB-5, Q-DATA-2, Q-DATA-23, Gherkin „Dortmunder Orte sind im Katalog“ und „liegen in Dortmund“

## Aufgabe
`projektraum-fotografie-dortmund` und `kulturort-depot-dortmund` (Typ `off_space`) in `data/venues.json` aufnehmen: Anschrift, Koordinaten, Website, Quelle, `checkedAt`, Status `recherchiert`. Test für die Dortmunder Orte in `test/bestand.test.mjs`.

## Prüfkriterium
`npm run validate:data` und `npm test` grün.

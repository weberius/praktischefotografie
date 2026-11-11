# SERVICE-28-STORY-02-TASK-01 – Kunsthalle und Hochschule erfassen

- **Status:** Umgesetzt
- **Story:** [SERVICE-28-STORY-02](SERVICE-28-STORY-02-dortmunder-ausstellungshaeuser-und-hochschule.md)
- **Spezifikation:** VEN-UB-13, VEN-UB-14, VEN-UB-5, Q-DATA-2, Q-DATA-23, Gherkin „Dortmunder Orte sind im Katalog“ und „liegen in Dortmund“

## Aufgabe
`kunsthalle-dortmund` (Typ `gallery`, ehemals HMKV) und `fh-dortmund-design-dortmund` (Typ `foundation`) in `data/venues.json` aufnehmen: Anschrift, Koordinaten, Website, Quelle, `checkedAt`, Status `recherchiert`. Museum Ostwall unverändert.

## Prüfkriterium
`npm run validate:data` und `npm test` grün.

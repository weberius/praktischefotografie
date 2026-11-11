# SERVICE-29-STORY-01-TASK-01 – Folkwang Universität erfassen

- **Status:** Umgesetzt
- **Story:** [SERVICE-29-STORY-01](SERVICE-29-STORY-01-folkwang-universitaet-im-ortskatalog.md)
- **Spezifikation:** VEN-UB-15, VEN-UB-16, VEN-UB-5, Q-DATA-2, Q-DATA-24, Gherkin „Essener Orte sind im Katalog“ und „Essener Orte liegen in Essen“

## Aufgabe
`folkwang-universitaet-der-kuenste-essen` (Typ `foundation`) in `data/venues.json` aufnehmen: Anschrift, Koordinaten, Website, Quelle, `checkedAt`, Status `recherchiert`. Test in `test/bestand.test.mjs`. Museum Folkwang und Ruhr Museum unverändert.

## Prüfkriterium
`npm run validate:data` und `npm test` grün.

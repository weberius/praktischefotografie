# SERVICE-30-STORY-01-TASK-01 – Weitere NRW-Orte erfassen

- **Status:** Umgesetzt
- **Story:** [SERVICE-30-STORY-01](SERVICE-30-STORY-01-weitere-nrw-orte-im-ortskatalog.md)
- **Spezifikation:** VEN-UB-17, VEN-UB-18, VEN-UB-19, VEN-UB-5, Q-DATA-2, Q-DATA-25, Gherkin „Weitere NRW-Orte sind im Katalog“ und „Weitere NRW-Orte liegen in ihrer Stadt“

## Aufgabe
Die sechs Orte (`japanisches-kulturinstitut-koeln`, `gasometer-oberhausen`, `camera-obscura-muelheim-an-der-ruhr`, `von-der-heydt-museum-wuppertal`, `kunstmuseen-krefeld`, `lwl-museum-fuer-kunst-und-kultur-muenster`) in `data/venues.json` aufnehmen: Anschrift, Koordinaten, Website, Quelle, `checkedAt`, Status `recherchiert`. Test in `test/bestand.test.mjs`.

## Prüfkriterium
`npm run validate:data` und `npm test` grün.

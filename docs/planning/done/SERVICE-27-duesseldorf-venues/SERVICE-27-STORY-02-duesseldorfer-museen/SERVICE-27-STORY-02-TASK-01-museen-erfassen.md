# SERVICE-27-STORY-02-TASK-01 – Düsseldorfer Museen erfassen

- **Status:** Umgesetzt
- **Story:** [SERVICE-27-STORY-02](SERVICE-27-STORY-02-duesseldorfer-museen.md)
- **Spezifikation:** VEN-UB-9, VEN-UB-5, Q-DATA-2, Q-DATA-22, Gherkin „Düsseldorfer Orte sind im Katalog“ und „liegen in Düsseldorf“

## Aufgabe
`k20-duesseldorf`, `k21-duesseldorf`, `stadtmuseum-duesseldorf`, `filmmuseum-duesseldorf` (Typ `museum`) in `data/venues.json` aufnehmen: Anschrift, Koordinaten, Website, Quelle (Belegseite), `checkedAt`, Status `recherchiert`; Besonderheiten nur mit Beleg. Test für die Düsseldorfer Orte in `test/bestand.test.mjs`.

## Prüfkriterium
`npm run validate:data` und `npm test` grün.

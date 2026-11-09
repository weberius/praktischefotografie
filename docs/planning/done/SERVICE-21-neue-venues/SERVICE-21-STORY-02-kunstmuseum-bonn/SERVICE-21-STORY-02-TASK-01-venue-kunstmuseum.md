# SERVICE-21-STORY-02-TASK-01 – Venue Kunstmuseum Bonn erfassen

**Story:** SERVICE-21-STORY-02  ·  **Status:** Umgesetzt

## Aufgabe
Eintrag `kunstmuseum-bonn` (Typ `museum`, Helmut-Kohl-Allee 2, 53113 Bonn, Website, Besonderheiten, `source` mit Fotografiebezug) in `data/venues.json` ergänzen.

## Spezifikation
- EARS: VEN-UB-7, VEN-UB-1 bis VEN-UB-3, VEN-UB-5
- Gherkin: `content/daten.feature` · „Neue Venues sind im Katalog“
- Quality: Q-DATA-1, Q-DATA-2
- ADR: nicht erforderlich; ADR-001

## Prüfkriterium
`npm run validate:data` ohne Fehler; Bestand 24 Venues.

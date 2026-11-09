# SERVICE-21-STORY-01-TASK-01 – Venue Forum für Fotografie Köln erfassen

**Story:** SERVICE-21-STORY-01  ·  **Status:** Umgesetzt

## Aufgabe
Eintrag `forum-fuer-fotografie-koeln` (Typ `gallery`, Schönhauser Straße 8, 50968 Köln, Website, Besonderheiten, `source`) in `data/venues.json` ergänzen; Angaben aus der Website recherchieren.

## Spezifikation
- EARS: VEN-UB-6, VEN-UB-1 bis VEN-UB-3, VEN-UB-5
- Gherkin: `content/daten.feature` · „Neue Venues sind im Katalog“
- Quality: Q-DATA-1, Q-DATA-2
- ADR: nicht erforderlich; ADR-001

## Prüfkriterium
`npm run validate:data` ohne Fehler; Eintrag mit Quelle, Prüfdatum und Status `recherchiert`.

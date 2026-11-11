# SERVICE-27-STORY-04-TASK-01 – Düsseldorfer Off-Spaces und Institute erfassen

- **Status:** Umgesetzt
- **Story:** [SERVICE-27-STORY-04](SERVICE-27-STORY-04-duesseldorfer-off-spaces-und-institute.md)
- **Spezifikation:** VEN-UB-11, VEN-UB-5, Q-DATA-2, Q-DATA-22

## Aufgabe
`sammlung-philara-duesseldorf`, `plan-d-produzentengalerie-duesseldorf` (Typ `off_space`), `gerhart-hauptmann-haus-duesseldorf`, `polnisches-institut-duesseldorf` (Typ `foundation`) in `data/venues.json` aufnehmen. Bibliothek nur mit Beleg (`hasReferenceLibrary` + `libraryNotes`).

## Prüfkriterium
`npm run validate:data` und `npm test` grün.

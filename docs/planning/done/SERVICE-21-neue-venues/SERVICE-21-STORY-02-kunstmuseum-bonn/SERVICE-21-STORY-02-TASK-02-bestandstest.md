# SERVICE-21-STORY-02-TASK-02 – Test „Neue Venues sind im Katalog“

**Story:** SERVICE-21-STORY-02 (deckt auch STORY-01)  ·  **Status:** Umgesetzt

## Aufgabe
Szenario in `test/bestand.test.mjs` als Test umsetzen (beide Venues).

## Spezifikation
- EARS: VEN-UB-6, VEN-UB-7
- Gherkin: `content/daten.feature` · „Neue Venues sind im Katalog“
- Quality: Q-DATA-1, Q-DATA-2
- ADR: nicht erforderlich

## Prüfkriterium
`npm test` grün; der Test schlägt ohne die Einträge fehl.

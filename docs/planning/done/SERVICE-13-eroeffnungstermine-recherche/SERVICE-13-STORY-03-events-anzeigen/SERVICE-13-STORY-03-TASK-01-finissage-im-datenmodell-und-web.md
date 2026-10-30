# SERVICE-13-STORY-03-TASK-01-finissage-im-datenmodell-und-web – Typ Finissage in Schema und Webanwendung

**Story:** SERVICE-13-STORY-03  ·  **Status:** Umgesetzt
**EARS:** DAT-UB-7, EVT-UB-5
**Gherkin:** content/daten.feature · Event-Typ Finissage ist gültig; web/events.feature · Vernissage und Finissage in der Liste / filterbar
**Quality:** Q-DATA-1, Q-USE-4
**ADR:** ADR-001, ADR-002

## Vorgehen
- `schema/events.schema.json`: Wert `finissage` im Enum.
- `web/src/app/core/models.ts`: `EventType` und `EVENT_TYPE_LABEL` („Finissage“; Reihenfolge Vernissage, Finissage).
- `event-list.ts`: Meta-Beschreibung nennt Finissagen.
- Tests: Schema-Test (gültig/ungültig), Web-Test für Liste, Detail und Filter; `test-data.ts` um Vernissage und Finissage ergänzen.

## Prüfkriterium
Beide Gherkin-Szenarien der Webanwendung und das Schema-Szenario laufen als Tests grün; bestehende Events-Tests unverändert grün; Prüf-Gate grün.

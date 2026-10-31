# SERVICE-15-STORY-02-TASK-02 – Webkurztext prüfen und übernehmen

**Story:** SERVICE-15-STORY-02  ·  **Status:** Umgesetzt
**EARS:** WSP-EV-3, WSP-UB-4, WSP-UB-5, WSP-UB-6, WSP-EV-2
**Gherkin:** Neue Ergebnisse fließen in den Kurztext · Keine neuen Links, kein neuer Kurztext · Webkurztext wird geprüft · Bilder nur von Commons · Übernahme nach Freigabe
**Quality:** Q-DATA-15, Q-SEC-7, Q-DATA-1
**ADR:** ADR-019

## Vorgehen
- `checkWebProposal`/`checkWebFile` und `applyWebFile` (Freigabe, `--force`, Rücknahme bei Validierungsfehler, neue Person) in `websearch.mjs`; Befehle `check`, `apply`.

## Prüfkriterium
Tests zu den Szenarien (≥ 6 ungültige Fixtures) grün. Prüf-Gate grün.

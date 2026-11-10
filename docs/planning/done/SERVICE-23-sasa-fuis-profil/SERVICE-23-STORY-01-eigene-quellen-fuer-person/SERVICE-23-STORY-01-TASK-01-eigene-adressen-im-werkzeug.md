# SERVICE-23-STORY-01-TASK-01 – Eigene Adressen in Plan, Linksammlung, Abruf und Bericht

**Story:** SERVICE-23-STORY-01  ·  **Status:** Umgesetzt
**EARS:** PQL-UB-1, PQL-EV-1, PQL-UB-2, PQL-UN-1, PQL-EV-2
**Gherkin:** alle fünf Szenarien von `setup/personen-quellen.feature`
**Quality:** Q-SEC-13, Q-DATA-18
**ADR:** ADR-019, ADR-006

## Vorgehen
- `plan --url … [--no-web]`, `classifyOwnUrls`, Übernahme vor der Suche in `ingestSearch`, Ergebnis je Adresse und Seitentitel nach `fetchPages`, Berichtszeilen in `webreport.mjs`.

## Prüfkriterium
Tests zu den fünf Szenarien grün, ohne Netzzugang. Prüf-Gate grün.

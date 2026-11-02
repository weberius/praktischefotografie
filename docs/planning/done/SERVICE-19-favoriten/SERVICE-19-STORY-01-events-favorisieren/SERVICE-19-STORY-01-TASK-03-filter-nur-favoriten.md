# SERVICE-19-STORY-01-TASK-03 – Filter „Nur Favoriten“

**Story:** SERVICE-19-STORY-01  ·  **Status:** Umgesetzt
**EARS:** FAV-UB-4, FAV-ST-1
**Gherkin:** `web/favoriten.feature` · Eventliste nur mit Favoriten, Keine Favoriten
**Quality:** Q-USE-17
**ADR:** ADR-023
**Abhängig von:** TASK-01

## Vorgehen
- `event-list`: Kontrollkästchen „Nur Favoriten“ (Zustand als Komponentensignal, nicht in der Adresse), kombinierbar mit dem Typfilter; Hinweis „Keine Favoriten“ bei leerem Ergebnis.

## Prüfkriterium
Komponententests: nur Favoriten, Kombination mit Typfilter, Hinweis ohne Favoriten. Prüf-Gate grün.

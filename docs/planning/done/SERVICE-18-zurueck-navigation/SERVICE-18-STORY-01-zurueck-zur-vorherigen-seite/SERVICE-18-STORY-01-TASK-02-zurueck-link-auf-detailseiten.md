# SERVICE-18-STORY-01-TASK-02 – Gemeinsamer Zurück-Link auf den sieben Detailseiten

**Story:** SERVICE-18-STORY-01  ·  **Status:** Umgesetzt
**EARS:** NAV-UB-9, NAV-ST-1
**Gherkin:** `web/navigation.feature` · Zurück-Link auf jeder Detailseite, Kein Zurück-Link auf Übersichtsseiten
**Quality:** Q-USE-16, Q-USE-3 (Ergänzung), Q-USE-2
**ADR:** ADR-022

## Vorgehen
- `shared/back-link/back-link.ts`: Komponente `app-back-link` (echter `<a>`, Text „‹ Zurück zu <Ziel>“, Fallback je Seitentyp). Einbau als erstes Element in den sieben Detailseiten; der Sonderlink auf `/photographers/:id` entfällt.

## Prüfkriterium
`back-link.spec.ts` (7 Detailseiten, 6 Übersichts- und Hinweisseiten, Verlauf) grün; Prüf-Gate grün.

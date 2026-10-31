# SERVICE-15-STORY-03-TASK-01 – Abschnitt „Aus dem Web“ auf der Personenseite

**Story:** SERVICE-15-STORY-03  ·  **Status:** Umgesetzt
**EARS:** PHO-UB-11, PHO-ST-3
**Gherkin:** Webkurztext mit Quellen · Person ohne Webkurztext · Person ohne Portrait und Wikipedia
**Quality:** Q-USE-5, Q-SEC-2
**ADR:** ADR-019

## Vorgehen
- `models.ts` (`web`), `photographer-detail.html/.ts` (Abschnitt, Link mit Titel und Host, `rel="noopener noreferrer"`), `test-data.ts`, Spec.

## Prüfkriterium
Web-Tests grün; keine Anfrage an fremde Hosts beim Laden. Prüf-Gate grün.

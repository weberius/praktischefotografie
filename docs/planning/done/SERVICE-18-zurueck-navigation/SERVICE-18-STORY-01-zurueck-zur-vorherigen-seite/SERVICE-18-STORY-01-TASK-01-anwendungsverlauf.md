# SERVICE-18-STORY-01-TASK-01 – Anwendungsverlauf (NavHistory)

**Story:** SERVICE-18-STORY-01  ·  **Status:** Umgesetzt
**EARS:** NAV-EV-2, NAV-ST-1
**Gherkin:** `web/navigation.feature` · Zurück zur vorherigen Seite, Zurück bei Direktaufruf
**Quality:** Q-USE-16
**ADR:** ADR-022

## Vorgehen
- `core/nav-history.ts`: Dienst, der per `NavigationEnd` die vorherige Seite (ohne Persistenz) merkt; liefert sie als `UrlTree` bzw. Pfad oder `null`.

## Prüfkriterium
Getestet über die Szenarien in `back-link.spec.ts` (mit und ohne vorherige Seite); Prüf-Gate grün.

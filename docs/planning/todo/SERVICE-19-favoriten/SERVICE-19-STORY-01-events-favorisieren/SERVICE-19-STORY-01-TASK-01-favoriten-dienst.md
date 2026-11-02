# SERVICE-19-STORY-01-TASK-01 – Favoriten-Dienst

**Story:** SERVICE-19-STORY-01  ·  **Status:** Umgesetzt
**EARS:** FAV-EV-1, FAV-UB-2, FAV-UB-3
**Gherkin:** `web/favoriten.feature` · Markieren und Aufheben, Zustand gilt über Seiten hinweg, Neuladen entfernt Favoriten
**Quality:** Q-SEC-10
**ADR:** ADR-023

## Vorgehen
- `core/favorites.ts`: Dienst der Wurzel mit Signal der Event-IDs (`isFavorite`, `toggle`, `count`); kein Web-Speicher, keine Cookies, keine Netzanfrage.

## Prüfkriterium
Unit-Test: Markieren, Aufheben, Zustand über Seiten; überwachter `fetch`/XHR/Web-Speicher/Cookie bleibt unberührt; neue Anwendungsinstanz startet leer. Prüf-Gate grün.

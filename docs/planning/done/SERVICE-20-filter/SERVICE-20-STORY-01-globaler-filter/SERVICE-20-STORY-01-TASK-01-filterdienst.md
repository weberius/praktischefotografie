# SERVICE-20-STORY-01-TASK-01 – Filterdienst

**Story:** SERVICE-20-STORY-01  ·  **Status:** Umgesetzt
**EARS:** FLT-UB-1, FLT-UB-3, FLT-UB-6, FLT-UB-7, FLT-UN-1
**Gherkin:** `web/filter.feature` · Orte und Typen kombinieren, Filter bleibt beim Seitenwechsel, Neuladen setzt den Filter zurück, Einträge ohne bekannten Ort, Auswahl aus den Daten
**Quality:** Q-SEC-11
**ADR:** ADR-025

## Vorgehen
- `core/global-filter.ts`: Wurzeldienst mit Signalen für Orte und Ortstypen (`toggleVenue`, `toggleType`, `reset`, `active`, `allows(venue | undefined)`); kein Web-Speicher, keine Cookies, keine Netzanfrage.
- `core/venue-filter.ts`: Filter Stadt, Typ, Bibliothek, Sammlung und Adress-Parameter dafür entfernen; `organizer`/`festival` bleiben.

## Prüfkriterium
Unit-Test: UND/ODER-Logik, leer = alles, unbekannter Ort wird bei gesetztem Filter abgewiesen; Speicher, Cookies und Netz unberührt; neue Anwendungsinstanz startet leer. Prüf-Gate grün.

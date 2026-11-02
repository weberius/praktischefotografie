# SERVICE-20-STORY-01-TASK-03 – Orte und Karte umstellen

**Story:** SERVICE-20-STORY-01  ·  **Status:** Umgesetzt
**EARS:** FLT-UB-2, FLT-UB-5, FLT-ST-1, MAP-UB-14, MAP-UB-15 (ersetzen MAP-UB-2, MAP-UB-4, MAP-EV-1, MAP-UN-1, MAP-UB-8, VNU-UB-2)
**Gherkin:** `web/filter.feature` · Filter gilt auf allen filterbaren Seiten, Kein Treffer; `web/karte.feature` · Veranstalter- und Festivalfilter aus der Adresse, Link zur Ortsliste mit Filtern
**Quality:** Q-USE-18, Q-USE-3
**ADR:** ADR-025

## Vorgehen
- `venue-list` und `map`: Auswahlen Stadt, Typ, Bibliothek, Sammlung entfernen, `app-global-filter` einbinden, globalen Filter anwenden; Veranstalter-/Festivalfilter per Adresse bleiben; Hinweis bei leerem Ergebnis mit Zurücksetzen.
- Tests zu den entfernten Filtern ersetzen.

## Prüfkriterium
Komponententests der Seiten; Prüf-Gate grün.

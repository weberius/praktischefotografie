# SERVICE-20-STORY-01-TASK-04 – Agenda, Ausstellungen und Events filtern

**Story:** SERVICE-20-STORY-01  ·  **Status:** Umgesetzt
**EARS:** FLT-UB-2, FLT-UB-3, FLT-UB-5, FLT-ST-1, FLT-UN-1
**Gherkin:** `web/filter.feature` · Filter gilt auf allen filterbaren Seiten, Filter bleibt beim Seitenwechsel, Globaler und lokaler Filter wirken gemeinsam, Kein Treffer, Einträge ohne bekannten Ort
**Quality:** Q-USE-18
**ADR:** ADR-025

## Vorgehen
- `calendar`, `exhibition-list`, `event-list`: `app-global-filter` einbinden und Einträge über `venueId` filtern (`AgendaItem` erhält `venueId`); Hinweis mit Zurücksetzen, wenn der Filter alles ausblendet.

## Prüfkriterium
Komponententests je Seite inkl. Zustand über Seitenwechsel, Kombination mit lokalem Filter und unbekanntem Ort; axe-Lauf. Prüf-Gate grün.

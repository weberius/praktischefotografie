# SERVICE-24-STORY-01-TASK-01 – Eventliste nur mit aktuellen Events

**Story:** SERVICE-24-STORY-01  ·  **Status:** Umgesetzt
**EARS:** ACT-UB-1, ACT-ST-1, ACT-UB-3 (Detailseite unverändert)
**Gherkin:** `web/aktualitaet.feature` · Listen zeigen nur Aktuelles, Keine aktuellen Einträge, Detailseite beendeter Einträge
**Quality:** Q-REL-4, Q-USE-4  ·  **ADR:** ADR-002

## Vorgehen
`event-list` filtert Events mit `isOver` heraus (gleiche Regel wie die Ausstellungen); „Beendet“-Badge der Liste entfällt; Tests anpassen.

## Prüfkriterium
Komponententest mit Grenzfällen gestern/heute; Hinweis ohne aktuelle Events; Prüf-Gate grün.

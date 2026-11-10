# SERVICE-24-STORY-01-TASK-02 – Ausstellungsliste nur mit aktuellen Ausstellungen

**Story:** SERVICE-24-STORY-01  ·  **Status:** Umgesetzt
**EARS:** ACT-UB-1, ACT-UB-2, ACT-UN-1, ACT-ST-1
**Gherkin:** `web/aktualitaet.feature` · Statusfilter ohne Beendet, Statuswert beendet in der Adresse; `web/ausstellungen.feature` · Liste ist nach Status filterbar
**Quality:** Q-REL-4  ·  **ADR:** ADR-002

## Vorgehen
`exhibition-list`: Status „beendet“ ausblenden und aus dem Statusfilter nehmen; `?status=beendet` gilt als unbekannt; Tests anpassen.

## Prüfkriterium
Komponententests (Optionen, Adresse, Liste); Prüf-Gate grün.

# SERVICE-01-STORY-03 – Datenintegrität absichern

**Als** Redakteur:in **möchte ich** dass kaputte Verweise, doppelte IDs, unmögliche Datumsangaben und Orte außerhalb NRW automatisch auffallen **damit** die spätere Anwendung nicht auf fehlerhaften Verknüpfungen aufbaut.

## Akzeptanzkriterien
1. Verweise zwischen Datensätzen auf nicht vorhandene Ziele werden gemeldet.
2. Doppelte IDs, ein Ende vor dem Beginn und Orte außerhalb NRW werden gemeldet.
3. Die Regeln für die Datenpflege sind für Redakteur:innen nachlesbar.

## Abhängigkeiten
STORY-01.

## Spezifikation (Phase 3)
- EARS: VAL-UN-2 bis VAL-UN-5, DAT-UN-1, VEN-UB-2, VEN-UB-3
- Gherkin: `setup/datenvalidierung.feature`, `content/daten.feature`
- Quality: Q-DATA-1, Q-PERF-1
- ADR: ADR-001

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

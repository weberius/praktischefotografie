# SERVICE-01-STORY-01 – Datenmodell und Validierung

**Als** Redakteur:in **möchte ich** ein verbindliches, geprüftes Datenmodell für Orte, Ausstellungen, Events, Organizer, Fotograf:innen und Beiträge **damit** ich Inhalte pflegen kann, ohne unbemerkt unvollständige oder fehlerhafte Datensätze zu erzeugen.

## Akzeptanzkriterien
1. Für jeden Datensatztyp ist beschrieben und prüfbar, welche Angaben Pflicht sind und welche Werte zulässig sind.
2. Ein Aufruf zeigt, ob alle Daten gültig sind, und nennt bei Fehlern Datei, Datensatz und Grund.
3. Die Prüfung verlässt den Rechner nicht.

## Abhängigkeiten
Keine.

## Spezifikation (Phase 3)
- EARS: DAT-UB-1 bis DAT-UB-4, DAT-OP-1, DAT-UN-1, VAL-EV-1, VAL-EV-2, VAL-UN-1, VAL-UB-1
- Gherkin: `content/daten.feature`, `setup/datenvalidierung.feature`
- Quality: Q-DATA-1, Q-PERF-2, Q-SEC-1, Q-USE-1
- ADR: ADR-001

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

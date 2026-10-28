# SERVICE-06-STORY-01-TASK-01 – Validator: Namen in der Beschreibung, doppelte Namen
- **Story:** STORY-01
- **EARS:** PRF-UB-4, PRF-UN-2
- **Gherkin:** `content/fotografinnen-profile.feature` · Beschreibung nennt alle Fotograf:innen, Beschreibung ohne Namen, Doppelter Name
- **Quality:** Q-DATA-9
- **ADR:** ADR-011
- **Aufgabe:** `validate-data.mjs`: Fehler, wenn die `description` einer Ausstellung mit `photographerIds` fehlt oder einen Namen nicht nennt; doppelte Namen.
- **Prüfkriterium:** Node-Tests grün.

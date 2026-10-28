# SERVICE-05-STORY-01-TASK-01 – Schemas und leere Festivaldatei
- **Story:** STORY-01
- **EARS:** FES-UB-1, FES-UB-2, FES-OP-1
- **Gherkin:** `content/festivals.feature` · Veranstalter mit Kurzbeschreibung, Festival ist vollständig
- **Quality:** Q-DATA-5
- **ADR:** ADR-009
- **Aufgabe:** `schema/festivals.schema.json` anlegen, `organizers.schema.json` um `shortName`, `description`, `social.instagram` und `exhibitions.schema.json` um `isOfficialFestivalPartner` erweitern, `data/festivals.json` als leere Liste anlegen.
- **Prüfkriterium:** Schema-Tests mit gültigen und ungültigen Fixtures grün.

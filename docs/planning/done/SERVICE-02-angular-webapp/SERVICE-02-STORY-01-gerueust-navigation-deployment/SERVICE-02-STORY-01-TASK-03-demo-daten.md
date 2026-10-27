# SERVICE-02-STORY-01-TASK-03 – Demo-Daten erstellen
- **Story:** STORY-01
- **EARS:** BLD-UB-4
- **Gherkin:** `setup/web-build.feature` · „Demo-Datensätze sind gekennzeichnet“
- **Quality:** Q-DATA-1
- **ADR:** ADR-005
- **Aufgabe:** `demo/data/*.json` und `demo/content/posts/*.md`: ≥ 6 Beiträge (davon einer mit Zukunftsdatum, einer mit fehlender Textdatei nicht, ein XSS-Beispiel nur in Tests), ≥ 8 Ausstellungen in allen Status relativ zum Datum der Erstellung, ≥ 5 Events (kommerziell und nicht, vergangen), ≥ 6 Fotograf:innen, 2 Veranstalter; Verweise auf echte Venues.
- **Prüfkriterium:** Validator grün auf dem zusammengeführten Demo-Set; alle Ids `demo-…`, Titel „[Demo] …“.

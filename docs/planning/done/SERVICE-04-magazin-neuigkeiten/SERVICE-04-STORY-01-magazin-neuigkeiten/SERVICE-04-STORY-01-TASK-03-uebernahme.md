# SERVICE-04-STORY-01-TASK-03 – Übernahme
- **Story:** STORY-01
- **EARS:** NWS-UB-6, NWS-EV-2, NWS-UN-2
- **Gherkin:** `setup/magazin-neuigkeiten.feature` · Freigabe, Beitrag anlegen, Rollback
- **Quality:** Q-DATA-4, Q-DATA-1
- **ADR:** ADR-008
- **Aufgabe:** `news:apply`: freigegebene gültige Einträge nach `posts.json` und `content/posts/`, Validierung, Rollback.
- **Prüfkriterium:** Node-Tests zu Freigabe, Anlegen, Ersetzen und Rollback grün; `npm run validate:data` grün.

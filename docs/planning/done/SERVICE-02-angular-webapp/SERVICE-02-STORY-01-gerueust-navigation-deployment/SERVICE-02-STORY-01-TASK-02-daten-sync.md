# SERVICE-02-STORY-01-TASK-02 – Daten-Sync mit Demo-Modus
- **Story:** STORY-01
- **EARS:** BLD-EV-1, BLD-UN-1, BLD-UB-3, BLD-OP-1, BLD-UB-4
- **Gherkin:** `setup/web-build.feature` · „Build kopiert validierte Daten“, „Build bricht bei ungültigen Daten ab“, „Produktionsbuild ohne Demo-Daten“, „Demo-Modus führt Daten zusammen“, „Demo-Datensätze sind gekennzeichnet“
- **Quality:** Q-DATA-1, Q-SEC-2
- **ADR:** ADR-003, ADR-005
- **Aufgabe:** `web/tools/sync-data.mjs` (`--demo`), Hooks `prestart`/`prebuild`/`pretest`, `.gitignore` für `web/public/data` und `web/public/content`.
- **Prüfkriterium:** Node-Tests zu den fünf Szenarien grün.

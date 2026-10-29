# SERVICE-11-STORY-03-TASK-01 – Postkartenmotiv prüfen und aus dem Build halten
- **Story:** STORY-03
- **EARS:** IMG-UB-1 (Postkarte), IMG-UB-4
- **Gherkin:** `setup/bildmaterial.feature` · Icon und Postkartenmotiv getrennt, Postkarte nicht im Build
- **Quality:** Q-MAIN-5, Q-PERF-4
- **ADR:** ADR-017
- **Aufgabe:** Datei-Test für `docs/resources/postkarte.png` (Querformat, Randpixel nicht weiß, Maße) und dass sie weder in `web/public/` noch im Build-Ausgabeverzeichnis liegt.
- **Prüfkriterium:** Test grün; Sichtprüfung des Zuschnitts; Build, Tests, Lint grün.

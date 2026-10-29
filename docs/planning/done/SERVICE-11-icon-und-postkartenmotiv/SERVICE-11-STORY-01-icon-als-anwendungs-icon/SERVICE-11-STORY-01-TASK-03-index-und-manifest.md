# SERVICE-11-STORY-01-TASK-03 – index.html verlinkt Icons, Web-App-Manifest
- **Story:** STORY-01
- **EARS:** ICO-UB-1, ICO-UB-2, ICO-UB-5
- **Gherkin:** `web/markenicon.feature` · Favicon in jeder Seite, Icon für Startbildschirme, Pfade relativ zum Basispfad
- **Quality:** Q-USE-11, Q-PERF-7
- **ADR:** ADR-017, ADR-003
- **Aufgabe:** `index.html`: Links für `favicon.ico` (32x32), `favicon-96x96.png`, Apple-Touch-Icon, Manifest und `theme-color` (relativ); `web/public/site.webmanifest` mit Name, Kurzname, Farben und den Icons 192/512.
- **Prüfkriterium:** Test: alle Verweise relativ, Zieldateien vorhanden, Manifest gültig (Name, Farben, zwei Icons mit richtigen Größen), im Build-Ausgabeverzeichnis vorhanden; Build, Tests, Lint grün.

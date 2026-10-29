# SERVICE-10-STORY-02-TASK-02 – Marker als Typ-Symbole mit Textalternative
- **Story:** STORY-02
- **EARS:** MAP-UB-10, MAP-UB-12; unverändert MAP-UB-1
- **Gherkin:** `web/karte.feature` · Symbol und Farbe je Typ, Karte zeigt alle Orte
- **Quality:** Q-USE-9, Q-PERF-3
- **ADR:** ADR-016, ADR-004
- **Aufgabe:** Standard-Marker durch `divIcon` mit eingebettetem SVG je Typ ersetzen; Textalternative „Name, Typ“; Popup unverändert; Test zu den Marker-Bildern aus den Assets ersetzen.
- **Prüfkriterium:** Tests: Marker je Typ mit richtiger Form und Farbe, Textalternative, Popup wie bisher, keine Bilddatei-Requests für Marker; Build, Tests, Lint grün.

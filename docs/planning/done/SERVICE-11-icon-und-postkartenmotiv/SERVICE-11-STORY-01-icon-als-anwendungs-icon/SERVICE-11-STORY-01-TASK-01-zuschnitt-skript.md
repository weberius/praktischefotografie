# SERVICE-11-STORY-01-TASK-01 – Zuschnitt: Skript trennt Icon und Postkartenmotiv
- **Story:** STORY-01
- **EARS:** IMG-UB-1, IMG-UB-3 (Teil)
- **Gherkin:** `setup/bildmaterial.feature` · Icon und Postkartenmotiv getrennt
- **Quality:** Q-MAIN-5
- **ADR:** ADR-017
- **Aufgabe:** Node-Skript `web/tools/make-icons.mjs` (playwright-core): findet Icon und Postkarte im Quellbild, schneidet zu (Icon quadratisch mit transparenten Ecken, Postkarte bis zum Kartenrand) und schreibt `docs/resources/icon.png` und `docs/resources/postkarte.png`; klare Meldung bei fehlender Quelle oder fehlendem Browser.
- **Prüfkriterium:** Test mit synthetischem Testbild: zwei getrennte Dateien, Icon quadratisch mit transparenten Ecken, Postkarte im Querformat, keine Reste des jeweils anderen Motivs, kein weißer Rand; Meldung bei fehlender Quelle; Build, Tests, Lint grün.

# SERVICE-11-STORY-01-TASK-04 – Dokumentierter Befehl zum Neuerzeugen
- **Story:** STORY-01
- **EARS:** IMG-UB-3
- **Gherkin:** `setup/bildmaterial.feature` · Befehl erzeugt alle Dateien
- **Quality:** Q-MAIN-5
- **ADR:** ADR-017
- **Aufgabe:** npm-Skript `icons:build` im Wurzel-`package.json`, Abschnitt im README (Quelle, Ausgaben, Voraussetzung Chromium über `CHROME_BIN`).
- **Prüfkriterium:** Skript läuft mit dem echten Quellbild und erzeugt alle Dateien ohne Zwischenschritt; README beschreibt den Befehl; keine neue Abhängigkeit in `web/package.json`; Build, Tests, Lint grün.

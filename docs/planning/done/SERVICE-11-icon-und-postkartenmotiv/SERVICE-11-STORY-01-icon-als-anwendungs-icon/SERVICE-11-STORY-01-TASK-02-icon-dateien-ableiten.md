# SERVICE-11-STORY-01-TASK-02 – Icon-Dateien aus dem Master ableiten
- **Story:** STORY-01
- **EARS:** ICO-UB-1, ICO-UB-2 (Dateien); IMG-UB-2
- **Gherkin:** `web/markenicon.feature` · Icon-Dateien in der geforderten Größe, Favicon enthält drei Größen; `setup/bildmaterial.feature` · Icon-Dateien aus dem Master
- **Quality:** Q-PERF-7, Q-MAIN-5
- **ADR:** ADR-017
- **Aufgabe:** Skript erweitern: `favicon.ico` (16/32/48, PNG-Daten), `favicon-96x96.png`, `apple-touch-icon.png` (180), `web-app-manifest-192x192.png`, `web-app-manifest-512x512.png` nach `web/public/` schreiben (Verkleinern in Stufen); Skript ausführen und Ergebnis einchecken; altes `favicon.ico` ersetzen.
- **Prüfkriterium:** Datei-Test: fünf Dateien in Sollgrößen, ICO enthält 16/32/48, Dateigrößen innerhalb Q-PERF-7; Sichtprüfung der Ergebnisse; Build, Tests, Lint grün.

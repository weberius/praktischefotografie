# Qualität: Performance (web)

**Stand:** 2026-10-27. Messung am Produktionsbuild mit Demo-Daten, mobil.

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-PERF-3 | Besucher:in öffnet Magazin, Karte oder Ortsseite auf einem Mobilgerät mit gedrosselter Verbindung. | Lighthouse-Performance ≥ 90 auf `/`, `/map` und `/venues/<id>`. | Lighthouse gegen lokalen statischen Server | BLG-UB-1, CAL-UB-1, MAP-UB-1 |
| Q-PERF-4 | Entwickler:in baut die Anwendung für die Produktion. | Initiales Bundle ≤ 500 kB (Warnung), Fehler ab 1 MB; Komponenten-CSS ≤ 4 kB (Warnung), Fehler ab 8 kB. | Budgets in `angular.json` (`ng build`) | – |

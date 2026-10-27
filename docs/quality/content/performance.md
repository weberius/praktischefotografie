# Qualität: Performance (content)

**Stand:** 2026-10-27. Die Performance der SPA (Lighthouse) wird im Folgeticket spezifiziert; hier gilt nur die Datenbasis.

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-PERF-1 | Die SPA lädt später `data/*.json` im Browser; die Dateien bleiben klein. | `data/venues.json` ≤ 100 KB bei 30 Venues; alle Dateien in `data/` zusammen ≤ 250 KB. | Dateigrößen-Test (`npm test`) | VEN-UB-1 |
| Q-PERF-2 | Redaktion startet die Validierung lokal auf Referenzdaten (30 Venues). | Laufzeit der Validierung < 5 s (ohne `npm`-Start). | Zeitmessung im Test | VAL-EV-1 |

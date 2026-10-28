# Qualität: Recherche der Fotograf:innen (setup)

**Stand:** 2026-10-28. Fortlaufend zu Q-SEC-4 und Q-MAIN-3.

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-SEC-5 | Redaktion startet die Recherche für alle Kandidaten; Wikimedia soll nicht belastet werden. | 100 % der Anfragen gehen an `*.wikipedia.org`, `www.wikidata.org`, `commons.wikimedia.org`, `upload.wikimedia.org` oder `thumb.wikimedia.org` (auch nach Weiterleitungen); Abstand ≥ 1 s; 0 Anfragen ohne Kennung im `User-Agent`; 0 Anfragen bei Cache-Treffer oder `--offline`. | Tests mit Testserver und Zeitstempeln, Prüfung der Host-Liste | RSF-UB-3, RSF-OP-1 |
| Q-MAIN-4 | Entwickler:in führt die Tests der Recherche ohne Netzzugang aus. | 100 % der Tests zu Abruf, Prüfung und Übernahme laufen offline mit lokalem Testserver oder Fixtures. | Tests mit lokalem Testserver, Durchsicht der Imports | RSF-UB-1, RSF-OP-1, RSF-OP-2 |

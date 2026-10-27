# Qualität: Auffindbarkeit (SEO) (web)

**Stand:** 2026-10-27. Technische Auffindbarkeit, kein Ranking. Merkmalskürzel `SEO` ergänzt die Liste im ID-Vertrag.

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-SEO-1 | Suchmaschine ruft die Seite ohne Skriptausführung ab. | 100 % der Adressen aus NAV-UB-2 (für vorhandene Daten) liefern HTML mit Hauptüberschrift und Hauptinhalt. | Build-Test über die erzeugten HTML-Dateien | BLD-UB-1, MAP-UB-6 |
| Q-SEO-2 | Suchmaschine liest Titel und Beschreibung. | 100 % der Seiten haben nicht leeren Titel und Meta-Beschreibung; 0 doppelte Titel; Detailseiten nennen den Namen im Titel. | Build-Test über die erzeugten HTML-Dateien | NAV-UB-3 |
| Q-SEO-3 | Suchmaschine liest Sitemap. | `sitemap.xml` enthält 100 % der erzeugten Adressen; `robots.txt` verweist auf sie. | Build-Test | NAV-UB-2, BLD-UB-2 |

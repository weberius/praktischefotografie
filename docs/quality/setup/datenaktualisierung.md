# Qualität: Datenaktualisierung aus Webseiten (setup)

**Stand:** 2026-10-27. Merkmalskürzel `REL` (Zuverlässigkeit) wird erstmals verwendet.

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-SEC-4 | Redaktion startet einen Abruf aller Orte; die Betreiber der Webseiten sollen nicht belastet und ihre Regeln nicht verletzt werden. | 100 % der Anfragen erfolgen nach Auswertung der `robots.txt`; Abstand je Host ≥ 2 s; ≤ 6 Seiten je Ort; 0 Anfragen an andere Hosts als den des Ortes; 0 Anfragen ohne Kennung im `User-Agent`. | Tests mit lokalem Testserver und Zeitstempeln | FET-UB-1, FET-UB-2, FET-UB-3, FET-UN-2, FET-UB-5 |
| Q-REL-1 | Einzelne Webseiten sind nicht erreichbar oder antworten fehlerhaft. | Von 20 Orten mit 5 simulierten Ausfällen werden 15 verarbeitet; 100 % der Ausfälle stehen im Bericht; der Lauf wird nie vorzeitig abgebrochen. | Test mit Testserver und Fehlerantworten | FET-UN-1, UPD-EV-3 |
| Q-DATA-3 | Redaktion übernimmt Vorschläge in die Daten. | 100 % der übernommenen Werte haben eine Fundstelle, deren Textauszug den Wert enthält; 0 Änderungen vorhandener Werte ohne Freigabe; 0 automatische Setzungen von `verifiziert`. | Tests mit Fixtures (Vorschläge mit und ohne Fundstelle, mit und ohne Freigabe) | FET-UB-4, UPD-EV-1, UPD-UB-2, UPD-UB-3, UPD-EV-2, UPD-UB-4, SKL-EV-1, SKL-UB-2 |
| Q-MAIN-2 | Entwickler:in führt die Tests ohne Netzzugang aus. | 100 % der Tests zu Abruf, Prüfung und Übernahme laufen offline mit lokalem Testserver oder Fixtures. | Test mit gesperrtem externen Netz (Abruf an fremde Hosts schlägt fehl) | FET-OP-1, UPD-UN-2, SKL-UB-1 |
| Q-PERF-5 | Redaktion aktualisiert alle 20 Orte. | Der Abruf aller Orte dauert ≤ 10 Minuten bei den Standardregeln (rechnerisch ≈ 4 Minuten). | Rechnerische Herleitung und Zeitmessung am Testserver mit verkürztem Abstand | FET-EV-1, UPD-OP-1 |

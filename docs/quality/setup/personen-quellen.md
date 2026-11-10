# Qualität: Eigene Quellen für Personen (setup)

**Stand:** 2026-11-10. Fortlaufend zu Q-SEC-7 und Q-DATA-14; beide gelten auch für eigene Adressen.

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-SEC-13 | Redaktion nennt eigene Adressen; die Betreiber der Seiten und interne Netze sollen geschützt bleiben. | 0 Abrufe von Seiten, die `robots.txt` sperrt; 0 Abrufe interner Adressen (localhost, Loopback, Link-Local, private Netze, Hosts ohne Punkt) und von Adressen ohne http/https; Abstand ≥ 2 s je Website; 0 Anfragen ohne Kennung im `User-Agent`; ≤ 10 abgerufene Seiten je Person und Lauf (eigene und Treffer zusammen); 100 % der abgelehnten Adressen im Bericht mit Grund. | Tests mit Testserver, Zeitstempeln und Fixtures für ungültige Adressen | PQL-UB-2, PQL-UN-1 |
| Q-DATA-18 | Redaktion nennt dieselben Adressen in mehreren Läufen; die Linksammlung soll stabil und nachvollziehbar bleiben. | Nach 2 Läufen mit denselben und teils neuen Adressen: 0 doppelte URLs je Person (nach Normalisierung), 100 % der vorhandenen Einträge unverändert, 100 % der neuen Einträge mit `url`, `title`, `query` = `manuell`, `foundAt`; Bericht nennt 100 % der eigenen Adressen mit Ergebnis. | Tests mit Fixtures (zwei Läufe), Schemaprüfung der Linksammlung | PQL-UB-1, PQL-EV-1, PQL-EV-2 |

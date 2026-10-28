# Qualität: Magazin-Neuigkeiten (setup)

**Stand:** 2026-10-28. Fortlaufend zu Q-DATA-1 bis 3, Q-REL-1 und Q-MAIN-2.

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-DATA-4 | Redaktion übernimmt Neuigkeiten; Texte sollen formal stimmen und nichts Ungeprüftes ins Magazin gelangen. | 100 % der übernommenen Texte haben 60–80 Wörter und nennen Titel, Ort und alle verknüpften Fotograf:innen; 0 Übernahmen ohne `approved`; 0 Übernahmen ungültiger Einträge. Sachrichtigkeit gegen die Quellen prüft die Redaktion bei der Freigabe. | Tests mit Fixtures (59/60/80/81 Wörter, fehlende Namen, ohne Freigabe) | NWS-UB-5, NWS-UB-6, NWS-EV-2, NWS-EV-3, SKL-UB-4, SKL-UB-5 |
| Q-REL-2 | Redaktion wiederholt den Lauf oder ändert Termine. | Zweiter Lauf ohne Änderung: 0 neue Planeinträge und 0 geänderte Beiträge; je Ausstellung und Anlass höchstens 1 Beitrag; bei geänderten Terminen 100 % der betroffenen Beiträge als „angepasst“ geplant. | Tests mit Fixtures: Doppellauf und geänderte Termine | NWS-UB-1, NWS-UB-2, NWS-EV-1, NWS-UB-3, NWS-UN-1 |
| Q-MAIN-3 | Entwickler:in führt die Tests zur Neuigkeitenpflege ohne Netzzugang aus. | 100 % der Tests laufen offline mit temporären Verzeichnissen; die Skripte greifen nicht auf das Netz zu. | Tests in temporären Verzeichnissen; Durchsicht der Imports | NWS-OP-1 |
| Q-DATA-10 | Redaktion übernimmt Neuigkeiten; die Webanwendung zeigt den Anlass als Badge, daher soll der Titel nur Ausstellungstitel und Stadt enthalten. | 100 % der Neuigkeiten haben den Titel „Ausstellungstitel in Stadt“ ohne Anlass; 100 % der Neuigkeitenkennungen enden auf einen der vier Anlässe und verknüpfen eine vorhandene Ausstellung; im Bestand 0 Verstöße nach der Migration. | Tests mit Fixtures und Bestandstest | NWS-UB-7, NWS-UB-1 |

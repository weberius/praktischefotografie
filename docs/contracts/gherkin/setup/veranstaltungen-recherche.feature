# language: de
Funktionalität: Veranstaltungen und Führungen recherchieren

  # EARS: VRS-UB-1
  Szenario: Skill ist vorhanden
    Angenommen das Projektverzeichnis
    Dann existiert ".claude/skills/research-events/SKILL.md"
    Und der Skill nennt Name, Beschreibung und Aufrufbeispiele mit "--venue"

  # EARS: VRS-OP-1
  Szenario: Veranstaltungen eines Ortes
    Angenommen die Orte "photographische-sammlung-koeln" und "makk-koeln" mit "website"
    Wenn der Skill mit "--venue photographische-sammlung-koeln" läuft
    Dann wird nur "photographische-sammlung-koeln" abgerufen
    Und es entsteht höchstens die Vorschlagsdatei "updates/<Datum>/events/photographische-sammlung-koeln.json"

  # EARS: VRS-OP-1
  Szenario: Aktualisierung über alle Orte
    Angenommen alle Orte mit "website"
    Wenn der Skill ohne "--venue" läuft
    Dann wird jeder Ort mit "website" bearbeitet
    Und kein Veranstalter wird abgerufen

  # EARS: VRS-UN-1
  Szenariogrundriss: Unbekannte Orts-ID
    Angenommen die Orts-ID "<id>"
    Wenn der Skill mit "--venue <id>" läuft
    Dann endet er mit einem Hinweis und nennt die gültigen Orts-IDs
    Und es wird keine Seite abgerufen

    Beispiele:
      | id              | grund                    |
      | gibt-es-nicht   | unbekannt                |
      | photoszene-koeln | Veranstalter statt Ort  |

  # EARS: VRS-EV-1
  Szenario: Veranstaltungsseiten haben Vorrang
    Angenommen die Startseite eines Ortes verlinkt zehn Unterseiten, darunter "/programm/fuehrungen-und-veranstaltungen"
    Wenn der Abruf mit "--events" läuft
    Dann wird "/programm/fuehrungen-und-veranstaltungen" abgerufen
    Und es werden höchstens zehn Seiten dieses Ortes abgerufen
    Und "robots.txt", Abstand von 2 Sekunden und Kennung gelten wie im normalen Abruf

  # EARS: VRS-UB-2 (ersetzt durch VRS-UB-10), VRS-UB-10
  Szenario: Nur Veranstaltungen werden vorgeschlagen
    Angenommen ein Snapshot mit einer Führung und einer neuen Ausstellung
    Wenn die Vorschläge geprüft werden
    Dann enthält "updates/<Datum>/events/<venue-id>.json" nur Vorschläge für "events" (neue Veranstaltungen mit "op" "add")
    Und die Ausstellung ist nicht enthalten

  # EARS: VRS-UB-3
  Szenario: Veranstaltung nur mit belegtem Termin
    Angenommen ein Vorschlag, dessen Textauszug Titel und Datum nicht beide enthält
    Wenn die Vorschläge geprüft werden
    Dann wird der Vorschlag verworfen und der Grund im Bericht genannt

  # EARS: VRS-UB-3
  Szenario: Vergangene Termine
    Angenommen ein belegter Termin mit einem Datum vor heute
    Wenn die Vorschläge geprüft werden
    Dann wird der Vorschlag verworfen

  # EARS: VRS-UB-4
  Szenario: Führung wird als Führung erfasst
    Angenommen ein Snapshot mit „Öffentliche Führung am 15. November 2026, 15 Uhr“
    Wenn die Vorschläge erstellt werden
    Dann hat das vorgeschlagene Event den "eventType" "guided_tour"
    Und "startDate" und "endDate" sind "2026-11-15"

  # EARS: VRS-UB-4
  Szenario: Keine Vernissagen
    Angenommen ein Vorschlag mit "eventType" "vernissage" oder "finissage"
    Wenn die Vorschläge geprüft werden
    Dann wird der Vorschlag verworfen mit dem Hinweis auf "update-venue-data"

  # EARS: VRS-UB-5
  Szenario: Mehrere Termine einer Führung
    Angenommen eine Führung mit drei belegten Terminen
    Wenn die Vorschläge erstellt werden
    Dann entstehen drei Events mit eindeutiger "id" und je einem Datum
    Und eine Reihe ohne belegte einzelne Termine ergibt keinen Vorschlag

  # EARS: VRS-UB-5
  Szenario: Obergrenze je Ort
    Angenommen 31 gültige Vorschläge für einen Ort
    Wenn die Vorschläge geprüft werden
    Dann werden höchstens 30 übernommen und die übrigen im Bericht genannt

  # EARS: VRS-UB-6
  Szenario: Keine Dubletten
    Angenommen ein Event mit gleichem Ort, Titel und Beginn in "data/events.json"
    Wenn die Vorschläge geprüft werden
    Dann wird der Vorschlag als Dublette verworfen

  # EARS: VRS-UB-6
  Szenario: Wiederholter Lauf
    Angenommen ein vollständig übernommener Lauf
    Wenn der Lauf mit unveränderten Seiten wiederholt wird
    Dann entstehen 0 neue Vorschläge

  # EARS: VRS-UB-7
  Szenario: Übernahme nur nach Freigabe
    Angenommen Vorschläge ohne "approved"
    Wenn die Übernahme läuft
    Dann bleibt "data/" unverändert
    Und bei freigegebenen Vorschlägen folgt die Validierung, bei einem Fehler werden alle Änderungen zurückgenommen

  # EARS: VRS-UN-2
  Szenario: Ort nicht erreichbar
    Angenommen ein Ort, dessen Seite nicht erreichbar oder durch "robots.txt" gesperrt ist
    Wenn der Skill über alle Orte läuft
    Dann nennt der Bericht Ort, URL und Grund
    Und die übrigen Orte werden bearbeitet

  # EARS: VRS-EV-2
  Szenario: Bericht je Ort
    Angenommen ein beendeter Lauf
    Dann nennt der Bericht je Ort die Zahl der abgerufenen Seiten, der Vorschläge und der verworfenen Vorschläge mit Grund

  # EARS: VRS-UB-8
  Szenario: Uhrzeit mit Beleg
    Angenommen ein Textauszug "Führung am 14. November 2026, 15:00 bis 16:30 Uhr"
    Wenn der Vorschlag für die Führung geprüft wird
    Dann trägt er "startTime" "15:00" und "endTime" "16:30"
    Und er ist gültig

  # EARS: VRS-UB-8
  Szenario: Mehrere Uhrzeiten
    Angenommen ein Textauszug "Vortrag am 14. November 2026, Einlass 18:30 Uhr, Beginn 19:00 Uhr"
    Wenn der Vorschlag für den Vortrag geprüft wird
    Dann trägt er "startTime" "19:00"
    Und er trägt kein "endTime"

  # EARS: VRS-UB-8, VRS-UN-3
  Szenario: Keine Uhrzeit ohne Beleg
    Angenommen ein Vorschlag mit "startTime" "15:00" und ein Textauszug "Führung am 14. November 2026"
    Wenn die Vorschläge geprüft werden
    Dann wird der Vorschlag verworfen
    Und der Bericht nennt den Grund "Uhrzeit nicht belegt"

  # EARS: VRS-UB-9
  Szenario: Zeitzone nur bei Abweichung
    Angenommen ein Vorschlag für einen Ort in Köln und einer für einen Ort mit belegter Zeitzone "Europe/London"
    Wenn die Vorschläge geprüft werden
    Dann trägt der Vorschlag für Köln kein "timeZone"
    Und der andere Vorschlag trägt "timeZone" "Europe/London"

  # EARS: VRS-EV-3, VRS-UB-10
  Szenario: Bestandsevent erhält Uhrzeit
    Angenommen ein Event "ein-abend-mit-tim-soter-2026" ohne Uhrzeit in "data/events.json"
    Und ein Snapshot mit Titel, Datum 2026-11-07 und "19:00 Uhr" in einem Textauszug
    Wenn die Vorschläge geprüft werden
    Dann enthält die Vorschlagsdatei einen Vorschlag mit "op" "update" nur für "startTime"
    Und es gibt keinen Vorschlag mit "op" "add" für dieses Event

  # EARS: VRS-EV-3
  Szenario: Vorhandene Uhrzeit bleibt
    Angenommen ein Event mit "startTime" "19:00" in "data/events.json"
    Und ein Snapshot, der "20:00 Uhr" für dasselbe Event nennt
    Wenn die Vorschläge geprüft werden
    Dann enthält die Vorschlagsdatei keinen Vorschlag, der "startTime" ändert

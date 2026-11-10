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

  # EARS: VRS-UB-2
  Szenario: Nur Veranstaltungen werden vorgeschlagen
    Angenommen ein Snapshot mit einer Führung und einer neuen Ausstellung
    Wenn die Vorschläge geprüft werden
    Dann enthält "updates/<Datum>/events/<venue-id>.json" nur Vorschläge für "events" mit "op" "add"
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

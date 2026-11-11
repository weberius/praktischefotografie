# language: de
Funktionalität: Termin in den Gerätekalender übernehmen

  Grundlage:
    Angenommen heute ist der 2026-10-30
    Und der Ort "zander-galerie-koeln" "Zander Galerie" in "Schönhauser Straße 8", "50968" "Köln"
    Und das Event "between-2026-eroeffnung" "Eröffnung: Between" am 2026-11-07 im Ort "zander-galerie-koeln" mit der Beschreibung "Eröffnung am 7. November 2026 von 16:00 bis 18:00 Uhr."

  # EARS: ICS-UB-1
  Szenario: Schaltfläche auf der Eventdetailseite
    Wenn "/events/between-2026-eroeffnung" aufgerufen wird
    Dann gibt es eine Schaltfläche "Termin in Geräte-Kalender speichern"
    Und neben ihr steht ein Hinweistext zum Kalender des Smartphones oder Rechners
    Und die Schaltfläche ist per Tastatur bedienbar

  # EARS: ICS-EV-1
  Szenario: Download der Kalenderdatei
    Angenommen "/events/between-2026-eroeffnung" ist geöffnet
    Wenn die Schaltfläche gewählt wird
    Dann wird die Datei "between-2026-eroeffnung.ics" mit dem Medientyp "text/calendar" angeboten
    Und es wurde keine Netzanfrage gesendet

  # EARS: ICS-UB-2
  Szenario: Inhalt der Kalenderdatei
    Wenn die Kalenderdatei für "between-2026-eroeffnung" erzeugt wird
    Dann enthält sie "SUMMARY:Eröffnung: Between"
    Und "DTSTART;VALUE=DATE:20261107"
    Und "DTEND;VALUE=DATE:20261108"
    Und "LOCATION:Zander Galerie\, Schönhauser Straße 8\, 50968 Köln"
    Und eine "DESCRIPTION" mit Typ und Beschreibung
    Und "URL" mit der absoluten Adresse von "/events/between-2026-eroeffnung"

  # EARS: ICS-UB-2
  Szenario: Mehrtägiges Event
    Angenommen ein Event vom 2026-11-12 bis 2026-11-14
    Wenn die Kalenderdatei erzeugt wird
    Dann ist "DTSTART;VALUE=DATE" 20261112 und "DTEND;VALUE=DATE" 20261115

  # EARS: ICS-UB-3
  Szenario: Stabile Kennung
    Wenn die Kalenderdatei zweimal erzeugt wird
    Dann hat sie beide Male "UID:between-2026-eroeffnung@zentrum-praktische-fotografie"

  # EARS: ICS-UB-4
  Szenario: Maskierung und Faltung
    Angenommen ein Event mit dem Titel "A; B, C\D" und einer Beschreibung von 200 Zeichen mit Umlauten
    Wenn die Kalenderdatei erzeugt wird
    Dann sind Semikolon, Komma und Backslash im Titel maskiert
    Und keine Zeile hat mehr als 75 Oktett
    Und jede Zeile endet mit CRLF
    Und kein Mehrbyte-Zeichen ist getrennt

  # EARS: ICS-ST-1
  Szenario: Beendetes Event ohne Schaltfläche
    Angenommen ein Event, das gestern endete
    Wenn seine Detailseite aufgerufen wird
    Dann gibt es keine Schaltfläche "Termin in Geräte-Kalender speichern"

  # EARS: ICS-UN-1
  Szenario: Ort unbekannt
    Angenommen ein Event mit unbekanntem Ort in der Stadt "Köln"
    Wenn die Kalenderdatei erzeugt wird
    Dann lautet "LOCATION" nur "Köln"

  # EARS: ICS-UB-5
  Szenario: Nur auf der Eventdetailseite
    Wenn "/events", "/calendar" und die Detailseite einer Ausstellung aufgerufen werden
    Dann gibt es dort keine Schaltfläche "Termin in Geräte-Kalender speichern"

  # EARS: ICS-UB-6
  Szenario: Frei und ohne Einladung
    Wenn die Kalenderdatei für "between-2026-eroeffnung" erzeugt wird
    Dann enthält sie "TRANSP:TRANSPARENT"
    Und sie enthält weder "METHOD" noch "ORGANIZER"

  # EARS: ICS-UB-7
  Szenario: Steuerzeichen im Text
    Angenommen ein Event, dessen Beschreibung ein einzelnes CR, U+2028, U+0085 und das Zeichen "END:VEVENT" in einer neuen Zeile enthält
    Wenn die Kalenderdatei erzeugt wird
    Dann enthält die Datei außer CRLF am Zeilenende keine Zeilenumbruch- oder Steuerzeichen
    Und sie hat genau ein "BEGIN:VEVENT" und ein "END:VEVENT"
    Und "END:VEVENT" aus dem Text steht nur innerhalb eines Werts

  # EARS: ICS-UB-8
  Szenario: Termin mit Uhrzeit
    Angenommen das Event "between-2026-eroeffnung" am 2026-11-07 mit "startTime" "16:00" und "endTime" "18:00"
    Wenn die Kalenderdatei erzeugt wird
    Dann enthält sie "DTSTART;TZID=Europe/Berlin:20261107T160000"
    Und "DTEND;TZID=Europe/Berlin:20261107T180000"
    Und weder "DTSTART;VALUE=DATE" noch "DTEND;VALUE=DATE"

  # EARS: ICS-UB-8, ICS-UB-2
  Szenario: Ohne Startzeit bleibt der Termin ganztägig
    Angenommen das Event "between-2026-eroeffnung" am 2026-11-07 ohne "startTime"
    Wenn die Kalenderdatei erzeugt wird
    Dann enthält sie "DTSTART;VALUE=DATE:20261107" und "DTEND;VALUE=DATE:20261108"
    Und keinen "VTIMEZONE"-Block

  # EARS: ICS-UB-9
  Szenario: Dauer von zwei Stunden ohne Endzeit
    Angenommen ein eintägiges Event am 2026-11-07 mit "startTime" "16:00" ohne "endTime"
    Wenn die Kalenderdatei erzeugt wird
    Dann enthält sie "DTSTART;TZID=Europe/Berlin:20261107T160000"
    Und "DTEND;TZID=Europe/Berlin:20261107T180000"
    Und die Daten des Events bleiben unverändert

  # EARS: ICS-UB-9
  Szenario: Termin über Mitternacht
    Angenommen ein eintägiges Event am 2026-11-07 mit "startTime" "23:00" ohne "endTime"
    Wenn die Kalenderdatei erzeugt wird
    Dann enthält sie "DTEND;TZID=Europe/Berlin:20261108T010000"

  # EARS: ICS-UB-9
  Szenario: Mehrtägiges Event mit Uhrzeiten
    Angenommen ein Event vom 2026-11-12 bis 2026-11-14 mit "startTime" "10:00" und "endTime" "17:00"
    Wenn die Kalenderdatei erzeugt wird
    Dann enthält sie "DTSTART;TZID=Europe/Berlin:20261112T100000"
    Und "DTEND;TZID=Europe/Berlin:20261114T170000"

  # EARS: ICS-UB-9, ICS-UB-2
  Szenario: Mehrtägig ohne Endzeit bleibt ganztägig
    Angenommen ein Event vom 2026-11-12 bis 2026-11-14 mit "startTime" "10:00" ohne "endTime"
    Wenn die Kalenderdatei erzeugt wird
    Dann enthält sie "DTSTART;VALUE=DATE:20261112" und "DTEND;VALUE=DATE:20261115"

  # EARS: ICS-UB-10
  Szenario: Zeitzonenblock Europe/Berlin
    Angenommen ein Event mit "startTime" "16:00" ohne "timeZone"
    Wenn die Kalenderdatei erzeugt wird
    Dann enthält sie vor "BEGIN:VEVENT" einen Block "BEGIN:VTIMEZONE" mit "TZID:Europe/Berlin" bis "END:VTIMEZONE"
    Und der Block enthält "STANDARD" und "DAYLIGHT"

  # EARS: ICS-UB-10
  Szenario: Sommerzeit und Winterzeit
    Angenommen ein Event am 2026-07-10 und eines am 2026-11-07, je mit "startTime" "14:00"
    Wenn die Kalenderdateien erzeugt werden
    Dann verweisen beide mit "TZID=Europe/Berlin" auf denselben Zeitzonenblock
    Und der Block gibt für die Sommerzeit "+0200" und für die Normalzeit "+0100" an
    Und der Block endet die Sommerzeit am letzten Sonntag im Oktober und beginnt sie am letzten Sonntag im März

  # EARS: ICS-UN-2
  Szenario: Andere Zeitzone als UTC
    Angenommen ein Event am 2026-07-10 mit "startTime" "16:00", "endTime" "17:30" und "timeZone" "Europe/London"
    Wenn die Kalenderdatei erzeugt wird
    Dann enthält sie "DTSTART:20260710T150000Z" und "DTEND:20260710T163000Z"
    Und keinen "VTIMEZONE"-Block


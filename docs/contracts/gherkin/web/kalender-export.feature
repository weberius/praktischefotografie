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


# language: de
Funktionalität: Events und Messen

  # EARS: EVT-UB-1
  Szenario: Liste zeigt Events
    Angenommen drei Events mit verschiedenen Beginndaten
    Wenn "/events" aufgerufen wird
    Dann erscheinen sie nach Beginn aufsteigend mit Titel, Typ, Ort und Zeitraum

  # EARS: EVT-UB-2
  Szenario: Liste ist nach Typ filterbar
    Angenommen ein Event vom Typ "talk" und eines vom Typ "workshop"
    Wenn der Typ "talk" gewählt wird
    Dann erscheint nur der Talk

  # EARS: EVT-OP-1
  Szenario: Kommerzielles Event
    Angenommen ein Event mit isCommercial "true"
    Dann trägt es den Text "Kommerziell"

  # EARS: EVT-UB-3
  Szenario: Eventdetail
    Angenommen das Event "e-1" mit Highlights und Website
    Wenn "/events/e-1" aufgerufen wird
    Dann erscheinen Beschreibung, Highlights, der Ort mit Link und die Website

  # EARS: EVT-UB-4 (gilt nur für die Detailseite, siehe ACT-UB-3)
  Szenario: Beendetes Event
    Angenommen ein Event, das gestern endete
    Wenn seine Detailseite aufgerufen wird
    Dann trägt es den Text "Beendet"

  # EARS: EVT-UB-5
  Szenario: Vernissage und Finissage in der Liste
    Angenommen ein Event vom Typ "vernissage" und eines vom Typ "finissage"
    Wenn "/events" aufgerufen wird
    Dann tragen sie die Typen "Vernissage" und "Finissage"

  # EARS: EVT-UB-5
  Szenario: Vernissage und Finissage filterbar
    Angenommen ein Event vom Typ "vernissage" und eines vom Typ "finissage"
    Wenn der Typ "Finissage" gewählt wird
    Dann erscheint nur die Finissage

  # EARS: EVT-UB-5
  Szenario: Vernissage und Finissage in der Detailansicht
    Angenommen ein Event "e-finissage" vom Typ "finissage"
    Wenn "/events/e-finissage" aufgerufen wird
    Dann trägt es den Typ "Finissage"

  # EARS: EVT-UB-6
  Szenario: Führung in der Liste
    Angenommen ein Event vom Typ "guided_tour"
    Wenn "/events" aufgerufen wird
    Dann trägt es den Typ "Führung"

  # EARS: EVT-UB-6
  Szenario: Führung filterbar
    Angenommen ein Event vom Typ "guided_tour" und eines vom Typ "talk"
    Wenn der Typ "Führung" gewählt wird
    Dann erscheint nur die Führung

  # EARS: EVT-UB-6
  Szenario: Führung in der Detailansicht
    Angenommen ein Event "e-fuehrung" vom Typ "guided_tour"
    Wenn "/events/e-fuehrung" aufgerufen wird
    Dann trägt es den Typ "Führung"

  # EARS: EVT-UB-7
  Szenario: Uhrzeit mit Ende in der Liste
    Angenommen ein eintägiges Event mit "startTime" "16:00" und "endTime" "18:00"
    Wenn "/events" aufgerufen wird
    Dann zeigt sein Eintrag hinter dem Datum "16:00–18:00 Uhr"

  # EARS: EVT-UB-7
  Szenario: Uhrzeit ohne Ende
    Angenommen ein eintägiges Event mit "startTime" "16:00" ohne "endTime"
    Wenn seine Detailseite aufgerufen wird
    Dann zeigt sie "ab 16:00 Uhr"
    Und sie nennt keine Dauer von 2 Stunden

  # EARS: EVT-UB-7
  Szenario: Abweichende Zeitzone
    Angenommen ein eintägiges Event mit "startTime" "16:00", "endTime" "18:00" und "timeZone" "Europe/London"
    Wenn seine Detailseite aufgerufen wird
    Dann zeigt sie "16:00–18:00 Uhr (Europe/London)"

  # EARS: EVT-UB-7
  Szenario: Ohne Uhrzeit keine Zeitangabe
    Angenommen ein Event ohne "startTime"
    Wenn "/events" und seine Detailseite aufgerufen werden
    Dann zeigen beide nur das Datum und kein "Uhr"

  # EARS: EVT-UB-8
  Szenario: Mehrtägiges Event in der Liste
    Angenommen ein Event vom 2026-11-12 bis 2026-11-14 mit "startTime" "10:00" und "endTime" "17:00"
    Wenn "/events" aufgerufen wird
    Dann zeigt sein Eintrag nur den Zeitraum und kein "Uhr"

  # EARS: EVT-UB-8
  Szenario: Mehrtägiges Event im Detail
    Angenommen ein Event vom 2026-11-12 bis 2026-11-14 mit "startTime" "10:00" und "endTime" "17:00"
    Wenn seine Detailseite aufgerufen wird
    Dann zeigt sie "Start 10:00 Uhr" für den 12.11. und "Ende 17:00 Uhr" für den 14.11.

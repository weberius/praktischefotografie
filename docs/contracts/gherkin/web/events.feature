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

  # EARS: EVT-UB-4
  Szenario: Beendetes Event
    Angenommen ein Event, das gestern endete
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

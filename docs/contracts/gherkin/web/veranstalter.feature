# language: de
Funktionalität: Veranstalter:innen und Festivals

  # EARS: ORG-UB-1
  Szenario: Übersicht der Veranstalter:innen
    Angenommen zwei Veranstalter
    Wenn "/organizers" aufgerufen wird
    Dann erscheinen beide mit Name, Typ und Stadt

  # EARS: ORG-UB-2
  Szenario: Veranstalterseite zeigt Stammdaten
    Angenommen der Veranstalter "photoszene-koeln"
    Wenn "/organizers/photoszene-koeln" aufgerufen wird
    Dann erscheinen Name, Typ, Stadt und Website

  # EARS: ORG-UB-3
  Szenario: Veranstalterseite listet Ausstellungen
    Angenommen zwei Ausstellungen mit festivalId "photoszene-koeln" und eine ohne
    Wenn die Veranstalterseite aufgerufen wird
    Dann erscheinen genau die zwei Ausstellungen mit Ort und Zeitraum

  # EARS: ORG-ST-1
  Szenario: Veranstalter ohne Ausstellung
    Angenommen ein Veranstalter ohne Ausstellungen
    Wenn die Veranstalterseite aufgerufen wird
    Dann zeigt sie einen Hinweis

  # EARS: ORG-UB-4
  Szenario: Festivalfilter in der Karte
    Angenommen Orte, von denen zwei Ausstellungen des Veranstalters "photoszene-koeln" zeigen
    Wenn "/map?organizer=photoszene-koeln" aufgerufen wird
    Dann erscheinen nur diese zwei Orte in Karte und Liste

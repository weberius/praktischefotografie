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

  # EARS: ORG-UB-3 (ersetzt durch ORG-UB-5)
  Szenario: Veranstalterseite listet Ausstellungen
    Angenommen zwei Ausstellungen mit festivalId "photoszene-koeln" und eine ohne
    Wenn die Veranstalterseite aufgerufen wird
    Dann erscheinen genau die zwei Ausstellungen mit Ort und Zeitraum

  # EARS: ORG-ST-1
  Szenario: Veranstalter ohne Ausstellung
    Angenommen ein Veranstalter ohne Ausstellungen
    Wenn die Veranstalterseite aufgerufen wird
    Dann zeigt sie einen Hinweis

  # EARS: ORG-UB-4 (ersetzt durch ORG-UB-6)
  Szenario: Festivalfilter in der Karte
    Angenommen Orte, von denen zwei Ausstellungen des Veranstalters "photoszene-koeln" zeigen
    Wenn "/map?organizer=photoszene-koeln" aufgerufen wird
    Dann erscheinen nur diese zwei Orte in Karte und Liste

  # EARS: ORG-UB-5
  Szenario: Veranstalterseite listet Ausstellungen über Festivals
    Angenommen das Festival "photoszene-festival-2027" des Veranstalters "photoszene-koeln" mit zwei Ausstellungen und eine Ausstellung eines anderen Festivals
    Wenn "/organizers/photoszene-koeln" aufgerufen wird
    Dann erscheinen genau die zwei Ausstellungen mit Ort, Zeitraum und Status

  # EARS: ORG-UB-6
  Szenario: Veranstalterfilter in der Karte
    Angenommen Orte, von denen zwei Ausstellungen von Festivals des Veranstalters "photoszene-koeln" zeigen
    Wenn "/map?organizer=photoszene-koeln" aufgerufen wird
    Dann erscheinen nur diese zwei Orte in Karte und Liste

  # EARS: ORG-UB-7
  Szenario: Veranstalterseite listet Festivals
    Angenommen zwei Festivals des Veranstalters "photoszene-koeln" und ein Festival eines anderen
    Wenn die Veranstalterseite aufgerufen wird
    Dann erscheinen genau die zwei Festivals mit Titel und Zeitraum
    Und jeder Titel verlinkt auf "/festivals/:id"

  # EARS: ORG-UB-8
  Szenario: Veranstalterseite zeigt Beschreibung und Instagram
    Angenommen der Veranstalter "photoszene-koeln" mit Beschreibung und Instagram-Name "photoszene_koeln"
    Wenn die Veranstalterseite aufgerufen wird
    Dann erscheinen die Beschreibung und ein Link auf "https://www.instagram.com/photoszene_koeln/"

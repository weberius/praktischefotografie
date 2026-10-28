# language: de
Funktionalität: Festivals

  # EARS: FST-UB-1
  Szenario: Übersicht der Festivals
    Angenommen zwei Festivals mit unterschiedlichem Beginn
    Wenn "/festivals" aufgerufen wird
    Dann erscheinen beide mit Titel, Veranstalter, Zeitraum und Stadt, das früher beginnende zuerst
    Und jedes verlinkt auf "/festivals/:id"

  # EARS: FST-ST-1
  Szenario: Keine Festivals erfasst
    Angenommen keine Festivals
    Wenn "/festivals" aufgerufen wird
    Dann zeigt die Seite einen Hinweis

  # EARS: FST-UB-2
  Szenario: Festivalseite zeigt Stammdaten
    Angenommen das Festival "photoszene-festival-2027" mit Beschreibung und Website
    Wenn "/festivals/photoszene-festival-2027" aufgerufen wird
    Dann erscheinen Titel, Zeitraum, Stadt, Beschreibung und Website
    Und der Veranstalter erscheint mit Link auf "/organizers/photoszene-koeln"

  # EARS: FST-UB-3
  Szenario: Festivalseite listet Ausstellungen
    Angenommen zwei Ausstellungen mit festivalId "photoszene-festival-2027", davon eine als offizieller Partner, und eine ohne
    Wenn die Festivalseite aufgerufen wird
    Dann erscheinen genau die zwei Ausstellungen mit Ort, Zeitraum und Status
    Und nur die Partnerausstellung trägt den Text "Offizieller Partner"

  # EARS: FST-ST-2
  Szenario: Festival ohne Ausstellung
    Angenommen ein Festival ohne Ausstellungen
    Wenn die Festivalseite aufgerufen wird
    Dann zeigt sie einen Hinweis und keine Filterlinks

  # EARS: FST-UB-4, FST-UB-5
  Szenario: Festivalfilter in Karte und Orten
    Angenommen Orte, von denen zwei Ausstellungen des Festivals "photoszene-festival-2027" zeigen
    Wenn die Festivalseite "/map?festival=photoszene-festival-2027" und "/venues?festival=photoszene-festival-2027" verlinkt
    Und "/map?festival=photoszene-festival-2027" aufgerufen wird
    Dann erscheinen nur diese zwei Orte in Karte und Liste

  # EARS: FST-ST-3
  Szenario: Unbekanntes Festival im Filter
    Wenn "/venues?festival=gibt-es-nicht" aufgerufen wird
    Dann erscheint keine Ortskarte
    Und ein Hinweis nennt den unbekannten Filter

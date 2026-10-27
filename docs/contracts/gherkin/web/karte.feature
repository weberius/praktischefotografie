# language: de
Funktionalität: Karte der Orte

  # EARS: MAP-UB-1
  Szenario: Karte zeigt alle Orte
    Angenommen drei Orte
    Wenn "/map" aufgerufen wird
    Dann zeigt die Karte drei Marker
    Und die Auswahl eines Markers zeigt Name, Typ und einen Link zur Ortsseite

  # EARS: MAP-UB-2
  Szenario: Filter wirken kombiniert
    Angenommen Orte in Köln und Essen, davon einer in Köln mit Präsenzbibliothek
    Wenn die Stadt "Köln" und die Eigenschaft "Hat Präsenzbibliothek" gewählt werden
    Dann bleibt nur der Kölner Ort mit Präsenzbibliothek übrig

  # EARS: MAP-UB-3
  Szenario: Listenalternative
    Angenommen drei Orte
    Wenn "/map" aufgerufen wird
    Dann enthält die Seite eine Liste mit denselben drei Orten
    Und die Filter wirken auf Liste und Karte gleich

  # EARS: MAP-UB-4
  Szenario: Filterzustand in der Adresse
    Angenommen die Stadt "Köln" ist gewählt
    Dann enthält die Adresse "city=Köln"

  # EARS: MAP-EV-1
  Szenario: Filter aus der Adresse
    Angenommen die Adresse "/map?city=Essen&type=museum"
    Wenn sie aufgerufen wird
    Dann sind die Filter Stadt "Essen" und Typ "museum" gesetzt

  # EARS: MAP-UB-5
  Szenario: Attribution sichtbar
    Angenommen die Karte ist geladen
    Dann ist die Attribution "© OpenStreetMap-Mitwirkende" sichtbar

  # EARS: MAP-UN-1
  Szenario: Kein Treffer
    Angenommen Filter, zu denen kein Ort passt
    Dann zeigt die Seite einen Hinweis
    Und eine Schaltfläche zum Zurücksetzen der Filter

  # EARS: MAP-UB-6
  Szenario: Karte nur im Browser
    Angenommen die Seite "/map" wird vorab gerendert
    Dann enthält das erzeugte Dokument die Ortsliste
    Und es wird kein Kartenobjekt erzeugt

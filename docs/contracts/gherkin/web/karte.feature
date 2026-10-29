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

  # EARS: MAP-UB-3 (ersetzt durch MAP-UB-7 und MAP-UB-8)
  # Entfallen: Szenario „Listenalternative“ („Dann enthält die Seite eine Liste mit denselben drei Orten“).
  # Die Listenalternative liegt auf "/venues" (ADR-016).

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

  # EARS: MAP-UB-6 (ersetzt durch MAP-UB-13)
  # EARS: MAP-UB-13
  Szenario: Karte nur im Browser
    Angenommen die Seite "/map" wird vorab gerendert
    Dann enthält das erzeugte Dokument die Hauptüberschrift, die Filter und einen Hinweis mit einem Link auf "/venues"
    Und es wird kein Kartenobjekt erzeugt

  # EARS: MAP-UB-7
  Szenario: Karte ohne Ortsliste
    Angenommen drei Orte
    Wenn "/map" aufgerufen wird
    Dann zeigt die Karte drei Marker
    Und die Seite enthält keine Liste der Orte

  # EARS: MAP-UB-8
  Szenario: Link zur Ortsliste mit Filtern
    Angenommen die Adresse "/map?city=Köln&type=museum&library=1&collection=1&organizer=photoszene-koeln&festival=photoszene-festival-2027"
    Wenn sie aufgerufen wird
    Dann führt der Link zur Ortsliste auf "/venues" mit denselben Filtern
    Und ohne gesetzte Filter führt er auf "/venues"

  # EARS: MAP-UB-9
  Szenario: Karte füllt die Fläche
    Angenommen ein Fenster mit 1280 mal 800 Pixeln
    Wenn "/map" aufgerufen wird
    Dann beginnt die Karte unterhalb der Filterleiste
    Und sie hat dieselbe Breite wie die Karten auf der Seite "/calendar"
    Und ihr unterer Rand liegt an der Trennlinie oberhalb von "Impressum" und "Datenschutz"

  # EARS: MAP-UB-9
  Szenario: Karte in kleinem Fenster
    Angenommen ein Fenster mit 390 mal 500 Pixeln
    Wenn "/map" aufgerufen wird
    Dann ist die Karte mindestens 24 rem hoch
    Und die Trennlinie oberhalb des Fußbereichs liegt unterhalb der Karte

  # EARS: MAP-UB-10, MAP-UB-12
  Szenariogrundriss: Symbol und Farbe je Typ
    Angenommen ein Ort vom Typ "<typ>"
    Wenn "/map" aufgerufen wird
    Dann zeigt die Karte für den Ort einen Marker mit dem Symbol "<symbol>" in der Farbe "<farbe>"
    Und der Marker hat die Textalternative "<name>, <typ>"
    Und kein anderer Typ hat dieselbe Kombination aus Symbol und Farbe
    Beispiele:
    | typ | name | symbol | farbe |
    | Museum | Museum Essen | Säulenbau | Blau |
    | Galerie | Galerie Köln | Bilderrahmen | Orange |
    | Stiftung | Stiftung Düsseldorf | Raute | Violett |
    | Off-Space | Off-Space Bochum | Tür | Rot |
    | Bibliothek / Archiv | Haus Köln Bibliothek | Buch | Grün |

  # EARS: MAP-UB-11
  Szenario: Legende der Ortstypen
    Angenommen die Karte ist geladen
    Dann zeigt die Legende nacheinander "Museum", "Galerie", "Stiftung", "Off-Space" und "Bibliothek / Archiv" als Text
    Und jeder Eintrag zeigt dasselbe Symbol in derselben Farbe wie der Marker des Typs
    Und die Legende nennt alle fünf Typen, auch wenn die Filter nur einen Teil der Orte zeigen

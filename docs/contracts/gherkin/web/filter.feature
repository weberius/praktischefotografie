# language: de
Funktionalität: Globaler Filter

  # EARS: FLT-UB-1
  Szenario: Orte und Typen kombinieren
    Angenommen ein Museum A und eine Galerie B in Köln sowie ein Museum C in Essen
    Wenn die Orte "A" und "B" und der Typ "Museum" gewählt werden
    Dann bleibt nur Ort "A" übrig
    Und ohne gewählte Dimension wird dort nicht eingeschränkt

  # EARS: FLT-UB-2
  Szenario: Filter gilt auf allen filterbaren Seiten
    Angenommen der Typ "Galerie" ist gewählt
    Wenn "/map", "/venues", "/calendar", "/exhibitions" und "/events" aufgerufen werden
    Dann zeigt jede Seite nur Orte bzw. Einträge von Galerien
    Und "/venues/:id", "/photographers", "/festivals", "/organizers" und das Magazin zeigen alles

  # EARS: FLT-UB-3
  Szenario: Filter bleibt beim Seitenwechsel
    Angenommen der Ort "A" ist auf "/venues" gewählt
    Wenn zur Eventliste gewechselt wird
    Dann ist der Ort "A" dort gewählt und die Liste eingeschränkt

  # EARS: FLT-UB-4
  Szenario: Eine Filterbedienung auf jeder Seite
    Angenommen der Typ "Museum" ist gewählt
    Wenn eine filterbare Seite aufgerufen wird
    Dann zeigt sie dieselbe Filterbedienung mit der aktiven Auswahl als Text
    Und eine Schaltfläche setzt die Auswahl auf alle zurück

  # EARS: FLT-UB-5
  Szenario: Globaler und lokaler Filter wirken gemeinsam
    Angenommen der Typ "Museum" ist global gewählt und in der Eventliste "Nur Favoriten"
    Dann zeigt die Eventliste nur Favoriten, deren Ort ein Museum ist

  # EARS: FLT-UB-6
  Szenario: Neuladen setzt den Filter zurück
    Angenommen der Ort "A" ist gewählt
    Wenn die Anwendung neu gestartet wird
    Dann ist kein Filter gesetzt
    Und beim Wählen entstehen keine Cookies, keine Einträge in Web-Speichern und keine Netzanfragen

  # EARS: FLT-ST-1
  Szenario: Kein Treffer
    Angenommen ein Filter, zu dem auf der Seite kein Eintrag passt
    Dann zeigt die Seite einen Hinweis
    Und eine Schaltfläche zum Zurücksetzen des Filters

  # EARS: FLT-UN-1
  Szenario: Einträge ohne bekannten Ort
    Angenommen ein Event ohne bekannten Ort
    Wenn ein Filter gesetzt ist
    Dann erscheint das Event nicht in der Eventliste
    Und ohne Filter erscheint es

  # EARS: FLT-UB-7
  Szenario: Auswahl aus den Daten
    Angenommen Orte, aber keine Bibliothek oder Archiv
    Dann bietet die Filterbedienung den Typ "Bibliothek/Archiv" nicht an
    Und die Orte sind nach Name sortiert

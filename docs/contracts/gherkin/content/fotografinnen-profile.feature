# language: de
Funktionalität: Profile der Fotograf:innen

  # EARS: PRF-UB-1
  Szenario: Person mit Profil ist gültig
    Angenommen die Person "Candida Höfer" mit Berufsbezeichnung "Fotografin", Lebensdaten 1944 bis "null", Wikipedia-Zusammenfassung und Portrait
    Wenn die Daten validiert werden
    Dann besteht die Validierung

  # EARS: PRF-UB-2
  Szenario: Wikipedia-Zusammenfassung mit Quellen
    Angenommen eine Zusammenfassung mit 39 Wörtern
    Wenn die Daten validiert werden
    Dann meldet die Validierung einen Fehler für "wikipedia.summary"
    Aber mit 40 und mit 90 Wörtern besteht die Validierung
    Und eine Quelle mit der Adresse "https://de.wikipedia.org/wiki/X" und dem Sprachcode "en" wird abgelehnt

  # EARS: PRF-UB-3
  Szenario: Portrait mit Bildnachweis
    Angenommen ein Portrait ohne "credit" oder ohne "license"
    Wenn die Daten validiert werden
    Dann meldet die Validierung einen Fehler
    Und eine Dateiseite außerhalb von "commons.wikimedia.org" wird abgelehnt

  # EARS: PRF-UN-1
  Szenario: Portraitdatei fehlt oder ist zu groß
    Angenommen ein Portrait, dessen Datei unter "data/portraits/" fehlt
    Wenn die Daten validiert werden
    Dann meldet die Validierung die fehlende Datei
    Und eine Datei mit 201 kB oder mit einer Breite über 400 Pixel wird als zu groß gemeldet

  # EARS: PRF-UN-2
  Szenario: Ungültige Lebensdaten
    Angenommen eine Person mit Todesjahr vor dem Geburtsjahr
    Wenn die Daten validiert werden
    Dann meldet die Validierung einen Fehler für "life"

  # EARS: PRF-UN-2
  Szenario: Doppelter Name
    Angenommen zwei Personen "Martin Parr" und " martin  parr "
    Wenn die Daten validiert werden
    Dann meldet die Validierung einen doppelten Namen

  # EARS: PRF-UB-4
  Szenario: Beschreibung nennt alle Fotograf:innen
    Angenommen eine Ausstellung mit den Personen "Martin Parr" und "Elliott Erwitt" und einer Beschreibung, die beide nennt
    Wenn die Daten validiert werden
    Dann besteht die Validierung

  # EARS: PRF-UB-4
  Szenario: Beschreibung ohne Namen
    Angenommen eine Ausstellung mit der Person "Martin Parr" und einer Beschreibung ohne diesen Namen
    Wenn die Daten validiert werden
    Dann meldet die Validierung den fehlenden Namen "Martin Parr"
    Und eine Ausstellung mit Person ohne Beschreibung wird ebenfalls gemeldet

  # EARS: PRF-UB-5
  Szenario: Portraits im Build
    Angenommen ein Datenbestand mit einem Portrait "data/portraits/martin-parr.jpg"
    Wenn die Daten für die Webanwendung zusammengeführt werden
    Dann liegt das Portrait unter "portraits/martin-parr.jpg" in der Webanwendung
    Und das zusammengeführte Ergebnis ist valide

  # EARS: PRF-UN-3
  Szenario: Art passt zur Zahl der Personen
    Angenommen eine Ausstellung der Art "solo" mit zwei Personen
    Wenn die Daten validiert werden
    Dann meldet die Validierung einen Fehler für "type"
    Und eine Ausstellung der Art "group" mit einer Person wird ebenfalls gemeldet
    Aber "retrospective" und "permanent" bestehen unabhängig von der Zahl der Personen

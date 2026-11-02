# language: de
Funktionalität: Abruf der Webseiten von Orten

  # EARS: FET-EV-1
  Szenario: Abruf von Startseite und Unterseiten
    Angenommen ein Ort mit einer Startseite, die sechs Links auf Programmseiten derselben Website und einen Link auf eine andere Website enthält
    Wenn der Abruf gestartet wird
    Dann werden die Startseite und höchstens fünf Unterseiten derselben Website abgerufen
    Und der Link auf die andere Website wird nicht abgerufen

  # EARS: FET-EV-1
  Szenario: Links mit und ohne www gehören zur selben Website
    Angenommen eine Startseite unter "www.example.org", deren Menülinks auf "example.org" zeigen
    Wenn der Abruf gestartet wird
    Dann werden die Unterseiten auf "example.org" abgerufen

  # EARS: FET-UB-1
  Szenario: robots.txt wird beachtet
    Angenommen eine robots.txt, die "/programm" verbietet
    Wenn der Abruf gestartet wird
    Dann wird "/programm" nicht abgerufen
    Und der Bericht nennt "/programm" als nicht erlaubt

  # EARS: FET-UB-2
  Szenario: Höflichkeitsregeln
    Angenommen drei Seiten desselben Hosts
    Wenn der Abruf gestartet wird
    Dann liegen zwischen den Anfragen mindestens 2 Sekunden
    Und eine Antwort über 2 MB wird verworfen
    Und eine Anfrage ohne Antwort wird nach 15 Sekunden abgebrochen

  # EARS: FET-UB-3
  Szenario: Kennung im User-Agent
    Angenommen die Kontaktadresse "redaktion@example.org"
    Wenn der Abruf gestartet wird
    Dann enthält der User-Agent den Projektnamen und "redaktion@example.org"
    Und ohne Kontaktadresse endet der Abruf mit Exit-Code 1 vor der ersten Anfrage

  # EARS: FET-UN-1
  Szenario: Seite nicht erreichbar
    Angenommen zwei Orte, von denen einer mit HTTP-Status 503 antwortet
    Wenn der Abruf gestartet wird
    Dann nennt der Bericht den fehlgeschlagenen Ort mit URL
    Und der andere Ort wird abgerufen
    Und der vorhandene Snapshot des fehlgeschlagenen Ortes bleibt unverändert

  # EARS: FET-UN-3 (ersetzt FET-UN-2)
  Szenario: Weiterleitung auf anderen Host
    Angenommen eine Startseite, die auf eine andere Website weiterleitet, die nicht in der Weiterleitungsdatei für den Ort steht
    Wenn der Abruf gestartet wird
    Dann wird der anderen Adresse nicht gefolgt
    Und der Bericht nennt die Weiterleitung mit Ausgangs- und Zieladresse

  # EARS: FET-UB-4
  Szenario: Snapshot wird gespeichert
    Angenommen eine abgerufene Seite
    Dann enthält der Snapshot URL, Abrufzeit, HTTP-Status, Inhaltshash und bereinigten Text
    Und die Datei liegt unter ".cache/snapshots/<venue-id>/"
    Und ".cache" ist von Git ausgeschlossen

  # EARS: FET-OP-1
  Szenario: Cache und Offline-Modus
    Angenommen ein Snapshot, der 2 Tage alt ist
    Wenn der Abruf ohne "--offline" und mit "--max-age 7" gestartet wird
    Dann wird keine Netzanfrage gesendet
    Wenn der Snapshot 10 Tage alt ist
    Dann wird die Seite neu abgerufen

  # EARS: FET-UB-5
  Szenario: Nur lesende Abrufe
    Angenommen eine Seite mit einem Link "ftp://example.org/x" und einem Anmeldeformular
    Wenn der Abruf gestartet wird
    Dann wird der ftp-Link nicht abgerufen
    Und das Formular wird nicht abgesendet

  # EARS: FET-OP-2
  Szenario: Abruf der Website eines Veranstalters
    Angenommen ein Veranstalter "photoszene-koeln" mit Website auf dem Testserver
    Wenn der Abruf mit "--venue photoszene-koeln" gestartet wird
    Dann liegen Snapshots unter ".cache/snapshots/photoszene-koeln/"
    Und die Regeln für robots.txt, Abstand und Kennung gelten wie bei Orten

  # EARS: FET-OP-3
  Szenario: Freigegebener Host im Datensatz
    Angenommen eine Weiterleitungsdatei mit Hosts für den Ort "a" und ohne Eintrag für den Ort "b"
    Wenn der Abruf gestartet wird
    Dann gelten für "a" der Host der Website und die Einträge als freigegeben
    Und für "b" gilt nur der Host der Website
    Und eine Datei mit ungültigem Hostnamen oder unbekannter Orts-ID beendet den Abruf mit Exit-Code 1 vor der ersten Anfrage

  # EARS: FET-UB-6, FET-EV-2
  Szenario: Weiterleitung auf freigegebenen Host
    Angenommen eine Startseite, die auf einen freigegebenen Host weiterleitet
    Wenn der Abruf gestartet wird
    Dann wird der Weiterleitung gefolgt
    Und Unterseiten des Zielhosts zählen als dieselbe Website

  # EARS: FET-UB-6
  Szenario: robots.txt des Zielhosts
    Angenommen eine Weiterleitung auf einen freigegebenen Host, dessen robots.txt "/" verbietet
    Wenn der Abruf gestartet wird
    Dann wird keine Seite des Zielhosts abgerufen
    Und der Bericht nennt den Zielhost als nicht erlaubt
    Und zwischen zwei Anfragen an denselben Host liegen mindestens 2 Sekunden

  # EARS: FET-UB-7
  Szenario: Weiterleitungsgrenze und Schleife
    Angenommen eine Kette aus vier Weiterleitungen und eine Weiterleitungsschleife auf freigegebenen Hosts
    Wenn der Abruf gestartet wird
    Dann endet die Anfrage nach höchstens drei Weiterleitungen
    Und der Bericht nennt Kette bzw. Schleife
    Und eine Weiterleitung von einem freigegebenen auf einen nicht freigegebenen Host wird nicht verfolgt
    Und eine Kette aus HTTP-, Meta-Refresh- und JavaScript-Weiterleitung endet nach drei Weiterleitungen

  # EARS: FET-UB-6, FET-UB-7, FET-UN-3, FET-UB-8
  Szenario: Meta-Refresh und JavaScript-Weiterleitung
    Angenommen eine Seite mit Meta-Refresh auf einen freigegebenen Host und eine Seite mit "window.location = 'https://frei.example.org/'" ohne weiteren Text
    Und eine Seite mit Meta-Refresh auf einen nicht freigegebenen Host
    Wenn der Abruf gestartet wird
    Dann wird den Weiterleitungen auf freigegebene Hosts gefolgt
    Und der Weiterleitung auf den nicht freigegebenen Host nicht, der Bericht nennt sie mit Ausgangs- und Zieladresse
    Und JavaScript wird nicht ausgeführt
    Und alle Weiterleitungsarten zählen zusammen zur Grenze von drei

  # EARS: FET-EV-2
  Szenario: Bericht und Snapshot nach Weiterleitung
    Angenommen eine verfolgte Weiterleitung von "alt.example.org" nach "neu.example.org"
    Wenn der Abruf beendet ist
    Dann nennt der Bericht "alt.example.org" und "neu.example.org"
    Und der Snapshot trägt die Adresse auf "neu.example.org" als URL


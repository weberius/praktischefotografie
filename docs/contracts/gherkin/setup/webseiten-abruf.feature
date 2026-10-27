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

  # EARS: FET-UN-2
  Szenario: Weiterleitung auf anderen Host
    Angenommen eine Startseite, die auf eine andere Website weiterleitet
    Wenn der Abruf gestartet wird
    Dann wird der anderen Adresse nicht gefolgt
    Und der Bericht nennt die Weiterleitung

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

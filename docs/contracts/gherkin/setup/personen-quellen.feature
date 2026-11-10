# language: de
Funktionalität: Eigene Quellen für Personen

  # EARS: PQL-UB-1
  Szenario: Eigene Adressen nur mit Person
    Wenn die Recherche mit "--url https://example.org/a" ohne "--photographer" und ohne "--name" gestartet wird
    Dann endet sie mit einem Hinweis
    Und es entsteht keine Anfrage an eine Seite

  # EARS: PQL-EV-1
  Szenario: Eigene Adressen in der Linksammlung
    Angenommen die Person "Saša Fuis" und eine Linksammlung mit "https://example.org/a"
    Wenn die Recherche mit "--url https://EXAMPLE.org/a/ --url https://example.org/b?utm_source=x#top" gestartet wird
    Dann enthält die Linksammlung "https://example.org/a" genau einmal und unverändert
    Und "https://example.org/b" steht mit "query" "manuell", Titel und Zeitstempel in der Linksammlung
    Und die Recherche schreibt einen Vorschlag für den Webkurztext, weil ein neuer Link hinzukam

  # EARS: PQL-UB-2
  Szenario: Eigene Seiten zuerst und höflich
    Angenommen zwei eigene Adressen, eine Seite mit "Disallow" in der "robots.txt" und zwölf Treffer der Websuche
    Wenn die Recherche mit den eigenen Adressen im Standardlauf gestartet wird
    Dann werden die erlaubten eigenen Seiten vor den Treffern abgerufen, höchstens zehn Seiten insgesamt
    Und mit "--no-web" werden nur die eigenen Seiten abgerufen und keine Suchanfrage gesendet
    Und die gesperrte Seite wird nicht abgerufen, nur im Bericht genannt

  # EARS: PQL-UN-1
  Szenario: Ungültige eigene Adresse
    Angenommen die eigenen Adressen "ftp://example.org/x", "http://localhost/y", "kein url" und "https://example.org/ok"
    Wenn die Recherche gestartet wird
    Dann werden die ersten drei weder übernommen noch abgerufen
    Und der Bericht nennt sie mit Grund
    Aber "https://example.org/ok" wird verarbeitet

  # EARS: PQL-EV-2
  Szenario: Bericht nennt eigene Adressen
    Angenommen eine übernommene, eine schon vorhandene, eine abgelehnte und eine gesperrte eigene Adresse
    Wenn der Lauf endet
    Dann nennt "updates/<Datum>/PHOTOGRAPHERS.md" je Person alle vier Adressen mit ihrem Ergebnis

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

  # EARS: PQL-EV-3
  Szenario: Sammeldatei in einem Lauf
    Angenommen eine Sammeldatei mit zwei bekannten Personen und je zwei Adressen
    Wenn die Recherche mit "--sources <datei> --no-web" gestartet wird
    Dann stehen alle vier Adressen mit "query" "manuell" in den Linksammlungen der jeweiligen Person
    Und die erlaubten Seiten werden je Person höchstens zehnmal abgerufen
    Und es entsteht keine Suchanfrage
    Und der Bericht nennt je Person alle Adressen mit Ergebnis

  # EARS: PQL-UN-2
  Szenario: Sammeldatei mit unbekannter Person oder Adresse
    Angenommen eine Sammeldatei mit der unbekannten "id" "gibt-es-nicht", einer Person mit leerer Adressliste und einer Person mit den Adressen "kein url", "" und "https://example.org/ok"
    Wenn die Recherche gestartet wird
    Dann werden die ersten beiden nicht verarbeitet
    Und der Bericht nennt sie mit Grund
    Aber "https://example.org/ok" wird für die dritte Person verarbeitet
    Und "kein url" wird abgelehnt und im Bericht genannt, die leere Adresse bleibt unbeachtet

  # EARS: PQL-UB-3
  Szenario: Sammeldatei nicht mit Einzelangaben
    Wenn die Recherche mit "--sources <datei> --url https://example.org/a" gestartet wird
    Dann endet sie mit einem Hinweis
    Und es entsteht keine Anfrage an eine Seite
    Und dasselbe gilt für eine nicht lesbare Datei oder eine Datei, die kein Objekt mit Adresslisten enthält

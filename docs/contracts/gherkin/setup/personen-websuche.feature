# language: de
Funktionalität: Recherche von Personen im Web

  # EARS: WSP-UB-1
  Szenario: Websuche nur auf Wunsch
    Angenommen ein Testserver für Suchmaschine und Trefferseiten
    Wenn die Recherche ohne "--web" gestartet wird
    Dann entsteht keine Anfrage an die Suchmaschine oder an eine Trefferseite
    Und "--web" ohne "--photographer" und ohne "--name" endet mit einem Hinweis

  # EARS: WSP-EV-1
  Szenario: Treffer werden festgehalten
    Angenommen die Person "Wendy Red Star" und ein Testserver mit zwölf Treffern je Anfrage
    Wenn die Websuche gestartet wird
    Dann gehen höchstens drei Suchanfragen an die Suchmaschine
    Und "photographers-search.json" enthält je Anfrage höchstens zehn Treffer mit Titel, URL, Textauszug, Suchanfrage und Abrufdatum

  # EARS: WSP-UB-2
  Szenario: Linksammlung wird fortgeschrieben
    Angenommen eine Linksammlung mit dem Link "https://example.org/a" und Treffer mit "https://EXAMPLE.org/a/", "https://example.org/b?utm_source=x#top", "ftp://example.org/c" und "https://example.org/d"
    Wenn die Links übernommen werden
    Dann enthält die Linksammlung "https://example.org/a" genau einmal und unverändert
    Und "https://example.org/b" und "https://example.org/d" sind neu
    Und "ftp://example.org/c" fehlt

  # EARS: WSP-UB-3
  Szenario: Trefferseiten höflich abrufen
    Angenommen Treffer auf eine Seite mit "Disallow" in der "robots.txt", eine Seite mit Weiterleitung auf eine andere Website und sieben erlaubte Seiten
    Wenn die Trefferseiten abgerufen werden
    Dann wird die gesperrte Seite nicht abgerufen und im Bericht genannt
    Und der Weiterleitung wird nicht gefolgt
    Und höchstens fünf Seiten werden abgerufen, mit mindestens zwei Sekunden Abstand je Website
    Und der User-Agent enthält Projektname und Kontaktadresse
    Und Snapshots liegen unter ".cache/snapshots/wendy-red-star/"

  # EARS: WSP-OP-1
  Szenario: Offline und Cache der Suche
    Angenommen eine zwischengespeicherte Suchantwort
    Wenn die Websuche mit "--offline" oder innerhalb von "--max-age" gestartet wird
    Dann entsteht keine Anfrage an die Suchmaschine
    Und die zwischengespeicherte Antwort wird verwendet

  # EARS: WSP-UN-1
  Szenario: Suche ohne Treffer
    Angenommen eine Person, für die die Suche einen Fehler liefert, und eine Person ohne Treffer
    Wenn die Websuche gestartet wird
    Dann bleiben beide Personen unverändert
    Und der Bericht nennt den jeweiligen Grund
    Und die übrigen Personen werden weiter bearbeitet

  # EARS: WSP-EV-2
  Szenario: Neue Person wird angelegt
    Angenommen keine Person "Ülkü Müller-Öz" in "data/photographers.json"
    Wenn die Websuche mit --name "Ülkü Müller-Öz" gestartet und der Vorschlag freigegeben wird
    Dann enthält "data/photographers.json" eine Person mit id "uelkue-mueller-oez" und dem Namen "Ülkü Müller-Öz"
    Und die Daten sind valide

  # EARS: WSP-UN-2
  Szenario: Vorhandene Person wird nicht doppelt angelegt
    Angenommen die Person "Man Ray" in "data/photographers.json"
    Wenn die Websuche mit --name "  man  ray " gestartet wird
    Dann schlägt die Recherche keinen neuen Eintrag vor
    Und die vorhandene Person "man-ray" wird verwendet

  # EARS: WSP-EV-3
  Szenario: Neue Ergebnisse fließen in den Kurztext
    Angenommen eine Person mit Linksammlung und ein Lauf mit einem neuen Link
    Wenn die Websuche gestartet wird
    Dann schreibt der Skill einen Vorschlag für den Webkurztext
    Und die Quellen des Vorschlags nennen den neuen Link

  # EARS: WSP-EV-3
  Szenario: Keine neuen Links, kein neuer Kurztext
    Angenommen eine Person mit Webkurztext und ein Lauf, dessen Treffer alle schon in der Linksammlung stehen
    Wenn die Websuche gestartet wird
    Dann schreibt der Skill keinen Vorschlag für den Webkurztext
    Und der vorhandene Webkurztext bleibt unverändert

  # EARS: WSP-UB-4
  Szenario: Webkurztext wird geprüft
    Angenommen Webkurztexte mit 39, 40, 90 und 91 Wörtern, einer wörtlichen Übernahme von acht Wörtern, einer Quelle außerhalb der Linksammlung und sechs Quellen
    Wenn die Vorschläge geprüft werden
    Dann bleibt nur der Vorschlag mit 40 bzw. 90 Wörtern, ohne wörtliche Übernahme, mit Quellen aus der Linksammlung und höchstens fünf Quellen gültig
    Und die übrigen werden mit Grund verworfen

  # EARS: WSP-UB-5
  Szenario: Bilder nur von Commons
    Angenommen ein Treffer mit einem Bild von "https://example.org/foto.jpg" und eine Person mit freiem Portrait auf Commons
    Wenn die Recherche läuft und ein Vorschlag das Bild von "example.org" angibt
    Dann wird das Bild von "example.org" nicht geladen
    Und der Vorschlag mit diesem Bild wird verworfen
    Aber das Portrait von Commons mit freier Lizenz und Urheber wird wie bisher übernommen

  # EARS: WSP-UB-6
  Szenario: Übernahme nach Freigabe
    Angenommen ein geprüfter Webkurztext ohne Freigabe und einer mit Freigabe für eine Person mit vorhandenem Webkurztext
    Wenn die Übernahme ohne "--force" gestartet wird
    Dann bleiben "data/photographers.json" und "data/portraits/" unverändert
    Und mit "--force" und Freigabe wird der vorhandene Webkurztext ersetzt
    Und bei ungültigen Daten werden alle Änderungen zurückgenommen

  # EARS: WSP-EV-4
  Szenario: Bericht der Websuche
    Wenn ein Lauf mit "--web" endet
    Dann enthält "updates/<Datum>/PHOTOGRAPHERS.md" Anzahl der Suchanfragen, Treffer, neuen Links, angelegten Personen und aktualisierten Webkurztexte
    Und je Person die Suchmaschine und die genutzten Links

  # EARS: WSP-UB-7
  Szenario: Skill schreibt nur aus den Quellen
    Angenommen der Skill mit seinen Regeln
    Dann verlangt er eigene Formulierung, 40 bis 90 Wörter, keine Angaben außerhalb der Textauszüge und Snapshots, den Verzicht auf widersprüchliche Angaben und die Freigabe vor der Übernahme

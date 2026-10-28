# language: de
Funktionalität: Recherche der Fotograf:innen über Wikipedia

  # EARS: RSF-UB-1
  Szenario: Skill ist vorhanden
    Angenommen das Projektverzeichnis
    Dann existiert ".claude/skills/research-photographers/SKILL.md"
    Und der Skill nennt Name, Beschreibung und Aufrufbeispiele

  # EARS: RSF-EV-1
  Szenario: Kandidat wird über Wikidata aufgelöst
    Angenommen die Person "August Sander" ohne Profil und ein Testserver für Wikipedia und Wikidata
    Wenn der Abruf gestartet wird
    Dann enthält "photographers-candidates.json" Wikidata-ID, Berufsbezeichnung, Lebensjahre, Artikelsprachen, Anfangstexte und das Bild
    Und nur Einträge mit dem Beruf Fotograf:in oder Künstler:in laut Wikipedia kommen infrage

  # EARS: RSF-UB-2
  Szenario: Sprachreihenfolge
    Angenommen Artikel in "pt", "en", "de", "fr" und "ja"
    Wenn der Abruf gestartet wird
    Dann stehen die Artikel in der Reihenfolge "de", "en", "fr" in der Kandidatendatei
    Und höchstens drei Artikel werden aufgenommen

  # EARS: RSF-UN-1
  Szenario: Person nicht gefunden oder mehrdeutig
    Angenommen eine Person ohne passenden Eintrag und eine Person mit zwei gleich gut passenden Einträgen
    Wenn der Abruf gestartet wird
    Dann bleiben beide Personen unverändert
    Und der Bericht nennt sie als "nicht gefunden" bzw. "mehrdeutig"

  # EARS: RSF-UB-3
  Szenario: Höfliche Abrufe nur an Wikimedia
    Angenommen ein Abruf über den Testserver
    Dann gehen alle Anfragen an erlaubte Wikimedia-Hosts
    Und zwischen zwei Anfragen liegt mindestens eine Sekunde
    Und der User-Agent enthält Projektname und Kontaktadresse
    Und ohne Kontaktadresse wird nicht abgerufen

  # EARS: RSF-OP-1
  Szenario: Offline und Cache
    Angenommen zwischengespeicherte Antworten
    Wenn der Abruf mit "--offline" oder innerhalb von "--max-age" gestartet wird
    Dann entsteht keine Netzanfrage

  # EARS: RSF-UB-4
  Szenario: Portrait mit freier Lizenz
    Angenommen ein Bild mit Lizenz "CC BY-SA 4.0", Urheber und Dateiseite
    Wenn der Abruf gestartet wird
    Dann liegt ein Vorschaubild mit höchstens 400 Pixel Breite unter ".cache/portraits/<id>.jpg"
    Und der Vorschlag enthält Urheber, Lizenz, Lizenz-URL und Dateiseite

  # EARS: RSF-UB-4
  Szenario: Bild ohne freie Lizenz
    Angenommen ein Bild ohne freie Lizenz oder ohne Urheber
    Wenn der Abruf gestartet wird
    Dann wird kein Bild geladen
    Und der Bericht nennt den Grund

  # EARS: RSF-UB-5
  Szenario: Zusammenfassung wird geprüft
    Angenommen Vorschläge mit 39, 40, 90 und 91 Wörtern, einer wörtlichen Übernahme von acht Wörtern und einer Quelle, die nicht in der Kandidatendatei steht
    Wenn die Vorschläge geprüft werden
    Dann bleiben nur die Vorschläge mit 40 und 90 Wörtern ohne wörtliche Übernahme gültig
    Und die übrigen werden mit Grund verworfen

  # EARS: RSF-UB-6
  Szenario: Übernahme nur nach Freigabe
    Angenommen ein geprüfter Vorschlag ohne Freigabe
    Wenn die Übernahme gestartet wird
    Dann bleiben "data/photographers.json" und "data/portraits/" unverändert

  # EARS: RSF-UB-6
  Szenario: Kein Überschreiben ohne Force
    Angenommen eine Person mit vorhandener Wikipedia-Zusammenfassung und ein freigegebener neuer Vorschlag
    Wenn die Übernahme ohne "--force" gestartet wird
    Dann bleibt die vorhandene Zusammenfassung erhalten
    Und mit "--force" und Freigabe wird sie ersetzt

  # EARS: RSF-UN-2
  Szenario: Übernahme wird zurückgerollt
    Angenommen ein freigegebener Vorschlag, der zu ungültigen Daten führt
    Wenn die Übernahme gestartet wird
    Dann sind "data/photographers.json" und "data/portraits/" unverändert
    Und die Fehler werden ausgegeben

  # EARS: RSF-EV-2
  Szenario: Bericht der Recherche
    Wenn ein Lauf endet
    Dann enthält "updates/<Datum>/PHOTOGRAPHERS.md" die Zahlen und je Person Sprache und Lizenz

  # EARS: RSF-OP-2
  Szenario: Einzelne Person
    Angenommen Personen mit und ohne Profil
    Wenn "--photographer august-sander" angegeben ist
    Dann wird nur diese Person bearbeitet
    Und eine unbekannte ID endet mit Exit-Code 1 und nennt die gültigen IDs

  # EARS: RSF-UB-7
  Szenario: Skill schreibt nur aus den Quellen
    Angenommen der Skill mit seinen Regeln
    Dann verlangt er eigene Formulierung, 40 bis 90 Wörter, keine Angaben außerhalb der Anfangstexte und die Freigabe vor der Übernahme

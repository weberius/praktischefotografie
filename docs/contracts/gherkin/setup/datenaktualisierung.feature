# language: de
Funktionalität: Aktualisierung der Daten aus Webseiten

  # EARS: UPD-EV-1
  Szenario: Vorschlagsdatei wird erzeugt
    Angenommen ein Ort ohne "district" und ein Snapshot, der den Stadtteil nennt
    Wenn die Extraktion gestartet wird
    Dann enthält "updates/2026-10-27/<venue-id>.json" einen Vorschlag für "district"
    Und der Vorschlag nennt alten Wert, neuen Wert, URL, Textauszug und die Art "ergänzt"

  # EARS: UPD-UB-1
  Szenario: Nur schemakonforme Vorschläge
    Angenommen ein extrahierter Vorschlag mit unzulässigem Typ "kamerahandel"
    Wenn die Vorschläge geprüft werden
    Dann wird der Vorschlag verworfen
    Und der Bericht nennt den Grund

  # EARS: UPD-UB-2
  Szenario: Vorschlag ohne Fundstelle
    Angenommen ein extrahierter Vorschlag, dessen Textauszug den neuen Wert nicht enthält
    Wenn die Vorschläge geprüft werden
    Dann wird der Vorschlag verworfen

  # EARS: UPD-UB-3
  Szenario: Keine Überschreibung ohne Freigabe
    Angenommen ein Vorschlag, der die vorhandene Straße "Alte Straße 1" in "Neue Straße 2" ändert
    Wenn die Übernahme ohne Freigabe gestartet wird
    Dann bleibt "Alte Straße 1" erhalten
    Wenn der Vorschlag freigegeben wird
    Dann steht "Neue Straße 2" in den Daten

  # EARS: UPD-EV-2
  Szenario: Freigegebene Vorschläge werden übernommen
    Angenommen ein freigegebener Vorschlag für "features.libraryNotes" mit Fundstelle "https://example.org/bibliothek" und Abrufdatum 2026-10-27
    Wenn die Übernahme gestartet wird
    Dann steht der neue Wert in "data/venues.json"
    Und "source.url" ist "https://example.org/bibliothek"
    Und "source.checkedAt" ist "2026-10-27"
    Und "source.status" ist unverändert

  # EARS: UPD-UB-4
  Szenario: Verifizierte Orte bleiben geschützt
    Angenommen ein Ort mit "source.status" "verifiziert" und ein Vorschlag dafür
    Wenn die Übernahme gestartet wird
    Dann ist der Vorschlag als "Konflikt" gekennzeichnet
    Und er wird nicht automatisch übernommen
    Und "source.status" bleibt "verifiziert"

  # EARS: UPD-UN-1
  Szenario: Übernahme wird zurückgerollt
    Angenommen ein freigegebener Vorschlag, der nach der Übernahme die Validierung verletzt
    Wenn die Übernahme gestartet wird
    Dann enden die Änderungen mit Exit-Code 1
    Und die Dateien in "data/" sind unverändert
    Und die Validierungsfehler werden ausgegeben

  # EARS: UPD-UB-5
  Szenario: Keine Dubletten
    Angenommen eine vorhandene Ausstellung mit gleichem Ort, Titel und Beginn
    Wenn dieselbe Ausstellung extrahiert wird
    Dann entsteht kein Vorschlag
    Und eine neue Ausstellung erhält eine eindeutige kebab-case-id

  # EARS: UPD-EV-3
  Szenario: Bericht am Laufende
    Angenommen ein Lauf mit zwei abgerufenen Orten, einem fehlgeschlagenen und einem Konflikt
    Wenn der Lauf endet
    Dann nennt "updates/2026-10-27/REPORT.md" die Anzahl abgerufener, fehlgeschlagener und übersprungener Orte
    Und die Anzahl der Vorschläge je Art
    Und den Konflikt

  # EARS: UPD-OP-1
  Szenario: Einzelner Ort oder alle
    Angenommen 20 Orte
    Wenn der Lauf mit "--venue makk-koeln" gestartet wird
    Dann wird nur "makk-koeln" bearbeitet
    Wenn der Lauf ohne "--venue" gestartet wird
    Dann werden alle 20 Orte bearbeitet

  # EARS: UPD-UN-2
  Szenario: Unbekannte Ort-ID
    Angenommen die Ort-ID "gibt-es-nicht"
    Wenn der Lauf mit "--venue gibt-es-nicht" gestartet wird
    Dann endet er mit Exit-Code 1
    Und die Meldung nennt die gültigen IDs

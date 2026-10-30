# language: de
Funktionalität: Datenmodell und Venue-Datenbestand
  Die Datenbasis führt Foto-Orte in NRW in einem validierten JSON-Datenmodell.

  # EARS: DAT-UB-1
  Szenario: Jeder Datensatztyp hat ein Schema
    Angenommen das Verzeichnis "schema" der Datenbasis
    Dann existiert je ein Schema für venues, exhibitions, events, organizers, photographers und posts

  # EARS: DAT-UB-2, DAT-UB-4
  Szenario: Venue-Datensatz ist vollständig
    Angenommen eine Venue ohne das Feld "<feld>"
    Wenn die Daten validiert werden
    Dann meldet die Validierung einen Fehler zum Feld "<feld>"

    Beispiele:
      | feld      |
      | id        |
      | name      |
      | shortName |
      | type      |
      | city      |
      | address   |
      | website   |
      | features  |
      | source    |

  # EARS: DAT-UB-3
  Szenario: Venue-Typ ist ein erlaubter Wert
    Angenommen eine Venue mit dem Typ "<typ>"
    Wenn die Daten validiert werden
    Dann ist die Venue "<ergebnis>"

    Beispiele:
      | typ             | ergebnis |
      | museum          | gültig   |
      | library_archive | gültig   |
      | kamerahandel    | ungültig |

  # EARS: DAT-OP-1
  Szenario: Präsenzbibliothek erfordert Hinweistext
    Angenommen eine Venue mit hasReferenceLibrary "true" und ohne libraryNotes
    Wenn die Daten validiert werden
    Dann meldet die Validierung einen Fehler zu "libraryNotes"

  # EARS: DAT-UN-1, VAL-UN-5
  Szenario: Ausstellung endet nicht vor Beginn
    Angenommen eine Ausstellung mit startDate "2026-11-01" und endDate "2026-10-01"
    Wenn die Daten validiert werden
    Dann meldet die Validierung einen Fehler zur Ausstellung

  # EARS: VEN-UB-1
  Szenario: Datenbestand enthält 20 bis 30 Venues
    Angenommen der Datenbestand in "data/venues.json"
    Dann enthält er mindestens 20 und höchstens 30 Venues

  # EARS: VEN-UB-2
  Szenario: Koordinaten liegen in NRW
    Angenommen der Datenbestand in "data/venues.json"
    Dann liegt jede Venue mit lat zwischen 50.3 und 52.6 und lng zwischen 5.8 und 9.5

  # EARS: VEN-UB-3
  Szenario: Venue-IDs sind eindeutig und kebab-case
    Angenommen der Datenbestand in "data/venues.json"
    Dann ist jede id eindeutig und in kebab-case

  # EARS: VEN-UB-4
  Szenario: Kernstädte sind vertreten
    Angenommen der Datenbestand in "data/venues.json"
    Dann enthält er mindestens eine Venue in Monschau, Köln, Düsseldorf, Essen und Gelsenkirchen

  # EARS: VEN-UB-5
  Szenario: Jede Venue nennt Quelle und Prüfstand
    Angenommen der Datenbestand in "data/venues.json"
    Dann hat jede Venue eine source mit url, checkedAt und status

  # EARS: DAT-UB-6
  Szenariogrundriss: Beitrag mit Kurzvorschau
    Angenommen ein Beitrag mit excerpt "<excerpt>"
    Wenn die Daten validiert werden
    Dann ist der Beitrag "<ergebnis>"

    Beispiele:
      | excerpt                 | ergebnis |
      | Kurzer Text.            | gültig   |
      |                         | ungültig |

  # EARS: DAT-UB-7
  Szenario: Event-Typ Finissage ist gültig
    Angenommen ein Event mit "eventType" "finissage" und allen Pflichtfeldern
    Wenn die Daten validiert werden
    Dann ist der Datensatz gültig
    Und ein Event mit "eventType" "unbekannt" ist ungültig

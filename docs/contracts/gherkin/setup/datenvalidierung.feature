# language: de
Funktionalität: Datenvalidierung
  Der Validator schützt die Datenbasis vor Schema- und Referenzfehlern.

  # EARS: VAL-EV-1, VAL-EV-2
  Szenario: Gültige Daten bestehen die Validierung
    Angenommen ein Datenverzeichnis mit gültigen Daten
    Wenn die Validierung gestartet wird
    Dann endet sie mit Exit-Code 0
    Und die Ausgabe nennt die Anzahl der Datensätze je Datei

  # EARS: VAL-UN-1
  Szenario: Schemaverstoß wird gemeldet
    Angenommen eine Venue mit der id "x-test" und ungültiger zip "12"
    Wenn die Validierung gestartet wird
    Dann endet sie mit Exit-Code 1
    Und die Meldung nennt "venues.json", die id "x-test", den Pfad "address/zip" und die verletzte Regel

  # EARS: VAL-UN-2
  Szenario: Unbekannte Referenz wird gemeldet
    Angenommen eine Ausstellung "a-1" mit venueId "gibt-es-nicht"
    Wenn die Validierung gestartet wird
    Dann endet sie mit Exit-Code 1
    Und die Meldung nennt "exhibitions.json", die id "a-1" und das Feld "venueId"

  # EARS: VAL-UN-3
  Szenario: Doppelte ID wird gemeldet
    Angenommen zwei Venues mit der id "doppelt"
    Wenn die Validierung gestartet wird
    Dann endet sie mit Exit-Code 1
    Und die Meldung nennt die id "doppelt"

  # EARS: VAL-UN-4
  Szenario: Koordinaten außerhalb NRW werden gemeldet
    Angenommen eine Venue mit lat 48.1 und lng 11.6
    Wenn die Validierung gestartet wird
    Dann endet sie mit Exit-Code 1
    Und die Meldung nennt die Venue

  # EARS: VAL-UB-1
  Szenario: Validierung greift nicht auf das Netz zu
    Angenommen ein blockierter Netzwerkzugriff
    Wenn die Validierung gestartet wird
    Dann endet sie ohne Netzwerkfehler

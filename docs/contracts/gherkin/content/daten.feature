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

  # VEN-UB-1 (höchstens 30 Venues) ist durch VEN-UB-8 ersetzt; das frühere Szenario
  # „Datenbestand enthält 20 bis 30 Venues“ entfällt.

  # EARS: VEN-UB-8
  Szenario: Datenbestand enthält 20 bis 60 Venues
    Angenommen der Datenbestand in "data/venues.json"
    Dann enthält er mindestens 20 und höchstens 60 Venues

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

  # EARS: DAT-UB-8
  Szenario: Event-Typ Führung ist gültig
    Angenommen ein Event mit "eventType" "guided_tour" und allen Pflichtfeldern
    Wenn die Daten validiert werden
    Dann ist der Datensatz gültig

  # EARS: DAT-UB-9
  Szenario: Event mit Uhrzeit ist gültig
    Angenommen ein Event mit allen Pflichtfeldern, "startTime" "16:00", "endTime" "18:00" und "timeZone" "Europe/Berlin"
    Wenn die Daten validiert werden
    Dann ist der Datensatz gültig

  # EARS: DAT-UB-9
  Szenario: Uhrzeitfelder sind optional
    Angenommen ein Event mit allen Pflichtfeldern ohne "startTime", "endTime" und "timeZone"
    Wenn die Daten validiert werden
    Dann ist der Datensatz gültig
    Und die vorhandenen Events in "data/events.json" sind weiterhin gültig

  # EARS: DAT-UB-10
  Szenario: Zeitzone und Dauer werden nicht gespeichert
    Angenommen ein Event mit "startTime" "16:00" ohne "endTime" und ohne "timeZone"
    Wenn die Daten validiert werden
    Dann ist der Datensatz gültig
    Und der Datensatz enthält weder "endTime" noch "timeZone"
    Und die Anwendung nimmt als Zeitzone "Europe/Berlin" an

  # EARS: VEN-UB-6, VEN-UB-7
  Szenariogrundriss: Neue Venues sind im Katalog
    Angenommen der Datenbestand in "data/venues.json"
    Dann enthält er eine Venue mit der id "<id>", dem type "<typ>" und der city "<stadt>"
    Und ihre website lautet "<website>"
    Und sie hat eine source mit url, checkedAt und status
    Und der Datenbestand besteht die Validierung

    Beispiele:
      | id                          | typ     | stadt | website                          |
      | forum-fuer-fotografie-koeln | gallery | Köln  | https://de.forum-fotografie.info/ |
      | kunstmuseum-bonn            | museum  | Bonn  | https://www.kunstmuseum-bonn.de/de/ |

  # EARS: VEN-UB-9, VEN-UB-10, VEN-UB-11
  Szenariogrundriss: Düsseldorfer Orte sind im Katalog
    Angenommen der Datenbestand in "data/venues.json"
    Dann enthält er eine Venue mit der id "<id>", dem type "<typ>" und der city "Düsseldorf"
    Und sie hat eine source mit url, checkedAt und status
    Und sie hat eine website
    Und der Datenbestand besteht die Validierung

    Beispiele:
      | id                                  | typ        |
      | k20-duesseldorf                     | museum     |
      | k21-duesseldorf                     | museum     |
      | stadtmuseum-duesseldorf             | museum     |
      | filmmuseum-duesseldorf              | museum     |
      | leica-galerie-duesseldorf           | gallery    |
      | galerie-noir-blanche-duesseldorf    | gallery    |
      | galerie-voss-duesseldorf            | gallery    |
      | lumas-duesseldorf                   | gallery    |
      | sammlung-philara-duesseldorf        | off_space  |
      | plan-d-produzentengalerie-duesseldorf | off_space |
      | gerhart-hauptmann-haus-duesseldorf  | foundation |
      | polnisches-institut-duesseldorf     | foundation |

  # EARS: VEN-UB-9, VEN-UB-10, VEN-UB-11
  Szenario: Düsseldorfer Orte liegen in Düsseldorf
    Angenommen der Datenbestand in "data/venues.json"
    Dann liegt jede Venue mit der city "Düsseldorf" mit lat zwischen 51.12 und 51.36 und lng zwischen 6.65 und 6.95

  # EARS: VEN-UB-12, VEN-UB-13, VEN-UB-14
  Szenariogrundriss: Dortmunder Orte sind im Katalog
    Angenommen der Datenbestand in "data/venues.json"
    Dann enthält er eine Venue mit der id "<id>", dem type "<typ>" und der city "Dortmund"
    Und sie hat eine source mit url, checkedAt und status
    Und sie hat eine website
    Und der Datenbestand besteht die Validierung

    Beispiele:
      | id                              | typ        |
      | projektraum-fotografie-dortmund | off_space  |
      | kulturort-depot-dortmund        | off_space  |
      | kunsthalle-dortmund             | gallery    |
      | fh-dortmund-design-dortmund     | foundation |

  # EARS: VEN-UB-12, VEN-UB-13, VEN-UB-14
  Szenario: Dortmunder Orte liegen in Dortmund
    Angenommen der Datenbestand in "data/venues.json"
    Dann liegt jede Venue mit der city "Dortmund" mit lat zwischen 51.40 und 51.62 und lng zwischen 7.30 und 7.66

  # EARS: VEN-UB-15, VEN-UB-16
  Szenariogrundriss: Essener Orte sind im Katalog
    Angenommen der Datenbestand in "data/venues.json"
    Dann enthält er genau eine Venue mit der id "<id>", dem type "<typ>" und der city "Essen"
    Und sie hat eine source mit url, checkedAt und status
    Und sie hat eine website
    Und der Datenbestand besteht die Validierung

    Beispiele:
      | id                                      | typ        |
      | folkwang-universitaet-der-kuenste-essen | foundation |
      | museum-folkwang-essen                   | museum     |
      | ruhr-museum-essen                       | museum     |

  # EARS: VEN-UB-15, VEN-UB-16
  Szenario: Essener Orte liegen in Essen
    Angenommen der Datenbestand in "data/venues.json"
    Dann liegt jede Venue mit der city "Essen" mit lat zwischen 51.35 und 51.55 und lng zwischen 6.90 und 7.20

  # EARS: VEN-UB-17, VEN-UB-18
  Szenariogrundriss: Weitere NRW-Orte sind im Katalog
    Angenommen der Datenbestand in "data/venues.json"
    Dann enthält er genau eine Venue mit der id "<id>", dem type "<typ>" und der city "<stadt>"
    Und sie hat eine source mit url, checkedAt und status
    Und sie hat eine website
    Und der Datenbestand besteht die Validierung

    Beispiele:
      | id                                       | typ        | stadt                 |
      | japanisches-kulturinstitut-koeln         | foundation | Köln                  |
      | gasometer-oberhausen                     | gallery    | Oberhausen            |
      | camera-obscura-muelheim-an-der-ruhr      | museum     | Mülheim an der Ruhr   |
      | von-der-heydt-museum-wuppertal           | museum     | Wuppertal             |
      | kunstmuseen-krefeld                      | museum     | Krefeld               |
      | lwl-museum-fuer-kunst-und-kultur-muenster | museum    | Münster               |

  # EARS: VEN-UB-19
  Szenariogrundriss: Weitere NRW-Orte liegen in ihrer Stadt
    Angenommen der Datenbestand in "data/venues.json"
    Dann liegt die Venue mit der id "<id>" mit lat zwischen <lat_min> und <lat_max> und lng zwischen <lng_min> und <lng_max>

    Beispiele:
      | id                                        | lat_min | lat_max | lng_min | lng_max |
      | japanisches-kulturinstitut-koeln          | 50.85   | 51.05   | 6.80    | 7.15    |
      | gasometer-oberhausen                      | 51.43   | 51.54   | 6.77    | 6.91    |
      | camera-obscura-muelheim-an-der-ruhr       | 51.38   | 51.50   | 6.78    | 6.95    |
      | von-der-heydt-museum-wuppertal            | 51.20   | 51.32   | 7.00    | 7.30    |
      | kunstmuseen-krefeld                       | 51.28   | 51.40   | 6.50    | 6.70    |
      | lwl-museum-fuer-kunst-und-kultur-muenster | 51.90   | 52.02   | 7.55    | 7.70    |

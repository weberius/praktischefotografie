# language: de
Funktionalität: Badges von Ausstellungen

  # EARS: BDG-UB-1
  Szenariogrundriss: Art der Ausstellung nach Zahl der Personen
    Angenommen eine Ausstellung der gespeicherten Art "<gespeichert>" mit <personen> verknüpften Personen
    Dann trägt sie das Badge "<art>"
    Beispiele:
    | gespeichert | personen | art |
    | group | 2 | Gruppenausstellung |
    | solo | 1 | Einzelausstellung |
    | group | 57 | Gruppenausstellung |
    | retrospective | 1 | Retrospektive |
    | permanent | 3 | Dauerausstellung |
    | solo | 0 | Einzelausstellung |
    | group | 0 | Gruppenausstellung |

  # EARS: BDG-UB-2
  Szenariogrundriss: Reihenfolge der Badges je Seite
    Angenommen eine Gruppenausstellung mit dem Status "Endet bald"
    Wenn die Seite "<seite>" aufgerufen wird
    Dann steht in der Badge-Zeile zuerst "Gruppenausstellung" und danach "<zweites>"
    Beispiele:
    | seite | zweites |
    | Kalender | Endet bald |
    | Magazin (Beitrag mit Anlass endet-bald) | Endet bald |
    | Beitragsseite | Endet bald |
    | Ausstellungen (Liste) | Endet bald |
    | Ausstellungsdetail | Endet bald |

  # EARS: BDG-UB-3
  Szenario: Abstand zwischen Badges
    Angenommen eine Badge-Zeile mit zwei Badges auf einer der Seiten
    Dann beträgt der horizontale Abstand zwischen den Badges 0,25 em
    Und ein einzelnes Badge hat keinen zusätzlichen Abstand

  # EARS: BDG-UB-4
  Szenario: Badges sind Text
    Angenommen eine Badge-Zeile auf einer der Seiten
    Dann stehen Art, Status und Anlass als Text im Dokument und nicht nur als Farbe

  # EARS: BDG-UB-5
  Szenario: Abstand zur vorhergehenden und nachfolgenden Zeile
    Angenommen eine Karte mit Datum, Badge-Zeile und Überschrift
    Dann beträgt der vertikale Abstand der Badge-Zeile zur vorhergehenden und zur nachfolgenden Zeile 0,75 rem
    Und steht die Badge-Zeile am Anfang der Karte, entfällt der obere Abstand

  # EARS: BDG-UB-6
  Szenariogrundriss: Badge-Zeile in Ausstellungskarten anderer Seiten
    Angenommen eine Einzelausstellung, die läuft
    Wenn die Seite "<seite>" aufgerufen wird
    Dann beginnt die Karte der Ausstellung mit den Badges "Einzelausstellung" und danach "Laufend"
    Und danach folgt die Überschrift
    Beispiele:
    | seite |
    | Ortsseite |
    | Personenseite |
    | Veranstalterseite |
    | Festivalseite |

  # EARS: BDG-UB-7
  Szenario: Offizieller Partner in der Badge-Zeile
    Angenommen eine Ausstellung eines Festivals als offizieller Partner
    Wenn die Festivalseite aufgerufen wird
    Dann zeigt die Badge-Zeile nacheinander die Art, den Status und "Offizieller Partner"

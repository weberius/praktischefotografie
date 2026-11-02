# language: de
Funktionalität: Events favorisieren

  Grundlage:
    Angenommen heute ist der 2026-10-27
    Und die Events "e-talk" "Artist Talk" (talk) und "e-workshop" "Workshop" (workshop)
    Und die Ausstellung "a-kommend" in der Agenda

  # EARS: FAV-UB-1
  Szenariogrundriss: Umschalter auf Liste, Detail und Agenda
    Wenn "<seite>" aufgerufen wird
    Dann hat das Event "Artist Talk" einen Umschalter "Favorit" mit Zustand "nicht gewählt"
    Und sein zugänglicher Name nennt "Artist Talk"
    Und die Ausstellung in der Agenda hat keinen Umschalter
    Beispiele:
    | seite |
    | /events |
    | /events/e-talk |
    | /calendar |

  # EARS: FAV-EV-1
  Szenario: Markieren und Aufheben
    Angenommen "/events" ist geöffnet
    Wenn der Umschalter von "Artist Talk" betätigt wird
    Dann ist "Artist Talk" als Favorit markiert und der Zustand steht in Text und für Screenreader
    Wenn er erneut betätigt wird
    Dann ist "Artist Talk" nicht mehr markiert

  # EARS: FAV-UB-2
  Szenario: Zustand gilt über Seiten hinweg
    Angenommen "Artist Talk" wurde auf "/events" als Favorit markiert
    Wenn über die Anwendung "/events/e-talk" und danach "/calendar" geöffnet werden
    Dann ist "Artist Talk" auf beiden Seiten als Favorit markiert
    Und "Workshop" ist nicht markiert

  # EARS: FAV-UB-3
  Szenario: Neuladen entfernt Favoriten
    Angenommen "Artist Talk" ist als Favorit markiert
    Wenn die Anwendung neu geladen wird
    Dann ist kein Event als Favorit markiert
    Und für Favoriten wurden weder Cookies noch Web-Speicher noch Netzanfragen verwendet

  # EARS: FAV-UB-4
  Szenario: Eventliste nur mit Favoriten
    Angenommen "Artist Talk" ist als Favorit markiert
    Wenn auf "/events" die Option "Nur Favoriten" gewählt wird
    Dann erscheint nur "Artist Talk"
    Und mit dem Typfilter "workshop" erscheint der Hinweis aus „Keine Favoriten“

  # EARS: FAV-ST-1
  Szenario: Keine Favoriten
    Angenommen kein Event ist Favorit
    Wenn auf "/events" die Option "Nur Favoriten" gewählt wird
    Dann zeigt die Anwendung den Hinweis "Keine Favoriten" statt einer leeren Liste

# language: de
Funktionalität: Navigation und Seitenrahmen

  # EARS: NAV-UB-1
  Szenario: Navigation ist auf jeder Seite vorhanden
    Angenommen eine beliebige Seite der Anwendung
    Dann enthält sie Links zu Magazin, Kalender, Karte, Orten, Fotograf:innen, Ausstellungen, Events, Veranstalter:innen, Impressum und Datenschutz

  # EARS: NAV-UB-2
  Szenariogrundriss: Jede Adresse zeigt ihre Seite
    Angenommen die Adresse "<adresse>"
    Wenn sie aufgerufen wird
    Dann zeigt die Anwendung die Seite "<seite>"
    Beispiele:
    | adresse | seite |
    | / | Magazin |
    | /calendar | Kalender |
    | /calendar/2026/11 | Kalender |
    | /map | Karte |
    | /venues | Orte |
    | /photographers | Fotograf:innen |
    | /exhibitions | Ausstellungen |
    | /events | Events |
    | /organizers | Veranstalter:innen |
    | /impressum | Impressum |
    | /datenschutz | Datenschutz |

  # EARS: NAV-EV-1
  Szenariogrundriss: Unbekannte Adresse oder ID
    Angenommen die Adresse "<adresse>"
    Wenn sie aufgerufen wird
    Dann zeigt die Anwendung eine Hinweisseite
    Und die Hinweisseite enthält einen Link zur Startseite
    Beispiele:
    | adresse |
    | /gibt-es-nicht |
    | /venues/unbekannt |
    | /photographers/unbekannt |
    | /posts/unbekannt |

  # EARS: NAV-UB-3
  Szenario: Jede Seite hat Titel und Beschreibung
    Angenommen eine beliebige Seite der Anwendung
    Dann hat sie einen nicht leeren Titel und eine nicht leere Meta-Beschreibung
    Und kein anderer Seitentyp hat denselben Titel

  # EARS: NAV-UN-1
  Szenario: Daten nicht ladbar
    Angenommen eine nicht ladbare Datendatei
    Wenn eine Seite aufgerufen wird, die diese Daten braucht
    Dann zeigt die Anwendung einen Fehlerhinweis
    Und der Hinweis bietet das erneute Laden an

  # EARS: NAV-UB-4
  Szenario: Datenschutzseite nennt Kartenabruf
    Angenommen die Seite "/datenschutz"
    Dann nennt sie den Abruf von Kartenkacheln bei OpenStreetMap

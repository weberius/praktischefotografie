# language: de
Funktionalität: Kopf- und Fußbereich

  # EARS: FRM-UB-1, FRM-ST-1
  Szenariogrundriss: Navigation steht hinter dem Burger-Menü
    Angenommen eine beliebige Seite der Anwendung bei einer Fensterbreite von <breite> Pixeln
    Dann zeigt der Kopfbereich am rechten Rand eine Menü-Schaltfläche
    Und die Navigationslinks sind nicht sichtbar
    Und die Navigationslinks sind per Tastatur nicht erreichbar
    Beispiele:
    | breite |
    | 1280 |
    | 390 |

  # EARS: FRM-EV-1
  Szenario: Menü öffnen und schließen
    Angenommen eine beliebige Seite der Anwendung mit geschlossenem Menü
    Dann hat die Menü-Schaltfläche den zugänglichen Namen "Menü öffnen" und meldet "nicht erweitert"
    Wenn die Menü-Schaltfläche betätigt wird
    Dann zeigt der Kopfbereich Links zu Magazin, Kalender, Karte, Orten, Fotograf:innen, Ausstellungen, Events, Festivals und Veranstalter:innen
    Und die Links stehen als Feld in voller Breite unterhalb des Kopfbereichs über dem Inhalt
    Und die Menü-Schaltfläche hat den zugänglichen Namen "Menü schließen" und meldet "erweitert"
    Wenn die Menü-Schaltfläche erneut betätigt wird
    Dann sind die Navigationslinks wieder verborgen

  # EARS: FRM-EV-2
  Szenario: Menü schließt nach der Auswahl
    Angenommen eine beliebige Seite der Anwendung mit geöffnetem Menü
    Wenn der Link "Kalender" gewählt wird
    Dann zeigt die Anwendung die Seite "Kalender"
    Und das Menü ist geschlossen

  # EARS: FRM-EV-2
  Szenario: Menü schließt auch beim Link der aktuellen Seite
    Angenommen die Seite "/calendar" mit geöffnetem Menü
    Wenn der Link "Kalender" gewählt wird
    Dann ist das Menü geschlossen

  # EARS: FRM-UB-1
  Szenario: Menü bei niedrigem Fenster scrollbar
    Angenommen eine beliebige Seite der Anwendung bei einer Fensterhöhe von 400 Pixeln
    Wenn die Menü-Schaltfläche betätigt wird
    Dann endet das Menüfeld am unteren Fensterrand oder davor
    Und alle Navigationslinks sind durch Scrollen im Menüfeld erreichbar

  # EARS: FRM-EV-3
  Szenario: Menü schließt mit Escape
    Angenommen eine beliebige Seite der Anwendung mit geöffnetem Menü
    Wenn die Escape-Taste betätigt wird
    Dann ist das Menü geschlossen
    Und der Fokus liegt auf der Menü-Schaltfläche

  # EARS: FRM-UB-2
  Szenariogrundriss: Kopfbereich bleibt beim Scrollen im Vordergrund
    Angenommen die Seite "<adresse>" mit mehr Inhalt als eine Fensterhöhe
    Wenn die Seite bis zum Ende heruntergescrollt wird
    Dann liegt der Kopfbereich am oberen Fensterrand
    Und der Kopfbereich liegt über dem Seiteninhalt
    Und die Menü-Schaltfläche ist bedienbar
    Beispiele:
    | adresse |
    | /venues |
    | /map |

  # EARS: FRM-UB-3
  Szenario: Fußbereich scrollt mit dem Inhalt
    Angenommen eine Seite mit mehr Inhalt als eine Fensterhöhe
    Wenn die Seite oben steht
    Dann ist der Fußbereich nicht im sichtbaren Bereich
    Wenn die Seite bis zum Ende heruntergescrollt wird
    Dann ist der Fußbereich sichtbar
    Und der Fußbereich hat die Positionierung „im Fluss“ und nicht „fixiert“

  # EARS: FRM-UB-3
  Szenario: Fußbereich bei kurzem Inhalt am Fensterrand
    Angenommen eine Seite mit weniger Inhalt als eine Fensterhöhe
    Dann liegt der untere Rand des Fußbereichs am unteren Fensterrand

  # EARS: FRM-UB-4
  Szenario: Fußbereich mit Linkzeile
    Angenommen eine beliebige Seite der Anwendung
    Dann enthält der Fußbereich eine Navigation „Rechtliches“ mit den Links "Impressum", "Haftungsausschluss", "Datenschutz" und "Quellen & Lizenzen" in dieser Reihenfolge
    Und darunter steht die Zeile "Zentrum für Praktische Fotografie · Fokus NRW"
    Und der Fußbereich hat eine Trennlinie an der Oberkante

  # EARS: FRM-UB-5
  Szenario: Kopfbereich verdeckt keinen Inhalt
    Angenommen eine beliebige Seite der Anwendung
    Wenn der Sprunglink "Zum Inhalt springen" gewählt wird
    Dann liegt der Anfang des Inhalts unterhalb des Kopfbereichs
    Wenn ein Link im Inhalt per Tabulator fokussiert wird
    Dann liegt er nicht unter dem Kopfbereich

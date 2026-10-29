# language: de
Funktionalität: Marken-Icon der Webanwendung

  # EARS: ICO-UB-1, ICO-UB-2, ICO-UB-5
  Szenario: Favicon in jeder Seite
    Angenommen der Produktionsbuild
    Wenn eine beliebige erzeugte Seite gelesen wird
    Dann verweist ihr Kopf auf "favicon.ico" und auf "favicon-96x96.png" als Icon
    Und er verweist auf "apple-touch-icon.png" und auf "site.webmanifest"
    Und alle diese Verweise sind relativ zum Basispfad und beginnen nicht mit "/"

  # EARS: ICO-UB-1
  Szenariogrundriss: Icon-Dateien in der geforderten Größe
    Angenommen der Produktionsbuild
    Dann enthält das Verzeichnis die Datei "<datei>" mit <breite> mal <hoehe> Pixeln
    Beispiele:
    | datei | breite | hoehe |
    | favicon-96x96.png | 96 | 96 |
    | apple-touch-icon.png | 180 | 180 |
    | web-app-manifest-192x192.png | 192 | 192 |
    | web-app-manifest-512x512.png | 512 | 512 |

  # EARS: ICO-UB-1
  Szenario: Favicon enthält drei Größen
    Angenommen der Produktionsbuild
    Dann enthält "favicon.ico" Bilder mit 16, 32 und 48 Pixeln Kantenlänge

  # EARS: ICO-UB-2
  Szenario: Icon für Startbildschirme
    Angenommen der Produktionsbuild
    Wenn "site.webmanifest" gelesen wird
    Dann nennt es den Namen "Praktische Fotografie" und einen Kurznamen
    Und es nennt Hintergrund- und Themenfarbe
    Und es verweist auf Icons mit 192 mal 192 und 512 mal 512 Pixeln
    Und alle Verweise im Manifest führen auf vorhandene Dateien

  # EARS: ICO-UB-3 (ersetzt durch ICO-UB-7), ICO-UB-4 (ersetzt durch ICO-UB-8), ICO-UB-6, ICO-UB-7, ICO-UB-8
  Szenario: Icon im Kopfbereich
    Angenommen eine beliebige Seite der Anwendung
    Dann enthält der Link zur Startseite im Kopfbereich zuerst das Icon und danach den Text "Zentrum für praktische Fotografie"
    Und das Icon hat einen leeren Alternativtext und ist für Screenreader verborgen
    Und der Link hat den zugänglichen Namen "Zentrum für praktische Fotografie"
    Und das Icon hat eine feste Breite und Höhe

  # EARS: ICO-UB-3 (ersetzt durch ICO-UB-7), ICO-UB-7
  Szenario: Icon auf jeder Seite gleich
    Angenommen die Seiten "/", "/calendar", "/map", "/venues" und "/impressum"
    Wenn sie aufgerufen werden
    Dann zeigt jede im Kopfbereich dasselbe Icon vor dem Namen

  # EARS: ICO-UB-5
  Szenario: Pfade relativ zum Basispfad
    Angenommen die Anwendung wird unter dem Basispfad "/pf/" ausgeliefert
    Wenn die Seite aufgerufen wird
    Dann lädt das Icon im Kopfbereich von "/pf/favicon-96x96.png"
    Und kein Icon wird von der Wurzel "/" geladen

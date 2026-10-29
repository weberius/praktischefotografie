# language: de
Funktionalität: Bildmaterial für Icon und Postkarte

  # EARS: IMG-UB-1
  Szenario: Icon und Postkartenmotiv getrennt
    Angenommen das Quellbild "docs/resources/zfpf.png"
    Wenn die Bilder getrennt wurden
    Dann liegt das Icon als PNG in "docs/resources/" und ist quadratisch
    Und das Postkartenmotiv liegt als eigenes PNG in "docs/resources/" im Querformat
    Und keine der beiden Dateien enthält Teile des anderen Motivs
    Und beide sind auf den Rand ihres Motivs zugeschnitten, ohne weißen Rand des Quellbildes

  # EARS: IMG-UB-2
  Szenario: Icon-Dateien aus dem Master
    Angenommen das Icon als PNG in "docs/resources/"
    Wenn die Icon-Dateien erzeugt werden
    Dann liegen "favicon.ico", "favicon-96x96.png", "apple-touch-icon.png", "web-app-manifest-192x192.png" und "web-app-manifest-512x512.png" in "web/public/"

  # EARS: IMG-UB-3
  Szenario: Befehl erzeugt alle Dateien
    Angenommen eine Kopie des Repositorys ohne die erzeugten Dateien
    Wenn der dokumentierte Befehl ausgeführt wird
    Dann entstehen das Icon, das Postkartenmotiv und alle Icon-Dateien der Webanwendung neu

  # EARS: IMG-UB-4
  Szenario: Postkarte nicht im Build
    Angenommen der Produktionsbuild
    Dann enthält das Ausgabeverzeichnis das Postkartenmotiv nicht

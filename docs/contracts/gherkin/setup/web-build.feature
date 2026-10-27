# language: de
Funktionalität: Build und Veröffentlichung der Webanwendung

  # EARS: BLD-EV-1
  Szenario: Build kopiert validierte Daten
    Angenommen gültige Daten
    Wenn der Daten-Sync läuft
    Dann liegen die Dateien in "web/public/data" und "web/public/content"

  # EARS: BLD-UN-1
  Szenario: Build bricht bei ungültigen Daten ab
    Angenommen eine Datendatei mit Schemaverstoß
    Wenn der Daten-Sync läuft
    Dann endet er mit Exit-Code 1
    Und die Validierungsfehler werden ausgegeben
    Und es wird nichts kopiert

  # EARS: BLD-UB-1
  Szenario: Seiten sind vorab gerendert
    Angenommen ein Produktionsbuild
    Dann existiert für jede Adresse eine HTML-Datei
    Und sie enthält die Hauptüberschrift im Dokument

  # EARS: BLD-UB-2
  Szenario: Sitemap und robots.txt
    Angenommen ein Produktionsbuild
    Dann enthält "sitemap.xml" jede Adresse
    Und "robots.txt" verweist auf die Sitemap

  # EARS: BLD-UB-3
  Szenario: Produktionsbuild ohne Demo-Daten
    Angenommen ein Produktionsbuild
    Dann enthält die Ausgabe keinen Datensatz mit id "demo-"

  # EARS: BLD-OP-1
  Szenario: Demo-Modus führt Daten zusammen
    Angenommen der Demo-Modus
    Wenn der Daten-Sync läuft
    Dann enthält "web/public/data" Daten und Demo-Daten gemeinsam
    Und die zusammengeführten Daten sind gültig

  # EARS: BLD-UB-4
  Szenario: Demo-Datensätze sind gekennzeichnet
    Angenommen ein Demo-Datensatz ohne Präfix "demo-" in der id
    Wenn der Daten-Sync im Demo-Modus läuft
    Dann endet er mit Exit-Code 1

  # EARS: BLD-UB-5
  Szenario: 404-Seite
    Angenommen ein Produktionsbuild
    Dann existiert "404.html" mit der Hinweisseite

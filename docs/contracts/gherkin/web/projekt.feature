# language: de
Funktionalität: Projektseite

  # EARS: PRJ-UB-1, PRJ-UB-9
  Szenario: Projektseite ist erreichbar
    Angenommen die Adresse "/projekt"
    Wenn sie aufgerufen wird
    Dann zeigt die Anwendung eine Seite mit genau einer Überschrift der Ebene 1 "Projekt"
    Und die Seite hat einen eigenen Titel und eine eigene Meta-Beschreibung
    Und die Adresse steht in der Sitemap und wird vorab erzeugt

  # EARS: PRJ-UB-2, PRJ-UB-7
  Szenario: Aufbau der Projektseite
    Angenommen die Seite "/projekt"
    Dann steht unter der Überschrift der Text "Ich möchte mich über Ausstellungen und andere Ereignisse in Bezug auf Fotografie informieren."
    Und darunter folgt das Portrait
    Und darunter folgen nacheinander die Abschnitte "Über das Projekt", "Teilen" und "Zentrum für praktische Fotografie unterstützen"

  # EARS: PRJ-UB-3
  Szenario: Portrait mit Alternativtext
    Angenommen die Seite "/projekt"
    Dann zeigt sie ein Portrait mit einem Alternativtext, der "Wolfram Eberius" nennt
    Und das Bild wird von der Webanwendung selbst ausgeliefert

  # EARS: PRJ-UB-4
  Szenario: Über das Projekt nennt das OK Lab Köln
    Angenommen die Seite "/projekt"
    Dann fasst der Abschnitt "Über das Projekt" zusammen, dass die Anwendung Magazin, Kalender, Karte, Orte, Fotograf:innen, Ausstellungen, Events, Festivals und Veranstalter:innen bietet
    Und er nennt das OK Lab Köln mit einem Link auf "https://codefor.de/koeln/"

  # EARS: PRJ-UB-5
  Szenario: Teilen mit QR-Code
    Angenommen die Seite "/projekt"
    Dann enthält der Abschnitt "Teilen" den Text "Wenn Dir die Webapp gefällt, dann teile sie gerne."
    Und er zeigt den QR-Code mit einem nicht leeren Alternativtext
    Und das Bild wird von der Webanwendung selbst ausgeliefert

  # EARS: PRJ-UB-6
  Szenario: Unterstützen mit Hinweis und Link
    Angenommen die Seite "/projekt"
    Dann enthält der Abschnitt "Zentrum für praktische Fotografie unterstützen" einen erklärenden Text
    Und er weist darauf hin, dass der Link die Webanwendung verlässt
    Und er enthält einen Link zu PayPal mit rel "noopener"

  # EARS: PRJ-UB-8, PRJ-ST-1
  Szenario: Projekt ist letzter Menüeintrag mit Trennlinie
    Angenommen eine beliebige Seite der Anwendung mit geöffnetem Menü
    Dann ist "Projekt" der letzte Eintrag im Menü
    Und eine Trennlinie setzt ihn von den übrigen Einträgen ab
    Wenn der Eintrag gewählt wird
    Dann zeigt die Anwendung die Seite "/projekt"
    Und der Eintrag "Projekt" ist als aktuelle Seite gekennzeichnet

  # EARS: PRJ-UB-10
  Szenario: Kein Zurück-Link, keine Reste von Klangland
    Angenommen die Seite "/projekt"
    Dann zeigt sie keinen Zurück-Link
    Und ihr Text enthält weder "Klangland" noch "Konzert" noch "Orchester" noch "Komponist"

# language: de
Funktionalität: Recherche in allen Sprachen

  # EARS: RAS-UB-1
  Szenario: Alle Sprachversionen als Links
    Angenommen eine Person mit Artikeln in zwölf Sprachversionen der Wikipedia
    Wenn die Recherche für die Person läuft
    Dann nennt die Kandidatendatei alle zwölf Sprachversionen mit Sprache, Titel und Adresse

  # EARS: RAS-UB-1
  Szenario: Anfangstexte bis zu zehn Sprachen
    Angenommen eine Person mit Artikeln in zwölf Sprachversionen der Wikipedia
    Wenn die Recherche für die Person läuft
    Dann enthält die Kandidatendatei Anfangstexte für zehn Sprachversionen in der Reihenfolge Deutsch, Englisch, Französisch, Spanisch, Italienisch, Niederländisch, danach alphabetisch
    Und ein Vorschlag mit zehn Quellsprachen ist gültig
    Und ein Vorschlag mit elf Quellsprachen wird verworfen

  # EARS: RAS-UB-2
  Szenario: Wikipedia-Links in der Linksammlung
    Angenommen eine Linksammlung mit dem Link zur deutschen Sprachversion der Person
    Wenn die Recherche für die Person läuft
    Dann enthält die Linksammlung die Adressen aller Sprachversionen genau einmal
    Und die vorhandenen Einträge sind unverändert
    Und die neuen Einträge tragen die Suchanfrage "wikipedia:<Sprache>"
    Und sie zählen nicht als neue Links für den Webkurztext

  # EARS: RAS-UB-3
  Szenario: Websuche im Standardlauf
    Angenommen ein Testserver für Suchmaschine und Trefferseiten
    Wenn der Skill ohne "--no-web" für eine Person gestartet wird
    Dann gehören Plan und Suche zum Lauf, ohne dass "--web" angegeben ist

  # EARS: RAS-UB-3
  Szenario: Websuche abschalten
    Angenommen ein Testserver für Suchmaschine und Trefferseiten
    Wenn der Skill mit "--no-web" gestartet wird
    Dann entsteht keine Anfrage an die Suchmaschine oder an eine Trefferseite
    Und die Wikipedia-Recherche läuft unverändert

  # EARS: RAS-EV-1
  Szenario: Suchanfragen in mehreren Sprachen
    Angenommen die Person "Wendy Red Star"
    Wenn die Websuche geplant wird
    Dann nennt der Plan sechs Suchanfragen mit "Fotograf", "photographer", "photographe", "fotógrafo", "fotografo" und "fotograaf"
    Und je Anfrage werden höchstens zehn Treffer festgehalten

  # EARS: RAS-UB-4, RAS-UB-5
  Szenario: Seiten für den Text
    Angenommen zwölf neue Treffer-Links, darunter ein Link auf "https://de.wikipedia.org/wiki/X", eine gesperrte Seite und zehn erlaubte Seiten
    Wenn die Trefferseiten abgerufen werden
    Dann werden höchstens zehn Seiten abgerufen
    Und die Wikipedia-Adresse wird nicht über den Webabruf geladen
    Und die gesperrte Seite wird im Bericht genannt
    Und der Skill schreibt den Webkurztext erst nach dem Abruf aus Textauszügen und Snapshots

  # EARS: RAS-UB-6
  Szenario: Quellenzahl
    Angenommen ein Webkurztext mit zehn Quellen aus der Linksammlung und einer mit elf Quellen
    Wenn die Vorschläge geprüft werden
    Dann ist der Vorschlag mit zehn Quellen gültig
    Und der Vorschlag mit elf Quellen wird verworfen

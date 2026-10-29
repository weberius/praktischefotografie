# language: de
Funktionalität: Rechtliche Seiten

  # EARS: RCH-UB-1
  Szenario: Impressum nennt den Betreiber
    Angenommen die Seite "/impressum"
    Dann nennt sie Name, Anschrift, Telefon, E-Mail und Internetadresse des Betreibers
    Und sie nennt den redaktionell Verantwortlichen und die Hinweise zur Streitbeilegung
    Und sie enthält weder eckige Platzhalter noch den Hinweis, dass Angaben fehlen

  # EARS: RCH-UB-2
  Szenario: Haftungsausschluss mit drei Abschnitten
    Angenommen die Seite "/haftungsausschluss"
    Dann hat sie die Abschnitte "Haftung für Inhalte", "Haftung für Links" und "Urheberrecht"
    Und der Abschnitt "Haftung für Inhalte" weist darauf hin, dass Orts- und Veranstaltungsangaben sich ändern können

  # EARS: RCH-UB-3
  Szenario: Datenschutzerklärung entspricht dem Verhalten der Anwendung
    Angenommen die Seite "/datenschutz"
    Dann erklärt sie, dass keine Cookies und kein Tracking verwendet werden
    Und sie nennt das Hosting auf GitHub Pages und die dabei anfallenden Zugriffsdaten
    Und sie nennt den Abruf von Kartenkacheln bei OpenStreetMap
    Und sie nennt die Rechte der Betroffenen und verweist für den Verantwortlichen auf das Impressum
    Und sie enthält keine Platzhalter

  # EARS: RCH-UB-4
  Szenario: Quellen und Lizenzen
    Angenommen die Seite "/quellen"
    Dann nennt sie Wikipedia, Wikimedia Commons, Wikidata, OpenStreetMap, Leaflet und die Webseiten der Orte und Veranstalter
    Und sie nennt zu den Wikimedia-Inhalten die Lizenz bzw. den Urheberhinweis

  # EARS: RCH-UB-5
  Szenariogrundriss: Keine Reste von Klangland
    Angenommen die Seite "<adresse>"
    Dann enthält ihr Text weder "Klangland" noch "Open Opus" noch "Komponist" noch "Favoriten"
    Beispiele:
    | adresse |
    | /impressum |
    | /haftungsausschluss |
    | /datenschutz |
    | /quellen |

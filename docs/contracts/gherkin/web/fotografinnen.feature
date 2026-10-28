# language: de
Funktionalität: Fotograf:innen

  # EARS: PHO-UB-1
  Szenario: Übersicht alphabetisch
    Angenommen die Personen "Parr", "Erwitt" und "Kalvar"
    Wenn "/photographers" aufgerufen wird
    Dann erscheinen sie in der Reihenfolge Erwitt, Kalvar, Parr

  # EARS: PHO-UB-2 (ersetzt durch PHO-UB-6), PHO-UB-6
  Szenario: Personenseite zeigt Stammdaten
    Angenommen die Person "martin-parr" mit Lebensdaten
    Wenn "/photographers/martin-parr" aufgerufen wird
    Dann erscheinen Name, Berufsbezeichnung, Lebensdaten, Kurzbiografie und Website

  # EARS: PHO-UB-3, PHO-UB-9
  Szenario: Personenseite listet Ausstellungen
    Angenommen eine beendete und eine laufende Ausstellung mit der Person
    Wenn die Personenseite aufgerufen wird
    Dann erscheinen beide mit Ort und Zeitraum
    Und die neuere steht zuerst
    Und die Überschrift lautet "Ausstellungen (2)"

  # EARS: PHO-ST-1
  Szenario: Person ohne Ausstellung
    Angenommen eine Person ohne Ausstellung
    Wenn die Personenseite aufgerufen wird
    Dann zeigt sie einen Hinweis

  # EARS: PHO-UB-5
  Szenario: Übersicht mit Portrait und Lebensdaten
    Angenommen eine Person mit Portrait und Lebensdaten und eine ohne
    Wenn "/photographers" aufgerufen wird
    Dann zeigt die erste Karte Name, Berufsbezeichnung, Lebensdaten und das Portrait mit Alternativtext
    Und das Portrait wird verzögert geladen
    Und die zweite Karte zeigt nur den Namen

  # EARS: PHO-UB-7
  Szenario: Portrait mit Bildnachweis
    Angenommen eine Person mit Portrait, Urheber "Jane Doe" und Lizenz "CC BY-SA 4.0"
    Wenn die Personenseite aufgerufen wird
    Dann erscheint das Portrait mit sichtbarem Text "Jane Doe" und "CC BY-SA 4.0"
    Und der Link auf die Commons-Dateiseite öffnet im neuen Tab

  # EARS: PHO-UB-8
  Szenario: Wikipedia-Zusammenfassung mit Quellen
    Angenommen eine Person mit Zusammenfassung und Quellen in "de" und "en"
    Wenn die Personenseite aufgerufen wird
    Dann erscheint unter "Aus der Wikipedia" die Zusammenfassung
    Und der Hinweis auf die Basis der Wikipedia (CC BY-SA) erscheint
    Und je ein Link auf die Artikel mit den Bezeichnungen "Deutsch" und "Englisch"

  # EARS: PHO-ST-2
  Szenario: Person ohne Portrait und Wikipedia
    Angenommen eine Person ohne Portrait und ohne Zusammenfassung
    Wenn die Personenseite aufgerufen wird
    Dann erscheinen weder Bild noch Bildnachweis noch der Abschnitt "Aus der Wikipedia"

  # EARS: PHO-UN-1
  Szenario: Portrait nicht ladbar
    Angenommen eine Person, deren Portraitdatei nicht geladen werden kann
    Wenn die Personenseite aufgerufen wird
    Dann erscheint die Seite ohne Bild und ohne Bildnachweis

  # EARS: PHO-UB-10
  Szenario: Ausstellungen der Person tragen Badges
    Angenommen eine Person mit einer laufenden Gruppenausstellung
    Wenn die Personenseite aufgerufen wird
    Dann beginnt die Karte der Ausstellung mit "Gruppenausstellung" und danach "Laufend"

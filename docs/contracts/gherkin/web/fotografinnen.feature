# language: de
Funktionalität: Fotograf:innen

  # EARS: PHO-UB-1
  Szenario: Übersicht alphabetisch
    Angenommen die Personen "Parr", "Erwitt" und "Kalvar"
    Wenn "/photographers" aufgerufen wird
    Dann erscheinen sie in der Reihenfolge Erwitt, Kalvar, Parr

  # EARS: PHO-UB-2
  Szenario: Personenseite zeigt Stammdaten
    Angenommen die Person "martin-parr"
    Wenn "/photographers/martin-parr" aufgerufen wird
    Dann erscheinen Name, Kurzbiografie und Website

  # EARS: PHO-UB-3
  Szenario: Personenseite listet Ausstellungen
    Angenommen eine beendete und eine laufende Ausstellung mit der Person
    Wenn die Personenseite aufgerufen wird
    Dann erscheinen beide mit Ort und Zeitraum
    Und die neuere steht zuerst

  # EARS: PHO-ST-1
  Szenario: Person ohne Ausstellung
    Angenommen eine Person ohne Ausstellung
    Wenn die Personenseite aufgerufen wird
    Dann zeigt sie einen Hinweis

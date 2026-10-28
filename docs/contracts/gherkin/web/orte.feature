# language: de
Funktionalität: Orte

  # EARS: VNU-UB-1
  Szenario: Verzeichnis listet alle Orte
    Angenommen drei Orte
    Wenn "/venues" aufgerufen wird
    Dann erscheinen drei Orte mit Name, Typ, Stadt und Besonderheiten

  # EARS: VNU-UB-2
  Szenario: Verzeichnis ist filterbar
    Angenommen Orte in Köln und Essen
    Wenn die Stadt "Essen" gewählt wird
    Dann erscheinen nur Essener Orte

  # EARS: VNU-UB-3
  Szenario: Ortsdetail zeigt Stammdaten
    Angenommen der Ort "makk-koeln"
    Wenn "/venues/makk-koeln" aufgerufen wird
    Dann erscheinen Adresse, Website, Eigenschaften, Quelle und Prüfstand

  # EARS: VNU-UB-4
  Szenario: Ortsdetail zeigt Programm und Beiträge
    Angenommen ein Ort mit einer laufenden, einer kommenden und einer beendeten Ausstellung und einem verlinkten Beitrag
    Wenn die Ortsseite aufgerufen wird
    Dann erscheinen die laufende und die kommende Ausstellung
    Und die beendete erscheint nicht
    Und der Beitrag erscheint mit Link

  # EARS: VNU-UB-5
  Szenario: Typ mit Text und Symbol
    Angenommen ein Ort vom Typ "museum"
    Dann zeigt die Anzeige Symbol und den Text "Museum"

  # EARS: VNU-ST-1
  Szenario: Ort ohne Programm
    Angenommen ein Ort ohne laufende oder kommende Ausstellungen und Events
    Wenn die Ortsseite aufgerufen wird
    Dann zeigt sie einen Hinweis

  # EARS: VNU-UB-6
  Szenario: Ausstellungen der Ortsseite tragen Badges
    Angenommen ein Ort mit einer laufenden Einzelausstellung
    Wenn die Ortsseite aufgerufen wird
    Dann beginnt die Karte der Ausstellung mit "Einzelausstellung" und danach "Laufend"

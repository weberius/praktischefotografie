# language: de
Funktionalität: Ausstellungen

  # EARS: EXH-UB-1, EXH-UB-6
  Szenario: Liste zeigt Ausstellungen mit Status
    Angenommen drei Ausstellungen
    Wenn "/exhibitions" aufgerufen wird
    Dann zeigt jede Titel, Ort, Zeitraum und den Status als Text

  # EARS: EXH-UB-8
  Szenario: Badges oben in der Liste
    Angenommen eine Gruppenausstellung, die kommt
    Wenn "/exhibitions" aufgerufen wird
    Dann beginnt die Karte mit den Badges "Gruppenausstellung" und danach "Kommend"
    Und danach folgt die Überschrift

  # EARS: EXH-UB-2
  Szenariogrundriss: Status der Ausstellung
    Angenommen das heutige Datum 2026-10-27
    Und eine Ausstellung von "<beginn>" bis "<ende>"
    Dann hat sie den Status "<status>"
    Beispiele:
    | beginn | ende | status |
    | 2026-11-01 | 2026-12-01 | kommend |
    | 2026-10-01 | 2026-12-31 | laufend |
    | 2026-10-01 | 2026-11-10 | endet bald |
    | 2026-10-01 | 2026-11-11 | laufend |
    | 2026-10-27 | 2026-10-27 | endet bald |
    | 2026-10-27 | 2026-12-31 | laufend |
    | 2026-09-01 | 2026-10-26 | beendet |

  # EARS: EXH-UB-3
  Szenario: Liste ist nach Status filterbar
    Angenommen eine kommende und eine beendete Ausstellung
    Wenn der Status "kommend" gewählt wird
    Dann erscheint nur die kommende

  # EARS: EXH-UB-4 (ersetzt durch EXH-UB-9), EXH-UB-9
  Szenario: Ausstellungsdetail
    Angenommen die Ausstellung "a-1" mit Ort und zwei Fotograf:innen
    Wenn "/exhibitions/a-1" aufgerufen wird
    Dann erscheinen Beschreibung, die Badges "Gruppenausstellung" und danach der Status, der Ort mit Link und beide Fotograf:innen mit Links

  # EARS: EXH-OP-1 (ersetzt durch EXH-OP-2), EXH-OP-2
  Szenario: Ausstellung eines Festivals
    Angenommen eine Ausstellung mit festivalId "photoszene-festival-2027" als offizieller Partner
    Wenn die Detailseite aufgerufen wird
    Dann erscheint das Festival mit Link auf "/festivals/photoszene-festival-2027"
    Und der Veranstalter erscheint mit Link auf "/organizers/photoszene-koeln"
    Und der Text "Offizieller Partner" erscheint

  # EARS: EXH-UB-5
  Szenario: Verknüpfte Beiträge
    Angenommen ein Beitrag, der die Ausstellung verknüpft
    Wenn die Detailseite aufgerufen wird
    Dann erscheint der Beitrag mit Link

  # EARS: EXH-UB-6
  Szenario: Status als Text
    Angenommen eine Ausstellung mit dem Status "endet bald"
    Dann steht der Text "Endet bald" im Dokument und nicht nur eine Farbe

# language: de
Funktionalität: Eröffnungstermine bei der Recherche

  Grundlage:
    Angenommen heute ist der 2026-10-30
    Und die Ausstellung "Between" mit der id "between-2026" im Ort "zander-galerie-koeln" in der Stadt "Köln"
    Und ein Snapshot dieses Ortes mit dem Text "Opening: Saturday, 7 November 2026, 4-6pm The artist is present."

  # EARS: OPN-UB-1
  Szenario: Vernissage aus Eröffnungshinweis
    Wenn die Vorschläge für den Ort geprüft werden
    Dann enthält ein gültiger Vorschlag ein Event mit "eventType" "vernissage"
    Und "startDate" und "endDate" sind "2026-11-07"
    Und "venueId" ist "zander-galerie-koeln" und "city" ist "Köln"

  # EARS: OPN-UB-2
  Szenario: Uhrzeit und Anwesenheit der Künstlerin
    Angenommen die Ausstellung nennt als Person "Candida Höfer"
    Wenn die Vorschläge für den Ort geprüft werden
    Dann nennt die "description" des Events die Uhrzeit "16:00 bis 18:00 Uhr"
    Und sie nennt, dass "Candida Höfer" anwesend ist
    Und sie enthält keine Angabe, die nicht im Snapshot steht

  # EARS: OPN-UB-3
  Szenario: Titel und Kennung der Vernissage
    Wenn die Vorschläge für den Ort geprüft werden
    Dann hat das Event den Titel "Eröffnung: Between"
    Und die "id" "between-2026-eroeffnung"

  # EARS: OPN-UB-4
  Szenario: Keine doppelte Vernissage
    Angenommen "data/events.json" enthält "Eröffnung: Between" im Ort "zander-galerie-koeln" am 2026-11-07
    Wenn die Vorschläge für den Ort geprüft werden
    Dann wird die Vernissage als Dublette verworfen

  # EARS: OPN-UB-6, OPN-UB-8
  Szenario: Finissage aus Finissagehinweis
    Angenommen der Snapshot enthält zusätzlich "Finissage: Friday, 19 February 2027, 6-8pm Artist talk."
    Wenn die Vorschläge für den Ort geprüft werden
    Dann enthält ein gültiger Vorschlag ein Event mit "eventType" "finissage"
    Und "startDate" und "endDate" sind "2027-02-19"
    Und "venueId" ist "zander-galerie-koeln" und "city" ist "Köln"
    Und die "description" nennt "18:00 bis 20:00 Uhr"

  # EARS: OPN-UB-3
  Szenario: Titel und Kennung der Finissage
    Angenommen der Snapshot enthält zusätzlich "Finissage: Friday, 19 February 2027, 6-8pm"
    Wenn die Vorschläge für den Ort geprüft werden
    Dann hat das Event den Titel "Finissage: Between"
    Und die "id" "between-2026-finissage"

  # EARS: OPN-UB-4
  Szenario: Keine doppelte Finissage
    Angenommen "data/events.json" enthält "Finissage: Between" im Ort "zander-galerie-koeln" am 2027-02-19
    Und der Snapshot enthält "Finissage: Friday, 19 February 2027, 6-8pm"
    Wenn die Vorschläge für den Ort geprüft werden
    Dann wird die Finissage als Dublette verworfen

  # EARS: OPN-UB-7
  Szenario: Keine Finissage ohne Beleg
    Angenommen die Ausstellung endet am 2027-02-19
    Und der Snapshot nennt keine Finissage
    Wenn die Vorschläge für den Ort geprüft werden
    Dann gibt es keinen Finissage-Vorschlag

  # EARS: OPN-UB-5
  Szenario: Vergangener Termin
    Angenommen ein Vernissage-Vorschlag mit dem Datum 2026-10-29
    Wenn die Vorschläge für den Ort geprüft werden
    Dann wird der Vorschlag verworfen
    Und der Bericht nennt das Datum als vergangen

  # EARS: OPN-UN-1
  Szenario: Uhrzeit ohne Beleg
    Angenommen ein Vernissage-Vorschlag mit "16:00 bis 18:00 Uhr" in der "description"
    Und ein Textauszug der Fundstelle ohne Uhrzeit
    Wenn die Vorschläge für den Ort geprüft werden
    Dann wird der Vorschlag verworfen
    Und der Bericht nennt den Grund "Uhrzeit nicht belegt"

  # EARS: OPN-UN-1
  Szenario: Punktdatum ersetzt keine Uhrzeit
    Angenommen ein Vernissage-Vorschlag mit "16:00 bis 18:00 Uhr" in der "description"
    Und ein Textauszug "Vernissage am 07.11.2026 mit der Künstlerin."
    Wenn die Vorschläge für den Ort geprüft werden
    Dann wird der Vorschlag verworfen
    Und der Bericht nennt den Grund "Uhrzeit nicht belegt"

  # EARS: OPN-UN-1
  Szenario: Jede genannte Uhrzeit muss belegt sein
    Angenommen ein Vernissage-Vorschlag mit "16:00 bis 18:00 Uhr" in der "description"
    Und ein Textauszug mit der Uhrzeit "4pm" ohne Ende
    Wenn die Vorschläge für den Ort geprüft werden
    Dann wird der Vorschlag verworfen

  # EARS: OPN-UN-2
  Szenario: Datum weicht vom Textauszug ab
    Angenommen ein Vernissage-Vorschlag mit dem Datum 2026-11-07
    Und ein Textauszug "Opening: Saturday, 14 November 2026, 4-6pm"
    Wenn die Vorschläge für den Ort geprüft werden
    Dann wird der Vorschlag verworfen
    Und der Bericht nennt den Grund "Datum nicht belegt"

  # EARS: OPN-EV-1
  Szenario: Bericht zeigt Terminhinweise
    Angenommen kein Vernissage-Vorschlag und kein Finissage-Vorschlag für den Ort
    Wenn der Bericht geschrieben wird
    Dann nennt er für "zander-galerie-koeln" einen Snapshot mit Eröffnungshinweis und 0 Vernissage-Vorschläge
    Und er nennt je Quelle die Snapshots mit Finissagehinweis und die Finissage-Vorschläge
    Und die Quelle ist als "zu prüfen" gekennzeichnet

  # EARS: OPN-EV-1
  Szenario: Bericht ohne Netz
    Wenn der Bericht geschrieben wird
    Dann wurde keine Netzanfrage gesendet

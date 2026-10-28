# language: de
Funktionalität: Magazin-Neuigkeiten aus Ausstellungsdaten

  Grundlage:
    Angenommen heute ist der 2026-10-28
    Und eine Ausstellung "schau-2026" im Ort "makk-koeln" vom 2026-08-09 bis 2026-11-01 mit der Fotografin "Martin Parr"

  # EARS: NWS-UB-1
  Szenario: Eindeutige Kennung je Anlass
    Wenn die Neuigkeiten geplant werden
    Dann hat der Eintrag zum Anlass "eroeffnung" die id "schau-2026-eroeffnung"
    Und die Beiträge verweisen auf die Ausstellung "schau-2026" und den Ort "makk-koeln"

  # EARS: NWS-UB-2
  Szenario: Datum je Anlass
    Wenn die Neuigkeiten geplant werden
    Dann hat "eroeffnung" das Datum 2026-08-09
    Und "endet-bald" das Datum 2026-10-18
    Und "ende" das Datum 2026-11-02

  # EARS: NWS-EV-1
  Szenario: Plan enthält fehlende Anlässe
    Angenommen es existiert keine Neuigkeit
    Wenn die Neuigkeiten geplant werden
    Dann enthält "updates/2026-10-28/news.json" die Anlässe "eroeffnung", "endet-bald" und "ende"
    Und der Anlass "eroeffnung" liegt in der Vergangenheit und "ende" in der Zukunft

  # EARS: NWS-UB-3
  Szenario: Anlass neu nur für neu aufgenommene Ausstellungen
    Angenommen die Ausstellung "schau-2026" wurde nicht im heutigen Lauf aufgenommen
    Wenn die Neuigkeiten geplant werden
    Dann enthält der Plan keinen Anlass "neu"
    Angenommen die Ausstellung wurde im heutigen Lauf übernommen
    Wenn die Neuigkeiten geplant werden
    Dann enthält der Plan den Anlass "neu" mit dem Datum 2026-10-28

  # EARS: NWS-UB-4
  Szenario: Kurze Ausstellung ohne Endet-bald
    Angenommen eine Ausstellung vom 2026-11-01 bis 2026-11-10
    Wenn die Neuigkeiten geplant werden
    Dann enthält der Plan "eroeffnung" und "ende" aber nicht "endet-bald"

  # EARS: NWS-UN-1
  Szenario: Geänderter Termin
    Angenommen eine Neuigkeit "schau-2026-ende" mit dem Datum 2026-10-31
    Wenn die Neuigkeiten geplant werden
    Dann steht "schau-2026-ende" als "angepasst" mit dem Datum 2026-11-02 im Plan

  # EARS: NWS-UN-1
  Szenario: Zweiter Lauf ohne Änderung
    Angenommen alle Neuigkeiten zur Ausstellung wurden übernommen
    Wenn die Neuigkeiten erneut geplant werden
    Dann ist der Plan leer

  # EARS: NWS-UB-5
  Szenario: Text mit falscher Wortzahl
    Angenommen ein Planeintrag mit einem Text von 59 Wörtern
    Wenn die Neuigkeiten geprüft werden
    Dann wird der Eintrag verworfen und der Grund nennt die Wortzahl
    Und das gilt ebenso für 81 Wörter

  # EARS: NWS-UB-5
  Szenario: Text ohne Künstler:in
    Angenommen ein Text mit 70 Wörtern, der "Martin Parr" nicht nennt
    Wenn die Neuigkeiten geprüft werden
    Dann wird der Eintrag verworfen und der Grund nennt "Martin Parr"

  # EARS: NWS-UB-5
  Szenario: Gültiger Text
    Angenommen ein Text mit 70 Wörtern, der Titel, Ort und "Martin Parr" nennt
    Wenn die Neuigkeiten geprüft werden
    Dann ist der Eintrag gültig

  # EARS: NWS-UB-6
  Szenario: Übernahme nur nach Freigabe
    Angenommen ein gültiger Planeintrag ohne Freigabe
    Wenn die Neuigkeiten übernommen werden
    Dann bleiben "data/posts.json" und "content/posts/" unverändert

  # EARS: NWS-EV-2
  Szenario: Beitrag wird angelegt
    Angenommen ein gültiger, freigegebener Planeintrag "schau-2026-ende"
    Wenn die Neuigkeiten übernommen werden
    Dann enthält "data/posts.json" einen Beitrag "schau-2026-ende" mit dem Datum 2026-11-02
    Und der Beitrag verlinkt Ort und Ausstellung
    Und "content/posts/schau-2026-ende.md" enthält Frontmatter und den Text
    Und die Datenvalidierung besteht

  # EARS: NWS-UN-2
  Szenario: Übernahme wird zurückgerollt
    Angenommen ein freigegebener Eintrag, der zu ungültigen Daten führen würde
    Wenn die Neuigkeiten übernommen werden
    Dann sind "data/posts.json" und "content/posts/" unverändert
    Und die Fehler werden ausgegeben

  # EARS: NWS-EV-3
  Szenario: Bericht der Neuigkeiten
    Wenn die Neuigkeiten geprüft werden
    Dann enthält "updates/2026-10-28/NEWS.md" die Zahl der geplanten, verworfenen und übernommenen Neuigkeiten je Anlass

  # EARS: NWS-UN-3
  Szenario: Verwaiste Neuigkeit
    Angenommen eine Neuigkeit "alt-2025-ende" ohne Ausstellung "alt-2025"
    Wenn die Neuigkeiten geplant werden
    Dann nennt der Bericht "alt-2025-ende" als verwaist
    Und der Beitrag bleibt erhalten

  # EARS: NWS-OP-1
  Szenario: Einzelner Ort oder alle
    Angenommen Ausstellungen in zwei Orten
    Wenn die Neuigkeiten für "makk-koeln" geplant werden
    Dann enthält der Plan nur Ausstellungen dieses Ortes
    Wenn die Ort-ID "gibt-es-nicht" lautet
    Dann endet der Aufruf mit Exit-Code 1 und nennt die gültigen IDs

  # EARS: NWS-UB-7
  Szenario: Titel ist Ausstellungstitel mit Stadt
    Angenommen eine Ausstellung "Test" im Ort "makk-koeln" in der Stadt "Köln"
    Und ein Planeintrag mit dem Titel "Endet bald: Test im MAKK Köln"
    Wenn die Neuigkeiten geprüft werden
    Dann wird der Eintrag verworfen und der Grund nennt den erwarteten Titel "Test in Köln"
    Aber mit dem Titel "Test in Köln" ist der Eintrag gültig

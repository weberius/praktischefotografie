# language: de
Funktionalität: Blog: Magazin und Beitrag

  # EARS: BLG-UB-1
  Szenario: Startseite listet Beiträge, neueste zuerst
    Angenommen drei Beiträge mit den Daten 2026-01-01, 2026-03-01 und 2026-02-01
    Wenn die Startseite aufgerufen wird
    Dann erscheinen die Beiträge in der Reihenfolge 2026-03-01, 2026-02-01, 2026-01-01
    Und jeder Beitrag zeigt Titel, Datum und Kurzvorschau

  # EARS: BLG-UB-2
  Szenario: Beitrag in der Liste führt zur Detailseite
    Angenommen ein Beitrag mit dem Slug "mein-beitrag"
    Wenn der Beitrag in der Liste ausgewählt wird
    Dann zeigt die Anwendung die Adresse "/posts/mein-beitrag"

  # EARS: BLG-ST-1
  Szenario: Keine Beiträge vorhanden
    Angenommen es gibt keine veröffentlichten Beiträge
    Wenn die Startseite aufgerufen wird
    Dann zeigt sie einen Hinweis statt einer leeren Liste

  # EARS: BLG-UN-1
  Szenario: Beitrag mit Datum in der Zukunft
    Angenommen ein Beitrag mit Datum nach dem heutigen Datum
    Dann erscheint er nicht in der Liste
    Und seine Detailseite zeigt die Hinweisseite für unbekannte Adressen

  # EARS: BLG-UB-3
  Szenario: Beitragstext wird dargestellt
    Angenommen ein Beitrag mit Frontmatter, einer Überschrift und fettem Text
    Wenn die Detailseite aufgerufen wird
    Dann erscheint der Text mit Überschrift und Hervorhebung
    Und das Frontmatter erscheint nicht

  # EARS: BLG-UB-4
  Szenario: Verknüpfte Orte und Ausstellungen
    Angenommen ein Beitrag mit einer verknüpften Venue mit Präsenzbibliothek und einer verknüpften Ausstellung
    Wenn die Detailseite aufgerufen wird
    Dann zeigt sie Name, Adresse und den Hinweis auf die Präsenzbibliothek
    Und Titel und Laufzeit der Ausstellung
    Und beide verlinken auf ihre Seiten

  # EARS: BLG-UN-2
  Szenario: Beitragstext fehlt
    Angenommen ein Beitrag, dessen Textdatei nicht ladbar ist
    Wenn die Detailseite aufgerufen wird
    Dann zeigt sie Titel, Datum und verknüpfte Inhalte
    Und anstelle des Textes einen Hinweis

  # EARS: BLG-UB-5
  Szenario: Beitragstext ist bereinigt
    Angenommen ein Beitragstext mit einem script-Element und einem onerror-Attribut
    Wenn die Detailseite aufgerufen wird
    Dann wird kein Skript ausgeführt
    Und die Elemente erscheinen nicht im Dokument

  # EARS: BLG-UB-6
  Szenario: Beitrag zu einer Ausstellung zeigt Badges
    Angenommen der Beitrag "mysterium-der-paare-endet-bald" mit dem Titel "MYSTERIUM DER PAARE in Monschau" zur Gruppenausstellung "mysterium-der-paare"
    Wenn die Startseite aufgerufen wird
    Dann zeigt die Karte des Beitrags die Badges "Endet bald" und "Gruppenausstellung" als Text
    Und die Überschrift lautet "MYSTERIUM DER PAARE in Monschau" ohne den Zusatz "Endet bald"

  # EARS: BLG-UB-6
  Szenariogrundriss: Anlass-Badge je Kennung
    Angenommen ein Beitrag mit der Kennung "<kennung>" zu einer Ausstellung
    Wenn die Startseite aufgerufen wird
    Dann zeigt die Karte das Anlass-Badge "<badge>"
    Beispiele:
    | kennung | badge |
    | schau-2026-neu | Neu |
    | schau-2026-eroeffnung | Eröffnung |
    | schau-2026-endet-bald | Endet bald |
    | schau-2026-ende | Beendet |

  # EARS: BLG-UB-7
  Szenario: Aufbau der Karte
    Angenommen der Beitrag "mysterium-der-paare-endet-bald" vom 2026-10-18 mit der Kurzvorschau "Die Ausstellung im Fotografie-Forum Monschau endet am 1. November 2026."
    Wenn die Startseite aufgerufen wird
    Dann stehen in der Karte nacheinander das Datum, die Badges, der Titel als Link auf "/posts/mysterium-der-paare-endet-bald" und die Kurzvorschau

  # EARS: BLG-ST-2
  Szenario: Beitrag ohne Ausstellung
    Angenommen ein Beitrag ohne verknüpfte Ausstellung
    Wenn die Startseite aufgerufen wird
    Dann zeigt die Karte Datum, Titel und Kurzvorschau ohne Badges

  # EARS: BLG-UN-3
  Szenario: Verknüpfung ohne Datensatz
    Angenommen ein Beitrag, dessen verknüpfte Ausstellung in den Daten fehlt
    Wenn die Startseite aufgerufen wird
    Dann zeigt die Karte Datum, Titel und Kurzvorschau ohne Badges

  # EARS: BLG-UB-8
  Szenario: Beitragsseite zeigt Badges
    Angenommen der Beitrag "mysterium-der-paare-endet-bald" zur Gruppenausstellung "mysterium-der-paare"
    Wenn die Detailseite aufgerufen wird
    Dann erscheinen unter dem Datum die Badges "Endet bald" und "Gruppenausstellung" als Text
    Und ein Beitrag ohne Ausstellung zeigt keine Badges


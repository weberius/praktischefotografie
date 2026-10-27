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

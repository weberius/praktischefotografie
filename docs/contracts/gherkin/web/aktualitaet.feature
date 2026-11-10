# language: de
Funktionalität: Nur aktuelle Informationen

  # EARS: ACT-UB-1
  Szenariogrundriss: Listen zeigen nur Aktuelles
    Angenommen heute ist "2026-10-27"
    Und ein Eintrag mit Ende "<ende>" in der Liste "<liste>"
    Wenn "<liste>" aufgerufen wird
    Dann ist der Eintrag "<sichtbar>"

    Beispiele:
      | liste        | ende       | sichtbar     |
      | /events      | 2026-10-26 | nicht zu sehen |
      | /events      | 2026-10-27 | zu sehen     |
      | /events      | 2026-12-01 | zu sehen     |
      | /exhibitions | 2026-10-26 | nicht zu sehen |
      | /exhibitions | 2026-10-27 | zu sehen     |
      | /exhibitions | 2026-12-01 | zu sehen     |

  # EARS: ACT-UB-2
  Szenario: Statusfilter ohne Beendet
    Wenn "/exhibitions" aufgerufen wird
    Dann bietet der Statusfilter "Kommend", "Endet bald" und "Laufend" an
    Und er bietet "Beendet" nicht an

  # EARS: ACT-UN-1
  Szenario: Statuswert beendet in der Adresse
    Angenommen eine beendete und eine laufende Ausstellung
    Wenn "/exhibitions?status=beendet" aufgerufen wird
    Dann erscheint die laufende Ausstellung
    Und die beendete erscheint nicht

  # EARS: ACT-ST-1
  Szenariogrundriss: Keine aktuellen Einträge
    Angenommen es gibt nur beendete Einträge
    Wenn "<liste>" aufgerufen wird
    Dann zeigt die Seite einen Hinweis

    Beispiele:
      | liste        |
      | /events      |
      | /exhibitions |

  # EARS: ACT-UB-3
  Szenariogrundriss: Detailseite beendeter Einträge
    Angenommen ein Eintrag, der gestern endete
    Wenn seine Detailseite "<detail>" aufgerufen wird
    Dann erscheint sie mit dem Text "Beendet"

    Beispiele:
      | detail            |
      | /events/e-1       |
      | /exhibitions/a-1  |

  # EARS: ACT-UB-4
  Szenario: Andere Seiten bleiben unverändert
    Angenommen eine beendete und eine laufende Ausstellung einer Person an einem Ort, ein beendeter Beitrag und ein beendetes Event
    Dann zeigt die Personenseite beide Ausstellungen, die neuere zuerst
    Und die Ortsseite zeigt nur die laufende Ausstellung
    Und der Kalender zeigt standardmäßig nur Aktuelles
    Und das Magazin listet alle veröffentlichten Beiträge

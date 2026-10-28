# language: de
Funktionalität: Kalender und Agenda

  # EARS: CAL-UB-1
  Szenario: Agenda zeigt Einträge chronologisch
    Angenommen Ausstellungen und Events mit verschiedenen Beginndaten
    Wenn "/calendar" aufgerufen wird
    Dann erscheinen die Einträge nach Beginn aufsteigend
    Und jeder Eintrag zeigt Titel, Ort und Zeitraum

  # EARS: CAL-UB-2
  Szenario: Eintrag führt zur Detailseite
    Angenommen eine Ausstellung "a-1" und ein Event "e-1" in der Agenda
    Wenn der Eintrag ausgewählt wird
    Dann zeigt die Anwendung "/exhibitions/a-1" bzw. "/events/e-1"

  # EARS: CAL-UB-3
  Szenario: Endet bald in der Agenda
    Angenommen eine laufende Ausstellung, die in 10 Tagen endet
    Dann trägt ihr Agendaeintrag den Text "Endet bald"

  # EARS: CAL-UB-4 (ersetzt durch CAL-UB-7), CAL-UB-7
  Szenario: Einträge tragen Art und Status
    Angenommen eine Gruppenausstellung, die bald endet, eine Einzelausstellung und ein Event in der Agenda
    Dann trägt die Gruppenausstellung zuerst "Gruppenausstellung", danach "Endet bald"
    Und die Einzelausstellung trägt "Einzelausstellung"
    Und das Event trägt "Event"

  # EARS: CAL-OP-1
  Szenario: Beendete sind standardmäßig ausgeblendet
    Angenommen eine beendete und eine kommende Ausstellung
    Wenn "/calendar" aufgerufen wird
    Dann erscheint nur die kommende
    Wenn die Option "Beendete anzeigen" gewählt wird
    Dann erscheinen beide

  # EARS: CAL-EV-1
  Szenario: Monatsansicht
    Angenommen eine Ausstellung vom 2026-10-20 bis 2026-11-05 und ein Event am 2026-12-01
    Wenn "/calendar/2026/11" aufgerufen wird
    Dann erscheint die Ausstellung
    Und das Event erscheint nicht

  # EARS: CAL-UB-5
  Szenario: Monatsnavigation
    Angenommen die Adresse "/calendar/2026/12"
    Dann enthält die Seite Links auf "/calendar/2026/11" und "/calendar/2027/1"

  # EARS: CAL-UB-6
  Szenario: Beendete sind gekennzeichnet
    Angenommen eine beendete Ausstellung und ein beendetes Event
    Wenn "/calendar?ended=1" aufgerufen wird
    Dann tragen beide den Text "Beendet"

  # EARS: CAL-ST-1
  Szenario: Keine Einträge in der Auswahl
    Angenommen ein Monat ohne Einträge
    Wenn die Monatsansicht aufgerufen wird
    Dann zeigt sie einen Hinweis

  # EARS: CAL-UN-1
  Szenario: Ungültiger Monat
    Angenommen die Adresse "/calendar/2026/13"
    Wenn sie aufgerufen wird
    Dann zeigt die Anwendung die Hinweisseite

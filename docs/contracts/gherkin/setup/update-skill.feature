# language: de
Funktionalität: Update-Skill für Ortsdaten

  # EARS: SKL-UB-1
  Szenario: Skill ist vorhanden
    Angenommen das Projektverzeichnis
    Dann existiert ".claude/skills/update-venue-data/SKILL.md"
    Und der Skill nennt Name, Beschreibung und Aufrufbeispiele

  # EARS: SKL-EV-1
  Szenario: Skill führt den Ablauf aus
    Angenommen ein Aufruf des Skills für den Ort "makk-koeln"
    Wenn der Skill ausgeführt wird
    Dann folgen Abruf, Extraktion und Vorschlagsprüfung für diesen Ort
    Und der Skill zeigt den Bericht
    Und der Skill bittet um Freigabe der Vorschläge

  # EARS: SKL-UB-2
  Szenario: Skill übernimmt nur nach Freigabe
    Angenommen Vorschläge ohne Freigabe
    Dann bleibt "data/" unverändert

  # EARS: SKL-UB-3
  Szenario: Skill prüft nach Übernahme
    Angenommen eine abgeschlossene Übernahme
    Dann hat der Skill die Datenvalidierung und die Tests ausgeführt
    Und er berichtet das Ergebnis

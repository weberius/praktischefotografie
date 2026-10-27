# EARS: Update-Skill für Ortsdaten (Kürzel `SKL`)

**Bereich:** setup  ·  **Systemname:** Projekt  ·  **Stand:** 2026-10-27

Begriffe: „heute“ ist das aktuelle Datum; „Snapshot“ ist die lokal gespeicherte Fassung einer abgerufenen Seite; „Vorschlag“ ist eine noch nicht übernommene Änderung.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| SKL-UB-1 | Das Projekt soll einen Skill `update-venue-data` unter `.claude/skills/update-venue-data/` bereitstellen, der Abruf, Extraktion, Prüfung und Übernahme der Ortsdaten anleitet und jederzeit aufrufbar ist. | `setup/update-skill.feature` · „Skill ist vorhanden“ | Q-MAIN-2 | ADR-007 |
| SKL-EV-1 | Wenn der Skill aufgerufen wird, soll er den Abruf, die Extraktion und die Vorschlagsprüfung für den gewählten Ort bzw. alle Orte ausführen, den Bericht zeigen und die Freigabe der Vorschläge beim Menschen einholen. | `setup/update-skill.feature` · „Skill führt den Ablauf aus“ | Q-DATA-3 | ADR-007 |
| SKL-UB-2 | Der Skill soll Änderungen an `data/` erst nach ausdrücklicher Freigabe durch den Menschen übernehmen. | `setup/update-skill.feature` · „Skill übernimmt nur nach Freigabe“ | Q-DATA-3 | ADR-007 |
| SKL-UB-3 | Der Skill soll nach jeder Übernahme die Datenvalidierung und die Tests ausführen und das Ergebnis berichten. | `setup/update-skill.feature` · „Skill prüft nach Übernahme“ | Q-DATA-1 | ADR-007 |

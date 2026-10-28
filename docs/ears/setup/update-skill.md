# EARS: Update-Skill für Ortsdaten (Kürzel `SKL`)

**Bereich:** setup  ·  **Systemname:** Projekt  ·  **Stand:** 2026-10-27

Begriffe: „heute“ ist das aktuelle Datum; „Snapshot“ ist die lokal gespeicherte Fassung einer abgerufenen Seite; „Vorschlag“ ist eine noch nicht übernommene Änderung.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| SKL-UB-1 | Das Projekt soll einen Skill `update-venue-data` unter `.claude/skills/update-venue-data/` bereitstellen, der Abruf, Extraktion, Prüfung und Übernahme der Ortsdaten anleitet und jederzeit aufrufbar ist. | `setup/update-skill.feature` · „Skill ist vorhanden“ | Q-MAIN-2 | ADR-007 |
| SKL-EV-1 | Wenn der Skill aufgerufen wird, soll er den Abruf, die Extraktion und die Vorschlagsprüfung für den gewählten Ort bzw. alle Orte ausführen, den Bericht zeigen und die Freigabe der Vorschläge beim Menschen einholen. | `setup/update-skill.feature` · „Skill führt den Ablauf aus“ | Q-DATA-3 | ADR-007 |
| SKL-UB-2 | Der Skill soll Änderungen an `data/` erst nach ausdrücklicher Freigabe durch den Menschen übernehmen. | `setup/update-skill.feature` · „Skill übernimmt nur nach Freigabe“ | Q-DATA-3 | ADR-007 |
| SKL-UB-3 | Der Skill soll nach jeder Übernahme die Datenvalidierung und die Tests ausführen und das Ergebnis berichten. | `setup/update-skill.feature` · „Skill prüft nach Übernahme“ | Q-DATA-1 | ADR-007 |
| SKL-UB-4 | Der Skill soll nach der Übernahme der Ortsdaten die Neuigkeiten planen, aus den Daten und Snapshots Texte von 60 bis 80 Wörtern zu Ausstellung, Künstler:innen und Ort ohne erfundene Angaben und mit absoluten Datumsangaben schreiben, prüfen lassen und freigeben lassen. | `setup/update-skill.feature` · „Skill pflegt das Magazin“ | Q-DATA-4 | ADR-008 |
| SKL-UB-5 | Der Skill soll Neuigkeiten erst nach ausdrücklicher Freigabe durch den Menschen übernehmen und im Abschlussbericht nennen. | `setup/update-skill.feature` · „Skill übernimmt Neuigkeiten nur nach Freigabe“ | Q-DATA-4 | ADR-008 |
| SKL-UB-6 | Der Skill soll bei der Extraktion auch Veranstalter, Festivals und die Zuordnung neuer Ausstellungen zu einem Festival (`festivalId`, `isOfficialFestivalPartner`) vorschlagen, wenn die Seite sie belegt, und keine Festivals ohne belegten Zeitraum vorschlagen. | `setup/update-skill.feature` · „Skill schlägt Festivals nur mit Zeitraum vor“ | Q-DATA-6 | ADR-010 |
| SKL-UB-7 | Der Skill soll bei Ausstellungen alle im Seitentext genannten Personen, deren Bilder gezeigt werden (auch Studios und Duos, nicht aber Kurator:innen, Sammler:innen oder Musiker:innen), als Personen ergänzen, vor den Ausstellungen vorschlagen und in der `description` der Ausstellung aufführen. | `setup/update-skill.feature` · „Skill übernimmt alle genannten Namen“ | Q-DATA-9 | ADR-011 |


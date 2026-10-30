# SERVICE-13-STORY-01-TASK-02-skill-und-dokumentation – Skill und Vorschlagsformat dokumentieren

**Story:** SERVICE-13-STORY-01  ·  **Status:** Umgesetzt
**EARS:** OPN-UB-2, OPN-UB-6, OPN-UB-7; SKL-UB-1 bis SKL-UB-3 unverändert
**Gherkin:** setup/eroeffnungstermine.feature · Uhrzeit und Anwesenheit der Künstlerin; setup/update-skill.feature (unverändert)
**Quality:** Q-DATA-12, Q-MAIN-2
**ADR:** ADR-007

## Vorgehen
- `.claude/skills/update-venue-data/SKILL.md`: Extraktionsziel „Eröffnung und Finissage“ (Format der Events, Uhrzeit und Anwesenheit in `description`, nichts erfinden, Finissage nur bei ausdrücklicher Nennung, nur ab heute, bestehende Ausstellungen mitprüfen).
- `updates/README.md`: Beispiel für ein Terminevent.
- Skill-Test: Abschnitt vorhanden.

## Prüfkriterium
Skill-Test grün (Abschnitt nennt Vernissage, Finissage, Uhrzeit, Anwesenheit, Beleg); Prüf-Gate grün.

# Ideen

Sammlung von Ideen für kommende Änderungen. Eine Datei pro Idee (`<slug>.md`, `kebab-case`), formlos
formuliert. Der Skill [`spec-intake`](../../../.claude/skills/spec-intake/SKILL.md) macht daraus den
Kontext für die Umsetzung (EPIC-Notiz, Story, EARS, Gherkin, Quality, ggf. ADR).

## Format

```markdown
---
status: offen        # offen | in-arbeit | umgesetzt | verworfen
prio: 2              # Ganzzahl, kleiner = früher; ohne Angabe: zuletzt
ticket:              # trägt spec-intake ein
---
# Kurztitel

Freitext, so wie ein Änderungswunsch im Chat formuliert würde. Ein Satz genügt.
```

- Neue Ideen beginnen mit `status: offen`. `ticket` bleibt leer.
- Enthält eine Datei **mehrere** Ideen (z. B. als Liste), bildet `spec-intake` sie als **mehrere
  Stories** desselben Tickets ab. Besser ist eine Idee pro Datei.
- Reihenfolge der Bearbeitung: niedrigste `prio` zuerst; bei gleicher `prio` die älteste Datei
  (Änderungsdatum der Datei im Git-Verlauf), ohne `prio` zuletzt.

## Statuspflege

| Status | Gesetzt von | Wann |
| --- | --- | --- |
| `offen` | du | Idee angelegt |
| `in-arbeit` | `spec-intake` | Idee aufgenommen, Ticket-Key eingetragen |
| `umgesetzt` | `spec-pipeline` | Closure des Tickets |
| `verworfen` | `spec-pipeline` bzw. du | Ticket an H1/H2 verworfen oder Idee bewusst aufgegeben |

Die Idee wird nicht gelöscht und nicht verschoben. Der Inhalt bleibt als Quelle erhalten; nur der
Dateikopf ändert sich. Ideen sind keine normative Spezifikation und tragen keine Story-, Task- oder
Spezifikations-IDs.

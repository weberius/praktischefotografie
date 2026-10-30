# TASK-06: Skill-Test auf Abschnitt begrenzen

**Priorität:** Low  
**Aufwand:** ~15 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-07  
**ADR-Bezug:** ADR-007  
**Status:** Zurückgestellt (2026-10-30, niedrig bzw. durch TASK-07/08 abgedeckt)

---

## Problem

`skill.test.mjs:91-94` schneidet ab `**Eröffnung und Finissage**` bis Dateiende; bei fehlender Überschrift liefert `slice(-1)` das letzte Zeichen.

## Ziel

Test prüft genau den Abschnitt und scheitert mit klarer Meldung, wenn er fehlt.

## Betroffene Dateien

- `test/scrape/skill.test.mjs`

## Umsetzungsvorschlag

1. `assert.ok(start >= 0, "Abschnitt fehlt")` vor dem Slice.
2. Ende am nächsten Absatz mit `**` bzw. nächster Überschrift bestimmen.

## Akzeptanzkriterien

- [ ] Fehlt die Überschrift, nennt der Test das ausdrücklich
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – nur Testcode.

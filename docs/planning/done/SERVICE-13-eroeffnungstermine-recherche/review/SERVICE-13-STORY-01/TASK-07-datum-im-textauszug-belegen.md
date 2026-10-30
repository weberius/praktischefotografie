# TASK-07: Datum des Termins im Textauszug belegen

**Priorität:** High  
**Aufwand:** ~1 h  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-01  
**ADR-Bezug:** ADR-007  
**Status:** Umgesetzt (2026-10-30, Abnahme: Empfehlung)

---

## Problem

`proposals.mjs:86` prüft nur Stichwort plus irgendein Datum im Auszug (`termine.mjs:29-37`); `needle` ist für Termine `null` (`proposals.mjs:167`). Ein abweichendes `startDate` wird nicht erkannt.

## Ziel

Das Datum `record.startDate` muss im Auszug nach dem Stichwort der Art vorkommen (ADR-007: Wert im Textauszug).

## Betroffene Dateien

- `scripts/scrape/lib/termine.mjs`
- `scripts/scrape/lib/proposals.mjs`
- `test/scrape/termine.test.mjs`

## Umsetzungsvorschlag

1. In `termine.mjs` Datumsangaben parsen (ISO, `7.11.2026`, `7. November 2026`, `7 November 2026`, `November 7, 2026`; Jahr ergänzen, wenn nur `7.11.`) und zu ISO normalisieren.
2. `hasHint` um eine Variante erweitern, die die normalisierten Daten nach dem Stichwort liefert; `checkTermin` verlangt `startDate` darunter, sonst Grund „Datum nicht belegt“.
3. Fixtures: abweichendes Datum, anderes Datum desselben Auszugs, deutsche und englische Formate.

## Akzeptanzkriterien

- [ ] Vorschlag mit `startDate` 2026-11-07 und Auszug `Opening: Saturday, 14 November 2026` wird verworfen
- [ ] Bestehende Fixtures (Zander „Between“) bleiben akzeptiert
- [ ] Gilt gleichermaßen für Vernissage und Finissage
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien (`setup/eroeffnungstermine.feature`) weiterhin erfüllt

## Risiko

Niedrig – Prüfung wird strenger; Formate ohne Jahr könnten zu Verwerfungen führen (Entscheidung: Jahr aus Ausstellung ableiten oder verwerfen).

**Hinweis:** Überschneidet sich mit TASK-03 (analyse-code.md, CODE-01/02); vor Umsetzung zusammenlegen.

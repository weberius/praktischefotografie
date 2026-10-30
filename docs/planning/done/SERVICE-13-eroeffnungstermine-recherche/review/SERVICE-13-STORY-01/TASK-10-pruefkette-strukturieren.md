# TASK-10: Termin-Prüfung ohne Seiteneffekt, Prüfkette gliedern

**Priorität:** Low  
**Aufwand:** ~1,5 h  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-05  
**ADR-Bezug:** ADR-007  
**Status:** Zurückgestellt (2026-10-30, niedrig bzw. durch TASK-07/08 abgedeckt)

---

## Problem

`checkTermin` setzt `record.id` (`proposals.mjs:82`); `checkProposal` ist eine ~120-zeilige if/continue-Kette (`proposals.mjs:92-214`). Bericht liest den ganzen Snapshot-Cache (`report.mjs:12`) statt der Quellen des Laufs (Annahme).

## Ziel

Prüffunktionen ohne Nebeneffekt; Prüfkette als Liste kleiner Regeln je Datensatzart; Bericht begrenzt auf Quellen des Laufs, falls gewollt.

## Betroffene Dateien

- `scripts/scrape/lib/proposals.mjs`
- `scripts/scrape/lib/report.mjs`

## Umsetzungsvorschlag

1. `checkTermin` liefert `{ problem, id }`; `checkProposal` setzt die `id`.
2. Regeln (Zuordnung, Termin, Fundstelle, Beschreibung, Schema) als benannte Funktionen; Reihenfolge explizit.
3. **Entscheidung erforderlich:** Soll der Bericht alle Cache-Quellen oder nur die des Laufs (`fetch-summary.json`) zeigen?

## Akzeptanzkriterien

- [ ] Verhalten unverändert (alle bestehenden Tests grün, keine neuen Verwerfungsgründe)
- [ ] `checkTermin` verändert seine Eingabe nicht
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien (`setup/eroeffnungstermine.feature`) weiterhin erfüllt

## Risiko

Niedrig – reines Refactoring mit breiter Testabdeckung; erst nach TASK-07 und TASK-08 sinnvoll; überschneidet sich mit TASK-04 und TASK-05 aus analyse-code.md (vor Umsetzung zusammenlegen).

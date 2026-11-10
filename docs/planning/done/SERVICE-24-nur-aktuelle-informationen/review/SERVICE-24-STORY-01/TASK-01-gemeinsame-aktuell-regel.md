# TASK-01: Eine gemeinsame Regel für „aktuell“

**Priorität:** Medium  
**Aufwand:** ~30 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-01, CODE-04  
**ADR-Bezug:** ADR-002  
**Status:** Vorgeschlagen

---

## Problem

Eventliste (`web/src/app/pages/event-list/event-list.ts:48`) nutzt `!isOver(e, today)`, Ausstellungsliste (`web/src/app/pages/exhibition-list/exhibition-list.ts:44`) `status !== 'beendet'`. Q-REL-4 fordert eine Regel ohne zweite Berechnung. `today` in `event-list.ts:29` ist unnötig `protected`.

## Ziel

Beide Listen verwenden dieselbe benannte Funktion; `today` ist `private`.

## Betroffene Dateien

- `web/src/app/core/exhibition-status.ts`
- `web/src/app/pages/event-list/event-list.ts`
- `web/src/app/pages/exhibition-list/exhibition-list.ts`

## Umsetzungsvorschlag

1. In `exhibition-status.ts` `isCurrent(item, today)` ergänzen (`!isOver(item, today)`).
2. Beide Listen darauf umstellen; in der Ausstellungsliste vor dem `map` filtern, damit für beendete Einträge nichts berechnet wird.
3. `today` in der Eventliste `private` machen.

## Akzeptanzkriterien

- [ ] Beide Listen rufen dieselbe Funktion auf; kein Literal `'beendet'` im Listenfilter
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien (`aktualitaet.feature`) weiterhin erfüllt

## Risiko

Niedrig – reine Umformung, abgesichert durch bestehende Tests.

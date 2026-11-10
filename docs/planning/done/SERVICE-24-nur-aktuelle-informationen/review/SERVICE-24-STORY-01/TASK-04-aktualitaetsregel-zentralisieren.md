# TASK-04: Aktualitätsregel als ein Prädikat in `core/` bündeln, Reste aufräumen

**Priorität:** Medium  
**Aufwand:** ~1 h  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-01  
**ADR-Bezug:** ADR-002 (`core/` für Gemeinsames)  
**Status:** Vorgeschlagen

---

## Problem

Die Eventliste filtert mit `isOver(e, today)` (`event-list.ts:48`), die Ausstellungsliste mit `item.status !== 'beendet'` (`exhibition-list.ts:108`) und einer separat gepflegten `STATUSES`-Liste (`exhibition-list.ts:79`). Q-REL-4 verlangt dieselbe Regel ohne zweite Berechnung. Außerdem: veraltete Meta-Description (`exhibition-list.ts:113`, nennt „beendet“) und unnötig `protected` gesetztes `today` (`event-list.ts:29`).

Überschneidung: TASK-01 (gemeinsame Regel) und TASK-03 (Meta-Beschreibung) aus `analyse-code.md` behandeln dasselbe; bei Freigabe zusammenführen und nur einen Task umsetzen.

## Ziel

Genau ein benanntes Prädikat für „aktuell“ in `core/exhibition-status.ts`, das beide Listen nutzen; Statusoptionen der Ausstellungsliste daraus abgeleitet; keine veralteten Reste.

## Betroffene Dateien

- `web/src/app/core/exhibition-status.ts` (und Spec)
- `web/src/app/pages/event-list/event-list.ts`
- `web/src/app/pages/exhibition-list/exhibition-list.ts`

## Umsetzungsvorschlag

1. In `core/exhibition-status.ts` z. B. `isCurrent(item, today)` (= `!isOver`) und `CURRENT_STATUSES` (alle Status außer `beendet`) ergänzen.
2. Eventliste: `isCurrent`; Ausstellungsliste: `STATUSES = CURRENT_STATUSES`, Zusatzfilter `item.status !== 'beendet'` durch das Prädikat ersetzen.
3. Meta-Description der Ausstellungsliste anpassen (ohne „beendet“); `today` in der Eventliste `private`.
4. Grenzfalltabelle (gestern/heute/morgen) einmal in der Spec von `core/` prüfen, Listen-Specs behalten ihre Szenarien.

## Akzeptanzkriterien

- [ ] Beide Listen nutzen dasselbe Prädikat; `'beendet'` kommt in den Listen-Dateien nicht mehr als Literal vor
- [ ] Meta-Description nennt „beendet“ nicht mehr
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien (`web/aktualitaet.feature`) weiterhin erfüllt

## Risiko

Niedrig – reine Umstrukturierung bei gleichem Verhalten, durch bestehende Specs abgesichert.

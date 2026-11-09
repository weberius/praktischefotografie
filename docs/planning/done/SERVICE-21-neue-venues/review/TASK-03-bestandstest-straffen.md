# TASK-03: Bestandstest straffen

**Priorität:** Medium  
**Aufwand:** ~20 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-01  
**ADR-Bezug:** –  
**Status:** Vorgeschlagen

---

## Problem

`test/bestand.test.mjs:39-52` wiederholt die Quelle-/Prüfstand-Prüfung aus Z. 32-37 und enthält Asserts ohne `id` in der Fehlermeldung (Z. 47-49).

## Ziel

Der Test prüft nur das Neue (Vorhandensein, Typ, Stadt, Website) und meldet die betroffene Venue.

## Betroffene Dateien

- `test/bestand.test.mjs`

## Umsetzungsvorschlag

1. Z. 50 entfernen (durch den Test „Jede Venue nennt Quelle und Prüfstand“ abgedeckt).
2. Den Asserts in Z. 47-49 `e.id` als Meldung mitgeben.

## Akzeptanzkriterien

- [ ] Doppelprüfung entfernt, Meldungen nennen die `id`
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – reine Testbereinigung.

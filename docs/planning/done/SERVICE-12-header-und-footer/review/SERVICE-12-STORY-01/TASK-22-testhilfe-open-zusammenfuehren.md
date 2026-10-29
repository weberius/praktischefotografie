# TASK-22: Testhilfe `open` zusammenführen

**Priorität:** Low  
**Aufwand:** ~20 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-02  
**ADR-Bezug:** –  
**Status:** Zurückgestellt (niedrig, begründet in PIPELINE.md)

---

## Problem

`web/src/app/app.spec.ts:152` und `:215` enthalten dieselbe Abfolge zum Erzeugen der App und Navigieren; `:111` (`openMap`) ähnelt ihr.

## Ziel

Eine gemeinsame Hilfsfunktion im obersten `describe('App')`, die Fixture und Wurzelelement liefert; die Blöcke ergänzen nur ihre Abfragen.

## Betroffene Dateien

- `web/src/app/app.spec.ts`

## Umsetzungsvorschlag

1. `openApp(url)` mit `createComponent`, `detectChanges`, `navigateByUrl`, `whenStable`, `detectChanges` und Rückgabe von `{ fixture, root }` im äußeren `describe` anlegen.
2. In den Blöcken „Icon im Kopfbereich“ und „Kopf- und Fußbereich (FRM)“ darauf zurückgreifen; `openMap` prüfen und, falls ohne Verhaltensänderung möglich, ebenfalls.

## Akzeptanzkriterien

- [ ] Nur noch eine Implementierung des Aufbaus
- [ ] Anzahl und Ergebnis der Tests unverändert
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – nur Testcode.

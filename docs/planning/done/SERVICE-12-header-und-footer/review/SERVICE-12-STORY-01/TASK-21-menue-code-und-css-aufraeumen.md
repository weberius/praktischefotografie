# TASK-21: Menü-Code und CSS aufräumen

**Priorität:** Low  
**Aufwand:** ~20 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-01, CODE-03  
**ADR-Bezug:** –  
**Status:** Zurückgestellt (niedrig, begründet in PIPELINE.md)

---

## Problem

`web/src/styles.css:31-38`: `.brand` ist zweimal definiert, der Burger-Kommentar steht über `.brand`, der Kommentar zu `.brand-mark` nennt die abgelöste ID ICO-UB-3. `web/src/app/app.ts:36-46`: `links` steht hinter den Methoden.

## Ziel

Eine `.brand`-Regel, Kommentare an der richtigen Regel mit gültigen IDs, einheitliche Mitgliederreihenfolge.

## Betroffene Dateien

- `web/src/styles.css`
- `web/src/app/app.ts`

## Umsetzungsvorschlag

1. `line-height: 1.25` in die erste `.brand`-Regel übernehmen, zweite Regel löschen.
2. Den Kommentar „Burger-Menü …“ direkt über `.nav-toggle` setzen; ICO-UB-3 im Kommentar durch ICO-UB-7 ersetzen.
3. `links` an den Anfang der Klasse `App` verschieben.

## Akzeptanzkriterien

- [ ] Genau eine `.brand`-Regel außerhalb der Media-Queries
- [ ] Berechnete Stile unverändert (Kopfhöhe bei 390 und 320 Pixeln wie zuvor)
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – reine Umordnung; die Kaskade ändert sich nicht, solange keine Regel zwischen den beiden `.brand`-Blöcken `.brand` überschreibt (Media-Queries stehen danach).

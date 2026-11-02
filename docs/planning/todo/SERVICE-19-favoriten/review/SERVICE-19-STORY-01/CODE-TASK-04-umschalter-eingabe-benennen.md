# CODE-TASK-04: Umschalter: Eingabe präzise benennen, Zustand einmal auswerten

**Priorität:** Low  
**Aufwand:** ~20 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-06  
**ADR-Bezug:** ADR-023  
**Status:** Vorgeschlagen

---

## Problem

`web/src/app/shared/favorite-toggle/favorite-toggle.ts:15` nennt den Eventtitel `title`, was mit dem globalen HTML-Attribut kollidiert; `pressed()` wird in Zeile 7 dreimal ausgewertet.

## Ziel

Der Input heißt fachlich eindeutig; das Template liest den Zustand einmal.

## Betroffene Dateien

- `web/src/app/shared/favorite-toggle/favorite-toggle.ts`
- `web/src/app/pages/{event-list,event-detail,calendar}/*.html` (Bindung `[title]`)
- `web/src/app/shared/favorite-toggle/favorite-toggle.spec.ts`

## Umsetzungsvorschlag

1. `title` in `eventTitle` umbenennen und die drei Aufrufer anpassen.
2. Optional: Symbol und Text als ein `computed` (z. B. `view`) führen; nur umsetzen, wenn die Lesbarkeit gewinnt.

## Akzeptanzkriterien

- [ ] Kein Input des Umschalters trägt den Namen eines HTML-Standardattributs
- [ ] Zugänglicher Name nennt weiterhin das Event
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – Umbenennung an drei Aufrufstellen.

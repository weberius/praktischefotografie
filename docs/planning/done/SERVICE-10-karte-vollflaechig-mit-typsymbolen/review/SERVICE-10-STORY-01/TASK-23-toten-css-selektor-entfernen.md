# TASK-23: Toten Selektor .venue-type in map.css entfernen

**Priorität:** Low  
**Aufwand:** ~5 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-03  
**ADR-Bezug:** –  
**Status:** Umgesetzt (2026-10-29, Prüf-Gate grün, siehe Story-Changelog)

---

## Problem

`web/src/app/pages/map/map.css:9` definiert `.venue-type { color: var(--muted); }`. Das Template `map.html` enthält die Ortsliste mit `<p class="venue-type">` nicht mehr (Diff gegen main), `typeInfo` wurde aus `map.ts` entfernt. Komponenten-Styles sind gekapselt; die Regel wirkt daher nicht auf `venue-list.html:41` und `venue-detail.html:4`, die dieselbe Klasse ohne eigene Regel nutzen (Grep: `.venue-type` hat sonst nirgends eine CSS-Regel).

## Ziel

Keine CSS-Regel ohne Gegenstück im Template.

## Betroffene Dateien

- `web/src/app/pages/map/map.css`

## Umsetzungsvorschlag

1. Zeile 9 entfernen.
2. Optional: Falls die gedämpfte Farbe auf `/venues` und den Ortsseiten gewollt war, die Regel nach `styles.css` verschieben (Entscheidung erforderlich; eigenes Thema außerhalb dieser Story).

## Akzeptanzkriterien

- [ ] `.venue-type` kommt in `map.css` nicht mehr vor.
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig.

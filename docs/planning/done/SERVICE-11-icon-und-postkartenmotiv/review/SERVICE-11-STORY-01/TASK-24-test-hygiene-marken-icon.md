# TASK-24: Testtitel und Importe in `marken-icon.test.mjs` bereinigen

**Priorität:** Low  
**Aufwand:** ~20 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-04  
**ADR-Bezug:** ADR-017  
**Status:** Umgesetzt (2026-10-29, Prüf-Gate grün, siehe Story-Changelog)

---

## Problem

`test/marken-icon.test.mjs:147-154`: Titel „… ohne Postkartenmotiv“, geprüft wird nur `icon.png` kleiner als `postkarte.png` (153). Dreifach `await import('./png-helpers.mjs')` (47, 134, 148) neben dem statischen Import in Zeile 7.

## Ziel

Titel und Prüfung stimmen überein; ein einheitlicher Importstil.

## Betroffene Dateien

- `test/marken-icon.test.mjs`

## Umsetzungsvorschlag

1. `decodePng` in Zeile 7 statisch mit `pngSize` importieren; die drei dynamischen Importe entfernen (die Tests werden `async`-frei, wo möglich).
2. Entweder „und ohne Postkartenmotiv“ aus dem Titel streichen und die Größenprüfung (153) entfernen, oder eine echte Prüfung ergänzen (z. B. kein Pixel mit dem Blau-/Papierton der Postkarte; Verweis auf den Browser-Test).

## Akzeptanzkriterien

- [ ] Titel entspricht dem Geprüften
- [ ] Keine dynamischen Importe von `png-helpers.mjs`
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – nur Testcode.

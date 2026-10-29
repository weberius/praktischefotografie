# TASK-21: `splitInBrowser` und `scaleInBrowser` entflechten, Schwellen benennen

**Priorität:** Medium  
**Aufwand:** ~1,5 h  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-01, CODE-02  
**ADR-Bezug:** ADR-017  
**Status:** Zurückgestellt (2026-10-29, Abnahme: Refactoring bzw. Stilfrage ohne Verhaltens- oder Testlücke; nicht verworfen)

---

## Problem

`web/tools/make-icons.mjs:26-125`: `splitInBrowser` erledigt Erkennung, Zuschnitt, Freistellung und Quadratisierung in einer Funktion; zwei Weiß-Schwellen (`NON_WHITE` 27/40, `WHITE` 88/89) und unbenannte Zahlen (Alpha 128 in Zeile 112, Lücke 8 in Zeilen 43 und 55). `boxOf(cardRun)` wird doppelt berechnet (80, 124). `scaleInBrowser` (138-158) enthält zwei fast gleiche Skalierblöcke.

## Ziel

Kleine, benannte Schritte innerhalb der Browserfunktionen; erklärte Konstanten; eine gemeinsame Skalierfunktion. Verhalten und erzeugte Dateien bleiben unverändert.

## Betroffene Dateien

- `web/tools/make-icons.mjs`
- `test/make-icons.test.mjs` (bleibt unverändert grün)

## Umsetzungsvorschlag

1. Innerhalb von `splitInBrowser` Hilfsfunktionen `findRuns`, `boundingBox`, `makeTransparentOutside`, `padToSquare` bilden (alle im Browserkontext, da `page.evaluate` nur die Funktion serialisiert; Hilfsfunktionen als innere Funktionen oder per Übergabe).
2. Konstanten mit kurzen Kommentaren benennen (`MOTIF_THRESHOLD`, `BACKGROUND_MIN_CHANNEL`, `EDGE_ALPHA`, `MAX_GAP`); `boxOf(cardRun)` einmal berechnen.
3. In `scaleInBrowser` eine Funktion `resizeTo(canvas, size)` für beide Pfade verwenden.
4. `node --test test/make-icons.test.mjs` mit `CHROME_BIN` ausführen; `npm run icons:build` gegen temporäre Ordner laufen lassen und die Ausgabe byteweise mit dem Stand vor dem Umbau vergleichen.

## Akzeptanzkriterien

- [ ] Keine Funktion in `make-icons.mjs` länger als etwa 40 Zeilen
- [ ] Erzeugte PNG-Dateien (temporäre Ordner) sind vor und nach dem Umbau identisch
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien (`setup/bildmaterial.feature`) weiterhin erfüllt

## Risiko

Niedrig – reine Umstrukturierung, durch den Browser-Test und den Byte-Vergleich abgesichert.

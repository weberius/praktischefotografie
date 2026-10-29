# TASK-21: Icon-Test: Aussage und Assertion in Einklang bringen

**Priorität:** Medium  
**Aufwand:** ~20 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-01, CODE-02  
**ADR-Bezug:** ADR-017  
**Status:** Umgesetzt (2026-10-29, Prüf-Gate grün, siehe Story-Changelog)

---

## Problem

`test/marken-icon.test.mjs:147` verspricht „ohne Postkartenmotiv“, `:153` prüft stattdessen `icon.png` kleiner als `postkarte.png` (Byte-Größe). Ein Postkartenrest im Icon würde unentdeckt bleiben; die Größenbedingung ist ein willkürliches Proxy-Kriterium. Die Abdeckung von „keine Teile des anderen Motivs“ liegt für die eingecheckten Dateien nur in der Sichtprüfung.

## Ziel

Name und Assertions stimmen überein, und die Lücke ist entweder geschlossen oder ausdrücklich benannt.

## Betroffene Dateien

- `test/marken-icon.test.mjs`

## Umsetzungsvorschlag

1. Größenvergleich (`:153`) entfernen.
2. **Entscheidung erforderlich:** (a) Inhaltsprüfung ergänzen, etwa: Randstreifen des Icons (innerhalb der abgerundeten Form) und der Postkarte jeweils auf Farbverteilung prüfen, die das andere Motiv ausschließt; oder (b) „ohne Postkartenmotiv“ aus dem Namen streichen und im Kommentar vermerken, dass dies per Sichtprüfung und durch `test/make-icons.test.mjs` abgesichert ist.

## Akzeptanzkriterien

- [ ] Kein Testname verspricht mehr, als die Assertions prüfen
- [ ] Kein Vergleich der Dateigrößen von Icon und Postkarte
- [ ] Unit-Tests grün (`node --test test/marken-icon.test.mjs`)
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – nur Testcode; bei Variante (a) Schwellenwerte am realen Bild kalibrieren.

# TASK-21: Fußbereich-Tests entflechten und Kontrast-Helfer wiederverwenden

**Priorität:** Low  
**Aufwand:** ~45 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-01, CODE-02  
**ADR-Bezug:** ADR-016  
**Status:** Zurückgestellt (niedrig, begründet in PIPELINE.md)

---

## Problem

`web/src/app/app.spec.ts:339-343` berechnet den Kontrast inline, obwohl `web/src/app/core/venue-symbol.spec.ts:8-14` eine Berechnung enthält. `app.spec.ts:319-334` prüft in einem Test Positionierung, Scrollen und Ausrichtung auf einer unerklärten Route und räumt das Füllelement nicht bei Fehlschlag auf.

## Ziel

Ein Kontrast-Helfer an einer Stelle; je Gherkin-Szenario ein Test mit passendem Titel.

## Betroffene Dateien

- `web/src/app/app.spec.ts`
- `web/src/app/core/venue-symbol.spec.ts`
- ggf. neue gemeinsame Testhilfe

## Umsetzungsvorschlag

1. Kontrastfunktion in eine gemeinsame Testhilfe verschieben, beide Specs nutzen sie.
2. FRM-UB-3-Test teilen: „nicht fixiert“, „scrollt bei langem Inhalt aus dem Bild“ (Füllelement in `try/finally` entfernen), „bei kurzem Inhalt am Fensterrand“ (eigener Test mit Bezug auf das Szenario).
3. Ausrichtungsprüfung als eigenen Test zu FRM-UB-4 führen; Grund für die Route `/gibt-es-nicht` kommentieren oder eine echte Route nutzen.

## Akzeptanzkriterien

- [ ] Eine Kontrastberechnung im Projekt
- [ ] Ein Test je Szenario „Fußbereich scrollt mit dem Inhalt“ und „Fußbereich bei kurzem Inhalt am Fensterrand“
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – nur Testcode.

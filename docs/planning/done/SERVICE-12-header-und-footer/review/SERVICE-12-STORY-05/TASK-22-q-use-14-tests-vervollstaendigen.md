# TASK-22: Q-USE-14 im Komponententest vollständig absichern

**Priorität:** Medium  
**Aufwand:** ~30 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-03  
**ADR-Bezug:** –  
**Status:** Umgesetzt (2026-10-29)

---

## Problem

`web/src/app/app.spec.ts` (Szenario RCH) prüft von Q-USE-14 nur `h1`, `rel="noopener"` und verbotene Wörter; Überschriftenfolge (kein Sprung), Titel und Meta-Beschreibung je Seite sind im Komponententest nicht abgesichert.

## Ziel

Das Quality-Szenario ist in den vier Seitentests abgebildet.

## Betroffene Dateien

- `web/src/app/app.spec.ts`

## Umsetzungsvorschlag

1. In der `for (const url of pages)`-Schleife prüfen, dass keine Überschriftenebene übersprungen wird (h1, dann h2, ggf. h3 nach h2).
2. Titel und Meta-Beschreibung über `Title`/`Meta` (bzw. `PageMeta`) nach der Navigation prüfen: nicht leer, je Seite verschieden.
3. Optional Telefon in RCH-UB-1 mit der Nummer statt nur dem Wort prüfen.

## Akzeptanzkriterien

TASK-22-q-use-14-tests-vervollstaendigen.md0

## Risiko

TASK-22-q-use-14-tests-vervollstaendigen.md1

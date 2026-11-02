# TASK-05: Importreihenfolge in den Detailseiten angleichen

**Priorität:** Low  
**Aufwand:** ~10 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-06  
**ADR-Bezug:** –  
**Status:** Umgesetzt

---

## Problem

`import { BackLink }` steht in allen sieben `*-detail.ts` in Zeile 1 vor den `@angular/*`-Imports, sonst stehen Fremdpakete vor relativen Imports (`venue-detail.ts:1-13`).

## Ziel

Einheitliche Reihenfolge, `BackLink` bei den übrigen `shared/`-Imports.

## Betroffene Dateien

- `web/src/app/pages/{event,exhibition,festival,organizer,photographer,post,venue}-detail/*-detail.ts`

## Umsetzungsvorschlag

1. Import neben `DataGate`/`NotFound` einsortieren.

## Akzeptanzkriterien

- [ ] Import steht in allen sieben Dateien bei den `shared/`-Imports
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – rein kosmetisch.

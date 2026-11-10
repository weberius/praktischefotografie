# TASK-03: Meta-Beschreibung und Gherkin-Format bereinigen

**Priorität:** Low  
**Aufwand:** ~20 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-03, CODE-05  
**ADR-Bezug:** ADR-002  
**Status:** Vorgeschlagen

---

## Problem

`web/src/app/pages/exhibition-list/exhibition-list.ts:49` bewirbt „beendet“, obwohl beendete Ausstellungen nicht mehr gelistet werden. `docs/contracts/gherkin/web/aktualitaet.feature:11-17` hat nicht ausgerichtete Beispieltabellen; Schritte in `:21-24` und `:49-55` sind unscharf.

## Ziel

Beschreibung entspricht dem Verhalten; Gherkin einheitlich formatiert und eindeutig.

## Betroffene Dateien

- `web/src/app/pages/exhibition-list/exhibition-list.ts`
- `docs/contracts/gherkin/web/aktualitaet.feature`

## Umsetzungsvorschlag

1. Beschreibung ohne „beendet“ formulieren (Prüfen, ob ein Test den Text prüft).
2. Tabellen ausrichten; Schritte mit konkreten Datenbeschreibungen präzisieren.

## Akzeptanzkriterien

- [ ] Kein Verweis auf „beendet“ in der Meta-Beschreibung der Liste
- [ ] Gherkin einheitlich formatiert, Szenario-IDs unverändert
- [ ] Unit-Tests grün

## Risiko

Niedrig.

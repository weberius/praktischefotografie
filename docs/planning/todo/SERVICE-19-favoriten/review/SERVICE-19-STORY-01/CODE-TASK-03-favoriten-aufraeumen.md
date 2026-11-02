# CODE-TASK-03: `count` entfernen, Importreihenfolge angleichen

**Priorität:** Low  
**Aufwand:** ~20 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-01, CODE-05  
**ADR-Bezug:** ADR-023  
**Status:** Vorgeschlagen

---

## Problem

`web/src/app/core/favorites.ts:8` (`count`) wird nur im Test gelesen (`favorite-toggle.spec.ts:79,83`). Die Importe in `web/src/app/pages/event-list/event-list.ts:8` und `web/src/app/pages/event-detail/event-detail.ts:11,21` stehen nicht in der Ordnung der Nachbarzeilen.

## Ziel

Keine öffentliche API ohne Verbraucher; Importe in der bestehenden Reihenfolge.

## Betroffene Dateien

- `web/src/app/core/favorites.ts`
- `web/src/app/shared/favorite-toggle/favorite-toggle.spec.ts`
- `web/src/app/pages/event-list/event-list.ts`
- `web/src/app/pages/event-detail/event-detail.ts`

## Umsetzungsvorschlag

1. `count` entfernen; die Tests prüfen den Zustand über die Umschalter (siehe CODE-TASK-01).
2. `core/favorites` nach `core/exhibition-status` einsortieren; `favorite-toggle` nach `data-gate`, `imports` entsprechend ordnen.

## Akzeptanzkriterien

- [ ] `Favorites` hat keinen Getter ohne Produktivnutzung
- [ ] Importe nach Pfad sortiert wie in den Nachbarzeilen
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – mechanische Änderung; mit CODE-TASK-01 gemeinsam umsetzen, da dieselbe Spec betroffen ist.

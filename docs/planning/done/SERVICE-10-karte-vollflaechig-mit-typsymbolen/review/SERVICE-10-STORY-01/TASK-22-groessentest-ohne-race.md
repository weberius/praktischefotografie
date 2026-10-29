# TASK-22: Test zur Größenanpassung der Karte gegen den initialen ResizeObserver-Aufruf absichern

**Priorität:** Low  
**Aufwand:** ~20 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-02  
**ADR-Bezug:** –  
**Status:** Umgesetzt (2026-10-29, Prüf-Gate grün, siehe Story-Changelog)

---

## Problem

`web/src/app/shared/venue-map/venue-map.spec.ts` (Test „ändert sich die Höhe des Kartenbereichs, passt Leaflet seine Größe an“) installiert den Spy auf `invalidateSize`, setzt dann `height: 600px` und wartet auf `spy.calls.count() > 0`. Ein `ResizeObserver` feuert beim ersten `observe()` immer einmal (`venue-map.ts:108-109`). Dieser Erstaufruf kann nach der Spy-Installation eintreffen; der Test wäre dann grün, ohne dass die Höhenänderung etwas bewirkt hat. (ANNAHME: nicht gemessen, die Reihenfolge hängt vom Frame-Timing in Karma ab.)

## Ziel

Der Test schlägt fehl, wenn `followContainerSize` entfernt wird, und ist unabhängig vom Frame-Timing.

## Betroffene Dateien

- `web/src/app/shared/venue-map/venue-map.spec.ts`

## Umsetzungsvorschlag

1. Nach dem Marker-Warten einen Frame abwarten (`requestAnimationFrame` zweimal), damit der Erstaufruf durch ist; erst dann den Spy setzen.
2. Alternativ den Zähler nach der Änderung mit dem Stand davor vergleichen und die Höhe vorher und nachher verschieden wählen.
3. Einmalig prüfen, dass der Test bei auskommentiertem `followContainerSize(map)` rot wird.

## Akzeptanzkriterien

- [ ] Test wird rot, wenn `followContainerSize(map)` nicht aufgerufen wird.
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – nur Testcode.

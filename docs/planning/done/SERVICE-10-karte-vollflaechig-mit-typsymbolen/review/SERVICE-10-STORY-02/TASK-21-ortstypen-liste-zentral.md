# TASK-21: Liste der Ortstypen einmal zentral ableiten

**Priorität:** Medium  
**Aufwand:** ~30 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-01  
**ADR-Bezug:** ADR-016  
**Status:** Umgesetzt (2026-10-29, Prüf-Gate grün, siehe Story-Changelog)

---

## Problem

`(Object.keys(VENUE_TYPE_INFO) as VenueType[])` steht in `venue-legend.ts:18`, `map.ts:28` und `venue-list.ts:23` (plus Specs); `map.ts` und `venue-list.ts` bauen dieselbe `{ value, label }`-Liste. Die Legende fügt eine dritte Kopie hinzu, der Cast wird jeweils einzeln gesetzt, die Reihenfolge hängt implizit am Objektliteral.

## Ziel

Eine benannte Ableitung (z. B. `VENUE_TYPES` und ggf. `VENUE_TYPE_OPTIONS`) neben `VENUE_TYPE_INFO`, die alle Verbraucher nutzen; die Reihenfolge ist an einer Stelle erkennbar.

## Betroffene Dateien

- `web/src/app/core/models.ts`
- `web/src/app/shared/venue-legend/venue-legend.ts`
- `web/src/app/pages/map/map.ts`
- `web/src/app/pages/venue-list/venue-list.ts`
- Specs, die die Schlüssel ableiten

## Umsetzungsvorschlag

1. In `models.ts` `VENUE_TYPES` (und Optionsliste) aus `VENUE_TYPE_INFO` exportieren.
2. Verbraucher und Specs darauf umstellen; lokale Casts entfernen.

## Akzeptanzkriterien

- [ ] Kein `Object.keys(VENUE_TYPE_INFO)` mehr außerhalb von `models.ts`
- [ ] Reihenfolge in Filter und Legende unverändert
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien („Legende der Ortstypen“, „Symbol und Farbe je Typ“) weiterhin erfüllt

## Risiko

Niedrig – reines Refactoring, durch bestehende Tests abgedeckt.

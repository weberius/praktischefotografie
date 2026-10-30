# TASK-01: Abbildung Event/Ort zu ICS-Eingabe nach core/ verlagern

**Priorität:** Medium  
**Aufwand:** ~1 h  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-01  
**ADR-Bezug:** ADR-002, ADR-018  
**Status:** Zurückgestellt (2026-10-30, Struktur bzw. niedrig, kein Einfluss auf Verhalten)

---

## Problem

`event-detail.ts:44-60` bildet Event und Ort auf `IcsEventInput` ab und baut die Detail-URL. Fachlogik liegt in der Seitenkomponente und ist nur dort testbar; weitere Exporte würden sie kopieren.

## Ziel

Eine reine Funktion in `core/` (z. B. `eventToIcsInput(event, venue, baseUrl)`), die die Seite nur aufruft.

## Betroffene Dateien

- `web/src/app/pages/event-detail/event-detail.ts`
- `web/src/app/core/ics.ts` (oder neue `core/event-ics.ts`)
- `web/src/app/core/ics.spec.ts`

## Umsetzungsvorschlag

1. Mapping-Funktion mit echten Modelltypen (`Event`, `Venue`) anlegen, Typ-Label und Ort-Fallback (ICS-UN-1) dort bündeln.
2. Komponente reduziert sich auf Aufruf plus Download.
3. Mapping-Tests ohne TestBed ergänzen.

## Akzeptanzkriterien

- [ ] `saveToCalendar` enthält kein Feld-Mapping mehr
- [ ] Mapping-Test mit Ort bekannt/unbekannt
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – rein strukturelle Verschiebung, bestehende Tests decken das Verhalten.

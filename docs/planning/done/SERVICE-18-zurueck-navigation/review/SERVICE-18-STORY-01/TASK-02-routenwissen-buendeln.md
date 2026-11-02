# TASK-02: Routenwissen für Zurück-Ziele bündeln

**Priorität:** Low  
**Aufwand:** ~1 h  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-03  
**ADR-Bezug:** ADR-022  
**Status:** Umgesetzt

---

## Problem

Übersichtsadressen und Bezeichnungen stehen in `web/src/app/shared/back-link/back-link.ts:5-32`, die Fallbacks einzeln in sieben Templates (`web/src/app/pages/*-detail/*-detail.html:3`). Ein neuer Seitentyp erfordert mehrere Änderungen.

## Ziel

Eine zentrale Tabelle „Seitentyp → Übersichtsadresse, Bezeichnung“, aus der Fallback und Beschriftung folgen.

## Betroffene Dateien

- `web/src/app/shared/back-link/back-link.ts`
- `web/src/app/pages/*-detail/*-detail.html`
- `web/src/app/shared/back-link/back-link.spec.ts`

## Umsetzungsvorschlag

1. Einen Eingabewert wie `kind="venues"` statt `fallback="/venues"` erwägen und Fallback sowie Label aus einer Tabelle ableiten.
2. Test über alle Tabelleneinträge laufen lassen.

**Entscheidung erforderlich:** Nur lohnenswert, wenn weitere Seitentypen geplant sind; sonst verwerfen (YAGNI).

## Akzeptanzkriterien

- [ ] Neuer Seitentyp erfordert eine Änderung für Zurück-Link
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – reine Umstrukturierung.

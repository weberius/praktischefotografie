# Closure: SERVICE-01 – Phase 1: Datenbasis NRW

**Datum:** 2026-10-27

## Erreichtes
- Sechs JSON-Schemas, Validator (`npm run validate:data`), 50 Tests, Lint grün.
- 20 recherchierte Venues in NRW mit Quelle und Prüfstand (`recherchiert`).
- ADR-001 (Ajv + JSON Schema) accepted; Spezifikation unter `docs/ears/`, `docs/contracts/gherkin/`, `docs/quality/`.

## Abweichungen
- 20 statt „20–30“ Venues (Untergrenze), Aachen und Bochum fehlen.
- Phase 7 (Review) nicht durchgeführt, weil keine `review-*`-Skills vorhanden sind.
- `docs/templates/` fehlt; Formate stammen aus dem Skill.

## Rückläufe
Keine.

## Erkenntnisse
- Daten stammen aus Web-Recherche; Koordinaten aus Nominatim, einzelne PLZ aus OSM, zwei Adressen aus Suchzusammenfassungen. Status daher `recherchiert`, nicht `verifiziert`.
- Ajv-Strict-Mode verlangt `strictRequired: false` für bedingte Pflichtfelder.

## Follow-ups / empfohlene Tickets
1. Redaktionelle Verifikation der 20 Venues (Status `verifiziert`), mehr Venues und Aachen/Bochum.
2. SPA mit Karte und Agenda (Stack wie `klangland`) inkl. Qualitätsziele Lighthouse und WCAG.
3. Ausstellungen, Events, Organizer und Fotograf:innen erfassen.
4. Review-Skills anlegen, um Phase 7 künftig auszuführen.
5. `docs/templates/` ergänzen.

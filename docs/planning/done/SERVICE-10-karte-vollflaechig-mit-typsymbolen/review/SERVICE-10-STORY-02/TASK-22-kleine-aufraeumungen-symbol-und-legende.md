# TASK-22: Wirkungslose Option, Cast und Farb-Literale bereinigen

**Priorität:** Low  
**Aufwand:** ~20 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-02, CODE-03, CODE-04  
**ADR-Bezug:** ADR-016  
**Status:** Umgesetzt (2026-10-29, Prüf-Gate grün, siehe Story-Changelog)

---

## Problem

- `venue-map.ts:136`: `alt: text` hat bei `divIcon` keine Wirkung (Leaflet `Marker.js:230` nur für `<img>`).
- `venue-legend.ts:20`: überflüssiger Cast `as SafeHtml` samt Import (Zeile 2).
- `venue-symbol.ts:7,19`: Weiß als Literal; `venue-symbol.spec.ts:7,36` und `venue-map.css:2`: Kartenhintergrund als Literal ohne erkennbare Kopplung.

## Ziel

Keine irreführenden Optionen oder Casts; Weiß und Kartenhintergrund einmal benannt, der Kontrasttest bezieht sich erkennbar auf dieselben Werte.

## Betroffene Dateien

- `web/src/app/shared/venue-map/venue-map.ts`
- `web/src/app/shared/venue-legend/venue-legend.ts`
- `web/src/app/core/venue-symbol.ts`, `venue-symbol.spec.ts`
- `web/src/app/shared/venue-map/venue-map.css`

## Umsetzungsvorschlag

1. `alt` aus den Marker-Optionen entfernen (Test zu `title`/`aria-label` bleibt).
2. Cast und Import `SafeHtml` entfernen.
3. Konstante für das Weiß im Markup; für den Kartenhintergrund einen Kommentar im CSS mit Verweis auf den Test oder eine gemeinsame Konstante.

## Akzeptanzkriterien

- [ ] Marker haben weiterhin `title` und `aria-label` „Name, Typ“
- [ ] Legende rendert unverändert
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – kosmetische Änderungen ohne Verhaltensänderung.

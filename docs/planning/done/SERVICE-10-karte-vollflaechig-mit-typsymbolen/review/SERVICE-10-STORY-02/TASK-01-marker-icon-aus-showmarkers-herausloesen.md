# TASK-01: Marker-Icon und Textalternative aus `showMarkers` herauslösen

**Priorität:** Low  
**Aufwand:** ~45 min  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-02  
**ADR-Bezug:** ADR-016, ADR-004  
**Status:** Zurückgestellt (2026-10-29, Abnahme: unter der Review-Schwelle, betrifft Struktur statt Verhalten; nicht verworfen)

---

## Problem

`VenueMap.showMarkers` (`web/src/app/shared/venue-map/venue-map.ts:122-146`) erzeugt Text, `divIcon`, Marker, Textalternative, Popup, Layer-Inhalt und Kartenausschnitt in einem Block. Die Option `alt: text` (`:136`) wirkt bei `divIcon` nicht (Leaflet setzt `alt` nur für `<img>`, `node_modules/leaflet/src/layer/marker/Marker.js:230`); die Textalternative kommt allein aus `setAttribute('aria-label', …)` in `:138`.

## Ziel

Die Marker-Konstruktion (Beschriftungstext, Icon, Textalternative) steht in einer eigenen, benannten Methode oder Funktion; es gibt genau einen Weg zur Textalternative (`aria-label`), die wirkungslose `alt`-Option entfällt.

## Betroffene Dateien

- `web/src/app/shared/venue-map/venue-map.ts`
- `web/src/app/shared/venue-map/venue-map.spec.ts` (nur falls Tests anzupassen sind)

## Umsetzungsvorschlag

1. Methode `markerFor(venue)` (oder freie Funktion) extrahieren, die Titel, `divIcon` und `aria-label` setzt; `showMarkers` iteriert nur noch und passt Layer und Ausschnitt an.
2. `alt: text` aus den Marker-Optionen entfernen; Kommentar zur Textalternative bei `aria-label` belassen.
3. Keine Verhaltensänderung: `title`, `aria-label`, Tabulator-Erreichbarkeit und Symbol unverändert.

## Akzeptanzkriterien

- [ ] `showMarkers` enthält keine Icon- oder Attributlogik mehr
- [ ] `alt` wird nicht mehr übergeben, Textalternative „Name, Typ“ bleibt (MAP-UB-12)
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien („Symbol und Farbe je Typ“) weiterhin erfüllt

## Risiko

Niedrig – reine Umstrukturierung, durch vorhandene Tests zu Titel, `aria-label` und Symbol abgesichert.

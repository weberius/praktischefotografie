# Changelog: SERVICE-10-STORY-02 – Ortstypen an Symbol und Farbe erkennen

## 2026-10-29 – REVIEW-TASK-22: Wirkungslose Option, Cast und Farb-Literale bereinigen

- **Status:** Umgesetzt
- **Quelle (Review):** Code-Review CODE-02 bis CODE-04, `review/SERVICE-10-STORY-02/TASK-22-kleine-aufraeumungen-symbol-und-legende.md`
- **Änderungen:** Marker ohne wirkungslose Option `alt` (Textalternative bleibt `title` und `aria-label`); Legende ohne überflüssigen Cast `as SafeHtml`; Weiß im Symbol als Konstante `WHITE`; Kartenflächenfarben als `MAP_SURFACE_COLORS` benannt, vom Kontrasttest genutzt, und ein Test stellt sicher, dass `.map` im CSS dieselbe Farbe hat.
- **Dateien:** `web/src/app/shared/venue-map/venue-map.ts`, `venue-map.css`, `venue-map.spec.ts`, `web/src/app/shared/venue-legend/venue-legend.ts`, `web/src/app/core/venue-symbol.ts`, `venue-symbol.spec.ts`
- **Prüfung:** Gate: `npm run build`, `npm test` (185, 0 Fehler), `npm run web:test` (233 von 233), `npm run lint:all` grün.

## 2026-10-29 – REVIEW-TASK-21: Liste der Ortstypen einmal zentral ableiten

- **Status:** Umgesetzt
- **Quelle (Review):** Code-Review CODE-01, `review/SERVICE-10-STORY-02/TASK-21-ortstypen-liste-zentral.md`
- **Änderungen:** `VENUE_TYPES` und `VENUE_TYPE_OPTIONS` in `core/models.ts`; Legende, Kartenfilter, Ortsliste und Specs nutzen sie. Außerhalb von `models.ts` gibt es kein `Object.keys(VENUE_TYPE_INFO)` mehr. Reihenfolge in Filter und Legende unverändert (neuer Test).
- **Dateien:** `web/src/app/core/models.ts`, `web/src/app/pages/map/map.ts`, `web/src/app/pages/venue-list/venue-list.ts`, `web/src/app/shared/venue-legend/venue-legend.ts`, Specs von Legende, Karte und Symbol
- **Prüfung:** Gate: `npm run build`, `npm test` (185, 0 Fehler), `npm run web:test` (232 von 232), `npm run lint:all` grün.

## 2026-10-29 – TASK-03: Legende der Ortstypen

- **Status:** Umgesetzt
- **Änderungen:** Neue Komponente `app-venue-legend`: Liste „Legende der Ortstypen“ mit allen fünf Typen (Symbol, Farbe, Name als Text) aus `VENUE_TYPE_INFO` und `venueSymbolMarkup`, unabhängig vom Filter; steht im Kartenbereich oberhalb der Karte. Der Kartenbereich wächst jetzt mit `flex: 1 0 auto`, die Mindesthöhe von 24 rem gilt für die Karte selbst (nicht für Legende plus Karte).
- **Dateien:** `web/src/app/shared/venue-legend/venue-legend.ts`, `.html`, `.css`, `venue-legend.spec.ts` (alle neu), `web/src/app/pages/map/map.html`, `map.ts`, `map.css`, `map.spec.ts`
- **Prüfung:** Tests (Legende: Reihenfolge und Text, gleiche Zeichnung wie Marker, verborgene Symbole; Kartenseite: Legende bei Filter Essen/Museum vollständig und vor der Karte) zuerst rot (Komponente fehlte), dann grün; dabei fiel der Layout-Test „kleines Fenster“ auf (Karte nur 352 px), Ursache war die Mindesthöhe am Kartenbereich statt an der Karte – korrigiert. Gate: `npm run build`, `npm test` (185, 0 Fehler), `npm run web:test` (230 von 230), `npm run lint:all` grün. Im echten Browser gegen den Produktionsbuild: 1280 × 800 → Karte 984 × 395 px, bis zur Trennlinie (711 px), kein Bildlauf, Legende mit fünf Typen sichtbar; 390 × 844 → Karte 24 rem; `smoke.mjs` grün (22 Orte, 22 Marker). **Nicht geprüft:** axe und Lighthouse auf `/map`, Tastaturtest im Browser, Graustufen-Sichtprüfung, Firefox/Safari.

## 2026-10-29 – TASK-02: Marker als Typ-Symbole mit Textalternative

- **Status:** Umgesetzt
- **Änderungen:** Die Standard-Marker (Bilddateien) sind durch `divIcon` mit dem SVG-Symbol des Ortstyps ersetzt (30 × 30 px, Mittelpunkt auf der Koordinate). Titel und `aria-label` jedes Markers lauten „Name, Typ“; Marker sind per Tab erreichbar (Leaflet-Tastaturbedienung), das SVG ist für Screenreader verborgen. Popup unverändert (Name, Typ, Link zur Ortsseite). Der Test auf Marker-Bilder aus den Assets entfällt (ADR-016). Die Karten-Tests lesen den Ortsnamen aus „Name, Typ“.
- **Dateien:** `web/src/app/shared/venue-map/venue-map.ts`, `venue-map.spec.ts`, `web/src/app/pages/map/map.spec.ts`
- **Prüfung:** Zwei neue Tests (Symbol/Farbe je Typ mit allen fünf Typen, Textalternative und Tastaturzugang) zuerst rot, dann grün. Gate: `npm run build`, `npm test` (185, 0 Fehler), `npm run web:test` (226 von 226), `npm run lint:all` grün. **Nicht geprüft:** axe-Lauf auf `/map`; Erkennbarkeit der Symbole in Graustufen und bei 30 px (Sichtprüfung steht für H2 aus); Lighthouse.

## 2026-10-29 – TASK-01: Typdefinition: Symbolform und Farbe je Ortstyp

- **Status:** Umgesetzt
- **Änderungen:** `VENUE_TYPE_INFO` hat je Typ `shape` (Säulenbau, Bilderrahmen, Raute, Tür, Buch) und `color` (Blau, Orange, Violett, Rot, Grün; Kontrast ≥ 4,0:1 zu den Kartenflächen, ≥ 5:1 zu Weiß). Neu: `venueSymbolMarkup(type)` liefert das SVG-Symbol (farbige Scheibe, weißer Rand und weiße Form, `aria-hidden`, keine externen Dateien) als gemeinsame Quelle für Marker und Legende.
- **Dateien:** `web/src/app/core/models.ts`, `web/src/app/core/venue-symbol.ts` (neu), `web/src/app/core/venue-symbol.spec.ts` (neu)
- **Prüfung:** Tests (8: fünf verschiedene Formen/Farben, Zuordnung laut Vorgabe, Kontrast ≥ 3:1 zu `#f2efe9`, `#e8e6df` und Weiß, SVG-Eigenschaften) zuerst rot (Kompilierfehler), dann grün. Gate: `npm run build`, `npm test` (185, 0 Fehler), `npm run web:test` (225 von 225), `npm run lint:all` grün. **Nicht geprüft:** Aussehen der Symbole in Graustufen (Review nach Q-USE-9 steht für H2 aus).

# Changelog: SERVICE-02-STORY-05 – Karte der Orte mit Filtern

## 2026-10-27 – TASK-02: Kartenseite mit Filtern und Liste
**Status:** umgesetzt
**Änderungen:**
- `/map` mit Filterleiste (Stadt, Typ, Veranstalter:in, „Hat Präsenzbibliothek“, „Ständige Sammlung“; alle mit `<label>`), Filterzustand in Query-Parametern (`filterToParams`/`paramsToFilter`, Navigation mit `replaceUrl`).
- Karte und Liste (immer vorhanden) zeigen dieselben gefilterten Orte (Name, Typ als Text mit Symbol, Stadt, Link `/venues/:id`).
- Leerzustand mit Hinweis und Schaltfläche „Filter zurücksetzen“.
- Der Filter `organizer` (ORG-UB-4) ist hier umgesetzt.
**Dateien:** `web/src/app/pages/map/map.ts`, `map.html`, `map.css`, `map.spec.ts`
**Prüfung:** Jasmine-Specs der Seite grün (Karma, ChromeHeadless); `ng lint` ohne Befund. Nicht geprüft: Tastatur-/axe-Test im Produktionsbuild (Q-USE-2/3), Prerender-Ausgabe (`ng build` nicht ausgeführt).

## 2026-10-27 – TASK-01: Karten-Komponente (Leaflet)
**Status:** umgesetzt
**Änderungen:**
- `app-venue-map`: Leaflet wird nur im Browser per `await import('leaflet')` geladen (`isPlatformBrowser`, `afterNextRender`); beim Prerendern entsteht nur der leere Container.
- Marker an lat/lng; Popup aus DOM-Elementen (Name, Typ-Text, Link `venues/:id` relativ zum base-href, Router-Navigation bei normalem Klick).
- Marker-Icons und Leaflet-CSS als Assets unter `public/assets/leaflet/` (keine CDN-Requests). Das Stylesheet wird als `<link>` erst beim Initialisieren der Karte eingefügt, damit nur die Kartenseite es lädt und das Komponenten-CSS-Budget (4 kB) nicht berührt wird.
- Attribution „© OpenStreetMap-Mitwirkende“ mit Link auf die OSM-Urheberrechtsseite; Karte mit `role="region"` und `aria-label`.
**Dateien:** `web/src/app/shared/venue-map/venue-map.ts`, `.html`, `.css`, `.spec.ts`; `web/public/assets/leaflet/leaflet.css`, `web/public/assets/leaflet/images/*.png`
**Prüfung:** Jasmine-Specs grün (Marker, Popup, Icon-Pfad, Attribution, Server-Plattform ohne Karte); `ng lint` ohne Befund. Nicht geprüft: Kachelabruf im echten Netz, Lighthouse, Darstellung im Produktionsbuild.

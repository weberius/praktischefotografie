# ADR-004: Leaflet mit OpenStreetMap für die Kartenansicht

**Status:** Accepted (an H2 am 2026-10-27 bestätigt); Punkt „gleichwertige Listenalternative“ teilweise ersetzt durch ADR-016 (Accepted)  ·  **Datum:** 2026-10-27

## Kontext
PRD 2.3 verlangt eine OpenStreetMap-basierte Karte mit Filtern. `klangland` nutzt Leaflet. Kartenkacheln werden von einem Dritten geladen; das PRD-Ziel „keine Telemetrie“ und die Barrierefreiheit müssen berücksichtigt werden.

## Entscheidung
- **Leaflet 1.9** mit `@types/leaflet` und OSM-Standardkacheln, eingebunden in eine eigene Karten-Komponente (kein Wrapper-Paket).
- Marker-Icons werden mit der App ausgeliefert, nicht von einem CDN geladen.
- Die Attribution „© OpenStreetMap-Mitwirkende“ ist immer sichtbar.
- Jede Karte hat eine **gleichwertige Listenalternative** mit denselben Filtern, damit Inhalte ohne Karte und per Tastatur erreichbar sind. *(Teilweise ersetzt durch ADR-016: auf `/map` liegt sie nicht mehr auf derselben Seite, sondern auf `/venues` mit übernommenen Filtern.)*
- Außer den Kartenkacheln werden keine Drittanbieter-Ressourcen geladen. Der Kachelabruf wird im Datenschutzhinweis genannt.
- Filterzustand (Stadt, Typ, Feature) liegt in der URL (Query-Parameter), damit Ansichten teilbar sind.

## Alternativen
- **MapLibre GL:** Vektorkacheln und flüssigere Darstellung, aber größerer Bundle und Kachelanbieter nötig.
- **Eingebettetes OSM-iframe oder Google Maps:** Weniger Kontrolle, Datenschutz und Barrierefreiheit schwerer zu sichern.
- **Eigener Kachelserver:** Maximale Kontrolle, unverhältnismäßiger Betrieb.

## Konsequenzen
- Leaflet bringt ein CommonJS-Modul mit (`allowedCommonJsDependencies`) und erhöht das Bundle der Kartenseite; Lazy Loading hält die Startseite klein.
- Die Nutzungsbedingungen der OSM-Kachelserver sind für geringen Verkehr geeignet; bei Wachstum ist ein Kachelanbieter zu prüfen.
- Die Karte ist nicht die einzige Zugriffsmöglichkeit auf Orte.

## Auswirkungen
- Betrifft die Karten- und Ortsseiten sowie den Datenschutzhinweis.
- Ergänzt ADR-002 um die Kartenbibliothek.

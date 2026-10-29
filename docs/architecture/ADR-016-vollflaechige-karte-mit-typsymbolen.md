# ADR-016: Vollflächige Karte ohne Ortsliste, mit Typ-Symbolen und Legende

**Status:** Accepted (an H2 am 2026-10-29 bestätigt)  ·  **Datum:** 2026-10-29

## Kontext
ADR-004 verlangt für jede Karte eine gleichwertige Listenalternative mit denselben Filtern, damit Inhalte ohne Karte und per Tastatur erreichbar sind. Auf `/map` stand diese Liste neben der Karte; die Karte war dadurch klein, und alle Orte erschienen mit dem Standard-Marker von Leaflet. Die Idee verlangt: keine Liste auf `/map`, eine Karte über die gesamte Fläche unterhalb der Filter, Symbole in Farben je Ortstyp und eine Legende. `/venues` bietet bereits dieselbe Orteliste mit denselben Filterparametern (`city`, `type`, `library`, `collection`, `organizer`, `festival`) und wird vorab gerendert.

## Entscheidung
- **Listenalternative auf `/venues`.** `/map` zeigt keine Ortsliste. Ein Link auf `/venues` übernimmt die gesetzten Filter (MAP-UB-8). Damit bleibt die Anforderung aus ADR-004 – Orte ohne Karte und per Tastatur erreichbar – über eine eigene Seite erfüllt statt über dieselbe Seite.
- **Vorabrendern.** Statt der Liste gibt `/map` Hauptüberschrift, Filter und einen Hinweis mit dem Link auf `/venues` aus; Leaflet startet weiter nur im Browser (MAP-UB-13).
- **Layout.** Die Karte steht unterhalb der Filterleiste und hat die Breite des Inhaltsbereichs `main` (wie die Karten auf `/calendar`); sie reicht bis zur Trennlinie oberhalb des Fußbereichs. Dafür wird die Seite zur Spalte mit mindestens Fensterhöhe (`App`: Kopf, `main` wächst, Fußbereich unten), `main` und die Kartenseite wachsen mit, und die Karte füllt den Rest, mindestens 24 rem. Der untere Innenabstand von `main` entfällt auf `/map`. Die Höhe entsteht per CSS, nicht per Skript; die Änderung am Seitenrahmen betrifft alle Seiten nur insofern, als der Fußbereich bei kurzem Inhalt am Fensterrand steht.
- **Marker als `divIcon` mit eingebettetem SVG.** Pro Ortstyp eine Form (Säulenbau, Bilderrahmen, Raute, Tür, Buch) in einer eigenen Farbe. Die Marker-Bilder von Leaflet entfallen auf `/map`; es werden keine neuen Dateien geladen (ADR-004: keine Drittanbieter-Ressourcen, nichts von einem CDN).
- **Eine Quelle für Marker und Legende.** `VENUE_TYPE_INFO` erhält Farbe und Symbolform je Typ. Marker und Legende lesen daraus; beide können nicht auseinanderlaufen. Die bisherigen Emojis bleiben in den Textlisten der Orte bestehen.
- **Typ nicht nur über Farbe.** Die Symbolform trägt die Unterscheidung, die Farbe ist Zusatz (Q-USE-4, Q-USE-9). Die Legende ist HTML-Text außerhalb des Leaflet-Containers, damit sie Screenreadern und der Tastatur zugänglich ist; Marker tragen „Name, Typ“ als Textalternative.

## Alternativen
- **Liste einklappbar auf `/map`:** erhält die Alternative auf derselben Seite, widerspricht aber dem Wunsch, die Liste ganz verschwinden zu lassen.
- **Ein PNG- oder SVG-Icon je Typ als Datei:** weniger Code, aber fünf zusätzliche Dateien und Requests, Farbe und Legende müssten getrennt gepflegt werden.
- **Emojis als Marker:** verfügbar, aber je Betriebssystem verschieden dargestellt; Museum und Stiftung teilen sich bereits dasselbe Emoji.
- **Leaflet-Layer-Control als Legende:** für Screenreader und Tastatur schwächer als HTML-Text.
- **Marker-Cluster:** nicht Teil der Idee; bei deutlich mehr Orten neu zu bewerten.

## Konsequenzen
- ADR-004 gilt weiter, nur der Punkt „gleichwertige Listenalternative“ wird **teilweise ersetzt**: Die Alternative liegt auf `/venues`, nicht auf `/map`.
- Die Karte ist auf `/map` die einzige Darstellung der Orte; ohne Skript sieht ein Besucher nur den Hinweis und den Link. Das Vorabrendern bleibt für Suchmaschinen über `/venues` und die Ortsseiten abgedeckt (Q-SEO-1).
- Die Marker-Bilder von Leaflet bleiben im Auslieferungsumfang, solange andere Karten sie nutzen könnten; sie werden von `/map` nicht mehr geladen.
- Die Farbpalette muss Kontrast ≥ 3:1 zum Kartenhintergrund halten; Änderungen an Typen erfordern ein neues Symbol und eine neue Farbe in `VENUE_TYPE_INFO`.
- Tests und Gherkin-Szenarien mit der Ortsliste auf `/map` entfallen bzw. wandern auf `/venues`.

## Auswirkungen
- EARS: MAP-UB-7 bis MAP-UB-13 (ersetzen MAP-UB-3 und MAP-UB-6).
- Gherkin: `web/karte.feature`; Anpassung der Formulierung in `web/veranstalter.feature` und `web/festivals.feature`.
- Quality: Q-USE-9, Q-USE-10; Ergänzungen zu Q-USE-3, Q-USE-4, Q-PERF-3, Q-SEO-1.
- Ergänzt ADR-004 und ADR-002 (Vorabrendern).

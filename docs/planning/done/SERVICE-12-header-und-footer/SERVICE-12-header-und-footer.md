# SERVICE-12 – Header und Footer überarbeiten

**Status:** Entwurf (Intake), nachgeschärft nach Rückmeldung 2026-10-29; Freigabe an H1 steht aus  ·  **Quelle:** Idee [`idee-003-header-and-footer`](../../../product/ideen/idee-003-header-and-footer.md)

> „Der Header und der Footer sollen überarbeitet werden.
> **Header:** Die Navigation soll durch ein Burger-Menu abgebildet werden. Der Name der Anwendung im Header lautet ‚Zentrum für praktische Fotografie‘. Der Header soll immer im Vordergrund liegen. Wenn die Seite heruntergescrollt wird. Der Footer soll sich am Footer von Klangland orientieren: https://github.com/weberius/klangland. Der Footer soll nicht fest stehen, sondern kann auch aus dem Bild rausscrollen, wenn die Seite länger ist. Das entspricht dem aktuellen Verhalten.“

## Ziel
Der Kopfbereich zeigt den Namen „Zentrum für praktische Fotografie“ und fasst die Navigation hinter einem Burger-Menü zusammen; er bleibt beim Scrollen im Vordergrund. Der Fußbereich folgt dem Aufbau des Klangland-Fußbereichs und scrollt wie bisher mit dem Inhalt.

**Zweck in einem Satz:** Besucher:innen sollen auf jeder Seite einen ruhigen, immer erreichbaren Kopf mit dem vollen Projektnamen und einem schlanken Menü haben und am Seitenende einen schlichten Fußbereich finden.

**Erfolgskriterien**
- Die Navigation ist in jeder Fensterbreite hinter einer Menü-Schaltfläche verborgen und per Maus, Touch und Tastatur bedienbar.
- Der Link zur Startseite heißt „Zentrum für praktische Fotografie“ und enthält weiter das Marken-Icon.
- Der Kopfbereich bleibt beim Scrollen am oberen Rand und liegt auch über der Karte.
- Der Fußbereich ist nicht fixiert und hat die Gestalt des Klangland-Fußbereichs (Linkzeile Rechtliches mit vier Links).
- Impressum, Haftungsausschluss, Datenschutz und Quellen & Lizenzen existieren mit zutreffenden Inhalten.

## Kontext
Der Kopfbereich (`web/src/app/app.html`) zeigt Icon, „Praktische Fotografie“ und eine dauerhaft sichtbare, umbrechende Linkliste mit neun Einträgen; er ist nicht fixiert. Impressum und Datenschutz sind Platzhalter-Seiten (Betreiberangaben fehlen). Der Fußbereich zeigt Impressum, Datenschutz und die Zeile „Zentrum für Praktische Fotografie · Fokus NRW“ und steht bei kurzem Inhalt am Fensterrand (Seite als Spalte, ADR-016, MAP-UB-9). Klangland (lokal `../klangland`, Quelle der Idee) hat ein Burger-Menü in allen Fensterbreiten (Schaltfläche mit drei Balken, ausklappendes Feld unter dem Kopf, Schließen per Link, Escape und Routenwechsel), einen mit `position: sticky` am oberen Rand haftenden Kopf und einen Fußbereich aus einer Linkzeile Rechtliches auf heller Fläche mit Trennlinie, gedämpfter kleiner Schrift.

## Story-Schnitt
1. `STORY-01` Navigation als Burger-Menü
2. `STORY-02` Name „Zentrum für praktische Fotografie“ im Kopfbereich
3. `STORY-03` Kopfbereich bleibt im Vordergrund
4. `STORY-04` Fußbereich nach dem Vorbild von Klangland, scrollt mit
5. `STORY-05` Rechtliche Seiten anlegen und anpassen (Haftungsausschluss und Quellen & Lizenzen neu, Impressum und Datenschutz überarbeitet)

## Abgrenzung
**Nicht enthalten:** Suche, Filter oder weitere Bedienelemente im Kopf (anders als in Klangland), Änderung der Seitentitel (`<title>`), des Manifest-Namens und der Meta-Angaben, neue Menüpunkte oder Umsortierung der Navigation, Änderung von Farben, Schrift oder Marken-Icon, ein fester (fixierter) Fußbereich.

## Betroffene Bereiche
`web` (`app.html`, `app.ts`, `app.css`, `styles.css`, Tests in `app.spec.ts`), Spezifikation `web/seitenrahmen`, `web/markenicon`, `web/navigation`.

## Vorbereitete Spezifikation (Phase 3)
- EARS: `web/seitenrahmen.md` (FRM-UB-1 bis FRM-UB-5, FRM-ST-1, FRM-EV-1 bis FRM-EV-3); `web/markenicon.md` (ICO-UB-7 ersetzt ICO-UB-3, ICO-UB-8 ersetzt ICO-UB-4); `web/rechtliches.md` (RCH-UB-1 bis RCH-UB-5); `web/navigation.md` (NAV-UB-7 ersetzt NAV-UB-6, NAV-UB-8 ersetzt NAV-UB-5)
- Gherkin: `web/seitenrahmen.feature` (9 Szenarien bzw. Grundrisse); `web/rechtliches.feature` (5); `web/navigation.feature` (angepasst); `web/markenicon.feature` („Icon im Kopfbereich“, „Icon auf jeder Seite gleich“ angepasst)
- Quality: `web/seitenrahmen.md` (Q-USE-12, Q-USE-13, Q-PERF-8); `web/rechtliches.md` (Q-USE-14); Ergänzungen zu Q-USE-2, Q-USE-3, Q-USE-4, Q-USE-11, Q-SEC-2, Q-SEO-2, Q-SEO-3
- ADR: nicht erforderlich (siehe `PIPELINE.md`); geltend ADR-002, ADR-016, ADR-017

## Annahmen
Bestätigt am 2026-10-29: Lesart des Kopfs (haftend, Verhalten wie Klangland), Fußbereich als eigener Teil, Burger-Menü in allen Fensterbreiten, nur sichtbarer Name im Kopf, Umbruch des Namens erlaubt, Fußbereich nicht fixiert. SERVICE-11 liegt bereits in `main`.
- ANNAHME: Kopf und Fußbereich verhalten sich wie in Klangland: Kopf `position: sticky` am oberen Rand über dem Inhalt, Burger-Schaltfläche rechts, geöffnetes Menü als Feld in voller Breite unter dem Kopf; Fußbereich im Seitenfluss, bei kurzem Inhalt am Fensterrand.
- ANNAHME: Der längere Name darf umbrechen; sollte das Maß in Q-USE-13 (Kopf ≤ 5 rem bei 390 Pixeln) nicht erreichbar sein, wird eine andere Lösung formuliert und an H2 vorgelegt.
- ANNAHME: Impressum und Datenschutz werden an Klangland angelehnt; die Betreiberangaben (Wolfram Eberius, Im Bachfeld 21, 51063 Köln, Telefon, E-Mail, Internetadresse) werden aus dem Klangland-Impressum übernommen, weil derselbe Betreiber angenommen wird. Der Mensch muss sie an H2 bestätigen; die Texte sind keine Rechtsberatung.
- ANNAHME: Die Datenschutzerklärung beschreibt nur, was diese Anwendung tut (keine Cookies/kein Tracking, GitHub Pages, OpenStreetMap-Kacheln nur auf `/map`); Aussagen zu Favoriten und Open Opus aus Klangland entfallen.
- ANNAHME: „Quellen & Lizenzen“ nennt Wikipedia/Wikimedia Commons/Wikidata (ADR-011, ADR-012), OpenStreetMap, Leaflet und die Angaben der Orts- und Veranstalter-Webseiten; die Umsetzung gleicht die Liste mit `data/` und `package.json` ab und ergänzt Fehlendes.
- ANNAHME: Im Haftungsausschluss kommt der Hinweis aus dem bisherigen Impressum („recherchierte Angaben können sich ändern, vor dem Besuch prüfen“) hinzu.
- ANNAHME: Reihenfolge im Fußbereich wie in Klangland: Impressum, Haftungsausschluss, Datenschutz, Quellen & Lizenzen; die Zeile „Zentrum für Praktische Fotografie · Fokus NRW“ bleibt darunter.
- ANNAHME: Der Link „‹ Zum Kalender“ der Klangland-Seiten wird nicht übernommen; Rückweg über Kopf und Fußbereich.
- ANNAHME: Die Karte darf den Kopf nicht überdecken (Stapelreihenfolge der Leaflet-Ebenen; Q-USE-13).
- ANNAHME: Suche, Filterknopf und weitere Klangland-Bedienelemente im Kopf sind nicht Teil des Wunsches.

## Qualitätserwartungen
Q-USE-12, Q-USE-13, Q-USE-14, Q-PERF-8; zusätzlich Q-USE-2, Q-USE-3, Q-USE-4, Q-USE-11, Q-PERF-3.

## Definition of Done
- Spezifikation konsistent; kein neuer ADR nötig (an H2 bestätigt).
- Build, `npm test`, `npm run web:test` und `npm run lint:all` grün; Szenarien aus `seitenrahmen.feature` und `markenicon.feature` als Tests umgesetzt.
- Kopf- und Fußbereich im Browser auf Desktop und Mobil (390 und 320 Pixel) sowie auf `/map` einmal gesichtet.

## Risiken
- **Technisch:** Die Leaflet-Ebenen (z-index bis 1000) können den festen Kopf überdecken; `position: sticky` bricht, wenn ein Vorfahr `overflow` setzt; die Seite als Spalte (ADR-016) darf dadurch nicht kippen.
- **Zugänglichkeit:** Ein fester Kopf kann fokussierte Elemente und Sprungziele verdecken; Gegenmaßnahme: FRM-UB-5, Q-USE-13.
- **Gestalterisch:** Der längere Name verlängert den Kopf auf schmalen Bildschirmen.
- **Inhaltlich:** Die Idee-Zeile zum Vordergrund ist abgebrochen; die Lesart ist als Annahme markiert.

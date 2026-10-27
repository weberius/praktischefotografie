# ADR-002: Angular als Frontend-Framework der statischen SPA

**Status:** Accepted (an H2 am 2026-10-27 bestätigt)  ·  **Datum:** 2026-10-27

## Kontext
PRD 3.1 verlangt eine statisch gehostete SPA ohne Backend, die Inhalte aus JSON und Markdown liest. Die Schwesteranwendung `klangland` löst dasselbe Problem mit Angular. Wiederverwendbare Muster und gleiche Werkzeuge senken den Pflegeaufwand für eine Einzelperson.

## Entscheidung
Die Webapp liegt im Ordner `web/` und folgt `klangland`:
- **Angular 20** (`@angular/build:application`), TypeScript, Standalone-Komponenten, kein NgModule.
- **Routing** mit `loadComponent` je Seite (Lazy Loading) unter `web/src/app/pages/<seite>/`, `title` je Route, Deep-Links per `/<ressource>/:id`.
- **Zoneless:** Die Anwendung läuft ohne `zone.js` (`provideZonelessChangeDetection`); Zustand liegt in Signals. Das senkt Bundle und Blockierzeit (Q-PERF-3 wird sonst nicht erreicht). Tests laufen weiter mit Zone-Polyfill.
- **Karte lazy:** Leaflet wird erst geladen und initialisiert, wenn der Kartenbereich sichtbar wird (`IntersectionObserver`); auf kleinen Bildschirmen steht die Liste vor der Karte.
- **Gemeinsame Teile** unter `web/src/app/core/` (Konfiguration, Datenzugriff), Wiederverwendbares unter `web/src/app/shared/`.
- **Tests** mit Karma und Jasmine (`ng test`), **Lint** mit ESLint und angular-eslint (`ng lint`), Formatierung mit Prettier (Breite 100, einfache Anführungszeichen), wie in `AGENTS.md` beschrieben.
- **Styling** mit eigenem CSS ohne UI-Framework; Komponenten-CSS-Budget 4 kB Warnung / 8 kB Fehler, Initial-Bundle 500 kB Warnung / 1 MB Fehler.
- **Datenzugriff** über einen `DataService` mit `HttpClient`, der die JSON-Dateien einmal lädt und als Signals bereitstellt. Relationen werden über IDs im Client aufgelöst (keine Duplikate in den Daten).
- **Prerendering:** Alle Routen werden beim Produktionsbuild statisch vorab erzeugt (`@angular/ssr` mit `outputMode: static`, `prerender` und `getPrerenderParams` aus den Daten für `/:ressource/:id`). Die Hydration übernimmt im Browser. Es gibt keinen Server zur Laufzeit.
- **Metadaten:** Jede Route setzt `title` und Meta-Description; Sitemap und `robots.txt` werden beim Build aus den Daten erzeugt.
- **Markdown** der Beiträge wird zur Laufzeit geladen und gerendert; das Rendern erzeugt kein ungefiltertes HTML. Dazu dient `marked` für Markdown, dessen Ausgabe über Angulars `DomSanitizer` (`[innerHTML]`) bereinigt wird.

## Alternativen
- **Vite + TypeScript ohne Framework:** Leichter, aber Routing, Formulare und Tests müssten selbst zusammengestellt werden.
- **Astro oder anderer Static-Site-Generator:** Gut für Blogs, weicht aber von `klangland` ab und verteilt Wissen auf zwei Stacks.
- **Reine SPA ohne Prerendering:** Einfacher, aber für ein Magazin schlecht auffindbar; wegen des Qualitätsziels SEO verworfen.
- **Server-Side Rendering mit Node-Server:** Widerspricht dem statischen Hosting aus ADR-003.

## Konsequenzen
- Ein Stack für beide Projekte; Wissen und Skripte (`sync-data`) sind übertragbar.
- Der Build wird komplexer: Neue Daten erzeugen neue Seiten, und Prerendering läuft nur mit validierten Daten (ADR-003). Browser-APIs wie Leaflet dürfen nur im Browser laufen (`isPlatformBrowser`).
- Das Tooling aus ADR-001 (`ajv`, Node-Skripte im Repo-Root) bleibt bestehen; `web/` hat eine eigene `package.json`.

## Auswirkungen
- EARS und Quality zu Navigation, Blog, Kalender, Karte und Detailseiten entstehen in der Spezifikation.
- Betrifft die Verzeichnisstruktur in `README.md` (`src/` wird zu `web/src/`).

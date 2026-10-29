# Changelog: SERVICE-10-STORY-01 – Karte über die gesamte Fläche, ohne Ortsliste

## 2026-10-29 – REVIEW-TASK-22: Größentest gegen initialen ResizeObserver-Aufruf absichern

- **Status:** Umgesetzt
- **Quelle (Review):** Code-Review CODE-02, `review/SERVICE-10-STORY-01/TASK-22-groessentest-ohne-race.md`
- **Änderungen:** Der Test wartet die erste Meldung des `ResizeObserver` ab, setzt den Spy zurück und prüft erst dann die Reaktion auf die Höhenänderung.
- **Dateien:** `web/src/app/shared/venue-map/venue-map.spec.ts`
- **Prüfung:** Gegenprobe: mit auskommentiertem `followContainerSize(map)` ist der Test rot, mit der Funktion grün (danach zurückgesetzt, kein Rest im Code). Gate: `npm run build`, `npm test` (185, 0 Fehler), `npm run web:test` (231 von 231), `npm run lint:all` grün.

## 2026-10-29 – REVIEW-TASK-23: Toten Selektor `.venue-type` in `map.css` entfernen

- **Status:** Umgesetzt
- **Quelle (Review):** Code-Review CODE-03, `review/SERVICE-10-STORY-01/TASK-23-toten-css-selektor-entfernen.md`
- **Änderungen:** Die Regel `.venue-type` entfällt; ihr Gegenstück im Template (Ortsliste auf `/map`) gibt es seit MAP-UB-7 nicht mehr.
- **Dateien:** `web/src/app/pages/map/map.css`
- **Prüfung:** `grep` bestätigt: keine Verwendung in `map.html`. Gate gemeinsam mit REVIEW-TASK-21 (siehe unten).

## 2026-10-29 – REVIEW-TASK-21: Veraltete Verweise auf eine Ortsliste auf /map korrigieren

- **Status:** Umgesetzt
- **Quelle (Review):** Code-Review CODE-01, `review/SERVICE-10-STORY-01/TASK-21-veraltete-listenverweise-korrigieren.md`; Anforderungen MAP-UB-7, MAP-UB-13
- **Änderungen:** `aria-label` der Karte kündigt keine Liste mehr „auf der Seite“ an, sondern nennt die Ortsliste und den Link oberhalb der Karte; Meta-Beschreibung von `/map` lautet „Karte der Foto-Orte … mit Symbolen je Ortstyp …; die Orte gibt es auch als Liste“; Klassenkommentar verweist auf MAP-UB-13 statt auf das ersetzte MAP-UB-6.
- **Dateien:** `web/src/app/pages/map/map.ts`, `web/src/app/pages/map/map.spec.ts`, `web/src/app/shared/venue-map/venue-map.html`, `web/src/app/shared/venue-map/venue-map.ts`
- **Prüfung:** Neuer Test (Beschreibung und `aria-label`) zuerst rot, dann grün. Gate (gemeinsam für REVIEW-TASK-21 und -23): `npm run build`, `npm test` (185, 0 Fehler), `npm run web:test` (231 von 231), `npm run lint:all` grün.

## 2026-10-29 – TASK-03: Karte füllt die Fläche bis zur Trennlinie

- **Status:** Umgesetzt
- **Änderungen:** Auf `/map` wächst `main` als Spalte ohne unteren Innenabstand (`main:has(> app-map-page)`); die Seite, die Datenschranke (`display: contents`), der Kartenbereich und die Karte füllen den Rest, mindestens 24 rem (feste Höhe 26 rem und das Zwei-Spalten-Layout entfallen). Karte hat die Breite des Inhaltsbereichs (wie die Karten auf `/calendar`). Anzahl der Orte und Link zur Ortsliste stehen in einer Zeile (`.map-info`), damit die Karte auf 1280 × 800 ohne Bildlauf bis zur Trennlinie reicht. `VenueMap` ruft per `ResizeObserver` `invalidateSize()` auf, wenn sich die Höhe des Kartenbereichs ändert (z. B. Hinweis über der leeren Karte).
- **Dateien:** `web/src/app/pages/map/map.css`, `map.html`, `web/src/app/shared/venue-map/venue-map.css`, `venue-map.ts`, `venue-map.spec.ts`, `web/src/styles.css`, `web/src/app/app.spec.ts`
- **Prüfung:** Layout-Tests (Breite = Inhaltsbereich ± 1 px, Beginn unter der Filterleiste, Unterkante = Oberkante Fußbereich ± 1 px im hohen Fenster, ≥ 24 rem und Fußbereich darunter im kleinen Fenster, `invalidateSize` bei Höhenänderung) zuerst rot, danach grün. Gate: `npm run build`, `npm test` (185 grün, 0 Fehler), `npm run web:test` (217 von 217), `npm run lint:all` grün. Im echten Browser (Playwright, gegen den Produktionsbuild): 1280 × 800 → Karte 984 × 427 px, Unterkante = Oberkante Fußbereich (711 px), kein Bildlauf; 390 × 844 → Karte 24 rem (384 px), Fußbereich darunter; `smoke.mjs` grün (22 Orte, 22 Marker). **Nicht geprüft:** axe und Lighthouse (`tools/quality`) auf `/map`; Tastaturtest; Darstellung in Firefox/Safari (`:has()` ab Chrome 105, Firefox 121, Safari 15.4).

## 2026-10-29 – TASK-02: Ortsliste auf /map entfernen, Link zur Ortsliste mit Filtern

- **Status:** Umgesetzt
- **Änderungen:** Liste und Überschrift „Orte als Liste“ entfallen auf `/map`. Direkt unter den Filtern steht der Link „Orte als Liste anzeigen“ auf `/venues` mit den sechs Filterparametern. Bei fehlenden Treffern steht der Hinweis mit „Filter zurücksetzen“ oberhalb der leeren Karte. Specs prüfen Marker (Textalternative `title`) statt Listeneinträge; neue Tests für Link (mit/ohne/geänderten Filter), fehlende Liste und Hinweis über der Karte. Playwright-Smoke wartet statt auf die Liste auf den Link.
- **Dateien:** `web/src/app/pages/map/map.html`, `map.ts`, `map.spec.ts`, `web/tools/quality/smoke.mjs`
- **Prüfung:** Neue Tests zuerst rot (5 von 12), danach grün. Gate: `npm run build`, `npm test` (0 Fehler), `npm run web:test`, `npm run lint:all` grün. Vorabgerendertes `dist/web/browser/map/index.html` enthält Überschrift und Link auf `/venues`, keine `card-list`. **Nicht geprüft:** `smoke.mjs` (Playwright, braucht laufenden Server) – nur angepasst, nicht ausgeführt; Kartenseite im Browser noch ohne Sichtprüfung.

## 2026-10-29 – TASK-01: Seitenrahmen als Spalte mit Mindesthöhe

- **Status:** Umgesetzt
- **Änderungen:** `app-root` ist eine Spalte mit mindestens Fensterhöhe, `main` wächst (`flex: 1 0 auto`, `width: 100%`); der Fußbereich steht bei kurzem Inhalt am Fensterrand. Übrige Seiten unverändert.
- **Dateien:** `web/src/app/app.ts`, `web/src/app/app.css` (neu), `web/src/styles.css`, `web/src/app/app.spec.ts`
- **Prüfung:** Test „Fußbereich steht auch bei kurzem Inhalt am unteren Fensterrand“ zuerst rot (Fußbereich 423 px bei 440 px Fenster), nach der Änderung grün. Gate: `npm run build` grün, `npm test` grün (0 Fehler), `npm run web:test` grün, `npm run lint:all` grün. Chrome lief über `CHROME_BIN` (Playwright-Chromium), da keine Systeminstallation vorhanden ist.

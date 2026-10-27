# Changelog: SERVICE-02-STORY-01 – Gerüst, Navigation und Veröffentlichung

## 2026-10-27 – TASK-08: Qualitätsprüfung am Gesamtergebnis
- **Status:** Umgesetzt
- **Änderungen:** Prüfwerkzeuge gegen den Demo-Produktionsbuild; Rauchtest der Interaktion. Dabei wurde Q-PERF-3 zunächst verfehlt (Lighthouse 78/59/77). Ursachen und Maßnahmen: Auslieferung ohne gzip im Prüfserver (wie GitHub Pages ergänzt), `zone.js` entfernt (zoneless), Karte erst bei Sichtbarkeit initialisieren, Liste vor Karte. Danach 94/94/97.
- **Dateien:** `web/tools/quality/*.mjs`, `web/src/app/app.config.ts`, `web/angular.json`, `web/src/app/shared/venue-map/venue-map.ts`, `web/src/app/pages/map/map.{html,css}`
- **Prüfung:** `npm run quality` bestanden: SEO-Prüfung 94 Seiten ohne Befund (Q-SEO-1, Q-SEO-2, Q-SEO-3); axe (WCAG 2.1 A/AA) 0 Verstöße auf 18 Seiten (Q-USE-2); keine Anfragen an fremde Hosts außer OSM-Kacheln auf `/map` (Q-SEC-2); Tabulatorbedienung ohne unsichtbaren Fokus (Q-USE-3, automatisiert, ohne Screenreader-Test); Lighthouse mobil `/` 94, `/map` 94, `/venues/…` 97 (Q-PERF-3). `npm run quality`-Werte schwanken je Lauf; Messung lief in einer Sandbox mit simulierter Drosselung, nicht auf echten Geräten. Nicht geprüft: Screenreader, reale Geräte, Karte ohne Netz.

## 2026-10-27 – TASK-07: Deployment mit GitHub Actions
- **Status:** Umgesetzt (Lauf nicht geprüft)
- **Änderungen:** Workflow validiert, testet, lintet und baut; veröffentlicht auf GitHub Pages bei Push auf `main`.
- **Dateien:** `.github/workflows/deploy-pages.yml`
- **Prüfung:** YAML ist syntaktisch gültig; der Workflow selbst wurde nicht ausgeführt (kein Remote). Annahme: Chrome liegt auf dem Runner unter `/usr/bin/google-chrome`.

## 2026-10-27 – TASK-06: Prerendering, Sitemap, robots.txt, 404
- **Status:** Umgesetzt
- **Änderungen:** `getPrerenderParams` aus den Daten (veröffentlichte Beiträge, Kalendermonate im Fenster −12/+24 Monate), `404`-Route, Postbuild für `sitemap.xml`, `robots.txt`, `404.html`.
- **Dateien:** `web/src/app/app.routes.server.ts`, `web/src/app/prerender-params.ts`, `web/tools/postbuild.mjs`, `test/postbuild.test.mjs`
- **Prüfung:** Build erzeugt 95 Seiten (Demo), Node-Tests grün. Hinweis: Beiträge mit Zukunftsdatum erscheinen erst nach einem neuen Build.

## 2026-10-27 – TASK-05: App-Shell, Routen, Hinweisseite, SEO-Metadaten
- **Status:** Umgesetzt
- **Änderungen:** Layout mit Navigation, Skip-Link, alle Routen (lazy), Hinweisseite, Impressum (Betreiberangaben fehlen, Platzhalter), Datenschutz (nennt OSM-Kacheln), `PageMeta`.
- **Dateien:** `web/src/app/app.{ts,html,routes.ts,config.ts}`, `web/src/app/pages/{not-found,impressum,datenschutz}/`, `web/src/app/shared/not-found/`, `web/src/styles.css`, `web/src/app/app.spec.ts`
- **Prüfung:** Szenario-Tests grün (NAV-UB-1 bis NAV-UB-4, NAV-EV-1).

## 2026-10-27 – TASK-04: Modelle, Daten-Service, Status-Logik, Venue-Filter
- **Status:** Umgesetzt
- **Änderungen:** `core/` mit Modellen, `DataService`, `Clock`, Status, Venue-Filter, Beitragslogik; `shared/` mit Status-Badge, Daten-Gate; Testdaten.
- **Dateien:** `web/src/app/core/*`, `web/src/app/shared/*`, `web/src/app/testing/test-data.ts`
- **Prüfung:** Jasmine-Tests grün; Abdeckung der Statements im Gesamtlauf 95,8 % (Q-MAIN-1 ≥ 80 % für `core/`, nicht getrennt ausgewiesen).

## 2026-10-27 – TASK-03: Demo-Daten
- **Status:** Umgesetzt
- **Änderungen:** 6 Beiträge (einer in der Zukunft), 8 Ausstellungen in allen Status, 6 Events, 6 Fotograf:innen, 2 Veranstalter. Alle fiktiv und gekennzeichnet.
- **Dateien:** `demo/data/*.json`, `demo/content/posts/*.md`
- **Prüfung:** Validator grün auf dem zusammengeführten Set. Die Status hängen vom Datum ab (Referenz 2026-10-27) und verschieben sich mit der Zeit.

## 2026-10-27 – TASK-02: Daten-Sync mit Demo-Modus
- **Status:** Umgesetzt
- **Änderungen:** `web/tools/sync-data.mjs` mit Zusammenführen, Demo-Kennzeichnungsprüfung und Validierung vor dem Kopieren.
- **Dateien:** `web/tools/sync-data.mjs`, `test/sync-data.test.mjs`, `.gitignore`
- **Prüfung:** Node-Tests grün (5 Szenarien).

## 2026-10-27 – TASK-01: Angular-Projekt anlegen
- **Status:** Umgesetzt
- **Änderungen:** Angular 20 (statisch, Karma, angular-eslint, Budgets); Karma mit `ChromeHeadlessNoSandbox`; zoneless ab TASK-08.
- **Dateien:** `web/` (Konfiguration)
- **Prüfung:** `ng lint`, `ng test`, `ng build` grün. Hinweis: Das Root-ESLint ignoriert `web/`, daher werden `web/tools/*.mjs` nicht gelintet.

# Changelog: SERVICE-12-STORY-02 – Name im Kopfbereich

## 2026-10-29 – RÜCKLAUF (Review): Kopfhöhe und Scrollbreite automatisch messen

- **Status:** Umgesetzt
- **Änderungen:** `web/tools/quality/browser-check.mjs` misst auf `/` und `/map` bei 390 × 844 und 320 × 640 Pixeln die Kopfhöhe (≤ 5 bzw. ≤ 6 rem) und prüft `scrollWidth` ≤ `clientWidth`; Ergebnis im Report unter `layout`.
- **Quelle:** Quality Q-USE-13 (Prüfverfahren ergänzt), Task STORY-02 TASK-22 des Reviews
- **Dateien:** `web/tools/quality/browser-check.mjs`, `docs/quality/web/seitenrahmen.md`
- **Prüfung:** `npm run quality` lief ohne Q-USE-13-Befund. Gate: `npm run build`, `npm test` (208), `npm run web:test` (269 von 269), `npm run lint:all` grün; `npm run quality`: 6 Befunde wie vorher, keine neuen. **Nicht geprüft:** dass die Messung bei künstlich vergrößerter Schrift fehlschlägt (kein Negativtest).

## 2026-10-29 – TASK-01: Name „Zentrum für praktische Fotografie“ im Kopfbereich

- **Status:** Umgesetzt
- **Änderungen:** Text im Startseiten-Link geändert; `.brand` darf schrumpfen und umbrechen (`flex: 1 1 auto; min-width: 0`), auf schmalen Bildschirmen kleinere Schrift (≤ 480 px: 1 rem, ≤ 360 px: 0,95 rem). `<title>`, `SITE_NAME`, Manifest und Fußzeile unverändert. Tests auf den neuen Namen umgestellt (ICO-UB-7, ICO-UB-8); der Seitentitel-Test (NAV-UB-3) bleibt.
- **Dateien:** `web/src/app/app.html`, `web/src/styles.css`, `web/src/app/app.spec.ts`
- **Prüfung:** Komponententests (Reihenfolge Icon/Text, Alt, Name, relative `src`, feste Maße, Icon auf fünf Seiten gleich). Gate: `npm run build`, `npm test` (208, 0 Fehler), `npm run web:test` (261 von 261, vorher 238), `npm run lint:all` grün (Chrome über `CHROME_BIN` aus dem Playwright-Cache). Browser (Build, Playwright): Kopfhöhe 3,56 rem bei 390 und 320 Pixeln (Maß ≤ 5 bzw. 6 rem), kein horizontales Scrollen. Beim ersten Messen war der Kopf 5,01 rem (390) und 6,74 rem (320) hoch; die kleinere Schrift und das engere Padding haben das behoben, ohne die Spezifikation zu ändern.

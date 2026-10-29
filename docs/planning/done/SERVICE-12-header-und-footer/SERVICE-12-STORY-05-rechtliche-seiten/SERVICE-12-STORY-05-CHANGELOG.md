# Changelog: SERVICE-12-STORY-05 – Rechtliche Seiten

## 2026-10-29 – RÜCKLAUF (Review): Q-USE-14 im Test absichern

- **Status:** Umgesetzt (TASK-22); STORY-05 TASK-21 (EU-Streitschlichtung) offen
- **Änderungen:** Je rechtliche Seite: Überschriftenfolge ohne Lücke (beginnt mit `h1`), nicht leerer Titel und Meta-Beschreibung (> 20 Zeichen); ein Test auf vier verschiedene Titel. **Nicht umgesetzt:** Hinweis zur EU-Streitschlichtung im Impressum – laut Review ist die OS-Plattform seit Juli 2025 eingestellt (nicht verifiziert); den Rechtstext entscheidet der Betreiber.
- **Quelle:** Task STORY-05 TASK-22 des Reviews
- **Dateien:** `web/src/app/app.spec.ts`
- **Prüfung:** Fünf neue Komponententests. Gate: `npm run build`, `npm test` (208), `npm run web:test` (269 von 269), `npm run lint:all` grün; `npm run quality`: 6 Befunde wie vorher, keine neuen.

## 2026-10-29 – TASK-01 bis TASK-03: Haftungsausschluss, Quellen & Lizenzen, Impressum, Datenschutz, Prüfwerkzeug

- **Status:** Umgesetzt
- **Änderungen:** Neue Seiten `HaftungsausschlussPage` (`/haftungsausschluss`) und `QuellenPage` (`/quellen`) mit Routen, Titeln und Beschreibungen; Impressum mit den Betreiberangaben aus dem Klangland-Impressum (ohne Platzhalter), Datenschutz neu auf diese Anwendung zugeschnitten (keine Cookies/kein Tracking, Server-Logfiles, OpenStreetMap-Kacheln nur auf `/map`, GitHub Pages, Rechte, Verweis aufs Impressum); der Hinweis zu recherchierten Angaben wanderte vom Impressum in den Haftungsausschluss; `browser-check.mjs` prüft die neuen Seiten. Prerender über die `**`-Route, die Sitemap nennt beide Seiten (161 Adressen).
- **Dateien:** `web/src/app/pages/{impressum,datenschutz,haftungsausschluss,quellen}/`, `web/src/app/app.routes.ts`, `web/tools/quality/browser-check.mjs`, `web/src/app/app.spec.ts`
- **Prüfung:** Komponententests (Betreiberangaben, keine Platzhalter, drei Abschnitte, Datenschutz-Inhalte, Quellenliste, je Seite keine Klangland-Begriffe, eine `h1`, `rel="noopener"`; Adressen in `ADDRESSES`, Navigation mit allen Links). Gate: `npm run build`, `npm test` (208, 0 Fehler), `npm run web:test` (261 von 261, vorher 238), `npm run lint:all` grün (Chrome über `CHROME_BIN` aus dem Playwright-Cache). Build enthält `haftungsausschluss/index.html` und `quellen/index.html`. `npm run quality` (axe, SEO, Lighthouse): keine axe-Befunde, 6 Befunde wie vorher (5 doppelte Titel der Magazinbeiträge, Lighthouse-Performance `/map` 82 < 90; schwankt, nicht durch dieses Ticket verursacht, vgl. SERVICE-11). **Nicht geprüft:** Quellenliste gegen alle Datenquellen (nur gegen `photographers.json`-Lizenzen und `package.json`/ADRs abgeglichen); Rechtstext nicht juristisch geprüft.

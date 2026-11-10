# Changelog: SERVICE-25-STORY-01 – Projektseite mit abgesetztem Menüeintrag

## 2026-11-10 – TASK-01 bis TASK-03: Projektseite, Menüeintrag, Datenschutzhinweis

- **Status:** Umgesetzt
- **Änderungen:** Neue Seite `/projekt` (Motivation, Portrait, Über das Projekt mit OK Lab Köln, Teilen mit QR-Code, Unterstützen per PayPal); Route; Menüeintrag „Projekt“ als letzter Eintrag mit Trennlinie; Bilder nach `web/public/assets/`; PayPal-Absatz in der Datenschutzerklärung; Zurück-Link-Beschriftung und Browser-Check um `/projekt` ergänzt.
- **Dateien:** `web/src/app/pages/projekt/*`, `web/src/app/app.{ts,html,routes.ts,spec.ts}`, `web/src/styles.css`, `web/src/app/pages/datenschutz/datenschutz.html`, `web/src/app/shared/back-link/back-link.ts`, `web/tools/quality/browser-check.mjs`, `web/public/assets/{wolfram.jpg,qr-praktische-fotografie.png}`
- **Prüfung:** `npm run build` grün (Sitemap enthält `/projekt`); `npm test` 265/265 grün; `npm run web:test` 343/343 grün (Chromium aus Playwright via `CHROME_BIN`); `npm run lint:all` grün. Nicht geprüft: axe-/Lighthouse-/Playwright-Qualitätsläufe (Q-USE-20 Breite 320, Q-PERF), `npm run validate:data` (keine Datenänderung), Aussehen im Browser.

# Changelog: SERVICE-12-STORY-01 – Navigation als Burger-Menü

## 2026-10-29 – RÜCKLAUF (Review): Menü schließt beim Link der aktuellen Seite, Menüfeld scrollbar

- **Status:** Umgesetzt
- **Änderungen:** `closeMenu()` per Klick auf jeden Menülink (der Router meldet beim Link der aktuellen Seite kein `NavigationEnd`); `.main-nav` mit `max-height: calc(100dvh - 5rem)` und `overflow-y: auto`.
- **Quelle:** Gherkin (neue Szenarien „Menü schließt auch beim Link der aktuellen Seite“ und „Menü bei niedrigem Fenster scrollbar“ in `web/seitenrahmen.feature`), Quality Q-USE-12 (Menüfeld endet am Fensterrand), Task STORY-01 TASK-01 und TASK-02 des Reviews
- **Dateien:** `web/src/app/app.ts`, `app.html`, `web/src/styles.css`, `app.spec.ts`, `docs/contracts/gherkin/web/seitenrahmen.feature`, `docs/quality/web/seitenrahmen.md`
- **Prüfung:** Zwei neue Komponententests (Link der aktuellen Seite; Menüfeld scrollbar, überragt das Fenster nicht, Links per Scrollen erreichbar). Gate: `npm run build`, `npm test` (208), `npm run web:test` (269 von 269), `npm run lint:all` grün; `npm run quality`: 6 Befunde wie vorher, keine neuen.

## 2026-10-29 – TASK-01: Navigation als Burger-Menü

- **Status:** Umgesetzt
- **Änderungen:** `app.ts`: Signal `menuOpen`, Umschalten, Schließen bei `NavigationEnd`, Escape (`document:keydown.escape`) schließt und fokussiert die Schaltfläche. `app.html`: Button mit `aria-expanded`, `aria-controls`, Namen „Menü öffnen/schließen“; die Links stehen in `nav#main-nav`. `styles.css`: Schaltfläche 2,5 × 2,5 rem mit drei Balken, Menü als absolut positioniertes Feld in voller Breite unter dem Kopf, im geschlossenen Zustand `display: none` (Links weder sichtbar noch per Tab erreichbar).
- **Dateien:** `web/src/app/app.ts`, `web/src/app/app.html`, `web/src/styles.css`, `web/src/app/app.spec.ts`
- **Prüfung:** Komponententests zu allen vier Szenarien (Schaltfläche sichtbar/Links verborgen, Größe, Position rechts, Attribute und Namen, Feld unter dem Kopf in voller Breite, Linkwahl schließt, Escape + Fokus, Escape ohne offenes Menü). Gate: `npm run build`, `npm test` (208, 0 Fehler), `npm run web:test` (261 von 261, vorher 238), `npm run lint:all` grün (Chrome über `CHROME_BIN` aus dem Playwright-Cache). Sichtprüfung des geöffneten Menüs auf `/map` bei 1280 und 390 Pixeln (Screenshots). **Nicht geprüft:** axe im geöffneten Zustand (`tools/quality` prüft den geschlossenen Zustand), Playwright-Tastaturtest; die Tab-Unerreichbarkeit folgt aus `display: none` (berechneter Stil geprüft).

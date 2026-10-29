# Changelog: SERVICE-12-STORY-03 – Kopfbereich im Vordergrund

## 2026-10-29 – RÜCKLAUF (Review): Versatz aus einer Konstante, Test für den Router-Versatz

- **Status:** Umgesetzt
- **Änderungen:** `app.config.ts`: Konstante `HEADER_SCROLL_OFFSET_PX` und Funktion `applyHeaderScrollOffset`; ein Test erzwingt, dass `scroll-padding-top` in `styles.css` dem Wert entspricht (CSS-Kommentar verweist darauf). Neuer Test mit Spy auf `ViewportScroller.setOffset`; Testtitel zu FRM-UB-2 auf „haftet (sticky) und liegt über dem Inhalt“ angepasst.
- **Quelle:** Task STORY-03 TASK-01/TASK-21 und TASK-03/TASK-22 des Reviews (Umsetzungsfehler)
- **Dateien:** `web/src/app/app.config.ts`, `web/src/styles.css`, `web/src/app/app.spec.ts`
- **Prüfung:** Zwei neue bzw. geänderte Komponententests. Gate: `npm run build`, `npm test` (208), `npm run web:test` (269 von 269), `npm run lint:all` grün; `npm run quality`: 6 Befunde wie vorher, keine neuen. **Nicht geprüft:** Anker-Sprung im Browser nach der Änderung (nur die Konstante wurde bewegt, Verhalten unverändert).

## 2026-10-29 – TASK-01: Kopfbereich haftet am oberen Rand über dem Inhalt

- **Status:** Umgesetzt
- **Änderungen:** `.site-header`: `position: sticky; top: 0; z-index: 1100` (über den Leaflet-Ebenen bis 1000), Sprunglink `z-index: 1200`; `html { scroll-padding-top: 6rem }`; `app.config.ts`: `ViewportScroller.setOffset([0, 96])`, weil der Router beim Anker-Sprung (`anchorScrolling`) `scroll-padding` nicht beachtet – ohne den Versatz lag der Inhalt nach „Zum Inhalt springen“ unter dem Kopf (im Browser gemessen).
- **Dateien:** `web/src/styles.css`, `web/src/app/app.config.ts`, `web/src/app/app.spec.ts`
- **Prüfung:** Komponententests (`sticky`, `top: 0`, z-Index > 1000, `scroll-padding-top` ≥ Kopfhöhe, Sprunglink über Kopf). Gate: `npm run build`, `npm test` (208, 0 Fehler), `npm run web:test` (261 von 261, vorher 238), `npm run lint:all` grün (Chrome über `CHROME_BIN` aus dem Playwright-Cache). Browser gegen den Build (Playwright, 1280/390/320 px, `/venues` und `/map`): nach dem Scrollen Kopf bei 0 px, `elementFromPoint` in der Kopfmitte liefert ein Kopf-Element (auch auf `/map`), Kopfhöhe 4,06/3,56/3,56 rem, `scrollWidth` = `clientWidth`, nach dem Sprunglink liegt `main` an der Unterkante des Kopfs. `npm run quality`: CLS 0 auf den geprüften Seiten, keine axe-Befunde. **Nicht geprüft:** der Versatz des Router-Ankers hat keinen eigenen automatisierten Test (nur Browser-Messung); Tab-Fokus auf Elemente am unteren Rand wurde nur an einem Link gemessen (liegt unter dem Kopf).

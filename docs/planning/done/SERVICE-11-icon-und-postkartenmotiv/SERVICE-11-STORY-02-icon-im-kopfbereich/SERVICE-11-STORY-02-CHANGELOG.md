# Changelog: SERVICE-11-STORY-02 – Icon im Kopfbereich vor dem Namen

## 2026-10-29 – TASK-01: Icon im Kopfbereich vor dem Namen

- **Status:** Umgesetzt
- **Änderungen:** `app.html`: im Link zur Startseite steht vor dem Text `<img class="brand-mark" src="favicon-96x96.png" alt="" aria-hidden="true" width="32" height="32">`; `styles.css`: `.brand` als Flex-Zeile mit 0,5 rem Abstand, `.brand-mark` 2 rem × 2 rem. Kein `loading="lazy"`.
- **Dateien:** `web/src/app/app.html`, `web/src/styles.css`, `web/src/app/app.spec.ts`
- **Prüfung:** Fünf Komponententests (Reihenfolge Icon/Text, leeres Alt und `aria-hidden`, Link-Name unverändert, relative `src`, Breite/Höhe 32 und gemessene 32 px, Kopfzeile höchstens 8 px höher als ohne Icon, gleiches Icon nach Navigation auf fünf Seiten) zuerst rot, dann grün (der Höhentest musste vom absoluten Wert auf den Vergleich mit/ohne Icon umgestellt werden, weil die Navigation im schmalen Testfenster umbricht). Gate: `npm run build`, `npm test` (199, 0 Fehler), `npm run web:test` (238 von 238), `npm run lint:all` grün. Im Browser gegen einen Build mit Basispfad `/pf/` (Playwright, 1280 und 390 px, drei Seiten): Icon wird von `/pf/favicon-96x96.png` geladen (200), 0 fehlgeschlagene Anfragen, Icon 32 × 32 px, Kopfzeile 57 px (Desktop); Sichtprüfung des Kopfs auf beiden Breiten. **Nicht geprüft:** axe-Lauf (`tools/quality`) und Lighthouse auf dem Kopfbereich.

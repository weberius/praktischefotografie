# Changelog: SERVICE-12-STORY-04 – Fußbereich nach Klangland

## 2026-10-29 – TASK-01: Fußbereich nach Klangland, scrollt mit

- **Status:** Umgesetzt
- **Änderungen:** `app.html`: Fußbereich mit `.footer-inner` (wie `main` ausgerichtet), Linkzeile „Rechtliches“ (Impressum, Haftungsausschluss, Datenschutz, Quellen & Lizenzen), darunter die bestehende Zeile. `styles.css`: helle Fläche, Trennlinie, gedämpfte kleine Schrift (0,85 rem), Links in Textfarbe, `position` statisch; Spalte aus ADR-016 unverändert.
- **Dateien:** `web/src/app/app.html`, `web/src/styles.css`, `web/src/app/app.spec.ts`
- **Prüfung:** Komponententests (Links und Reihenfolge, Zeile darunter, Trennlinie, nicht fixiert, scrollt bei 3000 px Zusatzinhalt aus dem Bild, Ausrichtung am Inhaltsbereich, Kontrast ≥ 4,5:1); die MAP-UB-9-Tests blieben unverändert grün. Gate: `npm run build`, `npm test` (208, 0 Fehler), `npm run web:test` (261 von 261, vorher 238), `npm run lint:all` grün (Chrome über `CHROME_BIN` aus dem Playwright-Cache). Browser: Fußbereich-Unterkante am Fensterrand am Seitenende; Sichtprüfung auf `/map`.

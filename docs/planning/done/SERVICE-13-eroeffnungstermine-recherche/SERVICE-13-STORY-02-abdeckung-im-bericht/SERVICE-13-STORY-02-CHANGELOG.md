# Changelog: SERVICE-13-STORY-02 – Abdeckung der Terminhinweise im Bericht

## 2026-10-30 – TASK-01: Terminhinweise im Bericht zählen

- **Status:** Umgesetzt
- **Änderungen:** `REPORT.md` erhält den Abschnitt „Termine (Eröffnung und Finissage)“: je Quelle Snapshots mit Hinweis, Vorschläge, bereits vorhandene (als Dublette verworfen) und „zu prüfen“. Reine Dateiauswertung, keine Netzanfrage. Präzisierung gegenüber dem Entwurf: „bereits vorhanden“ zählt mit, damit schon erfasste Termine nicht als „zu prüfen“ gelten (EARS OPN-EV-1 angepasst).
- **Dateien:** `scripts/scrape/lib/report.mjs`, `test/scrape/termine-bericht.test.mjs`, `docs/ears/setup/eroeffnungstermine.md`
- **Prüfung:** Tests zu „Bericht zeigt Terminhinweise“, Vorschlag/Dublette, Bericht ohne Hinweise, „Bericht ohne Netz“ (`fetch` wirft) und Q-DATA-13 (20 Quellen < 5 s, gemessen im Test; tatsächlich Millisekunden). Echtlauf auf den vorhandenen Snapshots: 11 Quellen mit Hinweisen, alle „zu prüfen“. Gate: `npm run build`, `npm test` (224, 0 Fehler), `npm run web:test` (272 von 272, vorher 261; Chrome über `CHROME_BIN` aus dem Playwright-Cache), `npm run lint:all`, `npm run validate:data` grün.

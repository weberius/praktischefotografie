# Changelog: SERVICE-19 Review

## 2026-11-02 – RÜCKLAUF (Review): ARCH-TASK-01 bis 03, CODE-TASK-01 bis 04

- **Status:** Umgesetzt (Abnahme „Alles umsetzen“)
- **Änderungen:** Umschalter auch auf der Ortsdetailseite (ARCH-01); Option „Nur Favoriten“ als Query-Parameter `favorites=1` (ARCH-02, CODE-03); Hinweis in der Eventliste nur einmal im Template (CODE-04); `Favorites.count` entfernt (CODE-01); Eingabe `title` → `eventTitle`, Zustand einmal per `@let` (CODE-06); Stile in der Komponente statt `styles.css` (ARCH-03); Importreihenfolge (CODE-05); Tests über Komponente, Seiten und Eventliste getrennt, mit Tastatur-, HTTP-, XHR-, IndexedDB-Prüfung und Test des Fehlens bei Ausstellungen (CODE-02, SEC-01).
- **Quelle:** EARS FAV-UB-5 (ersetzt FAV-UB-1), FAV-UB-6; Gherkin „Umschalter auf Liste, Detail, Ort und Agenda“, „Option bleibt in der Adresse“; Quality Q-USE-17 (Ort ergänzt); ADR-024 (Proposed), ADR-023 mit Verweis; sonst Umsetzung.
- **Dateien:** `web/src/app/core/favorites.ts`, `shared/favorite-toggle/*`, `pages/{event-list,event-detail,venue-detail,calendar}/*`, `testing/test-data.ts`, `web/src/styles.css`; Spezifikation unter `docs/`.
- **Prüfung:** `npm run build`, `npm run web:test` (322), `npm run lint:all` grün; `npm test` nur FET-OP-3 rot (bekannt). Nicht geprüft: axe, Playwright, Echtbrowser.

## 2026-11-02 – Analyse: Architektur-, Code- und Security-Review

- **Status:** Vorgeschlagen, dann abgenommen
- **Änderungen:** `analyse-architecture.md` (ARCH-01 mittel, ARCH-02 mittel, ARCH-03 niedrig), `analyse-code.md` (CODE-02 mittel, 5 niedrig), `analyse-security.md` (SEC-01 niedrig; Gesamtrisiko Low). Compliance nicht verfügbar (GBOS-MCP).
- **Prüfung:** Reine Codelektüre, `npm audit --omit=dev` ohne Funde.

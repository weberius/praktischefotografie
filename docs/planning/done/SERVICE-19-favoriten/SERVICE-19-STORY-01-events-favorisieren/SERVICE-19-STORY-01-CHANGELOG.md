# Changelog: SERVICE-19-STORY-01 – Events favorisieren

## 2026-11-02 – RÜCKLAUF (Review): Ortsdetailseite, Filter in der Adresse, Aufräumen

- **Status:** Umgesetzt
- **Änderungen:** Siehe `review/SERVICE-19-STORY-01/CHANGELOG.md`: Umschalter auch auf `/venues/:id`, „Nur Favoriten“ als `favorites=1`, Tests geschärft, Komponente aufgeräumt.
- **Quelle (bei Rücklauf):** EARS FAV-UB-5 (ersetzt FAV-UB-1), FAV-UB-6 · Gherkin „Umschalter auf Liste, Detail, Ort und Agenda“, „Option bleibt in der Adresse“ · Quality Q-USE-17 · ADR-024
- **Dateien:** siehe Review-Changelog
- **Prüfung:** Build, `web:test` (322), Lint grün; nicht geprüft: axe, Playwright, Echtbrowser.

## 2026-11-02 – TASK-01 bis TASK-03: Favoriten-Dienst, Umschalter, Filter

- **Status:** Umgesetzt
- **Änderungen:** Dienst `Favorites` (Signal mit Event-IDs, nur im Speicher). Komponente `app-favorite-toggle` (Button, `aria-pressed`, Text „Favorit merken“/„Favorit gemerkt“ mit ★/☆, Eventtitel im Namen) auf Eventliste, Eventdetail und bei Events der Agenda. Eventliste: Kontrollkästchen „Nur Favoriten“ (Komponentenzustand, kombinierbar mit Typfilter), Hinweis „Keine Favoriten für diese Auswahl.“. Stil `.favorite-toggle` in `styles.css`.
- **Dateien:** `web/src/app/core/favorites.ts`, `shared/favorite-toggle/favorite-toggle.{ts,spec.ts}`, `pages/event-list/event-list.{html,ts}`, `pages/event-detail/event-detail.{html,ts}`, `pages/calendar/calendar.{html,ts}`, `web/src/styles.css`
- **Prüfung:** `npm run build`, `npm run web:test` (315), `npm run lint:all` grün; `npm test` bis auf den bekannten FET-OP-3-Fehler grün. Nicht geprüft: axe-Lauf, Playwright-Tastaturtest, Kontrast und Verhalten im echten Browser, Antwortzeit ≤ 100 ms (Q-USE-17).


# Changelog: SERVICE-19-STORY-01 – Events favorisieren

## 2026-11-02 – TASK-01 bis TASK-03: Favoriten-Dienst, Umschalter, Filter

- **Status:** Umgesetzt
- **Änderungen:** Dienst `Favorites` (Signal mit Event-IDs, nur im Speicher). Komponente `app-favorite-toggle` (Button, `aria-pressed`, Text „Favorit merken“/„Favorit gemerkt“ mit ★/☆, Eventtitel im Namen) auf Eventliste, Eventdetail und bei Events der Agenda. Eventliste: Kontrollkästchen „Nur Favoriten“ (Komponentenzustand, kombinierbar mit Typfilter), Hinweis „Keine Favoriten für diese Auswahl.“. Stil `.favorite-toggle` in `styles.css`.
- **Dateien:** `web/src/app/core/favorites.ts`, `shared/favorite-toggle/favorite-toggle.{ts,spec.ts}`, `pages/event-list/event-list.{html,ts}`, `pages/event-detail/event-detail.{html,ts}`, `pages/calendar/calendar.{html,ts}`, `web/src/styles.css`
- **Prüfung:** `npm run build`, `npm run web:test` (315), `npm run lint:all` grün; `npm test` bis auf den bekannten FET-OP-3-Fehler grün. Nicht geprüft: axe-Lauf, Playwright-Tastaturtest, Kontrast und Verhalten im echten Browser, Antwortzeit ≤ 100 ms (Q-USE-17).


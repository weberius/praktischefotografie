# Changelog: SERVICE-02-STORY-02 – Blog-Startseite

## 2026-10-27 – TASK-02: Blog-Startseite
**Status:** umgesetzt
**Änderungen:** Startseite `/` listet veröffentlichte Beiträge (`publishedPosts` + `Clock`) als Karten mit Titel (Link auf `/posts/:slug`), Datum (deutsch, `<time>`) und Kurzvorschau (`excerpt`); Leerzustand als Hinweis mit `role="status"`; Zukunftsbeiträge ausgeblendet; Lade-/Fehlerzustand über `<app-data-gate>`.
**Dateien:** `web/src/app/pages/blog-feed/blog-feed.ts`, `.html`, `.css`, `.spec.ts`
**Prüfung:** Karma-Tests der Seite (4 Szenarien: neueste zuerst, Link zur Detailseite, keine Beiträge, Zukunftsbeitrag) grün; `ng lint` ohne Befunde. Nicht geprüft: manuelle Sicht-/Screenreader-Prüfung, Q-PERF-3 (Lighthouse), `ng build`.

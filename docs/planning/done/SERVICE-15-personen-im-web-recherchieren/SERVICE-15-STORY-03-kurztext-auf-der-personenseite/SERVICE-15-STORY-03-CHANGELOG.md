# Changelog: SERVICE-15-STORY-03 – Webkurztext auf der Personenseite lesen

## 2026-10-31 – TASK-01: Abschnitt „Aus dem Web“ auf der Personenseite

- **Status:** Umgesetzt
- **Änderungen:** `models.ts` (`web`), `photographer-detail.html/.ts` (Abschnitt, Link mit Titel und Host, `rel="noopener noreferrer"`), `test-data.ts`, Spec.
- **Dateien:** siehe Task `SERVICE-15-STORY-03-TASK-01-abschnitt-aus-dem-web.md`
- **Prüfung:** Web-Tests grün; keine Anfrage an fremde Hosts beim Laden. Build, `npm test`, `npm run web:test`, `npm run lint:all`, `npm run validate:data` grün. Nicht geprüft: echte Suchmaschine und Sachrichtigkeit der Texte (Handtest).

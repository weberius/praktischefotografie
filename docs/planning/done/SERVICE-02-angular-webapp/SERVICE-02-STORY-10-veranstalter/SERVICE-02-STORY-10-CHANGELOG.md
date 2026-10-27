# Changelog: SERVICE-02-STORY-10 – Veranstalter:innen und Festivals ansehen

## 2026-10-27 – TASK-02: Festivalfilter in Karte und Orten (Anteil Veranstalterseite und Karte)
**Status:** teilweise umgesetzt (Ortsverzeichnis `/venues` mit `organizer`-Filter liegt bei der Orte-Story)
**Änderungen:**
- Veranstalterseite verlinkt „Orte auf der Karte“ (`/map?organizer=<id>`) und „Orte als Liste“ (`/venues?organizer=<id>`).
- Filter `organizer` auf `/map` als Select (siehe STORY-05-TASK-02).
**Dateien:** `web/src/app/pages/organizer-detail/organizer-detail.html`, `web/src/app/pages/map/map.spec.ts`, `web/src/app/pages/organizer-detail/organizer-detail.spec.ts`
**Prüfung:** Specs „Festivalfilter in der Karte“ und Link-Test grün; `ng lint` ohne Befund. Nicht geprüft: Filter auf `/venues`.

## 2026-10-27 – TASK-01: Veranstalter-Übersicht und -Detail
**Status:** umgesetzt
**Änderungen:**
- `/organizers`: Liste mit Name (Link), Typ-Text, Stadt.
- `/organizers/:id`: Name, Typ, Stadt, Website (extern, `rel="noopener"`), Ausstellungen mit Titel, Ort, Zeitraum, Status-Badge und Link; Hinweis ohne Ausstellungen; unbekannte ID zeigt `<app-not-found />`, Titel „Nicht gefunden“. Die ID wird über `ActivatedRoute` gelesen, damit die Seite auch ohne `withComponentInputBinding()` funktioniert.
**Dateien:** `web/src/app/pages/organizer-list/organizer-list.{ts,html,spec.ts}`, `web/src/app/pages/organizer-detail/organizer-detail.{ts,html,spec.ts}`
**Prüfung:** Jasmine-Specs grün (inkl. `app.spec.ts`); `ng lint` ohne Befund. Nicht geprüft: `ng build`/Prerender, axe.

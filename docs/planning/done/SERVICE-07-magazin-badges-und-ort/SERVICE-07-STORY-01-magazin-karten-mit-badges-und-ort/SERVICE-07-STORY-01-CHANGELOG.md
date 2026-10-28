# Changelog: SERVICE-07-STORY-01 – Magazin-Karten mit Datum, Badges, Titel und Kurztext

## 2026-10-28 – TASK-03: Badges auf der Beitragsseite

- **Status:** Umgesetzt
- **Änderungen:** `app-news-badges` unter dem Datum der Beitragsseite.
- **Dateien:** `web/src/app/pages/post-detail/*`
- **Prüfung:** Karma-Tests grün (Badges, Reihenfolge, Beitrag ohne Ausstellung).

## 2026-10-28 – TASK-02: Aufbau der Karte im Magazin

- **Status:** Umgesetzt
- **Änderungen:** Reihenfolge Datum, Badges, Titel (Link auf den Beitrag), Kurzvorschau; die Karte hat genau einen Link.
- **Dateien:** `web/src/app/pages/blog-feed/*`
- **Prüfung:** Karma-Tests grün.

## 2026-10-28 – TASK-01: Hilfsfunktionen und Komponente für Anlass- und Art-Badges

- **Status:** Umgesetzt
- **Änderungen:** `core/news.ts` (Anlass aus der Kennung `<Ausstellungs-id>-<Anlass>`, Badge-Texte: Neu, Eröffnung, Endet bald, Beendet; Farbe nach den Status-Klassen) und `app-news-badges` (Anlass- und Art-Badge als Text); ohne Anlass-Kennung, ohne Ausstellung oder ohne Datensatz keine Badges.
- **Dateien:** `web/src/app/core/news.ts`, `web/src/app/shared/news-badges/news-badges.ts`
- **Prüfung:** Karma-Tests grün (187 von 187, mit Chromium 130 und Chrome 127); `ng lint` grün; Build prerendert das Magazin mit Badges. **Nicht geprüft:** Aussehen im Browser, axe- und Lighthouse-Läufe.

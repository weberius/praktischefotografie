# Changelog: SERVICE-08-STORY-02 – Badge-Zeilen in Kalender, Magazin und Ausstellungsseiten

## 2026-10-28 – TASK-03: Badges in Ausstellungsliste und -detail

- **Status:** Umgesetzt
- **Änderungen:** Liste: Badge-Zeile über der Überschrift (Art, Status), die Statusanzeige unter dem Datum entfällt; Detail: Art, danach Status, direkt unter der Überschrift; Meta-Beschreibung nennt die Art.
- **Dateien:** `web/src/app/pages/exhibition-list/*`, `web/src/app/pages/exhibition-detail/*`
- **Prüfung:** Karma-Tests grün.

## 2026-10-28 – TASK-02: Reihenfolge im Magazin

- **Status:** Umgesetzt
- **Änderungen:** Karte und Beitragsseite zeigen zuerst die Art, danach den Anlass.
- **Dateien:** `web/src/app/shared/news-badges/news-badges.ts`, Specs von Magazin und Beitragsseite
- **Prüfung:** Karma-Tests grün.

## 2026-10-28 – TASK-01: Badge-Zeile im Kalender

- **Status:** Umgesetzt
- **Änderungen:** Agenda zeigt Art (bzw. „Event“), danach „Endet bald“ bzw. „Beendet“; „Ausstellung“ entfällt; die alten Kalender-Stile entfielen.
- **Dateien:** `web/src/app/core/agenda.ts`, `web/src/app/pages/calendar/*`
- **Prüfung:** Karma-Tests grün (201 von 201, Chromium 130 und Chrome 127), `ng lint` grün, Build prerendert die Seiten mit den neuen Badges. **Nicht geprüft:** Aussehen im Browser, axe- und Lighthouse-Läufe.

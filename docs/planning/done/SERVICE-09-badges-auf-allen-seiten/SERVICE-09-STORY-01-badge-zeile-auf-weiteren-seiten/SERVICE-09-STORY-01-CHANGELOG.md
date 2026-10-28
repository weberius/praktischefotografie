# Changelog: SERVICE-09-STORY-01 – Badge-Zeile auf Orts-, Personen-, Veranstalter- und Festivalseiten

## 2026-10-28 – TASK-02: Ortsseite, Personenseite, Veranstalterseite, Festivalseite

- **Status:** Umgesetzt
- **Änderungen:** Alle Ausstellungskarten beginnen mit der Badge-Zeile (Art, Status), die Statusanzeige unter dem Zeitraum entfällt; Festivalseite zeigt „Offizieller Partner“ in der Zeile nach dem Status.
- **Dateien:** `web/src/app/pages/venue-detail/*`, `photographer-detail/*`, `organizer-detail/*`, `festival-detail/*`
- **Prüfung:** Karma-Tests grün (4 neue Szenarien, 208 von 208).

## 2026-10-28 – TASK-01: Komponente: weitere Kennzeichnungen und Hilfsfunktion

- **Status:** Umgesetzt
- **Änderungen:** `extra` für zusätzliche Textbadges; `exhibitionBadgeData(exhibition, today)` liefert Art und Status.
- **Dateien:** `web/src/app/shared/exhibition-badges/exhibition-badges.ts`, `web/src/app/core/exhibition-kind.ts`
- **Prüfung:** Karma-Tests grün.

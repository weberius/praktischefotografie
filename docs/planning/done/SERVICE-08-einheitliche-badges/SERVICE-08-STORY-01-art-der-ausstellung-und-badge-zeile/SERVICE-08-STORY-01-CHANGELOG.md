# Changelog: SERVICE-08-STORY-01 – Art der Ausstellung und gemeinsame Badge-Zeile

## 2026-10-28 – TASK-03: Validierung der Art

- **Status:** Umgesetzt
- **Änderungen:** Der Validator meldet `solo` bei mehr als einer Person und `group` bei weniger als zwei; `retrospective` und `permanent` gelten unabhängig. Testdaten angepasst (Standardausstellung `solo`). Skill-Regel und `data/README.md` ergänzt.
- **Dateien:** `scripts/validate-data.mjs`, `test/helpers.mjs`, `test/photographer-profiles.test.mjs`, `test/scrape/*.test.mjs`, `.claude/skills/update-venue-data/SKILL.md`, `data/README.md`
- **Prüfung:** Node-Tests grün (185 von 185); Bestand ohne Verstöße (`npm run validate:data`).

## 2026-10-28 – TASK-02: Gemeinsame Badge-Zeile

- **Status:** Umgesetzt
- **Änderungen:** `app-exhibition-badges`: Art zuerst, danach Status bzw. Anlass als Text, Abstand `gap: 0.25em`; `app-news-badges` nutzt sie; Events werden gestrichelt gerahmt wie bisher.
- **Dateien:** `web/src/app/shared/exhibition-badges/*`, `web/src/app/shared/news-badges/news-badges.ts`
- **Prüfung:** Karma-Tests grün (Reihenfolge, berechneter Abstand 0,25 em).

## 2026-10-28 – TASK-01: Art der Ausstellung aus den Personen

- **Status:** Umgesetzt
- **Änderungen:** `exhibitionKind`: Gruppenausstellung bei mehr als einer, Einzelausstellung bei genau einer Person; Retrospektive und Dauerausstellung bleiben; ohne Person die gespeicherte Art.
- **Dateien:** `web/src/app/core/exhibition-kind.ts`, `exhibition-kind.spec.ts`
- **Prüfung:** Karma-Tests grün (9 Fälle).

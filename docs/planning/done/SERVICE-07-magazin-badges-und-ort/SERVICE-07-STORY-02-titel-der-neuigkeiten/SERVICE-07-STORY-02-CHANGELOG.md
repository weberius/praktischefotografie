# Changelog: SERVICE-07-STORY-02 – Titel der Neuigkeiten = „Ausstellungstitel in Stadt“

## 2026-10-28 – TASK-03: Bestandsmigration der Titel

- **Status:** Umgesetzt
- **Änderungen:** 42 Neuigkeiten in `posts.json` und im Frontmatter der Beitragsdateien auf „Ausstellungstitel in Stadt“ gesetzt (Stadt der Venue); Kennung, Datum, Kurztext und Text unverändert. Die Titel waren vorher uneinheitlich („Eröffnung: Hans Georg Esch im MAKK Köln“, „… von Tina Barney“).
- **Dateien:** `data/posts.json`, `content/posts/*.md`, `test/news/bestand.test.mjs`
- **Prüfung:** Bestandstest (Q-DATA-10) und `npm run validate:data` grün.

## 2026-10-28 – TASK-02: Skill-Regel

- **Status:** Umgesetzt
- **Änderungen:** Skill und `updates/README.md` nennen die Titelregel (`expectedTitle`, ohne Anlass).
- **Dateien:** `.claude/skills/update-venue-data/SKILL.md`, `updates/README.md`, `test/scrape/skill.test.mjs`
- **Prüfung:** Strukturtest grün.

## 2026-10-28 – TASK-01: Titelregel in Planung und Prüfung

- **Status:** Umgesetzt
- **Änderungen:** Der Plan trägt `expectedTitle`; `news:check` verwirft jeden anderen Titel mit dem erwarteten Titel im Grund.
- **Dateien:** `scripts/news/lib/news.mjs`, `test/news/news.test.mjs`
- **Prüfung:** Node-Tests grün (183 von 183).

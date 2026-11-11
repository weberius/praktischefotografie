# Changelog: SERVICE-26-STORY-01 – Uhrzeiten erfassen und recherchieren

## 2026-11-11 – TASK-03: Skills und Dokumentation

- **Status:** Umgesetzt
- **Änderungen:** `research-events` und `update-venue-data` beschreiben Zeitfelder, Beginnzeit bei mehreren Uhrzeiten, `timeZone` nur bei Abweichung und `op: "update"`; README, `data/README.md`, `updates/README.md` nennen die Felder.
- **Dateien:** `.claude/skills/research-events/SKILL.md`, `.claude/skills/update-venue-data/SKILL.md`, `README.md`, `data/README.md`, `updates/README.md`
- **Prüfung:** `npm test` (Skill-Tests) und `npm run lint:all` grün. Nicht geprüft: tatsächliches Verhalten eines Agentenlaufs mit den neuen Skilltexten.

## 2026-11-11 – TASK-02: Vorschlagsprüfung für Uhrzeiten und `op: "update"`

- **Status:** Umgesetzt
- **Änderungen:** Neue Events und Terminevents tragen Zeitfelder nur mit Beleg im Textauszug („Uhrzeit nicht belegt“). `op: "update"` (Feld `values`) ergänzt im Veranstaltungsmodus nur fehlende `startTime`/`endTime`/`timeZone` eines Bestandsevents (Titel und Datum im Auszug belegt), überschreibt nie, wird mit Freigabe übernommen.
- **Dateien:** `scripts/scrape/lib/proposals.mjs`, `test/scrape/veranstaltungen-recherche.test.mjs`, `test/scrape/termine.test.mjs`
- **Prüfung:** Tests zu „Uhrzeit nur mit Beleg“, „Bestandsevent erhält Uhrzeit“, „Terminevent mit Startzeit und Endzeit“ grün; Build, `npm test`, Lint grün. Nicht geprüft: Zeitzone `timeZone` wird nicht gegen den Seitentext belegt (nur Schema- und Validatorprüfung).

## 2026-11-11 – TASK-01: Schema, Validator und Webmodell

- **Status:** Umgesetzt
- **Änderungen:** `startTime`, `endTime` (`HH:MM`), `timeZone` im Schema und in `PhotoEvent`; Validator meldet Endzeit/Zeitzone ohne Startzeit, ungültige IANA-Zone und Ende nicht nach Beginn am selben Tag.
- **Dateien:** `schema/events.schema.json`, `scripts/validate-data.mjs`, `web/src/app/core/models.ts`, `test/validate-data.test.mjs`
- **Prüfung:** Szenario „Uhrzeit und Zeitzone bei Events“ grün; Bestand bleibt gültig (Build, `npm test`, Lint grün).

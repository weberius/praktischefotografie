# Changelog: SERVICE-13-STORY-01 – Eröffnung und Finissage als Event erfassen

## 2026-10-30 – REVIEW-TASK-07 und TASK-08: Datum und Uhrzeit belegen

- **Status:** Umgesetzt
- **Änderungen:** Das `startDate` muss im Textauszug nach dem Stichwort stehen (OPN-UN-2, neu); Uhrzeiten werden von Datumsangaben getrennt und normalisiert, jede in der `description` genannte Uhrzeit muss im Auszug stehen (OPN-UN-1 präzisiert).
- **Quelle:** EARS OPN-UN-1, OPN-UN-2; Gherkin „Datum weicht vom Textauszug ab“, „Punktdatum ersetzt keine Uhrzeit“, „Jede genannte Uhrzeit muss belegt sein“; Quality Q-DATA-12
- **Dateien:** siehe `review/CHANGELOG.md`
- **Prüfung:** Gate grün (227 Skript-Tests, 272 Web-Tests, Lint, Validierung); Details im Review-Changelog.

## 2026-10-30 – TASK-02: Skill und Dokumentation

- **Status:** Umgesetzt
- **Änderungen:** Skill `update-venue-data`: Extraktionsziel „Eröffnung und Finissage“ (Format, Uhrzeit und Anwesenheit nur mit Beleg, Finissage nur bei ausdrücklicher Nennung, auch vorhandene Ausstellungen, nur ab heute); `updates/README.md` mit Beispiel und Regeln.
- **Dateien:** `.claude/skills/update-venue-data/SKILL.md`, `updates/README.md`, `test/scrape/skill.test.mjs`
- **Prüfung:** Skill-Test (Szenario „Uhrzeit und Anwesenheit der Künstlerin“). Gate: `npm run build`, `npm test` (224, 0 Fehler), `npm run web:test` (272 von 272, vorher 261; Chrome über `CHROME_BIN` aus dem Playwright-Cache), `npm run lint:all`, `npm run validate:data` grün. **Nicht geprüft:** die tatsächliche Extraktion durch das Modell (OPN-UB-2 hängt am Skilltext, nicht an Code; die Prüfung fängt nur Uhrzeiten ohne Beleg ab).

## 2026-10-30 – TASK-01: Terminevents in der Vorschlagsprüfung

- **Status:** Umgesetzt
- **Änderungen:** Neues Modul `termine.mjs` (Stichwort-, Datums- und Uhrzeiterkennung). `checkProposal` prüft Events vom Typ `vernissage`/`finissage`: Titelpräfix, zugehörige Ausstellung des Ortes, `id` `<Ausstellungs-id>-eroeffnung|-finissage`, Datum (`startDate` = `endDate`, nicht vor `--date`), Beleg (Stichwort der Art plus Datum im Textauszug), Uhrzeit nur mit Uhrzeit im Textauszug. Die Titelprüfung der Fundstelle entfällt für Termine (der Event-Titel ist abgeleitet). `data:check` übergibt `--date` als „heute“. Dubletten fängt die bestehende Prüfung (Ort, Titel, Beginn).
- **Dateien:** `scripts/scrape/lib/termine.mjs`, `scripts/scrape/lib/proposals.mjs`, `scripts/scrape/check-proposals.mjs`, `test/scrape/termine.test.mjs`
- **Prüfung:** 8 Szenario-Tests (Vernissage, Finissage, Uhrzeit/Anwesenheit mit Übernahme, Titel/Kennung, Dubletten je Typ, keine Finissage ohne Beleg, vergangener Termin, Uhrzeit ohne Beleg) und ein Fixture-Test zur Erkennung (Q-DATA-12). Zusätzlich gegen die echten Daten und den Zander-Snapshot (ohne Schreiben): „Between“ ergibt einen gültigen Vorschlag `between-2026-eroeffnung`. Gate: `npm run build`, `npm test` (224, 0 Fehler), `npm run web:test` (272 von 272, vorher 261; Chrome über `CHROME_BIN` aus dem Playwright-Cache), `npm run lint:all`, `npm run validate:data` grün.

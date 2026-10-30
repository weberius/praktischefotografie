# Changelog: SERVICE-13 Review

## 2026-10-30 – Abnahme (zweite H2-Runde) und Umsetzung

- **Status:** Umgesetzt
- **Abnahme:** „Empfehlung“: TASK-07 und TASK-08 (STORY-01, beide hoch), TASK-01 (STORY-03, mittel) und ein zusätzliches Gherkin-Szenario für das abweichende Datum. Alles andere zurückgestellt (Triage in `PIPELINE.md`).
- **Quelle (Ursachen-Routing):** EARS: neu OPN-UN-2, OPN-UN-1 präzisiert; Gherkin: „Datum weicht vom Textauszug ab“, „Punktdatum ersetzt keine Uhrzeit“, „Jede genannte Uhrzeit muss belegt sein“, „Vernissage und Finissage in der Detailansicht“; Quality: Q-DATA-12 (≥ 13 Fixtures, Datum belegt); EARS-Dokument `datenmodell.md` (DAT-UB-7 in die Tabelle). Danach Task.
- **Änderungen:** `termine.mjs` parst Datumsformate (ISO, `07.11.2026`, `7. November 2026`, `November 7, 2026`; ohne Jahr zählen Tag und Monat) und Uhrzeiten (`16:00`, `16.30`, `18 Uhr`, `4-6pm` → 16:00 und 18:00); Datumsangaben zählen nicht als Uhrzeit. `checkTermin` verlangt `startDate` nach dem Stichwort der Art im Auszug („Datum nicht belegt“) und jede in der `description` genannte Uhrzeit im Auszug („Uhrzeit nicht belegt“). README nennt Finissagen.
- **Dateien:** `scripts/scrape/lib/termine.mjs`, `scripts/scrape/lib/proposals.mjs`, `test/scrape/termine.test.mjs`, `docs/ears/setup/eroeffnungstermine.md`, `docs/contracts/gherkin/setup/eroeffnungstermine.feature`, `docs/quality/setup/eroeffnungstermine.md`, `docs/ears/content/datenmodell.md`, `docs/ears/web/events.md`, `docs/contracts/gherkin/web/events.feature`, `web/src/app/pages/event-list/event-list.spec.ts`, `README.md`
- **Prüfung:** Gate: `npm run build`, `npm test` (227, 0 Fehler), `npm run web:test` (272 von 272), `npm run lint:all`, `npm run validate:data` grün. Vorher bestätigt: `hasTime('Eröffnung am 07.11.2026')` war `true`. **Nicht geprüft:** Uhrzeiten in Formaten wie „halb sieben“ oder „16h“ (werden nicht erkannt und führen zu Verwerfung nur, wenn die `description` eine erkannte Uhrzeit nennt).
- **Annahmen bei der Umsetzung:** Jahr fehlt im Text: Tag und Monat genügen. Uhrzeit strikt: jede in der `description` genannte Zeit muss im Auszug stehen (Auszug darf mehr nennen).

## 2026-10-30 – Analysen

Architektur (STORY-01/02), Code (STORY-01/02 und STORY-03), Security (STORY-01/02); Compliance nicht verfügbar. Die Analysen und Tasks liegen in den Unterordnern; parallele Läufe haben `README.md` und `CHANGELOG.md` der Unterordner überschrieben und neu zusammengeführt.

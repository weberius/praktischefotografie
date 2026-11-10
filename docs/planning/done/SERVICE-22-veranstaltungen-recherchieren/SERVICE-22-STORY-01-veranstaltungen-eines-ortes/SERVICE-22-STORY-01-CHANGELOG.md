# Changelog: SERVICE-22-STORY-01 – Veranstaltungen eines Ortes recherchieren

## 2026-11-10 – TASK-03: Skill und Dokumentation

- **Status:** Umgesetzt
- **Änderungen:** Skill `research-events`; Abschnitte in `README.md` und `updates/README.md`.
- **Dateien:** `.claude/skills/research-events/SKILL.md`, `README.md`, `updates/README.md`
- **Prüfung:** Skill-Test in `test/scrape/veranstaltungen-recherche.test.mjs`; Gate grün. Der Skill selbst wurde nicht gegen echte Webseiten ausgeführt (kein Netzlauf).

## 2026-11-10 – TASK-02: Prüfregeln und `--events` für check/apply

- **Status:** Umgesetzt
- **Änderungen:** `checkProposal(..., { events: true })` mit Regeln zu Datensatz/Operation, Typen, Vergangenheit, belegtem Datum (`parseDates`) und Obergrenze 30; im Veranstaltungsmodus kein Konflikt mit verifizierten Orten (es entstehen nur neue Events). `check`/`apply` lesen `updates/<Datum>/events/`.
- **Dateien:** `scripts/scrape/lib/proposals.mjs`, `scripts/scrape/check-proposals.mjs`, `scripts/scrape/apply-proposals.mjs`
- **Prüfung:** `test/scrape/veranstaltungen-recherche.test.mjs` (VRS-UB-1 bis -6, Q-DATA-17) grün; Gesamt-Gate grün.

## 2026-11-10 – TASK-01: Abrufmodus `--events`

- **Status:** Umgesetzt
- **Änderungen:** `maxPagesEvents` 10, erweiterte Linkstichwörter/-priorität, Snapshot-Feld `linkMode` (Cache der Startseite nur mit passendem Modus), `resolveEventVenues`, Flag `--events` in `data:fetch`.
- **Dateien:** `scripts/scrape/lib/fetcher.mjs`, `scripts/scrape/lib/common.mjs`, `scripts/scrape/fetch-venues.mjs`
- **Prüfung:** Fetcher-Modustest (10 vs. 6 Seiten) und VRS-UN-1-Test grün. Echte `robots.txt`/Netz-Läufe nicht ausgeführt.

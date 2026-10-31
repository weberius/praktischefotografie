# Changelog: SERVICE-15-STORY-01 – Person über eine Suchmaschine recherchieren, Links sammeln, fehlende Person anlegen

## 2026-10-31 – TASK-04: Skill um `--web` erweitern, Dokumentation

- **Status:** Umgesetzt
- **Änderungen:** `.claude/skills/research-photographers/SKILL.md` (Abschnitt „Websuche“) und `updates/README.md`.
- **Dateien:** siehe Task `SERVICE-15-STORY-01-TASK-04-skill-websuche.md`
- **Prüfung:** Skill-Test (Regeln und Ablaufreihenfolge) grün. Build, `npm test`, `npm run web:test`, `npm run lint:all`, `npm run validate:data` grün. Nicht geprüft: echte Suchmaschine und Sachrichtigkeit der Texte (Handtest).

## 2026-10-31 – TASK-03: Trefferseiten höflich abrufen

- **Status:** Umgesetzt
- **Änderungen:** `fetcher.mjs`: Option `venue.pages` (explizite Seitenliste, keine Linkverfolgung); `fetchPages` (≤ 5 Seiten, Snapshots unter `.cache/snapshots/<person-id>/`), Befehl `pages`.
- **Dateien:** siehe Task `SERVICE-15-STORY-01-TASK-03-trefferseiten-abrufen.md`
- **Prüfung:** Test mit Testserver (robots.txt, Weiterleitung, sieben Seiten, User-Agent, Abstand) grün; bestehende Abruftests unverändert grün. Build, `npm test`, `npm run web:test`, `npm run lint:all`, `npm run validate:data` grün. Nicht geprüft: echte Suchmaschine und Sachrichtigkeit der Texte (Handtest).

## 2026-10-31 – TASK-02: Treffer übernehmen, Linksammlung, Bericht

- **Status:** Umgesetzt
- **Änderungen:** `ingestSearch` (≤ 3 Anfragen, ≤ 10 Treffer, Normalisierung, Cache `.cache/websearch/`), `webreport.mjs` und Anbindung an `writeReport` in `research.mjs`.
- **Dateien:** siehe Task `SERVICE-15-STORY-01-TASK-02-treffer-und-linksammlung.md`
- **Prüfung:** Tests zu den fünf Szenarien grün, ohne Netzzugang. Build, `npm test`, `npm run web:test`, `npm run lint:all`, `npm run validate:data` grün. Nicht geprüft: echte Suchmaschine und Sachrichtigkeit der Texte (Handtest).

## 2026-10-31 – TASK-01: Plan, Zielperson und Suchanfragen

- **Status:** Umgesetzt
- **Änderungen:** `scripts/photographers/lib/websearch.mjs` (`resolveTarget`, `slugify`, `queriesFor`, `planWeb`) und CLI `scripts/photographers/web.mjs` (`plan`, nur mit `--web`; ohne Person Hinweis); Skript `photographers:web` in `package.json`.
- **Dateien:** siehe Task `SERVICE-15-STORY-01-TASK-01-plan-und-suchdatei.md`
- **Prüfung:** Tests zu „Websuche nur auf Wunsch“, „Neue Person“, „Vorhandene Person“ grün. Build, `npm test`, `npm run web:test`, `npm run lint:all`, `npm run validate:data` grün. Nicht geprüft: echte Suchmaschine und Sachrichtigkeit der Texte (Handtest).

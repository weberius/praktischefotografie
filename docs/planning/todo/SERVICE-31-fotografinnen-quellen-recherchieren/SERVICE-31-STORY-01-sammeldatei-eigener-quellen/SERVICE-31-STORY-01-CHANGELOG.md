# Changelog: SERVICE-31-STORY-01 – Sammeldatei eigener Quellen

## 2026-11-12 – SERVICE-31-STORY-01-TASK-01: `--sources` im Befehl `plan`

- **Status:** Umgesetzt
- **Änderungen:** `plan --sources <datei>` liest `{ "<id>": ["<url>", …] }` und verarbeitet jede Person wie mit `--url`. Unbekannte `id`, leere oder ungültige Listen werden übersprungen und im Bericht genannt; die Kombination mit `--url`, `--photographer` oder `--name` wird abgelehnt. Doku ergänzt.
- **Quelle:** EARS PQL-UB-3, PQL-EV-3, PQL-UN-2; Quality Q-DATA-26
- **Dateien:** `scripts/photographers/web.mjs`, `scripts/photographers/lib/websearch.mjs`, `scripts/photographers/lib/webreport.mjs`, `test/photographers/web.test.mjs`, `README.md`, `updates/README.md`, `.claude/skills/research-photographers/SKILL.md`
- **Prüfung:** `npm test` 282/282 grün, `npm run lint:all` grün. Nicht geprüft: `npm run build`, `npm run web:test` (Web unverändert).

# Changelog: SERVICE-01-STORY-01 – Datenmodell und Validierung

## 2026-10-27 – TASK-03: Validator Schemaprüfung
- **Status:** Umgesetzt
- **Änderungen:** Validator mit Ajv, CLI und Funktion, Meldungen mit Datei, ID, Pfad, Regel.
- **Dateien:** `scripts/validate-data.mjs`, `test/validate-data.test.mjs`, `test/helpers.mjs`
- **Prüfung:** `npm test` 50/50 grün, Laufzeit < 5 s (Q-PERF-2), Netzsperre getestet (Q-SEC-1). Lint grün.

## 2026-10-27 – TASK-02: JSON-Schemas
- **Status:** Umgesetzt
- **Änderungen:** Sechs Schemas nach PRD 3.2 und README.
- **Dateien:** `schema/*.schema.json`
- **Prüfung:** Szenario-Tests grün. Hinweis: `strictRequired` in Ajv ausgeschaltet, weil `then { required }` für libraryNotes sonst abgelehnt wird.

## 2026-10-27 – TASK-01: Projektgerüst
- **Status:** Umgesetzt
- **Änderungen:** `package.json` (ESM), ajv, ajv-formats, ESLint; Skripte validate:data, test, lint. Testaufruf per Glob, da Node 24 kein Verzeichnis als Ziel akzeptiert.
- **Dateien:** `package.json`, `package-lock.json`, `eslint.config.js`
- **Prüfung:** `npm install` ohne Schwachstellen, Lint grün.

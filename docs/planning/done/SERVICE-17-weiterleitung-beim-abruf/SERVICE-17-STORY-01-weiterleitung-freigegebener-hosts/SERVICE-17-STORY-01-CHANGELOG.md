# Changelog: SERVICE-17-STORY-01 – Weiterleitung auf freigegebene Hosts

## 2026-11-02 – TASK-01 bis TASK-04: Weiterleitung beim Abruf

- **Status:** Umgesetzt
- **Änderungen:** Zentrale Datei `scripts/scrape/redirect-hosts.json` (ID → Hostnamen) mit Validierung vor dem ersten Abruf (Exit-Code 1). Der Abruf folgt HTTP-3xx, Meta-Refresh und statisch erkannten JavaScript-Weiterleitungen auf freigegebene Hosts, höchstens 3 Weiterleitungen, Schleifenerkennung, `robots.txt` und Abstand je Hop/Zielhost. Snapshot: `url` = Ziel, `requestedUrl` = Anfrage (Cache-Schlüssel). Hinweis im Bericht. Hostvergleich über Hostnamen ohne Port. Dokumentation in README, `updates/README.md`, Skill `update-venue-data`.
- **Dateien:** `scripts/scrape/lib/fetcher.mjs`, `scripts/scrape/lib/snapshots.mjs`, `scripts/scrape/lib/common.mjs`, `scripts/scrape/fetch-venues.mjs`, `scripts/scrape/redirect-hosts.json`, `test/scrape/fetcher.test.mjs`, `README.md`, `updates/README.md`, `.claude/skills/update-venue-data/SKILL.md`
- **Prüfung:** `npm run build`, `npm test` (244 bestanden, 0 fehlgeschlagen), `npm run lint:all`, `npm run validate:data` grün. `npm run web:test` nicht ausführbar (kein Chrome); Web-Code unverändert. Nicht geprüft: Abruf echter Seiten der drei betroffenen Orte (Hosts bewusst nicht freigegeben).

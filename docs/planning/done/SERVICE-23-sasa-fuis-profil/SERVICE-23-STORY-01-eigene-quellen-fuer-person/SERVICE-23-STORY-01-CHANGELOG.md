# Changelog: SERVICE-23-STORY-01 – Eigene Quellen zu einer Person hinterlegen und Profil von Saša Fuis erzeugen

## 2026-11-10 – TASK-02: Webkurztext von Saša Fuis

- **Status:** Umgesetzt
- **Änderungen:** Seiten beider Quellen abgerufen (`SCRAPE_CONTACT` von der Redaktion genannt), Webkurztext geprüft, freigegeben und übernommen.
- **Dateien:** `data/photographers.json`, `updates/photographers-links.json`, `updates/2026-11-10/`
- **Prüfung:** `validate:data` und `npm test` (265) grün. Die Anzeige auf der Personenseite ist durch bestehende Web-Tests (PHO-UB-12) abgedeckt, nicht im Browser geprüft.

## 2026-11-10 – TASK-02: Skill, Doku und Daten

- **Status:** Umgesetzt
- **Änderungen:** `--url` in Skill, `README.md`, `updates/README.md` beschrieben; die zwei Adressen zu `sasa-fuis` stehen mit `query` `manuell` in der Linksammlung.
- **Dateien:** `.claude/skills/research-photographers/SKILL.md`, `README.md`, `updates/README.md`, `updates/photographers-links.json`, `updates/2026-11-10/`
- **Prüfung:** `validate:data` grün. **Nicht geprüft/offen:** Seiten nicht abgerufen und kein Webkurztext, weil `SCRAPE_CONTACT` nicht gesetzt ist (Kontaktadresse im User-Agent, Regel ADR-006); Kriterium 7 ist daher offen.

## 2026-11-10 – TASK-01: Eigene Adressen im Werkzeug

- **Status:** Umgesetzt
- **Änderungen:** `plan --url` (mehrfach) und `--no-web`; Ablehnung ungültiger/interner Adressen; Aufnahme mit `query` `manuell` vor den Treffern; Abruf eigener Seiten zuerst (auch ohne Suche), Seitentitel als Linktitel; Bericht je Adresse mit Ergebnis.
- **Dateien:** `scripts/photographers/web.mjs`, `scripts/photographers/lib/websearch.mjs`, `scripts/photographers/lib/webreport.mjs`, `test/photographers/web.test.mjs`
- **Prüfung:** `npm test` 265 grün (6 neue Tests), `npm run lint:all` grün. Nicht ausgeführt: `npm run build`/`web:test` (Web unverändert).

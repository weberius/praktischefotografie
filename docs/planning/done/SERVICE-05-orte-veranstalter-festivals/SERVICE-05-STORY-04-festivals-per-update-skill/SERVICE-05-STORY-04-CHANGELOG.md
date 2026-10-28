# Changelog: SERVICE-05-STORY-04 – Festivals per Update-Skill pflegen

## 2026-10-28 – TASK-03: Skill und Dokumentation

- **Status:** Umgesetzt
- **Änderungen:** Skill um Veranstalter, Festivals und Festivalzuordnung erweitert (Bereich je Quelle, kein Festival ohne belegten Zeitraum); `updates/README.md`, `data/README.md`, `README.md`, PRD ergänzt.
- **Dateien:** `.claude/skills/update-venue-data/SKILL.md`, `test/scrape/skill.test.mjs`, `updates/README.md`, `data/README.md`, `README.md`, `docs/product/prd.md`
- **Prüfung:** Strukturtests grün. **Nicht geprüft:** ein vollständiger Skill-Lauf mit Veranstalter-Websites.

## 2026-10-28 – TASK-02: Vorschlagsregeln für Veranstalter und Festivals

- **Status:** Umgesetzt
- **Änderungen:** `organizers` und `festivals` als Vorschlagstypen; Bereich je Quelle; Festival-IDs (Jahr nur, wenn nicht im Titel); Dubletten; Festival ohne gültigen Zeitraum wird verworfen; Veranstalter erhalten kein `source`.
- **Dateien:** `scripts/scrape/lib/proposals.mjs`, `scripts/scrape/lib/report.mjs`, `test/scrape/festival-proposals.test.mjs`
- **Prüfung:** Node-Tests grün (9 neue).

## 2026-10-28 – TASK-01: Veranstalter als Quellen abrufen

- **Status:** Umgesetzt
- **Änderungen:** `loadSources` (Orte und Veranstalter mit `website`), `--venue` nimmt beide IDs, Vorschlagsdatei `<organizer-id>.json` mit `organizerId`; Fehlermeldung nennt Ort- und Veranstalter-IDs.
- **Dateien:** `scripts/scrape/lib/common.mjs`, `scripts/scrape/*.mjs`
- **Prüfung:** Node-Tests mit Testserver grün. **Nicht geprüft:** Abruf der echten Websites von photoszene.de und duesseldorfphotoplus.de.

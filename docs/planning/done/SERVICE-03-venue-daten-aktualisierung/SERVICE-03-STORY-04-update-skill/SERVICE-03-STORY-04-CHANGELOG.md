# Changelog: SERVICE-03-STORY-04 – Update-Skill für jederzeitige Aktualisierung

## 2026-10-27 – TASK-03: Dokumentation
- **Status:** Umgesetzt
- **Änderungen:** `updates/README.md` (Ablauf, Format), Abschnitt im `README.md`.
- **Dateien:** `updates/README.md`, `README.md`
- **Prüfung:** Dateien vorhanden (Test).

## 2026-10-27 – TASK-02: Skill update-venue-data
- **Status:** Umgesetzt
- **Änderungen:** Skill mit Ablauf (Abruf, Extraktion, Prüfung, Bericht, Freigabe per `AskUserQuestion`, Übernahme, Validierung/Tests/Lint), harten Regeln und Extraktionsregeln.
- **Dateien:** `.claude/skills/update-venue-data/SKILL.md`, `test/scrape/skill.test.mjs`
- **Prüfung:** Strukturtests grün (Name, Beschreibung, Aufrufbeispiel, Reihenfolge, Freigabe, Nachprüfung). **Nicht geprüft:** ein vollständiger Lauf des Skills mit echter Extraktion und echten Webseiten.

## 2026-10-27 – TASK-01: Auswahl eines Ortes
- **Status:** Umgesetzt
- **Änderungen:** `resolveVenues` für alle Skripte; unbekannte ID endet mit Exit-Code 1 und nennt die gültigen IDs.
- **Dateien:** `scripts/scrape/lib/common.mjs`
- **Prüfung:** Node-Tests grün (alle drei Skripte).

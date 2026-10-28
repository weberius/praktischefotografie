# Changelog: SERVICE-06-STORY-01 – Alle genannten Fotograf:innen erfassen

## 2026-10-28 – TASK-03: Bestand migriert

- **Status:** Umgesetzt
- **Änderungen:** „Mysterium der Paare“ (57 Namen, Fundstelle: [kuk-monschau.de/…/ausstellungen-2026](https://www.kuk-monschau.de/index.php/ausstellungen/ausstellungen-2026.html), Namen wörtlich übernommen, darunter „Atelier Binder“, „A. & E. Frankl“ und „Franz Göttfried“ in der Schreibweise der Seite); „HIER UND JETZT“ um Marie Watt (Werk „Thirteen Moons“ laut Seite des Museum Ludwig) und die Nennung von William Henry Jackson ergänzt; Beschreibungen von Man Ray, August Sander, CROWDS, PHOTOGRAPHY MASTERS und Men Don't Cry ergänzt. 58 neue Personen (75 gesamt).
- **Dateien:** `data/photographers.json`, `data/exhibitions.json`
- **Prüfung:** `npm run validate:data` grün. **Nicht geprüft:** ob jede der 57 Personen tatsächlich Bilder zeigt (Seite nennt sie als Ausstellende); Schreibweise „Göttfried“ ggf. Tippfehler der Quelle.

## 2026-10-28 – TASK-02: Prüfregel der Vorschläge und Skill-Regel

- **Status:** Umgesetzt
- **Änderungen:** Vorschläge für neue Ausstellungen mit Personen werden verworfen, wenn die Beschreibung einen Namen nicht nennt oder fehlt; Skill-Regeln (alle Namen mit gezeigten Bildern, Kurator:innen ausgenommen).
- **Dateien:** `scripts/scrape/lib/proposals.mjs`, `.claude/skills/update-venue-data/SKILL.md`, `test/scrape/proposals.test.mjs`, `test/scrape/skill.test.mjs`
- **Prüfung:** Node-Tests grün.

## 2026-10-28 – TASK-01: Validator: Namen in der Beschreibung, doppelte Namen

- **Status:** Umgesetzt
- **Änderungen:** Fehler bei fehlender oder unvollständiger `description`; doppelte Namen.
- **Dateien:** `scripts/validate-data.mjs`, `test/photographer-profiles.test.mjs`, `test/helpers.mjs`
- **Prüfung:** Node-Tests grün (Q-DATA-9).

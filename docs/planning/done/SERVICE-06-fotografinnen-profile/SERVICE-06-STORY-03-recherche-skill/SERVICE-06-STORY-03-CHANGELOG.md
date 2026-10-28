# Changelog: SERVICE-06-STORY-03 – Skill research-photographers

## 2026-10-28 – TASK-06: Probelauf

- **Status:** Umgesetzt
- **Änderungen:** Abruf für August Sander, Candida Höfer, Tina Barney, Man Ray und Duane Michals (alle über Wikidata gefunden, je Artikel in de, en, fr). Portraits: Höfer (CC BY-SA 3.0, Urheber Hpschaefer), Man Ray (Public domain, Carl Van Vechten), Michals (Public domain, Rochester Institute of Technology); für Sander und Barney gibt es weder in Wikidata noch im Artikel ein Commons-Bild. Fünf Zusammenfassungen geschrieben und geprüft, nicht freigegeben. Zwei Funde des Probelaufs wurden behoben: Host `thumb.wikimedia.org` fehlte in der Liste; Titelbild des Artikels als Ersatz für fehlendes Wikidata-Bild.
- **Dateien:** `updates/2026-10-28/photographers-candidates.json`, `photographers.json`, `PHOTOGRAPHERS.md`
- **Prüfung:** 5 von 5 Vorschlägen gültig. **Nicht geprüft:** Sachrichtigkeit der Zusammenfassungen (Prüfung durch den Menschen).

## 2026-10-28 – TASK-05: Skill und Dokumentation

- **Status:** Umgesetzt
- **Änderungen:** Skill mit Regeln und Ablauf; `updates/README.md`, `data/README.md`, `README.md`.
- **Dateien:** `.claude/skills/research-photographers/SKILL.md`, `test/photographers/skill.test.mjs`, Dokumentation
- **Prüfung:** Strukturtests grün. **Nicht geprüft:** ein Lauf des Skills als Slash-Kommando durch das Modell.

## 2026-10-28 – TASK-04: Prüfung, Übernahme und Bericht

- **Status:** Umgesetzt
- **Änderungen:** `photographers:check` (Wortzahl, wörtliche Folgen, Quellen, Berufsbezeichnung, Bildlizenz und -größe), `photographers:apply` (Freigabe, `--force`, Rollback einschließlich Bilder), Bericht.
- **Dateien:** `scripts/photographers/check-photographers.mjs`, `apply-photographers.mjs`, `lib/research.mjs`, `test/photographers/research.test.mjs`
- **Prüfung:** Node-Tests grün.

## 2026-10-28 – TASK-03: Portrait von Commons

- **Status:** Umgesetzt
- **Änderungen:** Metadaten aus Commons, freie Lizenz und Urheber Pflicht, Vorschaubild mit 400 px (300/240 bei über 200 kB), Titelbild des Artikels als Ersatz (nur Commons).
- **Dateien:** `scripts/photographers/lib/research.mjs`, Tests
- **Prüfung:** Node-Tests grün; Probelauf.

## 2026-10-28 – TASK-02: Auflösung über Wikidata, Artikel, Sprachen

- **Status:** Umgesetzt
- **Änderungen:** Suche (de, en), Berufsfilter, Sitelinks, Reihenfolge der Sprachen, bis zu drei Artikel, Lebensjahre; mehrere IDs mit Komma.
- **Dateien:** `scripts/photographers/fetch-photographers.mjs`, `lib/research.mjs`, Tests
- **Prüfung:** Node-Tests grün; Probelauf.

## 2026-10-28 – TASK-01: Wikimedia-Client

- **Status:** Umgesetzt
- **Änderungen:** Erlaubte Hosts (Wikipedia, Wikidata, Commons, upload, thumb), Abstand, Kennung, Cache, Wiederholungen, Weiterleitungen einzeln geprüft.
- **Dateien:** `scripts/photographers/lib/wikimedia.mjs`, Tests
- **Prüfung:** Node-Tests grün (offline, Testserver).

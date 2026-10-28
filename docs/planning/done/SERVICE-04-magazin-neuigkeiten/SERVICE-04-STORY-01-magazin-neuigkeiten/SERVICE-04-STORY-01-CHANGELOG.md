# Changelog: SERVICE-04-STORY-01 – Magazin-Neuigkeiten bei der Datenpflege

## 2026-10-28 – TASK-05: Dokumentation
- **Status:** Umgesetzt
- **Änderungen:** Abschnitt „Neuigkeiten für das Magazin“ in `updates/README.md`, Hinweise in `README.md` und `data/README.md`.
- **Dateien:** `updates/README.md`, `README.md`, `data/README.md`
- **Prüfung:** Durchsicht.

## 2026-10-28 – TASK-04: Skill erweitern
- **Status:** Umgesetzt
- **Änderungen:** `update-venue-data` plant nach der Übernahme der Ortsdaten Neuigkeiten, schreibt Texte (60 bis 80 Wörter, absolute Daten, nichts erfunden), prüft, holt die Freigabe ein und übernimmt; Abschlussmeldung nennt die Neuigkeiten.
- **Dateien:** `.claude/skills/update-venue-data/SKILL.md`, `test/scrape/skill.test.mjs`
- **Prüfung:** Strukturtests grün (Reihenfolge, Regeln, Freigabe). **Nicht geprüft:** ein vollständiger Lauf mit echter Textbildung durch das Modell.

## 2026-10-28 – TASK-03: Übernahme
- **Status:** Umgesetzt
- **Änderungen:** `news:apply` übernimmt freigegebene, gültige Einträge in `data/posts.json` und `content/posts/<id>.md`, ersetzt angepasste Beiträge, validiert und rollt bei Fehlern zurück.
- **Dateien:** `scripts/news/apply-news.mjs`, `scripts/news/lib/news.mjs`, `package.json`, `test/news/news.test.mjs`
- **Prüfung:** Node-Tests grün (Freigabe, ungültiger Eintrag, Anlegen, Ersetzen, Rollback), `npm run validate:data` grün.

## 2026-10-28 – TASK-02: Prüfung und Bericht
- **Status:** Umgesetzt
- **Änderungen:** `news:check` prüft Wortzahl (59/60/80/81), Titel, Ort, Fotograf:innen, HTML-Zeichen, Kurztext und schreibt `NEWS.md` inklusive verwaister Beiträge.
- **Dateien:** `scripts/news/check-news.mjs`, `scripts/news/lib/news.mjs`, `test/news/news.test.mjs`
- **Prüfung:** Node-Tests grün. **Nicht geprüft:** Sachrichtigkeit der Texte (nur durch Menschen bei der Freigabe).

## 2026-10-28 – TASK-01: Planung
- **Status:** Umgesetzt
- **Änderungen:** `news:plan` bestimmt je Ausstellung und Anlass fehlende bzw. abweichende Neuigkeiten (Kennung, Datum, `neu` nur für im Lauf aufgenommene Ausstellungen, kurze Ausstellungen, Idempotenz, `--venue`), behält Texte bei erneuter Planung.
- **Dateien:** `scripts/news/plan-news.mjs`, `scripts/news/lib/news.mjs`, `test/news/news.test.mjs`
- **Prüfung:** Node-Tests grün; Trockenlauf auf dem Bestand: 39 Einträge (13 × Eröffnung, Endet bald, Ende).

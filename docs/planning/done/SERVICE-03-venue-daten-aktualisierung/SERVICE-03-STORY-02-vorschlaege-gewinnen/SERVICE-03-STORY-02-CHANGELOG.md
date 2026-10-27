# Changelog: SERVICE-03-STORY-02 – Vorschläge aus den Seiten gewinnen

## 2026-10-27 – TASK-02: Dubletten und IDs
- **Status:** Umgesetzt
- **Änderungen:** Dublettenprüfung (Ort, Titel, Beginn; bei Fotograf:innen Name), eindeutige kebab-case-`id` aus Titel und Jahr mit Zähler.
- **Dateien:** `scripts/scrape/lib/proposals.mjs`
- **Prüfung:** Node-Tests grün (Szenario Keine Dubletten).

## 2026-10-27 – TASK-01: Vorschlagsformat und Prüfer
- **Status:** Umgesetzt
- **Änderungen:** Format (`updates/README.md`), Prüfung je Änderung auf Zuordnung zum Ort, Schema und Referenzen (über den Validator), Fundstelle (Snapshot enthält den Auszug, Auszug enthält den Wert), `source` nie vorgeschlagen, Art „ergänzt“/„geändert“, Konflikt bei verifizierten Orten; CLI `check-proposals.mjs`.
- **Dateien:** `scripts/scrape/lib/proposals.mjs`, `scripts/scrape/check-proposals.mjs`, `updates/README.md`, `test/scrape/proposals.test.mjs`
- **Prüfung:** Node-Tests grün. **Grenze:** Bei Datumsfeldern und Wahrheitswerten prüft der Prüfer nur, dass der Textauszug im Snapshot steht, nicht dass er den Wert wörtlich enthält; dort bleibt die menschliche Freigabe maßgeblich.

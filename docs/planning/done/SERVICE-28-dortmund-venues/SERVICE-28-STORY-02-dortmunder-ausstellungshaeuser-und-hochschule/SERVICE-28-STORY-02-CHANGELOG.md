# Changelog: SERVICE-28-STORY-02 – Dortmunder Ausstellungshäuser und Hochschule

## 2026-11-11 – TASK-01: Kunsthalle und Hochschule erfassen

- **Status:** Umgesetzt
- **Änderungen:** Kunsthalle Dortmund (ehemals HMKV) und FH Dortmund, Fachbereich Design (BA Fotografie, MA Photographic Studies) in `data/venues.json`.
- **Quelle (Spezifikationskorrektur aus der Recherche):** EARS VEN-UB-13, Gherkin „Dortmunder Orte sind im Katalog“, Quality Q-DATA-23, Story – der HMKV ist die Kunsthalle Dortmund (hmkv.de leitet um), daher ein Ort statt zwei; Anschrift Leonie-Reygers-Terrasse statt Kampstraße 6.
- **Dateien:** `data/venues.json`, `docs/ears/content/venue-erfassung.md`, `docs/contracts/gherkin/content/daten.feature`, `docs/quality/content/datenqualitaet.md`
- **Prüfung:** wie STORY-01 (277 Tests grün, Lint grün, Validierung grün). Nicht geprüft: `web:test` (kein Chrome). Hinweis: PLZ der FH 44139 (Geokodierung) statt 44137 aus der Idee; die FH-Seite nennt keine Anschrift auf der Startseite, ein Ausstellungsbetrieb ist nicht belegt (Ausbildungsangebote schon).

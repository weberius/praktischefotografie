# Changelog: SERVICE-31-STORY-02 – Profile der genannten Personen

## 2026-11-12 – SERVICE-31-STORY-02-TASK-02: Webkurztexte vorschlagen und prüfen

- **Status:** Umgesetzt (an H2 akzeptiert, `apply` ausgeführt: 30 übernommen)
- **Änderungen:** 30 Vorschläge in `updates/2026-11-12/photographers-web-proposals.json` (eigene Formulierung, 60–120 Wörter, Quellen aus der Linksammlung). Kein Vorschlag für `marie-watt` (Abruf fehlgeschlagen), `benno-schlicht` (Bot-Challenge) und `nino-sable` (vermutlich keine Fotografie).
- **Dateien:** `updates/2026-11-12/photographers-web-proposals.json`, `updates/2026-11-12/PHOTOGRAPHERS.md`
- **Prüfung:** `photographers:web -- check`: 30 von 30 gültig. Nicht geprüft: Sachrichtigkeit der Texte gegen die Quellen, Namensgleichheit der Personen. Nach `apply`: `validate:data`, `npm test` (282/282) und `lint:all` grün.

## 2026-11-12 – SERVICE-31-STORY-02-TASK-01: Sammeldatei erzeugen, Quellen abrufen

- **Status:** Umgesetzt
- **Änderungen:** `sources.json` (33 Personen, 100 URLs) aus Idee 022 erzeugt; `plan --sources`, `links`, `pages` ausgeführt; Linksammlung um 33 Personen mit `query: manuell` ergänzt.
- **Dateien:** `updates/2026-11-12/sources.json`, `updates/2026-11-12/photographers-web.json`, `updates/photographers-links.json`
- **Prüfung:** Abruf bis auf `marie-watt` erfolgreich (robots.txt, 2 s Abstand beachtet).

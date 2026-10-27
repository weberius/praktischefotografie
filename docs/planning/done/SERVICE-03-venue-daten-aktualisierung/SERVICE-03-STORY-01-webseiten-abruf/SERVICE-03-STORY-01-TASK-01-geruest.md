# SERVICE-03-STORY-01-TASK-01 – Gerüst und Abhängigkeiten
- **Story:** STORY-01
- **EARS:** FET-UB-4
- **Gherkin:** `setup/webseiten-abruf.feature` · „Snapshot wird gespeichert“ (Ausschluss von Git)
- **Quality:** Q-MAIN-2
- **ADR:** ADR-006
- **Aufgabe:** `cheerio`, `robots-parser`; Ordner `scripts/scrape/lib/`; `.cache/` in `.gitignore`; npm-Skripte `data:fetch`, `data:check`, `data:apply`, `data:report`.
- **Prüfkriterium:** `npm install`, `npm run lint` laufen; `.cache` wird von Git ignoriert.

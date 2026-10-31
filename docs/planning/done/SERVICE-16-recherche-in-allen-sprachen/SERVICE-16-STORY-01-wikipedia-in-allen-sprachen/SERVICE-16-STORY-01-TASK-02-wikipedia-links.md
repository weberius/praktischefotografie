# SERVICE-16-STORY-01-TASK-02 – Wikipedia-Links in die Linksammlung

**Story:** SERVICE-16-STORY-01  ·  **Status:** Umgesetzt
**EARS:** RAS-UB-2
**Gherkin:** Wikipedia-Links in der Linksammlung
**Quality:** Q-DATA-16, Q-DATA-14
**ADR:** ADR-020

## Vorgehen
- `scripts/photographers/lib/websearch.mjs`: `addWikipediaLinks` (normalisiert, ohne Dubletten, `query` = `wikipedia:<Sprache>`); Aufruf aus `fetch-photographers.mjs`/`research.mjs` nach dem Schreiben der Kandidatendatei. Diese Links zählen nicht als `newLinks`.

## Prüfkriterium
Test: Linksammlung mit einem vorhandenen Link, 12 Sprachversionen → alle genau einmal, Vorhandenes unverändert; zweiter Lauf ohne Änderung. Prüf-Gate grün.

# SERVICE-16-STORY-01-TASK-01 – Alle Sprachversionen und bis zu zehn Anfangstexte

**Story:** SERVICE-16-STORY-01  ·  **Status:** Umgesetzt
**EARS:** RAS-UB-1
**Gherkin:** Alle Sprachversionen als Links · Anfangstexte bis zu zehn Sprachen
**Quality:** Q-DATA-16, Q-SEC-5
**ADR:** ADR-020

## Vorgehen
- `scripts/photographers/lib/research.mjs`: `MAX_ARTICLES` = 10; Kandidatendatei erhält `sitelinks` (Sprache, Titel, Adresse, alle Sprachversionen); Prüfung erlaubt 1 bis 10 Quellsprachen.

## Prüfkriterium
Tests mit 12 Sprachversionen (Fixture): 12 `sitelinks`, 10 `articles`, Vorschlag mit 10 Sprachen gültig, mit 11 verworfen. Prüf-Gate grün.

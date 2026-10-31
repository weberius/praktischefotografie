# SERVICE-15-STORY-01-TASK-01 – Plan, Zielperson und Suchanfragen

**Story:** SERVICE-15-STORY-01  ·  **Status:** Umgesetzt
**EARS:** WSP-UB-1, WSP-EV-2, WSP-UN-2, WSP-OP-1
**Gherkin:** Websuche nur auf Wunsch · Neue Person wird angelegt · Vorhandene Person wird nicht doppelt angelegt
**Quality:** Q-SEC-7, Q-DATA-14
**ADR:** ADR-019

## Vorgehen
- `scripts/photographers/lib/websearch.mjs` (`resolveTarget`, `slugify`, `queriesFor`, `planWeb`) und CLI `scripts/photographers/web.mjs` (`plan`, nur mit `--web`; ohne Person Hinweis); Skript `photographers:web` in `package.json`.

## Prüfkriterium
Tests zu „Websuche nur auf Wunsch“, „Neue Person“, „Vorhandene Person“ grün. Prüf-Gate grün.

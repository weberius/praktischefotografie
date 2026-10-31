# SERVICE-16-STORY-02-TASK-01 – Mehrsprachige Anfragen, Grenzen, Standardlauf

**Story:** SERVICE-16-STORY-02  ·  **Status:** Umgesetzt
**EARS:** RAS-UB-3, RAS-EV-1, RAS-UB-4, RAS-UB-6
**Gherkin:** Websuche im Standardlauf · Websuche abschalten · Suchanfragen in mehreren Sprachen · Seiten für den Text · Quellenzahl
**Quality:** Q-SEC-8, Q-DATA-16
**ADR:** ADR-020

## Vorgehen
- `websearch.mjs`: `queriesFor` mit sechs Sprachen, `MAX_QUERIES` 6, `MAX_PAGES` 10, `MAX_SOURCES` 10; `fetchPages` lädt Wikimedia-Adressen nicht.
- `web.mjs`: `plan` verlangt `--web` nicht mehr.
- `schema/photographers.schema.json`: `web.sources` `maxItems` 10.
- Bestehende Tests an die neuen Grenzen anpassen (Quelle: RAS).

## Prüfkriterium
Tests zu den fünf Szenarien grün, offline. Prüf-Gate grün.

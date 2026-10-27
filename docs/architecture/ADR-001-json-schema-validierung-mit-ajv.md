# ADR-001: JSON-Daten mit JSON Schema und Ajv validieren

**Status:** Accepted (an H2 am 2026-10-27 bestätigt)  ·  **Datum:** 2026-10-27

## Kontext
Alle Inhalte liegen als JSON im Repository (PRD 3.1). Redaktion pflegt sie von Hand. Ohne automatische Prüfung bleiben Tippfehler, kaputte Verweise und falsche Koordinaten unbemerkt. Das Muster folgt `klangland`: statisch, ohne Datenbank, Node-Tooling.

## Entscheidung
- Je Datensatztyp ein JSON-Schema (Draft 2020-12) unter `schema/<typ>.schema.json`.
- Ein Node-Skript `scripts/validate-data.mjs` prüft mit **Ajv** (plus `ajv-formats`) die Schemas und anschließend semantische Regeln (Referenzen, doppelte IDs, Datumsfolge, NRW-Koordinaten).
- Aufruf über `npm run validate:data`; Tests mit dem eingebauten Node-Testrunner (`node --test`), Lint mit ESLint.
- Gherkin-Szenarien werden ohne Cucumber 1:1 als Tests mit Szenarioverweis umgesetzt.

## Alternativen
- **TypeScript-Typen + zod:** Typsicher, aber Redaktion und andere Werkzeuge können die Schemas nicht direkt nutzen.
- **Eigenes Skript ohne Schema:** Keine Standardformate, schwer wartbar.
- **Cucumber:** Nähe zu Gherkin, aber zusätzliche Abhängigkeit ohne Mehrwert für diese Größe.

## Konsequenzen
- Zwei Abhängigkeiten (`ajv`, `ajv-formats`), keine Laufzeitabhängigkeit für die SPA.
- Schemas lassen sich später in der SPA oder in Editoren wiederverwenden.
- Die NRW-Grenzen liegen als Konfiguration im Validator und müssen bei der Expansion (PRD Phase 4) angepasst werden.

## Auswirkungen
- EARS: DAT-UB-1 bis DAT-UB-4, DAT-OP-1, DAT-UN-1, VEN-UB-2, VEN-UB-3, VAL-EV-1, VAL-EV-2, VAL-UN-1 bis VAL-UN-5, VAL-UB-1
- Features: `content/daten.feature`, `setup/datenvalidierung.feature`
- Quality: Q-DATA-1, Q-PERF-2, Q-SEC-1

# SERVICE-17-STORY-01-TASK-03 – Meta-Refresh und JavaScript-Weiterleitung erkennen

**Status:** Umgesetzt  ·  **Story:** SERVICE-17-STORY-01

## Beschreibung
Meta-Refresh und statisch erkennbare JavaScript-Weiterleitung (nur auf Seiten ohne weiteren Text) werden wie HTTP-Weiterleitungen behandelt und zählen zur Grenze von drei; JavaScript wird nicht ausgeführt.

## Spezifikation
- EARS: FET-UB-8, FET-UB-6, FET-UB-7, FET-UN-3
- Gherkin: `setup/webseiten-abruf.feature` · „Meta-Refresh und JavaScript-Weiterleitung“, „Weiterleitungsgrenze und Schleife“
- Quality: Q-SEC-9
- ADR: ADR-021 (Proposed); ADR-006

## Prüfkriterium
Tests mit Seiten mit Meta-Refresh, `window.location`-Zuweisung, Seite mit Inhalt und Skript (nicht verfolgt) und gemischter Kette; `npm test` grün.

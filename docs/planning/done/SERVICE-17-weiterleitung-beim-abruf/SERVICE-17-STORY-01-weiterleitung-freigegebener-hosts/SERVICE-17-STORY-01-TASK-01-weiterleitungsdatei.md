# SERVICE-17-STORY-01-TASK-01 – Weiterleitungsdatei laden und prüfen

**Status:** Umgesetzt  ·  **Story:** SERVICE-17-STORY-01

## Beschreibung
Neue Datei `scripts/scrape/redirect-hosts.json` (`{}`), Lader mit Prüfung (Hostnamen, bekannte IDs); `data:fetch` endet bei ungültiger Datei mit Exit-Code 1 vor der ersten Anfrage und reicht die Hosts an den Abrufdienst.

## Spezifikation
- EARS: FET-OP-3
- Gherkin: `setup/webseiten-abruf.feature` · „Freigegebener Host im Datensatz“
- Quality: Q-SEC-9, Q-MAIN-2
- ADR: ADR-021 (Proposed); ADR-006

## Prüfkriterium
Test: gültige Datei wird geladen, ungültiger Hostname und unbekannte ID führen zu Exit-Code 1 ohne Anfrage; `npm test` grün.

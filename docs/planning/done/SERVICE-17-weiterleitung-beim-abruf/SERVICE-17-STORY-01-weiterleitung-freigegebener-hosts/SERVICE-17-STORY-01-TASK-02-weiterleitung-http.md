# SERVICE-17-STORY-01-TASK-02 – HTTP-Weiterleitung auf freigegebene Hosts, Grenze, Schleife, Bericht, Snapshot

**Status:** Umgesetzt  ·  **Story:** SERVICE-17-STORY-01

## Beschreibung
Der Abrufdienst folgt HTTP-Weiterleitungen auf den Host der `website` oder freigegebene Hosts; `robots.txt` und Abstand je Zielhost; höchstens drei Weiterleitungen, Schleifen enden; Bericht nennt von → nach; Snapshot trägt die Zieladresse als `url` (Cache-Schlüssel bleibt die angefragte Adresse); Links auf freigegebenen Hosts zählen als dieselbe Website.

## Spezifikation
- EARS: FET-UB-6, FET-UB-7, FET-UN-3, FET-EV-2
- Gherkin: `setup/webseiten-abruf.feature` · „Weiterleitung auf freigegebenen Host“, „robots.txt des Zielhosts“, „Weiterleitungsgrenze und Schleife“, „Bericht und Snapshot nach Weiterleitung“, „Weiterleitung auf anderen Host“
- Quality: Q-SEC-9, Q-SEC-4
- ADR: ADR-021 (Proposed); ADR-006

## Prüfkriterium
Tests mit zwei lokalen Testservern (Kette, Schleife, gesperrte robots.txt, nicht freigegebener Host, Zeitstempel); `npm test` grün.

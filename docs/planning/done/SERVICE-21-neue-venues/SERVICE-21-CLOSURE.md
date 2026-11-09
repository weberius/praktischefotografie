# Closure: SERVICE-21 – Neue Venues

**Datum:** 2026-11-09  ·  **Quelle:** Idee `docs/product/ideen/idee-012-neue-venues.md`

## Erreichtes
Das Forum für Fotografie Köln (`forum-fuer-fotografie-koeln`, `gallery`) und das Kunstmuseum Bonn (`kunstmuseum-bonn`, `museum`) sind im Katalog `data/venues.json` erfasst (Bestand jetzt 24). Spezifikation: VEN-UB-6, VEN-UB-7, Gherkin „Neue Venues sind im Katalog“, Test in `test/bestand.test.mjs`. Kein ADR erforderlich.

## Abweichungen
Keine am H2 (akzeptiert). Die URL der Idee für das Kunstmuseum Bonn war ein Kopierfehler; korrigiert durch den Menschen.

## Rückläufe und korrigierte Quellen
Keine. Reviews (Code, Architektur, Security) ohne kritische oder hohe Befunde; Security ohne Befund.

## Erkenntnisse
- Fehlerhafte URLs in Ideen früh gegenprüfen.
- Koordinaten stammen aus OpenStreetMap/Nominatim, nicht von den Venue-Websites.

## Nicht geprüft
`npm run web:test` (kein Chrome-Binary im Container); Compliance-Review (kein Skill vorhanden); Review wurde einmal für beide Stories gemeinsam gefahren, da der Umfang identisch ist.

## Zurückgestellt (Review, unterhalb der Schwelle)
Siehe `review/`: TASK-01 Venue-Spezifikation entkoppeln (ARCH-01, ARCH-03), TASK-02 Bestandsobergrenze 30 klären (ARCH-02), TASK-03 Bestandstest straffen (CODE-01), TASK-04 EARS-/Gherkin-Bereinigung (CODE-02, CODE-04), TASK-05 Quell-URL Kunstmuseum Bonn stabilisieren (CODE-03, ARCH-04).

## Follow-ups
- Offene Annahmen bestätigt an H2: Typen `gallery`/`museum`, „Katalog“ = `data/venues.json`.
- Bei 30 Venues ist die Obergrenze VEN-UB-1 erreicht (TASK-02).
- Ausstellungen der neuen Orte über `/update-venue-data` erfassen.
- `docs/templates/` legt der Mensch an.

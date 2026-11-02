# Closure: SERVICE-20 – Globaler Filter

**Datum:** 2026-11-02  ·  **Quelle:** Idee `docs/product/ideen/idee-011-filter.md`

## Erreichtes
Ein globaler Filter nach Ortstyp und Ort (Mehrfachauswahl) gilt auf Karte, Orten, Agenda, Ausstellungen und Events und bleibt beim Seitenwechsel erhalten; er liegt nur im Speicher. Die Bedienung ist auf allen fünf Seiten gleich (`app-global-filter`), mit Text zur aktiven Auswahl, Hinweis bei null Treffern und Zurücksetzen. Stadt, Typ, Präsenzbibliothek und Ständige Sammlung als Einzelfilter entfallen; Veranstalter und Festival bleiben in der Adresse.

## Abweichungen
Keine am H2 (akzeptiert).

## Rückläufe und korrigierte Quellen
Ein Review-Rücklauf: Reset auf der Karte setzte mehr zurück als anderswo (Umsetzungsfehler, Karte jetzt mit zwei klar benannten Schaltflächen); Verweise in ADR-016 und zwei Quality-Dokumenten auf ersetzte IDs ergänzt; zwei schwache Tests geschärft. Security-Review ohne Befund.

## Erkenntnisse
- Beim Ersetzen von Anforderungen die Verweise in ADRs und Quality-Dokumenten gleich mitprüfen.
- Gleich benannte Aktionen mit unterschiedlicher Wirkung früh vereinheitlichen.

## Nicht geprüft
axe-Lauf, Playwright-Tastaturtest, Kontrast, Zielgröße, 100-ms-Grenze (Q-USE-18); Optik auf der vollflächigen Karte; Compliance-Review (GBOS-MCP nicht verfügbar). Root-`npm test` hat 1 bereits vorher roten Test (FET-OP-3).

## Zurückgestellt (Review)
Mehrere `role=status` und Schaltfläche in der Live-Region (C5, C6), Typ/Ort-Einschränkung der Ortsliste (C7), automatisierte Q-USE-18-Prüfung (C3).

## Follow-ups
- Offene Annahmen bestätigt an H2: Typ = Ortstyp, Bedienung auf den Seiten, nur Speicher, Einträge ohne Ort ausgeblendet.
- Klangland-Seite war nicht einsehbar; ggf. gleiche Filterlogik prüfen.

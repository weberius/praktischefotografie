# TASK-02: `description` auf Links und HTML prüfen, Quellen-ID im Bericht validieren

**Priorität:** Low  
**Aufwand:** ~1 h  
**Quelle:** analyse-security.md  
**Befund-Bezug:** SEC-01, SEC-02  
**ADR-Bezug:** ADR-007  
**Status:** Zurückgestellt (2026-10-30, niedrig bzw. durch TASK-07/08 abgedeckt)

---

## Problem

`scripts/scrape/lib/proposals.mjs:72-89`: Die `description` von Terminevents wird (außer der Uhrzeit) nicht geprüft. `scripts/scrape/lib/report.mjs:38`: Verzeichnisnamen gehen ungefiltert in den Bericht.

## Ziel

Terminevents mit URLs oder HTML in der `description` werden verworfen; Snapshot-Verzeichnisse mit ungültiger ID werden im Bericht übergangen.

## Betroffene Dateien

- `scripts/scrape/lib/proposals.mjs`
- `scripts/scrape/lib/report.mjs`
- `test/scrape/termine.test.mjs`, `test/scrape/termine-bericht.test.mjs`

## Umsetzungsvorschlag

1. In `checkTermin` `description` ablehnen, wenn sie `<`, `>` oder `https?://` enthält.
2. In `termineSummary` nur IDs mit `^[a-z0-9-]+$` verarbeiten.
3. Tests für beide Fälle ergänzen.

**Entscheidung erforderlich:** Ob die Prüfung auch Namen und Daten der `description` gegen den Textauszug abgleichen soll (strenger, mehr Fehlverwürfe).

## Akzeptanzkriterien

- [ ] Fall mit Link oder HTML wird mit Grund verworfen
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – kann legitime Beschreibungen mit Zeichen `<`/`>` verwerfen.

# TASK-26: Beschreibungstext im Manifest und im Meta-Tag abgleichen

**Priorität:** Low  
**Aufwand:** ~15 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-07  
**ADR-Bezug:** ADR-017  
**Status:** Zurückgestellt (2026-10-29, Abnahme: Refactoring bzw. Stilfrage ohne Verhaltens- oder Testlücke; nicht verworfen)

---

## Problem

`web/public/site.webmanifest:3` und `web/src/index.html:6` enthalten denselben Beschreibungstext, ohne Verbindung.

## Ziel

Eine Quelle, oder ein Test, der beide gleich hält.

## Betroffene Dateien

- `web/public/site.webmanifest`
- `test/marken-icon.test.mjs`

## Umsetzungsvorschlag

**Entscheidung erforderlich:** (a) `description` aus dem Manifest entfernen (nicht erforderlich), oder (b) im Manifest-Test (`test/marken-icon.test.mjs:84-99`) prüfen, dass `manifest.description` dem `meta name="description"` aus `index.html` entspricht.

## Akzeptanzkriterien

- [ ] Entscheidung umgesetzt
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig.

# TASK-07: Q-USE-15 (axe) und Q-IOP-1 (Fixtures) belegen

**Priorität:** Medium  
**Aufwand:** ~1 h  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-06  
**ADR-Bezug:** ADR-018  
**Status:** Umgesetzt (2026-10-30, Abnahme: Empfehlung)

---

## Problem

`web/tools/quality/browser-check.mjs:13` wählt das erste `/events/:id`; ist es beendet, gibt es keine Schaltfläche und axe prüft sie nicht (Annahme). Q-IOP-1 verlangt ≥ 6 Fixtures mit Strukturprüfung; `ics.spec.ts` hat `expectValid` (Z. 24-38), die Verwendung je Fall ist zu bestätigen.

## Ziel

Die Zusagen aus `docs/quality/web/kalender-export.md` sind automatisiert belegt.

## Betroffene Dateien

- `web/tools/quality/browser-check.mjs`
- `web/src/app/core/ics.spec.ts`

## Umsetzungsvorschlag

1. axe-Stichprobe um ein nicht beendetes Event ergänzen (Auswahl nach Datum oder zweite Stichprobe).
2. Jedes Fixture (einzelner Tag, mehrtägig, Umlaute, Sonderzeichen, lange Beschreibung, Ort unbekannt) ruft `expectValid` auf.

## Akzeptanzkriterien

- [ ] axe-Lauf enthält eine Seite mit Schaltfläche, 0 Verstöße
- [ ] ≥ 6 Fixtures mit `expectValid`
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig.

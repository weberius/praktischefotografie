# TASK-02: Entscheidung zur Obergrenze von 30 Venues

**Priorität:** Medium  
**Aufwand:** ~30 min  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-02  
**ADR-Bezug:** ADR-001 (Konsequenzen zur Expansion)  
**Status:** Vorgeschlagen

---

## Problem

Der Bestand hat 24 Venues; VEN-UB-1 und `test/bestand.test.mjs:11-13` erlauben höchstens 30 (Q-DATA-2). Die 31. Venue lässt den Test scheitern und blockiert damit reine Datenerfassung. Die Grenze ist nirgends begründet.

## Ziel

Klarheit, ob die Obergrenze ein gewolltes Ziel (Kuratierung, Performance) oder ein Anfangsstand ist.

## Betroffene Dateien

- `docs/ears/content/venue-erfassung.md` (VEN-UB-1)
- `docs/quality/content/datenqualitaet.md` (Q-DATA-2)
- `docs/contracts/gherkin/content/daten.feature`
- `test/bestand.test.mjs`
- ggf. `docs/architecture/ADR-001-json-schema-validierung-mit-ajv.md`

## Umsetzungsvorschlag

**Entscheidung erforderlich:**
- **A:** Grenze beibehalten, Begründung in VEN-UB-1/Q-DATA-2 ergänzen.
- **B:** Obergrenze anheben (z. B. 50) per Supersede von VEN-UB-1 und Q-DATA-2.
- **C:** Obergrenze streichen; Größe nur über das 100-KB-Limit (`test/bestand.test.mjs:59`) begrenzen.

Bei B/C: Karten- und Filterwirkung (ADR-016, Köln-Anteil 12 von 24) mitbedenken.

## Akzeptanzkriterien

- [ ] Entscheidung dokumentiert, EARS, Quality, Gherkin und Test konsistent
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – Spezifikationsänderung ohne Codeeinfluss.

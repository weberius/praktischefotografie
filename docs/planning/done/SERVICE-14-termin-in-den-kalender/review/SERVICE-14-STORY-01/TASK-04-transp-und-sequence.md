# TASK-04: TRANSP:TRANSPARENT und Aktualisierungsfelder prüfen

**Priorität:** Medium  
**Aufwand:** ~1 h  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-04  
**ADR-Bezug:** ADR-018  
**Status:** Umgesetzt (2026-10-30, Abnahme: Empfehlung)

---

## Problem

Ganztägige Einträge gelten standardmäßig als `OPAQUE` (Tag "beschäftigt"); ein Informationstermin blockiert so die Verfügbarkeit. `SEQUENCE`/`LAST-MODIFIED` fehlen, daher ist die Aktualisierung bei gleicher `UID` (ICS-UB-3) nur über `DTSTAMP` geordnet (`ics.ts:67-79`).

## Ziel

Der Termin blockiert den Tag nicht; Aktualisierungen bei erneutem Import sind verlässlich.

## Betroffene Dateien

- `web/src/app/core/ics.ts`, `ics.spec.ts`

## Umsetzungsvorschlag

1. `TRANSP:TRANSPARENT` ergänzen.
2. **Entscheidung erforderlich:** `SEQUENCE` (z. B. 0 oder aus Datenstand) und `LAST-MODIFIED` nur ergänzen, wenn das Datenmodell einen Änderungsstand liefert; sonst bewusst weglassen und im ADR festhalten (Daten ohne Versionsfeld).
3. Gherkin/EARS ICS-UB-2 um `TRANSP` ergänzen (Spezifikation per Supersede-Regel, kein stilles Überschreiben).

## Akzeptanzkriterien

- [ ] `TRANSP` im Test geprüft
- [ ] Entscheidung zu `SEQUENCE` dokumentiert
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig.

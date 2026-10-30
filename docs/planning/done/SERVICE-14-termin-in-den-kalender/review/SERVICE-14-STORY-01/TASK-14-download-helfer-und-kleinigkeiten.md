# TASK-14: Download-Helfer extrahieren, Datumsannahmen dokumentieren

**Priorität:** Low  
**Aufwand:** ~30 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-04  
**ADR-Bezug:** ADR-018  
**Status:** Zurückgestellt (2026-10-30, Struktur bzw. niedrig, kein Einfluss auf Verhalten)

---

## Problem

`event-detail.ts:44-66` mischt Mapping und Download; `ics.ts:44-48` setzt gültige ISO-Daten voraus (ungültig ergäbe `NaNNaNNaN`, `endDate` < `startDate` ungeprüft); `DTSTAMP` nutzt `new Date()` am `Clock`-Dienst vorbei.

## Ziel

Schlankerer Handler, dokumentierte Annahmen.

## Betroffene Dateien

- `web/src/app/pages/event-detail/event-detail.ts`
- `web/src/app/core/ics.ts`

## Umsetzungsvorschlag

1. Download (Blob, Anker, Freigabe) in eine kleine Hilfsfunktion auslagern (in Abstimmung mit TASK-12).
2. In `ics.ts` einen Satz Kommentar: Daten sind schemavalidiert (Annahme prüfen, ADR-003); keine Laufzeitprüfung.
3. Optional `now` aus `Clock` beziehen, falls dieser eine Zeit liefert.

## Akzeptanzkriterien

- [ ] Verhalten unverändert (bestehende Tests grün)
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig.

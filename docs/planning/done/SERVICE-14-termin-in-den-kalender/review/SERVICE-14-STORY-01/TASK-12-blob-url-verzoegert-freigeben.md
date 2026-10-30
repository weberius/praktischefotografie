# TASK-12: Blob-URL verzögert freigeben und auf Zielgeräten prüfen

**Priorität:** Medium  
**Aufwand:** ~30 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-02  
**ADR-Bezug:** ADR-018  
**Status:** Umgesetzt (2026-10-30, Abnahme: Empfehlung)

---

## Problem

`web/src/app/pages/event-detail/event-detail.ts:62-65`: `revokeObjectURL` direkt nach `link.click()`. Auf iOS Safari kann der Download dadurch ausbleiben (Annahme, nicht verifiziert). Der Test (`event-detail.spec.ts:84`) erwartet die synchrone Freigabe.

## Ziel

Blob-URL wird sicher freigegeben, ohne den Download zu gefährden.

## Betroffene Dateien

- `web/src/app/pages/event-detail/event-detail.ts`
- `web/src/app/pages/event-detail/event-detail.spec.ts`

## Umsetzungsvorschlag

**Entscheidung erforderlich:** (a) Freigabe per `setTimeout` (z. B. 0 bis einige Sekunden) und Test mit `jasmine.clock()`; (b) Verhalten belassen, wenn die Handprobe auf iOS Safari und Android Chrome den Download bestätigt (Q-IOP-1). In beiden Fällen die Handprobe im Changelog festhalten. Optional den Anker kurz ins DOM einhängen und wieder entfernen.

## Akzeptanzkriterien

- [ ] Handprobe auf mindestens einem iOS- und einem Android-Gerät dokumentiert
- [ ] Test deckt die Freigabe (verzögert oder synchron) ab
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – kleine Änderung; Risiko liegt in der unverifizierten Plattformannahme.

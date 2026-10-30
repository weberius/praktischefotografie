# TASK-05: Download robuster machen und Handprobe durchführen

**Priorität:** Medium  
**Aufwand:** ~1 h  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-03  
**ADR-Bezug:** ADR-018  
**Status:** Umgesetzt durch TASK-12 (2026-10-30)

---

## Problem

`URL.revokeObjectURL(url)` läuft direkt nach `link.click()` (`event-detail.ts:62-66`); in einigen Browsern kann der Download dadurch scheitern (Annahme, nicht geprüft). Anker ist nicht im DOM. Q-IOP-1 sieht eine Handprobe vor.

## Ziel

Der Download funktioniert in aktuellem Chrome, Firefox, Safari (macOS/iOS).

## Betroffene Dateien

- `web/src/app/pages/event-detail/event-detail.ts` (bzw. Hilfsfunktion aus TASK-02)
- `event-detail.spec.ts`

## Umsetzungsvorschlag

1. `revokeObjectURL` per `setTimeout` verzögern.
2. Anker kurz an `document.body` hängen und danach entfernen.
3. Handprobe: Apple Kalender (iOS/macOS), Google Kalender, Outlook; Ergebnis im Changelog festhalten.

## Akzeptanzkriterien

- [ ] Test deckt verzögertes Freigeben ab (Fake-Timer)
- [ ] Handprobe dokumentiert
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – Verhalten bleibt gleich, nur zeitlich versetzt.

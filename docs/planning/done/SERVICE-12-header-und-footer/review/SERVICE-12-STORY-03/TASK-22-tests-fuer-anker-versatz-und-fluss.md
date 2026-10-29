# TASK-22: Test für Router-Versatz ergänzen und Testtitel angleichen

**Priorität:** Medium  
**Aufwand:** ~30 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-02  
**ADR-Bezug:** ADR-016  
**Status:** Umgesetzt (2026-10-29)

---

## Problem

`web/src/app/app.spec.ts:293` und `:301`: Der Router-Versatz (`app.config.ts:15`) ist ungetestet; Titel nennen „im Seitenfluss“ und „Fokus“, die nicht geprüft werden.

## Ziel

Die Suite schlägt fehl, wenn der Versatz entfällt oder vom CSS abweicht; Titel entsprechen den Assertions.

## Betroffene Dateien

- `web/src/app/app.spec.ts`

## Umsetzungsvorschlag

1. Test mit `appConfig`-Providern: `ViewportScroller` per Spy auf `setOffset` prüfen, Wert gleich `scroll-padding-top` in Pixel.
2. Im FRM-UB-2-Test ergänzen: Kopf liegt vor `main` im Fluss (`main.top` ≥ `header.bottom` bei Scroll 0), oder Titel kürzen.
3. Titel des FRM-UB-5-Tests auf das Geprüfte anpassen.

## Akzeptanzkriterien

- [ ] Entfernen von `provideAppInitializer` lässt einen Test fehlschlagen
- [ ] Titel entsprechen den Assertions
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – nur Testcode.

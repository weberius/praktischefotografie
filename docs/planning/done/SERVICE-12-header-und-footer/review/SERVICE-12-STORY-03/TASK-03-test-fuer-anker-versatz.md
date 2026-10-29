# TASK-03: Automatisierter Test für den Router-Anker-Versatz

**Priorität:** Low  
**Aufwand:** ~45 min  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-03  
**ADR-Bezug:** –  
**Status:** Umgesetzt (2026-10-29)

---

## Problem

`web/src/app/app.config.ts:15` (`setOffset([0, 96])`) hat keinen Test; `web/src/app/app.spec.ts:301-306` prüft nur das CSS. Wird die Zeile entfernt oder der Wert geändert, bleibt alles grün, obwohl „Zum Inhalt springen“ per Router wieder unter dem Kopf landet (im Changelog nur einmal im Browser gemessen).

## Ziel

Regression des Router-Versatzes wird automatisch erkannt (FRM-UB-5, Q-USE-13).

## Betroffene Dateien

- `web/src/app/app.spec.ts` (oder eigene Spec für `appConfig`)
- optional `web/tools/quality/browser-check.mjs`

## Umsetzungsvorschlag

1. Komponententest mit `appConfig`-Providern: nach Initialisierung `ViewportScroller` abfragen; nach `scrollToAnchor('inhalt')` liegt `main` an oder unter der Unterkante von `.site-header` (`getBoundingClientRect`), mit langem Füller zum Scrollen.
2. Alternativ oder zusätzlich in der Playwright-Messung (Q-USE-13) den Sprunglink klicken und `main.top ≥ header.bottom` prüfen.
3. Abhängig von TASK-01: Test an die gewählte Option anpassen.

## Akzeptanzkriterien

- [ ] Test schlägt fehl, wenn `setOffset` entfernt wird
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien (Kopfbereich verdeckt keinen Inhalt) weiterhin erfüllt

## Risiko

Niedrig – reine Testergänzung; Scroll-Messungen in Karma können zeitabhängig sein.

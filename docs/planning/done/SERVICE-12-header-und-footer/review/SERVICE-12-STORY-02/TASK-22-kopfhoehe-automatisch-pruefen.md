# TASK-22: Kopfhöhe und Scrollbreite in der Browserprüfung messen

**Priorität:** Medium  
**Aufwand:** ~1 h  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-02  
**ADR-Bezug:** –  
**Status:** Umgesetzt (2026-10-29)

---

## Problem

Die Grenzen aus Q-USE-13 (Kopf ≤ 5 rem bei 390 px, ≤ 6 rem bei 320 px, `scrollWidth` ≤ `clientWidth`) wurden nur einmalig von Hand gemessen (STORY-02-Changelog). `web/tools/quality/browser-check.mjs` und `web/src/app/app.spec.ts` prüfen sie nicht. Die Schriftgrößen und Haltepunkte in `web/src/styles.css:36`–`:38` sowie `scroll-padding-top: 6rem` (Zeile 30) und der `ViewportScroller`-Offset hängen an derselben Höhe; eine Änderung an Schrift, Padding oder Name bricht sie unbemerkt.

## Ziel

Q-USE-13 wird bei jedem Qualitätslauf automatisch gemessen.

## Betroffene Dateien

- `web/tools/quality/browser-check.mjs`
- ggf. dessen Test unter `web/tools/quality/`

## Umsetzungsvorschlag

1. In der Browserprüfung bei Viewport 390 × 844 und 320 × 640 auf Startseite und `/map` die Höhe von `.site-header` in rem messen und gegen 5 bzw. 6 rem prüfen.
2. `document.documentElement.scrollWidth <= clientWidth` bei 320 px prüfen.
3. In `styles.css` kurz kommentieren, dass `scroll-padding-top` und der Offset in `app.config.ts` an die Kopfhöhe gekoppelt sind (nur Kommentar, kein neuer Mechanismus).

## Akzeptanzkriterien

- [ ] Prüfung schlägt bei künstlich vergrößerter Schrift (z. B. 1,6 rem) fehl
- [ ] Messung läuft im bestehenden Qualitätslauf ohne neue Abhängigkeit
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – betrifft nur das Prüfwerkzeug; Messwerte können je nach Schriftart in der CI leicht schwanken (Spielraum: 3,56 rem gegen Grenze 5 rem).

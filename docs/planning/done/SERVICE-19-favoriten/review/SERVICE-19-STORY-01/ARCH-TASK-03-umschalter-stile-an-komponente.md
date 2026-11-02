# TASK-03: Umschalter-Stile an die Komponente binden

**Priorität:** Low  
**Aufwand:** ~20 min  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-03  
**ADR-Bezug:** –  
**Status:** Umgesetzt

---

## Problem

`web/src/styles.css:79-80` enthält die Stile von `.favorite-toggle` (Zielgröße ≥ 2 rem aus Q-USE-17, gedrückter Zustand). `web/src/app/shared/favorite-toggle/favorite-toggle.ts` hat keine eigenen Stile, anders als `back-link`, `exhibition-badges`, `venue-legend`, `venue-map`.

## Ziel

Die Komponente trägt ihre Darstellung selbst.

## Betroffene Dateien

- `web/src/app/shared/favorite-toggle/favorite-toggle.ts` (ggf. neue `favorite-toggle.css`)
- `web/src/styles.css`

## Umsetzungsvorschlag

1. Die beiden Regeln als Komponentenstile (`styles` oder `styleUrl`) übernehmen und aus `styles.css` entfernen.
2. `.visually-hidden` bleibt global, da mehrfach genutzt.
3. Budget und Darstellung per Build und Sichtprüfung kontrollieren.

## Akzeptanzkriterien

- [ ] `styles.css` enthält keine `.favorite-toggle`-Regeln mehr
- [ ] Zielgröße und gedrückter Zustand unverändert
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – Selektoren der Komponente greifen durch die View-Kapselung auf den eigenen Button; Sichtprüfung nötig.

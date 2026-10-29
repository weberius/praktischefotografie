# TASK-21: Veraltete Verweise auf eine Ortsliste auf /map korrigieren

**Priorität:** Medium  
**Aufwand:** ~15 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-01  
**ADR-Bezug:** ADR-016  
**Status:** Umgesetzt (2026-10-29, Prüf-Gate grün, siehe Story-Changelog)

---

## Problem

Nach dem Entfernen der Ortsliste auf `/map` (MAP-UB-7) sprechen drei Stellen weiter von einer Liste bzw. nennen die ersetzte Anforderung:

- `web/src/app/pages/map/map.ts:34` – Meta-Beschreibung: „Karte und Liste der Foto-Orte in NRW …“ (erscheint in Suchergebnissen).
- `web/src/app/shared/venue-map/venue-map.html:5` – `aria-label`: „… Dieselben Orte stehen auch in der Liste zur Verfügung.“ (Screenreader erfahren von einer Liste, die es auf der Seite nicht gibt).
- `web/src/app/shared/venue-map/venue-map.ts:18` – Klassenkommentar nennt MAP-UB-6, ersetzt durch MAP-UB-13.

## Ziel

Texte und Verweise entsprechen dem Stand von ADR-016.

## Betroffene Dateien

- `web/src/app/pages/map/map.ts`
- `web/src/app/shared/venue-map/venue-map.html`
- `web/src/app/shared/venue-map/venue-map.ts`
- ggf. `web/src/app/shared/venue-map/venue-map.spec.ts`, `web/src/app/pages/map/map.spec.ts` (falls Texte geprüft werden)

## Umsetzungsvorschlag

1. Meta-Beschreibung ohne „Liste“ formulieren, z. B. „Karte der Foto-Orte in NRW, filterbar nach …“.
2. `aria-label` auf „Karte der Orte“ kürzen; der Link auf `/venues` steht als sichtbarer Link direkt darüber.
3. Kommentar-Verweis auf MAP-UB-13 (und MAP-UB-10/12) aktualisieren.

## Akzeptanzkriterien

- [ ] Im Code von `/map` kommt „Liste“ nur noch im Linktext „Orte als Liste anzeigen“ vor.
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – reine Texte; Hinweis: Das `aria-label` liegt in `venue-map.html`, das nicht zur Dateiliste der Story gehört, ist aber Teil des Karten-Layouts dieser Story.

# TASK-02: Höhenkette der Karte dokumentieren und Mindesthöhe einmal führen

**Priorität:** Low  
**Aufwand:** ~30 min  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-02  
**ADR-Bezug:** ADR-016  
**Status:** Zurückgestellt (2026-10-29, Abnahme: unter der Review-Schwelle, betrifft Struktur statt Verhalten; nicht verworfen)

---

## Problem

Die Karte füllt die Restfläche nur, wenn jede Ebene vom App-Host bis `.map` in der Flex-Kette steht (`app.css:2`, `styles.css:33,36`, `map.css:2,5,8,9`, `venue-map.css:1-2`). `venue-map.css` wiederholt die Mindesthöhe 24 rem auf Host (Zeile 1) und `.map` (Zeile 2); `map.css:5` setzt `display: contents` auf `app-data-gate` und hängt damit an dessen Rendering. Einen zusätzlichen Wrapper bemerkt nur der Messtest in `app.spec.ts`; `VenueMap` dokumentiert nicht, dass sie den Platz des Elternteils nutzt.

## Ziel

Die Layoutvereinbarung ist an `VenueMap` beschrieben, die Mindesthöhe steht einmal (CSS-Variable oder nur auf `.map`), und die Annahme zu `DataGate` ist an `DataGate` festgehalten.

## Betroffene Dateien

- `web/src/app/shared/venue-map/venue-map.css`
- `web/src/app/shared/venue-map/venue-map.ts` (Kommentar zur Layoutvereinbarung)
- `web/src/app/shared/data-gate/data-gate.ts` (Kommentar: Host ohne eigene Box, Inhalt projiziert)
- `web/src/app/pages/map/map.css`

## Umsetzungsvorschlag

1. Mindesthöhe als `--venue-map-min-height: 24rem` am Host definieren und in `.map` verwenden (oder Host-Regel streichen, wenn `.map` allein genügt; zuvor mit den Layout-Tests prüfen).
2. Im Klassenkommentar von `VenueMap` festhalten: füllt die Höhe des Elternteils (Flex-Spalte), mindestens `--venue-map-min-height`.
3. In `DataGate` kurz vermerken, dass Seiten den Host als `display: contents` stylen dürfen, oder die Hülle für Layoutzwecke ersetzen (z. B. `@if (data.ready())` in der Seite) – Entscheidung offen, nur falls `DataGate` ohnehin angefasst wird.

## Akzeptanzkriterien

- [ ] Mindesthöhe 24 rem steht nur einmal in `venue-map.css`
- [ ] `VenueMap` und `DataGate` beschreiben die Layoutvereinbarung im Kommentar
- [ ] Layout-Tests „Karte füllt die Fläche“ und Test zur Größenanpassung grün
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – reine CSS- und Kommentaränderung; Messtests decken die Höhe ab.

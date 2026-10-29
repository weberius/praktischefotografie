# TASK-24: Layout-Kette für die vollflächige Karte bündeln (Entscheidung erforderlich)

**Priorität:** Low  
**Aufwand:** ~45 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-04  
**ADR-Bezug:** ADR-016  
**Status:** Zurückgestellt (2026-10-29, Abnahme: unter der Review-Schwelle, betrifft Struktur statt Verhalten; nicht verworfen)

---

## Problem

Die Höhenkette „Fenster → Karte“ ist über fünf Stellen verteilt, die nur zusammen funktionieren:

- `web/src/app/app.css:2` (Host als Spalte, `min-height: 100dvh`)
- `web/src/styles.css:33` (`main { flex: 1 0 auto … }`) und `styles.css:36` (`main:has(> app-map-page)` – globales CSS kennt eine konkrete Seitenkomponente)
- `web/src/app/pages/map/map.css:2-8` (Host, `display: contents` an `app-data-gate`, Section)
- `web/src/app/shared/venue-map/venue-map.css:1-2`

Der Wert `24rem` steht doppelt in `venue-map.css` (Host und `.map`; `.map` wächst ohnehin auf die Höhe des Hosts) und als Zahl im Kommentar `map.css:1`. Wer die Mindesthöhe ändert, muss mehrere Stellen finden. Das Muster ist in ADR-016 beschrieben und kein Fehler, aber ein stiller Stolperstein für die Wartung.

**Überschneidung:** Deckt sich mit ARCH-01/ARCH-02 (TASK-01, TASK-02 aus `analyse-architecture.md`); bei Umsetzung zusammenlegen.

## Ziel

Eine Quelle für die Mindesthöhe, und die Kopplung von `styles.css` an `app-map-page` ist bewusst entschieden.

## Betroffene Dateien

- `web/src/app/shared/venue-map/venue-map.css`, `web/src/app/pages/map/map.css`, `web/src/styles.css`, `web/src/app/app.css`

## Umsetzungsvorschlag

1. Mindesthöhe als Custom Property (`--map-min-height: 24rem`) einmal definieren; `min-height` nur an einer Stelle in `venue-map.css` setzen.
2. **Entscheidung erforderlich** für `main:has(> app-map-page)`: (a) beibehalten (dokumentierte ANNAHME, Browser ab Chrome 105/Firefox 121/Safari 15.4), (b) `padding-bottom` für alle Seiten verschieben (z. B. letztes Kind der Seite), (c) Klasse am `main` über Routen-Daten setzen. Kein Eingriff ohne Entscheidung.
3. Ein Kommentar in `styles.css` und `app.css` verweist gegenseitig auf die Kette.

## Akzeptanzkriterien

- [ ] `24rem` steht im produktiven CSS an genau einer Stelle.
- [ ] Layout-Tests in `app.spec.ts` unverändert grün (Q-USE-10).
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Mittel für Schritt 2 (betrifft den Seitenrahmen aller Seiten), Niedrig für Schritt 1.

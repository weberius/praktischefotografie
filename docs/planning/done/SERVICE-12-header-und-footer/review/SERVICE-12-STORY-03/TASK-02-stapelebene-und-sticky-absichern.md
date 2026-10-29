# TASK-02: Stapelebene isolieren und Sticky-Voraussetzungen absichern

**Priorität:** Low  
**Aufwand:** ~45 min  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-02, ARCH-04  
**ADR-Bezug:** ADR-016, ADR-004  
**Status:** Zurückgestellt (niedrig, begründet in PIPELINE.md)

---

## Problem

`web/src/styles.css:26,28` verwenden `z-index` 1100/1200 als „größer als Leaflet (1000)“. `main` bildet keinen eigenen Stapelkontext. Das Haften (`styles.css:28`) hängt außerdem daran, dass kein Vorfahr `overflow` setzt und der Kopf direktes Kind der Spalte (`app.css:2`) bleibt; das steht nirgends und der Test prüft nur den berechneten `position`-Wert (`app.spec.ts:293-299`).

## Ziel

Leaflet-Ebenen können den Kopf konstruktionsbedingt nicht überdecken; ein späteres `overflow` an einem Vorfahren fällt im Test auf.

## Betroffene Dateien

- `web/src/styles.css`
- `web/src/app/app.css`
- `web/src/app/app.spec.ts`

## Umsetzungsvorschlag

1. `main { isolation: isolate; }` (oder `position: relative; z-index: 0`) setzen, sodass Leaflet-Z-Indizes im Inhaltskontext bleiben. Prüfen, dass Karten-Popups und Steuerelemente auf `/map` weiter bedienbar sind.
2. Z-Ebenen (Inhalt, Kopf, Sprunglink) als benannte CSS-Variablen führen oder in einem Kommentar-Block zusammenstellen.
3. Test ergänzen: nach dem Einfügen eines hohen Füllers und Scrollen liegt `getBoundingClientRect().top` des Kopfs bei 0 (tatsächliches Haften), und keiner der Vorfahren hat `overflow` ungleich `visible`.
4. Kommentar an `:host` (`app.css:2`) zur Sticky-Voraussetzung.

## Akzeptanzkriterien

- [ ] `elementFromPoint` in der Kopfmitte liefert auf `/map` ein Kopf-Element (Playwright-Messung)
- [ ] Test erkennt `overflow` an `html`, `body` oder `app-root`
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien (Kopfbereich bleibt im Vordergrund) weiterhin erfüllt

## Risiko

Niedrig – `isolation` auf `main` kann Popup-Darstellung der Karte beeinflussen; auf `/map` messen.

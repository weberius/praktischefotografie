# TASK-02: Menüfeld an die Fensterhöhe binden und scrollbar machen

**Priorität:** Medium  
**Aufwand:** ~45 min  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-02  
**ADR-Bezug:** ADR-002  
**Status:** Umgesetzt (2026-10-29)

---

## Problem

`.main-nav` (`web/src/styles.css:46`) ist absolut positioniert im haftenden Kopf, ohne `max-height` und ohne `overflow-y`. Mit neun Einträgen (`styles.css:48-49`) ist das Feld rechnerisch etwa 24 bis 27 rem hoch (Schätzung, ungemessen). Bei niedrigen Fenstern (Querformat am Telefon, starker Zoom) ragen untere Links über den Rand und sind nicht erreichbar, weil der Kopf nicht mitscrollt. Q-USE-12 nennt Breiten, aber keine Höhe.

## Ziel

Das geöffnete Menü ist in jeder Fensterhöhe vollständig erreichbar; hohe Listen scrollen innerhalb des Felds.

## Betroffene Dateien

- `web/src/styles.css`
- `web/src/app/app.spec.ts`
- `docs/quality/web/seitenrahmen.md` und `docs/contracts/gherkin/web/seitenrahmen.feature` (Fortschreibung per Supersede, nur falls das Szenario in die Spezifikation aufgenommen wird)

## Umsetzungsvorschlag

1. `.main-nav` um `max-height: calc(100dvh - 100%)`-äquivalent erweitern (z. B. `max-height: calc(100dvh - 4rem)` mit Fallback `100vh`) und `overflow-y: auto` setzen; `overscroll-behavior: contain`.
2. Test mit niedrigem Fenster (kleiner Viewport per `style` am Wrapper oder berechnete `max-height`/`overflow-y`).
3. Q-USE-12 und Gherkin um den Fall „niedrige Fensterhöhe“ ergänzen (Spezifikationsänderung über den Spec-Prozess, nicht in diesem Task).

**Entscheidung erforderlich:** reine `max-height`-Begrenzung (Option a, empfohlen) oder zweispaltige Links ab einer Mindestbreite (Option b, mehr Gestaltungsaufwand).

## Akzeptanzkriterien

- [ ] Bei 320 × 360 Pixeln lässt sich der letzte Link im geöffneten Menü erreichen (scrollen oder Tab)
- [ ] Das Feld ragt nie über den unteren Fensterrand hinaus
- [ ] Verhalten bei hohen Fenstern unverändert
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – reine CSS-Änderung; Wechselwirkung mit dem haftenden Kopf (Story 03) beim Test beachten.

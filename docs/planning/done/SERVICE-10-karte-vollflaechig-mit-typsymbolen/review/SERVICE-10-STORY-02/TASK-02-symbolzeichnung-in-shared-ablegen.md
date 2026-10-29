# TASK-02: Ablage der Symbolzeichnung klären

**Priorität:** Low  
**Aufwand:** ~20 min  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-01  
**ADR-Bezug:** ADR-002 (Verzeichnisstruktur), ADR-016  
**Status:** Zurückgestellt (2026-10-29, Abnahme: unter der Review-Schwelle, betrifft Struktur statt Verhalten; nicht verworfen)

---

## Problem

`web/src/app/core/venue-symbol.ts` (und `venue-symbol.spec.ts`) liefert reine Darstellung (SVG-Markup, Glyphen) und wird nur von `shared/venue-map` und `shared/venue-legend` genutzt. ADR-002 beschreibt `core/` als „Konfiguration, Datenzugriff“ und `shared/` als „Wiederverwendbares“. In `core/` liegen aber bereits fachliche Hilfen (`exhibition-kind.ts`, `exhibition-status.ts`), die Grenze ist unscharf.

## Ziel

Die Ablage ist bewusst entschieden und für neue Darstellungshelfer eindeutig.

## Betroffene Dateien

- `web/src/app/core/venue-symbol.ts`, `web/src/app/core/venue-symbol.spec.ts`
- `web/src/app/shared/venue-map/venue-map.ts`, `web/src/app/shared/venue-legend/venue-legend.ts`, `venue-legend.spec.ts` (Importpfade)

## Umsetzungsvorschlag

**Entscheidung erforderlich:**
- Option A: Dateien nach `web/src/app/shared/venue-symbol/` verschieben, Importe anpassen (klare Schichtung; `shared/` importiert `core/models`).
- Option B: In `core/` belassen und die Regel in ADR-002 („core: auch fachliche Darstellungshelfer wie `exhibition-kind`“) nachtragen.

## Akzeptanzkriterien

- [ ] Entscheidung A oder B getroffen und (bei B) in ADR-002 vermerkt
- [ ] Bei A: keine Verweise auf alte Pfade, Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – nur Verschieben und Importpfade.

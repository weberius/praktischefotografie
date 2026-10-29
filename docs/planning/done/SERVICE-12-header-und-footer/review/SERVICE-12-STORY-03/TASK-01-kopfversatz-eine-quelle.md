# TASK-01: Kopfversatz aus einer Quelle ableiten

**Priorität:** Medium  
**Aufwand:** ~1 h  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-01  
**ADR-Bezug:** ADR-002, ADR-016  
**Status:** Umgesetzt (2026-10-29)

---

## Problem

`web/src/styles.css:30` setzt `scroll-padding-top: 6rem`, `web/src/app/app.config.ts:15` setzt `setOffset([0, 96])`. Gleicher Wert, zwei Einheiten, Verbindung nur per Kommentar. Bei geänderter Kopfhöhe oder Browser-Schriftgröße driftet der Router-Versatz weg von der CSS-Angabe, und FRM-UB-5 wird für Router-Anker verletzt, ohne dass ein Test fehlschlägt.

## Ziel

Der Versatz hat genau eine Quelle.

## Betroffene Dateien

- `web/src/styles.css`
- `web/src/app/app.config.ts`
- `web/src/app/app.spec.ts`

## Umsetzungsvorschlag

**Entscheidung erforderlich:**
- **Option A:** `setOffset` erhält eine Funktion, die `scroll-padding-top` des `documentElement` per `getComputedStyle` liest (Auswertung erst beim Anker-Sprung, folgt `rem`). Vorteil: eine Quelle. Nachteil: ein Stilzugriff je Sprung; Verträglichkeit mit Q-PERF-8 (Formulierung „Skript-Layoutmessung“ betrifft Menü/Laden) an H2 bestätigen.
- **Option B:** Zwei Werte bleiben, ein gemeinsamer Test (TASK-03) erzwingt Gleichheit; zusätzlich die Pixelangabe als `6 * 16` mit Kommentar. Geringerer Eingriff, aber keine Anpassung an Schriftgröße.

Bei Option A: Kommentar in `styles.css:29` und `app.config.ts:14` anpassen; Server-Pfad (kein `window`) absichern.

## Akzeptanzkriterien

- [ ] Eine einzige Wertangabe für den Kopfversatz (oder erzwungene Gleichheit per Test bei Option B)
- [ ] Anker-Sprung bei vergrößerter Basisschrift (z. B. 20 px) legt Inhalt unterhalb der Kopf-Unterkante
- [ ] Prerender/SSR-Build ohne Fehler
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien (Kopfbereich verdeckt keinen Inhalt) weiterhin erfüllt

## Risiko

Niedrig – kleine Änderung; Option A berührt Q-PERF-8-Wortlaut.

# TASK-23: Stapelreihenfolge benennen und Stylesheet ordnen

**Priorität:** Low  
**Aufwand:** ~20 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-03  
**ADR-Bezug:** ADR-016  
**Status:** Zurückgestellt (niedrig, begründet in PIPELINE.md)

---

## Problem

`web/src/styles.css:26,28` und `app.spec.ts:298`: z-index-Literale 1000/1100/1200 ohne gemeinsame Skala; Kommentar zu `.site-header` (`:29`) steht nach der Regel, `html`-Regel (`:30`) trennt Kopf und `.brand`-Regeln (`:31`, `:33`).

## Ziel

Stapelreihenfolge benannt, zusammengehörige Regeln benachbart.

## Betroffene Dateien

- `web/src/styles.css`
- `web/src/app/app.spec.ts`

## Umsetzungsvorschlag

1. Custom Properties (z. B. `--z-leaflet-max: 1000`, `--z-header: 1100`, `--z-skip-link: 1200`) definieren und verwenden; Test liest sie, statt 1000 zu duplizieren.
2. Kommentar vor `.site-header` setzen, `html`-Regel zu den globalen Regeln verschieben, beide `.brand`-Regeln zusammenführen.

## Akzeptanzkriterien

- [ ] Berechnete z-index-Werte unverändert (1100, 1200)
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – reine Umordnung; Kaskade bei Regelverschiebung prüfen.

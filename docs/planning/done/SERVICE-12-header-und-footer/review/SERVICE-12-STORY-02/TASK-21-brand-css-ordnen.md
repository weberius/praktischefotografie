# TASK-21: `.brand`-CSS bündeln, Kommentare korrigieren

**Priorität:** Low  
**Aufwand:** ~15 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-01  
**ADR-Bezug:** ADR-017  
**Status:** Zurückgestellt (niedrig, begründet in PIPELINE.md)

---

## Problem

`.brand` ist in `web/src/styles.css:31` und `:35` auf zwei Regeln verteilt. Der Kommentar „Burger-Menü in allen Fensterbreiten (FRM-UB-1) …“ (Zeile 34) steht über `.brand`-Regel und Media-Queries statt über den Burger-Regeln ab Zeile 39. Der Kommentar in Zeile 32 nennt die ersetzte Anforderung ICO-UB-3. Die Media-Queries nutzen `px`, im Projekt steht sonst `rem`.

## Ziel

Eine `.brand`-Regel mit `line-height`, die Media-Queries direkt dahinter, jeder Kommentar über dem Code, den er beschreibt, Verweis auf ICO-UB-7 statt ICO-UB-3.

## Betroffene Dateien

- `web/src/styles.css`

## Umsetzungsvorschlag

1. `line-height: 1.25` in die Regel in Zeile 31 übernehmen, Zeile 35 löschen.
2. Den Burger-Kommentar vor `.nav-toggle` verschieben.
3. Kommentar zu `.brand-mark` auf „ICO-UB-6, ICO-UB-7“ ändern.
4. Optional Haltepunkte in `rem` umstellen (30 rem, 22,5 rem); Verhalten dabei nicht ändern.

## Akzeptanzkriterien

- [ ] Genau eine `.brand`-Regel außerhalb der Media-Queries
- [ ] Kein Kommentar verweist auf ICO-UB-3 oder ICO-UB-4
- [ ] Kopfhöhe bei 390 und 320 Pixeln unverändert
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – reine Umordnung ohne Änderung der berechneten Stile (bei Umstellung auf `rem` Kopfhöhe nachmessen).

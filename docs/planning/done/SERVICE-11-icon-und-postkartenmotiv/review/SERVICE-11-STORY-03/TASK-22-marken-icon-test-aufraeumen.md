# TASK-22: Testdatei aufräumen: Importe, Kopfkommentar, DIST-Hinweis

**Priorität:** Low  
**Aufwand:** ~15 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-03, CODE-04  
**ADR-Bezug:** –  
**Status:** Umgesetzt (2026-10-29, Prüf-Gate grün, siehe Story-Changelog)

---

## Problem

`test/marken-icon.test.mjs:7` importiert `pngSize` statisch, `:47`, `:134`, `:148` laden `decodePng` aus demselben Modul dynamisch (Tests nur dafür `async`). Der Kopfkommentar `:1` nennt nur ICO-Szenarien. Der Postkarten-Build-Test (`:156–166`) prüft `DIST` (`:58`) ohne Hinweis still nicht, wenn kein Build existiert.

## Ziel

Ein statischer Import, aktueller Kopfkommentar, sichtbarer Hinweis, wenn der Build nicht geprüft wurde.

## Betroffene Dateien

- `test/marken-icon.test.mjs`

## Umsetzungsvorschlag

1. `import { decodePng, pngSize } from './png-helpers.mjs'`; dynamische Imports entfernen, Tests synchron machen.
2. Kopfkommentar um IMG-UB-1, IMG-UB-3, IMG-UB-4, ICO-UB-5 ergänzen.
3. Im Postkarten-Build-Test ohne Build eine Meldung ausgeben (z. B. `t.diagnostic`) oder den Build-Teil als eigenen Test mit `skip` wie `:101` abtrennen.

## Akzeptanzkriterien

- [ ] Kein `await import('./png-helpers.mjs')` mehr
- [ ] Kopfkommentar nennt alle geprüften Anforderungen
- [ ] Fehlender Build wird sichtbar gemeldet
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – reine Testumstrukturierung.

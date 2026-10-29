# TASK-25: CLI-Argumente mit `parseArgs` und einheitlicher Benennung

**Priorität:** Low  
**Aufwand:** ~30 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-06  
**ADR-Bezug:** ADR-017  
**Status:** Zurückgestellt (2026-10-29, Abnahme: Refactoring bzw. Stilfrage ohne Verhaltens- oder Testlücke; nicht verworfen)

---

## Problem

`web/tools/make-icons.mjs:236-238`: handgeschriebenes `arg()`; unbekannte Schalter werden ignoriert (Tippfehler führen zu den Standardpfaden und damit zum Überschreiben echter Dateien), ein Schalter ohne Wert führt zu `resolve(undefined)` und einer unverständlichen Meldung. Benennung `--public` / `publicDir` / `DEFAULTS.public` (9-13) uneinheitlich.

## Ziel

Unbekannte oder unvollständige Schalter werden mit verständlicher Meldung abgelehnt (Q-MAIN-5); eine einheitliche Benennung.

## Betroffene Dateien

- `web/tools/make-icons.mjs`
- `test/make-icons.test.mjs`
- `README.md` (nur falls ein Schalter umbenannt wird)

## Umsetzungsvorschlag

1. `node:util` `parseArgs` mit `strict: true` für `--source`, `--docs`, `--public` verwenden; Fehler in verständliche Meldung (Exit-Code 1) übersetzen.
2. `DEFAULTS.public` zu `publicDir` umbenennen (oder umgekehrt).
3. Test: Aufruf mit `--publik x` und mit `--source` ohne Wert endet mit Exit-Code 1 und deutscher Meldung, ohne Dateien zu schreiben.

## Akzeptanzkriterien

- [ ] Unbekannter Schalter erzeugt eine Fehlermeldung und schreibt nichts
- [ ] Aufruf ohne Schalter verhält sich unverändert
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – kleines Skript, Verhalten ohne Schalter bleibt gleich.

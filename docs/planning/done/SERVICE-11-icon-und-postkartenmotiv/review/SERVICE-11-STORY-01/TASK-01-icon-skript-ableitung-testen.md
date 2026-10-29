# TASK-01: Erfolgspfad der Icon-Ableitung testen und ICO-Bau einzeln prüfen

**Priorität:** Low  
**Aufwand:** ~45 min  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-01  
**ADR-Bezug:** ADR-017  
**Status:** Umgesetzt (2026-10-29, Prüf-Gate grün, siehe Story-Changelog)

---

## Problem

`deriveIcons` (`web/tools/make-icons.mjs:190-209`), `makeAll` (`:212-216`) und die rein in Node laufende Funktion `buildIco` (`:165-186`) werden von keinem Test im Erfolgsfall aufgerufen. `test/make-icons.test.mjs` prüft `cropSource` (Zeilen 33-69) und für `deriveIcons` nur den Fehlerfall ohne Master (Zeile 76). `test/marken-icon.test.mjs` prüft die eingecheckten Ergebnisdateien, nicht das Skript. Ändert jemand das Skript (z. B. Größen, ICO-Header, Skalierungsstufen), fällt das erst beim nächsten manuellen Lauf auf, und die Gherkin-Szenarien „Icon-Dateien aus dem Master“ und „Befehl erzeugt alle Dateien“ (IMG-UB-2, IMG-UB-3) sind für den Erfolgspfad nicht durch einen Skriptlauf belegt.

## Ziel

Der Erfolgspfad des Skripts ist ohne Eingriff in die eingecheckten Dateien automatisch geprüft; die reine ICO-Logik läuft auch ohne Chromium.

## Betroffene Dateien

- `test/make-icons.test.mjs`
- `web/tools/make-icons.mjs` (nur falls `buildIco` in ein eigenes Modul ausgelagert werden soll, optional)

## Umsetzungsvorschlag

1. `buildIco` direkt testen (ohne Browser): drei Dummy-PNG-Puffer, Header (Typ, Anzahl, Größen, Offsets, Längen) prüfen.
2. Test mit `withBrowser`: `makeAll` mit `sampleSource()` in temporären Ordnern (`--docs`/`--public`-Äquivalent) ausführen und prüfen: fünf Dateien in `publicDir` vorhanden, Größen 96/180/192/512 per `pngSize`, ICO mit 16/32/48, Ecken transparent.
3. Optional: Skript einmal als Kindprozess mit `--source/--docs/--public` aufrufen und Exit-Code sowie Ausgabezeile prüfen (deckt das CLI-Argument-Parsing ab).

## Akzeptanzkriterien

- [ ] `buildIco` hat einen Test ohne Chromium.
- [ ] `deriveIcons`/`makeAll` haben einen Erfolgstest in temporären Ordnern; die eingecheckten Dateien bleiben unberührt.
- [ ] Ohne `CHROME_BIN` wird der Browser-Test wie bisher mit Meldung übersprungen.
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – nur Tests; Laufzeit steigt um wenige Sekunden.

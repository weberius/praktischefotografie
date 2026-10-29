# TASK-23: `buildIco` direkt testen, Export und toten Zweig bereinigen

**Priorität:** Low  
**Aufwand:** ~30 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-03  
**ADR-Bezug:** ADR-017  
**Status:** Umgesetzt (2026-10-29, Prüf-Gate grün, siehe Story-Changelog)

---

## Problem

`web/tools/make-icons.mjs:165-186`: `buildIco` ist exportiert, wird aber nur in Zeile 218 genutzt und hat keinen eigenen Test; der Zweig `size >= 256 ? 0 : size` (175-176) ist für 16/32/48 nie erreichbar.

## Ziel

Der ICO-Aufbau ist ohne Chromium getestet (läuft damit auch in der CI); keine ungenutzte Verzweigung.

## Betroffene Dateien

- `web/tools/make-icons.mjs`
- `test/make-icons.test.mjs`

## Umsetzungsvorschlag

1. Test ergänzen: `buildIco` mit zwei Test-PNGs aus `encodePng` aufrufen; Kopf, Verzeichniseinträge, Offsets und Längen prüfen (Gherkin „Favicon enthält drei Größen“).
2. Den Export damit begründen (bleibt) oder, falls kein Test gewünscht ist, entfernen.
3. Den 256-Zweig streichen (oder mit Test belegen, wenn größere Größen erwartet werden).

## Akzeptanzkriterien

- [ ] Test für `buildIco` läuft ohne `CHROME_BIN`
- [ ] Kein ungenutzter Zweig
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – kleine, isolierte Funktion.

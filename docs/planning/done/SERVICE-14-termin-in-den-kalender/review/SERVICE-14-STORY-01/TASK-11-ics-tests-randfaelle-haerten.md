# TASK-11: ICS-Tests: wirkungslose Prüfung ersetzen, Randfälle ergänzen

**Priorität:** Medium  
**Aufwand:** ~45 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-01  
**ADR-Bezug:** ADR-018  
**Status:** Umgesetzt (2026-10-30, Abnahme: Empfehlung)

---

## Problem

`web/src/app/core/ics.spec.ts:37-38`: Die `TextDecoder`-Prüfung kodiert einen JS-String und dekodiert ihn wieder und kann nie fehlschlagen. Es fehlen Fälle für Zeichen außerhalb der BMP, Zeilenumbruch und Länge im Titel, `\;`-Folge, Faltung an der 75-Oktett-Grenze. Die Erwartung der Beschreibung (`ics.spec.ts:75`) nutzt dieselben Ersetzungen wie die Implementierung.

## Ziel

Tests, die die Fehlerklassen aus ICS-UB-4 tatsächlich fangen.

## Betroffene Dateien

- `web/src/app/core/ics.spec.ts`

## Umsetzungsvorschlag

1. Wirkungslose Prüfung entfernen. Stattdessen prüfen, dass kein Fortsetzungsfragment mit U+FFFD oder einem einzelnen Surrogat beginnt/endet und dass entfaltete Zeilen exakt dem erwarteten Literal entsprechen.
2. Fälle ergänzen: Emoji (4 Byte) an der Faltungsgrenze; Zeile mit genau 75 Oktetten (nicht gefaltet) und 76 (gefaltet); Titel mit `\n` und `\r\n`; Titel > 75 Oktett mit Umlauten; Eingabe `a\;b`.
3. Erwartungen als feste Literale schreiben.
4. Einmalig gegenprüfen (nicht committen): Reihenfolge der Ersetzungen vertauschen, Faltung nach UTF-16-Einheiten, Limit 75 statt 74 – jeder Fall muss einen Test rot färben.

## Akzeptanzkriterien

- [ ] Jede der genannten Mutationen färbt mindestens einen Test rot
- [ ] Keine Erwartung wird mit Implementierungsfunktionen berechnet
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – nur Testcode.

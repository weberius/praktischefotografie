# TASK-21: Zeilenumbrüche und Steuerzeichen in .ics-Textwerten neutralisieren

**Priorität:** Medium  
**Aufwand:** ~45 min  
**Quelle:** analyse-security.md  
**Befund-Bezug:** SEC-01  
**ADR-Bezug:** ADR-018  
**Status:** Umgesetzt (2026-10-30, Abnahme: Empfehlung)

---

## Problem

`web/src/app/core/ics.ts:34` (`escapeText`) maskiert nur `\r?\n`. Alleinstehendes `\r`, U+0085, U+2028, U+2029, `\v`, `\f` und weitere C0-Zeichen bleiben im Wert für `SUMMARY`, `LOCATION`, `DESCRIPTION`. Tolerante Parser können darin Zeilenenden sehen und eingeschleuste Properties (`END:VEVENT`, `BEGIN:VALARM`, `URL`) lesen. Die Daten stammen teils aus KI-Extraktion (ADR-006/007).

## Ziel

Kein Textwert kann die Struktur der Kalenderdatei verändern; die erzeugte Datei enthält außer CRLF als Zeilenende keine Zeilenumbruch- oder Steuerzeichen.

## Betroffene Dateien

- `web/src/app/core/ics.ts`

## Umsetzungsvorschlag

1. Vor dem Maskieren C0-Steuerzeichen außer Tab (`\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F`) sowie U+0085, U+2028, U+2029 entfernen oder durch Leerzeichen ersetzen.
2. `\r\n`, `\r` und `\n` einheitlich zu `\\n` maskieren (Backslash weiterhin zuerst).
3. Optional: Schlussprüfung, dass die entfaltete Ausgabe genau je ein `BEGIN:VCALENDAR`/`END:VCALENDAR`/`BEGIN:VEVENT`/`END:VEVENT` enthält.
4. EARS-Anforderung ICS-UB-4 um die Neutralisierung ergänzen (Fortschreibung, kein stilles Überschreiben).

## Akzeptanzkriterien

- [ ] Text mit `\r`, U+2028, U+0085, `\v`, `\f`, `\0` erzeugt eine Datei ohne diese Zeichen.
- [ ] `END:VEVENT` oder `BEGIN:VALARM` im Text erscheint nur als Teil eines maskierten Werts, nie am Zeilenanfang.
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien („Maskierung und Faltung“) weiterhin erfüllt

## Risiko

Niedrig – kleine, reine Funktion; sichtbare Texte ändern sich nur bei Steuerzeichen.

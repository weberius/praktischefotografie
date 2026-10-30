# TASK-22: Injection-Tests für die Kalenderdatei ergänzen

**Priorität:** Medium  
**Aufwand:** ~45 min  
**Quelle:** analyse-security.md  
**Befund-Bezug:** SEC-01, SEC-03  
**ADR-Bezug:** ADR-018  
**Status:** Umgesetzt (2026-10-30, Abnahme: Empfehlung)

---

## Problem

`web/src/app/core/ics.spec.ts:83-87` testet nur `\n`. Es fehlen Fälle mit `END:VEVENT`, `BEGIN:VALARM`, alleinstehendem `\r`, U+2028/U+0085 und Steuerzeichen; `expectValid` (`ics.spec.ts:25`) prüft sie nicht.

## Ziel

Regressionsschutz für die Neutralisierung aus TASK-21 und Nachweis, dass kein Eingabefeld die Dateistruktur ändert.

## Betroffene Dateien

- `web/src/app/core/ics.spec.ts`

## Umsetzungsvorschlag

1. Fixtures für `title`, `description`, `venue.name`, `venue.street` und `city` mit `x\rEND:VEVENT\rBEGIN:VALARM`, `x\r\nEND:VEVENT`, `x\u2028BEGIN:VALARM`, `x\u0085…`, `\u0000`.
2. `expectValid` erweitern: genau ein `BEGIN:VEVENT`/`END:VEVENT`, nur erlaubte Property-Namen am Zeilenanfang der entfalteten Zeilen, kein Zeichen aus `[\r\n\u0085\u2028\u2029\u000B\u000C]` außer als CRLF-Zeilenende.
3. Tests als Szenario zu ICS-UB-4 kennzeichnen.

## Akzeptanzkriterien

- [ ] Tests schlagen vor TASK-21 fehl und bestehen danach.
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – nur Tests.

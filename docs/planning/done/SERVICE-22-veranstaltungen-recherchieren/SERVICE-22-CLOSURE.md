# Closure: SERVICE-22 – Veranstaltungen und Führungen recherchieren

**Datum:** 2026-11-10  ·  **Branch:** feature/SERVICE-22-veranstaltungen-recherchieren (nicht committet)

## Ergebnis
Skill `/research-events` mit `--events`-Modus für `data:fetch|check|report|apply`, Eventtyp `guided_tour` in Schema und Webanwendung, Prüfregeln für Veranstaltungsvorschläge und Bericht je Ort.

## Stories
- STORY-01 Veranstaltungen eines Ortes – umgesetzt (TASK-01 bis -03)
- STORY-02 Aktualisierung aller Orte – umgesetzt (TASK-01)
- STORY-03 Führungen in der Webanwendung – umgesetzt (TASK-01)

## Spezifikation
VRS-UB-1..7, VRS-OP-1, VRS-UN-1/2, VRS-EV-1/2, EVT-UB-6, DAT-UB-8 (ersetzt DAT-UB-7), Q-SEC-12, Q-DATA-17, Q-REL-3, Q-USE-19, ADR-026 (Accepted).

## Prüfung
`npm test` (259), `npm run lint:all`, `npm run build`, `npm run validate:data` grün. H2: Akzeptiert (2026-11-10), alle 9 Annahmen bestätigt.

## Offen / nicht geprüft
- `npm run web:test`: in der Umgebung ohne Chrome nicht ausführbar; bitte lokal/CI laufen lassen.
- Kein Echtlauf des Skills gegen reale Webseiten.
- Review (Phase 7) als Selbstreview ohne Subagents.

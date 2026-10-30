# TASK-08: Uhrzeit-Erkennung von Datumsangaben trennen und Werte abgleichen

**Priorität:** High  
**Aufwand:** ~1 h  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-02  
**ADR-Bezug:** ADR-007  
**Status:** Umgesetzt (2026-10-30, Abnahme: Empfehlung)

---

## Problem

`termine.mjs:24`: `TIME` passt auf `7.11` aus `7.11.2026` (`hasTime('Vernissage am 7.11.2026')` ist `true`). Dadurch ist `proposals.mjs:87` (OPN-UN-1) umgehbar; zudem wird nur das Vorhandensein, nicht die Gleichheit der Uhrzeit geprüft.

## Ziel

Uhrzeiten werden von Datumsangaben unterschieden und die in `description` genannten Zeiten stehen (normalisiert) im Auszug.

## Betroffene Dateien

- `scripts/scrape/lib/termine.mjs`
- `scripts/scrape/lib/proposals.mjs`
- `test/scrape/termine.test.mjs`

## Umsetzungsvorschlag

1. Datumsmuster vor der Uhrzeitsuche entfernen oder `TIME` mit Negativprüfung auf folgendes `.\d` versehen.
2. Uhrzeiten normalisieren (`16:00`, `4pm` zu 16:00, `18 Uhr`) und gegen die Auszug-Zeiten abgleichen; Entscheidung erforderlich: strikt (jede genannte Zeit belegt) oder nur Start belegt.
3. Fixtures: `07.11.2026` ohne Uhrzeit, Beschreibung mit Zeit und Auszug nur mit Punktdatum.

## Akzeptanzkriterien

- [ ] `hasTime('Vernissage am 7.11.2026')` ist `false`
- [ ] Beschreibung mit `16:00` und Auszug `Vernissage 7.11.2026` ergibt „Uhrzeit nicht belegt"
- [ ] Bestehende Fixtures (`16.30`, `4-6pm`, `18 Uhr`) bleiben erkannt
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien (`setup/eroeffnungstermine.feature`) weiterhin erfüllt

## Risiko

Niedrig bis mittel – Zeitformate sind vielfältig; Fixtures vor Änderung erweitern.

**Hinweis:** Überschneidet sich mit TASK-03 (analyse-code.md, CODE-01/02); vor Umsetzung zusammenlegen.

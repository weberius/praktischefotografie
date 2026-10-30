# TASK-04: Dublettenprüfung nach Typ und `checkTermin` ohne Mutation

**Priorität:** Low  
**Aufwand:** ~45 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-03, CODE-06  
**ADR-Bezug:** ADR-007  
**Status:** Zurückgestellt (2026-10-30, niedrig bzw. durch TASK-07/08 abgedeckt)

---

## Problem

Dublettenvergleich nutzt Ort, Titel, `startDate` (`proposals.mjs:176-182`), nicht den Typ (OPN-UB-4). `checkTermin` setzt `record.id` am Eingabeobjekt (`proposals.mjs:81`). `today: date` (`check-proposals.mjs:16`) weicht von „heute“ ab, Default dupliziert `today()`.

## Ziel

Code und OPN-UB-4 stimmen überein; Prüffunktion ohne Nebenwirkung; „heute“ eindeutig.

## Betroffene Dateien

- `scripts/scrape/lib/proposals.mjs`
- `scripts/scrape/check-proposals.mjs`
- `test/scrape/termine.test.mjs`

## Umsetzungsvorschlag

1. Für Terminevents Dublette über `eventType` + `venueId` + `startDate` (+ Ausstellung) prüfen; Test mit abweichendem Titel ergänzen.
2. `checkTermin` gibt die abgeleitete `id` zurück (oder setzt sie nach der Prüfung an der Kopie `change`), statt `record` zu mutieren.
3. **Entscheidung erforderlich:** Soll „heute“ bei `--date` das echte Datum sein oder das Lauf-Datum? Ergebnis in EARS (Begriffsabsatz) festhalten; Default über `today()` aus `common.mjs`.

## Akzeptanzkriterien

- [ ] Vorhandene Vernissage mit anderem Titel am selben Tag und Ort führt zur Dublette
- [ ] Eingabe-Vorschlag wird von `checkProposal` nicht verändert
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – kleine, getestete Funktion.

# TASK-09: Berichtszählung entkoppeln; Veranstalter-Termine entscheiden

**Priorität:** Medium  
**Aufwand:** ~1,5 h  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-03, ARCH-04  
**ADR-Bezug:** ADR-007, ADR-010  
**Status:** Zurückgestellt (2026-10-30, mittel; ARCH-04 braucht Entscheidung zu ADR-010)

---

## Problem

`report.mjs:23` erkennt „vorhanden“ per `/Dublette/` im Freitext (`proposals.mjs:183`); Kollision über `id` (`proposals.mjs:185`) bleibt unerkannt. Veranstalter-Quellen (`report.mjs:12-28`) können nach `proposals.mjs:144-148` keine Events vorschlagen und stehen dauernd „zu prüfen“.

## Ziel

Zählung unabhängig vom Wortlaut; Verhalten für Veranstalter-Quellen entschieden und im Bericht korrekt.

## Betroffene Dateien

- `scripts/scrape/lib/report.mjs`
- `scripts/scrape/lib/proposals.mjs`
- `docs/ears/setup/eroeffnungstermine.md` (nur bei Entscheidung, über Supersede/Ergänzung)
- `test/scrape/termine-bericht.test.mjs`

## Umsetzungsvorschlag

1. Verwerfungen strukturiert kennzeichnen (z. B. zusätzliches Feld `code: "duplicate"|"id-taken"`) und im Bericht dieses Feld statt Regex nutzen; `updates/README.md` ergänzen.
2. **Entscheidung erforderlich (ADR-010 ergänzen oder nicht):** (A) Bericht überspringt Veranstalter-Quellen bzw. kennzeichnet sie „nur manuell (Veranstalter)“; (B) Veranstalter-Websites dürfen Events ihrer Festival-Ausstellungen ergänzen (Änderung von ADR-010 und UPD-UB-6).

## Akzeptanzkriterien

- [ ] Termin mit Kollision der `id` zählt als „vorhanden“ bzw. eigener Grund, nicht als „zu prüfen"
- [ ] Umformulierung des Textes ändert die Zählung nicht
- [ ] Veranstalter-Quellen werden gemäß Entscheidung behandelt
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien (`setup/eroeffnungstermine.feature`) weiterhin erfüllt

## Risiko

Mittel – Format der Vorschlagsdateien wird erweitert (rückwärtskompatibel möglich); Entscheidung B berührt einen akzeptierten ADR.

**Hinweis:** Überschneidet sich teilweise mit TASK-05 (analyse-code.md, CODE-04); vor Umsetzung zusammenlegen.

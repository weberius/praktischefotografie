# TASK-05: Terminart-Tabelle bündeln, Berichtskopplung lösen

**Priorität:** Low  
**Aufwand:** ~45 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-04, CODE-05  
**ADR-Bezug:** ADR-007  
**Status:** Zurückgestellt (2026-10-30, niedrig bzw. durch TASK-07/08 abgedeckt)

---

## Problem

Terminart, Anzeigename und Präfix stehen in `report.mjs:8`, `termine.mjs:23-24` und `proposals.mjs:86`. Der Bericht erkennt vorhandene Termine am Text `/Dublette/` (`report.mjs:20`). Quellen-ID-Reihenfolge weicht ab (`report.mjs:16`), `termineSummary` ist unnötig exportiert.

## Ziel

Eine Quelle der Wahrheit je Terminart; Bericht unabhängig vom Meldungswortlaut.

## Betroffene Dateien

- `scripts/scrape/lib/termine.mjs`
- `scripts/scrape/lib/proposals.mjs`
- `scripts/scrape/lib/report.mjs`
- `test/scrape/termine-bericht.test.mjs`

## Umsetzungsvorschlag

1. In `termine.mjs` eine Tabelle `TERMIN_ARTEN` (Schlüssel, Label, Präfix, ID-Suffix, Stichwort) führen und in Prüfung und Bericht nutzen.
2. Verwerfungsgrund „Dublette“ als exportierte Konstante oder Feld `reasonCode` führen; Bericht vergleicht dagegen.
3. Quellen-ID einheitlich ermitteln (Hilfsfunktion in `common.mjs`); `termineSummary` nicht exportieren.
4. `needle`-Ausdruck in `proposals.mjs:167` entflechten.

## Akzeptanzkriterien

- [ ] Umbenennung des Dublettentexts lässt Berichtstests grün
- [ ] Keine doppelten Literale „Eröffnung“/„Finissage“ für Art-Zuordnung
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – reine Umstrukturierung mit vorhandenen Tests.

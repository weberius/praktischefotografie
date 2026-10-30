# TASK-03: Beleg-Prüfung für Datum und Uhrzeit schärfen

**Priorität:** Medium  
**Aufwand:** ~1–2 h  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-01, CODE-02  
**ADR-Bezug:** ADR-007  
**Status:** Zurückgestellt (2026-10-30, durch TASK-07/08 abgedeckt)

---

## Problem

`hasHint` (`termine.mjs:42-51`) und `checkTermin` (`proposals.mjs:84-86`) prüfen nur, dass im Textauszug irgendein Datum bzw. irgendeine Uhrzeit steht, nicht dass sie zu `startDate` bzw. zur `description` passen. `TIME` (`termine.mjs:28`) erkennt `07.11.2026` als Uhrzeit.

## Ziel

Die Meldungen „belegt“ halten, was sie versprechen, und Datumsangaben zählen nicht als Uhrzeit.

## Betroffene Dateien

- `scripts/scrape/lib/termine.mjs`
- `scripts/scrape/lib/proposals.mjs`
- `test/scrape/termine.test.mjs`

## Umsetzungsvorschlag

1. `TIME` so einschränken, dass `dd.mm.` und `dd.mm.yyyy` nicht passen (z. B. Punktvariante nur mit `Uhr` oder ohne folgenden Punkt/Ziffern).
2. Negativfälle in den Fixture-Test aufnehmen (`07.11.2026`, `7.11.`).
3. **Entscheidung erforderlich:** (a) Datum des Hinweises im Textauszug parsen (DE und EN) und mit `startDate` vergleichen, Uhrzeiten wertmäßig vergleichen; oder (b) bei der Heuristik bleiben und Meldungen/Testnamen ehrlich als „Stichwort mit Datum“ bzw. „Uhrzeit vorhanden“ formulieren und in OPN-UN-1 festhalten. Anwesenheit (OPN-UB-2) ebenfalls einordnen.

## Akzeptanzkriterien

- [ ] `hasTime("Eröffnung am 07.11.2026")` ist `false`
- [ ] Gewählte Variante (a oder b) ist in EARS/Quality und Tests abgebildet
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Mittel – Variante (a) kann gültige Vorschläge verwerfen (Formatvielfalt); Variante (b) ändert nur Wortlaut.

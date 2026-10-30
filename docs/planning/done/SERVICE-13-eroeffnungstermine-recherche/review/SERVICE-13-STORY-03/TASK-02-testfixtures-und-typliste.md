# TASK-02: Fixtures und Typliste in Tests vereinheitlichen

**Priorität:** Low  
**Aufwand:** ~30 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-03, CODE-04  
**ADR-Bezug:** –  
**Status:** Zurückgestellt (2026-10-30, niedrig bzw. durch TASK-07/08 abgedeckt)

---

## Problem

- `event-list.spec.ts:78-82`: lokale Fixtures statt `test-data.ts` (Abweichung von STORY-03-TASK-01, undokumentiert).
- `event-list.ts:45`: Meta-Text zählt Typen von Hand auf, ungetestet.
- `test/event-typ.test.mjs:9`: Typliste als Literal, nicht aus `schema/events.schema.json` gelesen.

## Ziel

Eine Quelle der Wahrheit pro Liste; Abweichungen vom Plan sind dokumentiert.

## Betroffene Dateien

- `web/src/app/testing/test-data.ts`
- `web/src/app/pages/event-list/event-list.spec.ts`
- `web/src/app/pages/event-list/event-list.ts`
- `test/event-typ.test.mjs`

## Umsetzungsvorschlag

1. **Entscheidung erforderlich:** Fixtures nach `test-data.ts` verschieben (andere Specs müssen dann Listen/Anzahlen anpassen, z. B. `event-list.spec.ts:26`) oder lokale Fixtures behalten und die Abweichung im Story-Changelog begründen.
2. `event-typ.test.mjs`: Werte aus `schema/events.schema.json` lesen und gegen die erwartete Liste (mit `finissage`) vergleichen, damit ein neuer Wert auffällt.
3. Optional: Meta-Text kürzen („Messen, Talks, Workshops und weitere Events …“), statt Typen aufzuzählen.

## Akzeptanzkriterien

- [ ] Kein Test hängt implizit an einer Reihenfolge, die er nicht selbst aufbaut
- [ ] Neuer Schema-Wert lässt `event-typ.test.mjs` fehlschlagen, bis er bewusst ergänzt ist
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – Änderung an Testdaten kann Zählungen in anderen Specs verschieben (Entscheidung zu 1 beachten).

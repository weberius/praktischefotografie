# TASK-03: Zurück-Link-Tests auf Verhalten (Klick, Verdrahtung) umstellen

**Priorität:** Medium  
**Aufwand:** ~1 h  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-03  
**ADR-Bezug:** ADR-022  
**Status:** Umgesetzt

---

## Problem

`back-link.spec.ts:47-58` prüft nur das `href`; das Gherkin-Szenario verlangt, dass der gewählte Link die vorherige Seite anzeigt. Zyklus, Wechsel zwischen Seiten desselben Typs und die App-Verdrahtung (siehe TASK-01) sind ungeprüft; `compareDocumentPosition` in Zeile 43 ist schwer lesbar.

## Ziel

Die Tests bilden „Wenn der Zurück-Link gewählt wird, dann zeigt die Anwendung …“ ab und scheitern, wenn der Dienst nicht beim Start verdrahtet ist.

## Betroffene Dateien

- `web/src/app/shared/back-link/back-link.spec.ts`

## Umsetzungsvorschlag

1. Link anklicken, erreichte Adresse über `Router.url` prüfen.
2. Fälle ergänzen: Zyklus A → B → Zurück; zwei Detailseiten desselben Typs nacheinander.
3. Den Dienst über die produktive Initialisierung (aus TASK-01) statt `TestBed.inject` bereitstellen.
4. Positionsprüfung in einen benannten Hilfsausdruck auslagern.

## Akzeptanzkriterien

- [ ] Test klickt den Link und prüft die Zieladresse
- [ ] Test schlägt fehl, wenn `NavHistory` nicht beim Start angefordert wird
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – nur Testcode; abhängig von TASK-01.

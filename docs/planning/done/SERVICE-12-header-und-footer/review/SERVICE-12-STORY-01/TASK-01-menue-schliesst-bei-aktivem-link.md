# TASK-01: Menü schließt auch bei Wahl des Links der aktuellen Seite

**Priorität:** Medium  
**Aufwand:** ~45 min  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-01  
**ADR-Bezug:** ADR-002  
**Status:** Umgesetzt (2026-10-29)

---

## Problem

`web/src/app/app.ts:21` schließt das Menü nur bei `NavigationEnd`. Wählt jemand im geöffneten Menü den Link der aktuellen Adresse, überspringt der Router die Navigation (kein `NavigationEnd`), das Menü bleibt offen und der Fokus liegt auf einem unsichtbar gewordenen oder weiter sichtbaren Link. Das widerspricht FRM-EV-2 (Annahme aus dem Router-Verhalten, im Browser zu bestätigen). Der Test in `app.spec.ts` deckt nur den Wechsel auf `/calendar` ab.

## Ziel

Jede Wahl eines Menülinks schließt das Menü, unabhängig davon, ob die Adresse wechselt. Das Schließen läuft über eine gemeinsame Methode.

## Betroffene Dateien

- `web/src/app/app.ts`
- `web/src/app/app.html`
- `web/src/app/app.spec.ts`

## Umsetzungsvorschlag

1. Methode `closeMenu()` einführen; `onEscape`, die Router-Subscription und der neue Pfad nutzen sie.
2. Zusätzlich schließen, wenn ein Menülink gewählt wird: `(click)="closeMenu()"` an der `nav` (Event-Delegation) oder `NavigationSkipped` im Router-Filter.
3. Für das Fokusziel nach der Linkwahl entscheiden (bleibt auf `body` oder wird `main` fokussiert, wie beim Seitenwechsel).
4. Test: Menü öffnen, Link der aktuellen Adresse wählen, Menü ist zu.

**Entscheidung erforderlich:** `click`-Handler (einfach, unabhängig vom Router) oder `NavigationSkipped` (näher an der Router-Semantik; deckt Tastaturaktivierung ebenfalls ab).

## Akzeptanzkriterien

- [ ] Wahl des Links der aktuellen Seite schließt das Menü und setzt `aria-expanded` auf `false`
- [ ] Wechsel auf eine andere Seite und Escape verhalten sich unverändert
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt (`web/seitenrahmen.feature` · „Menü schließt nach der Auswahl“)

## Risiko

Niedrig – kleine Änderung im Rahmen, durch bestehende Tests abgesichert.

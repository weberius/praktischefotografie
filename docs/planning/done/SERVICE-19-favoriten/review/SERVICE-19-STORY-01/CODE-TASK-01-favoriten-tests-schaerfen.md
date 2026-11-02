# CODE-TASK-01: Favoriten-Tests an Verhalten und Qualitätsmaße binden

**Priorität:** Medium  
**Aufwand:** ~1,5 h  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-02  
**ADR-Bezug:** ADR-023  
**Status:** Umgesetzt

---

## Problem

`web/src/app/shared/favorite-toggle/favorite-toggle.spec.ts:24` findet den Umschalter über ein Textfragment des versteckten Textes (`: Titel`). Die Datei prüft auch die Eventliste (Zeile 85-106) und mischt Komponenten- und Seitenverhalten. Zeile 90 (`expect(await settle(harness)).toBe(el)`) ist ohne Zweck lesbar. Q-USE-17 (Tastatur, Tab-Reihenfolge) und Q-SEC-10 (XHR, IndexedDB) sind nicht abgedeckt; die Ausstellung in der Agenda wird nicht ausdrücklich als „ohne Umschalter“ geprüft (Zeile 36-37).

## Ziel

Tests, die den zugänglichen Namen und das beobachtbare Verhalten prüfen, Komponente und Eventliste getrennt halten und die Maße aus Q-USE-17 und Q-SEC-10 im Rahmen der Komponententests belegen.

## Betroffene Dateien

- `web/src/app/shared/favorite-toggle/favorite-toggle.spec.ts`
- `web/src/app/pages/event-list/` (neue oder bestehende Spec für „Nur Favoriten“)

## Umsetzungsvorschlag

1. Umschalter über den zugänglichen Namen oder eine gemeinsame, benannte Hilfsfunktion ansprechen, die nicht vom Format des versteckten Textes abhängt.
2. Komponententest für `FavoriteToggle` isoliert (Attribute, `aria-pressed`, Namen, Tastaturbedienung); Seitentests für Liste, Detail und Agenda getrennt.
3. Filterszenarien („Eventliste nur mit Favoriten“, „Keine Favoriten“) in die Spec der Eventliste verschieben; den Zweck von Zeile 90 benennen oder entfernen.
4. In der Agenda ausdrücklich prüfen, dass die Ausstellung keinen Umschalter hat.
5. Test zu Q-SEC-10 um XHR und IndexedDB erweitern oder die Abweichung als nicht prüfbar vermerken (Abstimmung mit `tools/quality`).

## Akzeptanzkriterien

- [ ] Kein Test hängt an `textContent.includes(': …')`
- [ ] Szenario „Umschalter auf Liste, Detail und Agenda“ prüft das Fehlen des Umschalters bei der Ausstellung
- [ ] Tastaturbedienung (Enter, Leertaste) des Umschalters ist geprüft
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien (`web/favoriten.feature`) weiterhin erfüllt

## Risiko

Niedrig – reine Testumstrukturierung.

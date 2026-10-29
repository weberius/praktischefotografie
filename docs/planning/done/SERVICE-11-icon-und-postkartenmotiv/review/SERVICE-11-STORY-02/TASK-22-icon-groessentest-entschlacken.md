# TASK-22: Größentest des Kopf-Icons entschlacken

**Priorität:** Low  
**Aufwand:** ~20 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-03  
**ADR-Bezug:** ADR-017  
**Status:** Zurückgestellt (2026-10-29, Abnahme: Refactoring bzw. Stilfrage ohne Verhaltens- oder Testlücke; nicht verworfen)

---

## Problem

Der Test zu ICO-UB-6 (`web/src/app/app.spec.ts:183-198`) schaltet zum Messen `img.style.display` um, nutzt die unerklärte Schwelle `8` und prüft zusätzlich `loading` (Zeile 197), was weder in ICO-UB-6 noch im Gherkin steht.

## Ziel

Der Test belegt genau ICO-UB-6 nachvollziehbar: feste Attribute und gemessene Darstellungsgröße; die Schwelle ist benannt oder entfällt; die Prüfung „kein lazy“ steht in einem eigenen, auf ADR-017 verweisenden Test.

## Betroffene Dateien

- `web/src/app/app.spec.ts`

## Umsetzungsvorschlag

1. `loading`-Prüfung in einen eigenen `it` mit Hinweis auf ADR-017 verschieben.
2. Schwelle als benannte Konstante mit Herleitung (Icon 32 px gegen Textzeile) oder stattdessen prüfen, dass die Kopfzeile ihre Höhe nach dem Entfernen des Icons nicht ändert, wenn die Navigation nicht umbricht; Alternative: Höhe des `.brand`-Links mit der Höhe des Icons vergleichen.
3. DOM-Umschaltung nur beibehalten, wenn sie nach Schritt 2 nötig ist, dann in `try/finally`.

## Akzeptanzkriterien

- [ ] Jeder `it` im Icon-Block prüft ein Verhalten.
- [ ] Keine unerklärte Zahl im Messtest.
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – nur Testcode; Messtests sind abhängig vom Testfenster, daher nach Umbau mehrfach laufen lassen.

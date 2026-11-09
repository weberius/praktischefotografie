# TASK-04: EARS-Annahme, Stand und Gherkin-Tabelle bereinigen

**Priorität:** Low  
**Aufwand:** ~10 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-02, CODE-04  
**ADR-Bezug:** –  
**Status:** Vorgeschlagen

---

## Problem

`docs/ears/content/venue-erfassung.md:15` enthält eine überholte ANNAHME, Z. 3 einen veralteten Stand. `docs/contracts/gherkin/content/daten.feature:104-106` ist nicht ausgerichtet.

## Ziel

Normative Dokumente geben den gültigen Stand wieder; die Tabelle ist sauber formatiert.

## Betroffene Dateien

- `docs/ears/content/venue-erfassung.md`
- `docs/contracts/gherkin/content/daten.feature`

## Umsetzungsvorschlag

1. ANNAHME auf die verbleibende Aussage kürzen (Typ als Lesart) oder nach Abnahme an H2 entfernen.
2. `Stand` auf das Änderungsdatum setzen.
3. Spalten der Beispieltabelle ausrichten.

## Akzeptanzkriterien

- [ ] Keine überholte ANNAHME mehr
- [ ] Tabelle ausgerichtet
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – nur Dokumentation.

# TASK-05: Quell-URL Kunstmuseum Bonn prüfen

**Priorität:** Low  
**Aufwand:** ~10 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-03  
**ADR-Bezug:** ADR-006  
**Status:** Vorgeschlagen

---

## Problem

`data/venues.json:598` verweist auf eine Einzelausstellung, die zeitlich begrenzt ist.

## Ziel

Eine Fundstelle, die Venue-Daten dauerhaft belegt.

## Betroffene Dateien

- `data/venues.json`

## Umsetzungsvorschlag

**Entscheidung erforderlich:** (a) Ausstellungsübersicht des Museums als `source.url`, (b) Startseite, (c) Einzelausstellung beibehalten, weil sie den Fotografiebezug belegt. Danach `checkedAt` bei Änderung neu setzen.

## Akzeptanzkriterien

- [ ] Entscheidung dokumentiert
- [ ] Datenvalidierung und Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – ein Feld.

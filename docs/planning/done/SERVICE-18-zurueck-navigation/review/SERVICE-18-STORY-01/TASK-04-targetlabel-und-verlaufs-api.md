# TASK-04: `targetLabel` lesbar machen und Verlaufs-API vereinfachen

**Priorität:** Low  
**Aufwand:** ~30 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-04 (Lesbarkeit), CODE-05  
**ADR-Bezug:** ADR-022  
**Status:** Umgesetzt

---

## Problem

`targetLabel` (`back-link.ts:28-32`) mischt `??`, Ternär und zweimaliges `split` in einem Ausdruck; `startsWith('/calendar')` trifft auch `/calendarxyz`. `NavHistory` bietet zwei Wege zur selben Information (`nav-history.ts:21-28`, `previous()` und `previousPath()`). Die Tabellen-Duplikation selbst behandelt TASK-02. Vorherige Seiten wie `/impressum` heißen nur „vorherige Seite“ (NAV-UB-9: Name nennt das Ziel).

## Ziel

Lesbare Auflösung des Ziels, eine Verlaufs-Methode.

## Betroffene Dateien

- `web/src/app/shared/back-link/back-link.ts`
- `web/src/app/core/nav-history.ts`

## Umsetzungsvorschlag

1. Nach TASK-02 `targetLabel` in einfache Schritte aufteilen, Segmentvergleich statt `startsWith`.
2. `previous()` und `previousPath()` zusammenführen (z. B. UrlTree liefert den Pfad).
3. **Entscheidung erforderlich:** Beschriftung für rechtliche Seiten und Hinweisseite – „vorherige Seite“ (Ist) oder benanntes Ziel (NAV-UB-9 wörtlich); ggf. Spezifikationsfrage, nicht hier entscheiden.

## Akzeptanzkriterien

- [ ] `/calendarxyz` wird nicht als Kalender benannt
- [ ] Nur eine Methode für die vorherige Seite
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – lokal; berührt dieselbe Datei wie TASK-02 und TASK-01 (Reihenfolge abstimmen).

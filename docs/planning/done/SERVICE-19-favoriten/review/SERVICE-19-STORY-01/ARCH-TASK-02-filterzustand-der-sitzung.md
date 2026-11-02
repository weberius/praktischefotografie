# TASK-02: Ort des Filterzustands „Nur Favoriten“ entscheiden

**Priorität:** Medium  
**Aufwand:** ~1,5 h  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-02  
**ADR-Bezug:** ADR-023, ADR-022  
**Status:** Umgesetzt

---

## Problem

`web/src/app/pages/event-list/event-list.ts:23` hält `onlyFavorites` als Seitenzustand. Nach „Nur Favoriten“ → Eventdetail → Zurück-Link (ADR-022) startet die Liste wieder ungefiltert, während der Typfilter als Query-Parameter erhalten bleibt (`event-list.ts:34-37,54-56`). Kein Gherkin-Szenario beschreibt das Verhalten.

## Ziel

Das Verhalten beim Zurückkehren ist entschieden, spezifiziert und getestet.

## Betroffene Dateien

- `web/src/app/core/favorites.ts` (nur Option A)
- `web/src/app/pages/event-list/event-list.ts`, `event-list.html`
- `docs/ears/web/favoriten.md`, `docs/contracts/gherkin/web/favoriten.feature`
- `docs/architecture/ADR-023-favoriten-im-speicher-der-sitzung.md` (bei Option A oder B)

## Umsetzungsvorschlag

**Entscheidung erforderlich:**
- *Option A:* Filterzustand als Signal im Wurzeldienst (`Favorites` oder kleiner Filter-Dienst); bleibt im Speicher, ADR-023 konform, ggf. um einen Satz ergänzen.
- *Option B:* Query-Parameter `favorites=1`; einheitlich mit `type`, aber ADR-023 schließt URL-Parameter aus (ADR-Änderung per Supersede nötig).
- *Option C:* Verhalten belassen und in EARS/Gherkin als „Filter gilt nur für die Ansicht“ festhalten.

## Akzeptanzkriterien

- [ ] Verhalten „Liste → Detail → Zurück“ mit aktivem „Nur Favoriten“ ist in EARS und Gherkin beschrieben
- [ ] Test deckt das Szenario ab (Option A/B: Filter bleibt, Option C: Filter ist zurückgesetzt)
- [ ] Neuladen setzt den Filter zurück (FAV-UB-3)
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – lokale Änderung; Option B berührt ADR-023 und die Idee „Filter“ (idee-011).

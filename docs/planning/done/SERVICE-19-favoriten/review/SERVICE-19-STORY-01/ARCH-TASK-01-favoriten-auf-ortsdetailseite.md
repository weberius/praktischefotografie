# TASK-01: Favoriten auf der Ortsdetailseite klären

**Priorität:** Medium  
**Aufwand:** ~1 h  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-01  
**ADR-Bezug:** ADR-023  
**Status:** Umgesetzt

---

## Problem

`web/src/app/pages/venue-detail/venue-detail.html:45-51` listet Events ohne Umschalter und ohne Zustandsanzeige. FAV-UB-2 (`docs/ears/web/favoriten.md`) verlangt den einheitlichen Zustand „auf allen Seiten, die das Event zeigen“, FAV-UB-1 nennt nur Liste, Detail und Agenda. Ein markiertes Event erscheint auf `/venues/:id` scheinbar unmarkiert.

## Ziel

Spezifikation und Umsetzung widersprechen sich nicht mehr.

## Betroffene Dateien

- `docs/ears/web/favoriten.md`
- `docs/contracts/gherkin/web/favoriten.feature`
- `docs/architecture/ADR-023-favoriten-im-speicher-der-sitzung.md` (nur bei Option A, Abschnitte „Entscheidung“, „Auswirkungen“)
- `web/src/app/pages/venue-detail/venue-detail.html`, `venue-detail.ts` (nur bei Option A)

## Umsetzungsvorschlag

**Entscheidung erforderlich:**
- *Option A:* `app-favorite-toggle` auch auf der Ortsdetailseite einbinden, FAV-UB-1 und Gherkin-Beispiele um `/venues/:id` ergänzen (per Supersede, Q-USE-17 prüft dann vier Seiten).
- *Option B:* Umschalter bleiben auf drei Seiten; FAV-UB-2 auf „Seiten mit Umschalter“ präzisieren (per Supersede) und die Lücke bewusst festhalten.

## Akzeptanzkriterien

- [ ] EARS FAV-UB-1 und FAV-UB-2 nennen dieselben Seiten
- [ ] Bei Option A: Test „Zustand gilt über Seiten hinweg“ umfasst `/venues/:id`
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – kleine Änderung; bei Option A zusätzlicher axe-Lauf auf der Ortsdetailseite.

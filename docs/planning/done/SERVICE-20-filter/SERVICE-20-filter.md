# SERVICE-20 – Globaler Filter

**Status:** Entwurf (Intake)  ·  **Quelle:** Idee [`idee-011-filter`](../../../product/ideen/idee-011-filter.md)

> „Analog zu Klangland (https://weberius.github.io/klangland/, bzw. https://github.com/weberius/klangland) soll ein Filter realisiert werden. Wie bei Klangland auch, soll dieser Filter für die gesamte Webapplikation gelten. Es gibt bereits einen Filter bei Orten und Karte. Diese Filter werden damit obsolet. Ziel des Filters soll es sein, dass ich die Ansicht z.B. auf bestimmte Orte einschränken kann und/ doer auf bestimmte Typen. Eine Filterung auf Festival oder Veranstalter:in ist zunächst nicht notwendig“

## Ziel
Besucher:innen schränken die gesamte Anwendung auf bestimmte Orte und/oder Ortstypen ein. Der Filter gilt seitenübergreifend und löst die Filter von Orten und Karte ab.

**Zweck in einem Satz:** Besucher:innen sehen nur, was zu den Orten und Ortstypen passt, die sie interessieren, ohne dies auf jeder Seite neu einzustellen.

**Erfolgskriterien**
- Ein Filter mit „Ort“ und „Ortstyp“ (Mehrfachauswahl) wirkt auf Karte, Ortsverzeichnis, Agenda, Ausstellungs- und Eventliste.
- Der Zustand bleibt beim Seitenwechsel erhalten; Zurücksetzen ist überall möglich.
- Die alten Filter auf Orten und Karte sind entfernt.

## Kontext
Klangland (nicht lokal verfügbar) hat einen globalen Filter. Hier haben Karte (MAP-UB-2) und Ortsverzeichnis (VNU-UB-2) eigene Filter (Stadt, Typ, Präsenzbibliothek, Ständige Sammlung); Events, Ausstellungen und Agenda haben nur lokale Filter (EVT-UB-2, EXH-UB-3, FAV-UB-4). Events und Ausstellungen verweisen über `venueId` auf einen Ort, der einen Typ trägt. Die Anwendung ist eine statische SPA (ADR-002); Favoriten zeigen das Muster „Wurzeldienst im Speicher“ (ADR-023).

## Story-Schnitt
1. `STORY-01` Globaler Filter nach Ort und Ortstyp (ein Wunsch, eine Story; das Entfernen der alten Filter gehört dazu)

## Abgrenzung
**Nicht enthalten:** Filter nach Festival oder Veranstalter:in (bleiben als Query-Parameter), Persistenz (`localStorage`, `sessionStorage`, Cookie), Filter auf Detailseiten, Fotograf:innen, Festivals, Veranstalter:innen und Magazin, Filter nach Stadt, Präsenzbibliothek und Ständiger Sammlung, teilbare Filteradressen, Änderung des Klangland-Repositories.

## Betroffene Bereiche
`web` (Filterdienst, gemeinsame Filterkomponente, `venue-filter.ts`, `venue-list`, `map`, `calendar`, `exhibition-list`, `event-list`), Spezifikation `web/filter`, Supersede in `web/karte` und `web/orte`, ADR-025 (Proposed).

## Vorbereitete Spezifikation (Phase 3)
- EARS: `web/filter.md` (FLT-UB-1 bis FLT-UB-7, FLT-ST-1, FLT-UN-1); Supersede VNU-UB-2, MAP-UB-2, MAP-UB-4, MAP-EV-1, MAP-UN-1, MAP-UB-8 (neu MAP-UB-14, MAP-UB-15)
- Gherkin: `web/filter.feature` (9 Szenarien); Entfall-Vermerke in `web/karte.feature`, `web/orte.feature`
- Quality: `web/filter.md` (Q-USE-18, Q-SEC-11)
- ADR: ADR-025 (Proposed); geltend ADR-002, ADR-016, ADR-023; ADR-004 teilweise ersetzt

## Annahmen
- ANNAHME: „Typen“ sind die Ortstypen (`museum`, `gallery`, `foundation`, `off_space`, `library_archive`); Events und Ausstellungen werden über ihren Ort gefiltert, nicht nach Eventtyp (der bleibt lokaler Filter).
- ANNAHME: „Orte“ und „Typen“ sind Mehrfachauswahlen; Dimensionen wirken per UND, innerhalb per ODER.
- ANNAHME: Der Filter gilt auf Karte, Ortsverzeichnis, Agenda, Ausstellungsliste und Eventliste, nicht auf Detailseiten und anderen Listen.
- ANNAHME: Die Bedienung sitzt auf den fünf Seiten (gemeinsame Komponente), nicht im Seitenkopf (Karte ist vollflächig, ADR-016).
- ANNAHME: Zustand nur im Speicher (wie Favoriten, ADR-023), nicht in der Adresse; Karten-URLs mit Filter sind nicht mehr teilbar. Alte Parameter `city`, `type`, `library`, `collection` werden ignoriert.
- ANNAHME: Die Filter Stadt, Präsenzbibliothek und Ständige Sammlung entfallen, weil die Idee die alten Filter „obsolet“ nennt.
- ANNAHME: Festival-/Veranstalterfilter per Query bleiben unverändert (Idee: „zunächst nicht notwendig“).
- ANNAHME: Events und Ausstellungen ohne bekannten Ort werden bei gesetztem Filter ausgeblendet.
- ANNAHME: Der globale Filter wirkt zusätzlich zu lokalen Filtern (Eventtyp, Status, Nur Favoriten) per UND.
- ANNAHME: Klangland war nicht einsehbar; Aussehen und Bedienung sind eigene Lesart.
- ANNAHME: Es gibt keine weitere offene Idee; `SERVICE-19` ist committet (`35f258b`, `591ff65`), der Branch geht von `main` aus.

## Qualitätserwartungen
Q-USE-18, Q-SEC-11; zusätzlich Q-USE-2, Q-USE-3, Q-USE-4, Q-USE-9, Q-USE-10.

## Definition of Done
- Spezifikation konsistent; ADR-025 an H2 bestätigt.
- Alte Filter aus Code und Tests entfernt; Szenarien aus `filter.feature` als Tests umgesetzt.
- Build, `npm test`, `npm run web:test`, `npm run lint:all` grün.

## Risiken
- Die Karte ist vollflächig (ADR-016); die Filterbedienung darf Karte und Bedienelemente (Q-USE-9, Q-USE-10) nicht verdecken.
- Ein global gesetzter Filter kann Seiten unbemerkt leeren; Hinweis und aktive Anzeige sind Pflicht (FLT-ST-1, FLT-UB-4).
- Wegfall teilbarer Filteradressen und der Filter Stadt, Präsenzbibliothek, Sammlung ist ein Funktionsverlust (an H1 bestätigen).
- Vorgerendertes HTML und Hydration: Der Zustand ist beim Laden leer.

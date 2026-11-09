# SERVICE-21 – Neue Venues

**Status:** Entwurf (Intake)  ·  **Quelle:** Idee [`idee-012-neue-venues`](../../../product/ideen/idee-012-neue-venues.md)

> „Ich habe zwei neue Venues, die berücksichtigt werden müssten. Diese neuen Venues müssen in der Katalog der bestehenden Venues übernommen werden.
> Forum für Fotografie – https://de.forum-fotografie.info/
> Kunstmuseum Bonn – https://de.forum-fotografie.info/“ (URL laut Mensch: `https://www.kunstmuseum-bonn.de/`)

## Ziel
Das Forum für Fotografie (Köln) und das Kunstmuseum Bonn sind als Orte im Katalog (`data/venues.json`) erfasst und erscheinen in der Webanwendung wie die übrigen Orte.

**Zweck in einem Satz:** Besucher:innen finden zwei weitere relevante Fotografie-Orte in NRW.

**Erfolgskriterien**
- Beide Venues sind mit Anschrift, Typ, Website, Besonderheiten und Herkunft (`source`) erfasst.
- Die Datenvalidierung und alle Tests bleiben grün; der Bestand liegt weiter im Rahmen von VEN-UB-1 (22 + 2 = 24).

## Kontext
Der Katalog hat 22 Venues (Modell: ADR-001, Schema `venues`). Ortsseiten, Karte, Filter und Magazin lesen daraus. Das Forum für Fotografie Köln ist laut Website (Schönhauser Str. 8, 50968 Köln) bereits als Ausstellungsort mit Ausstellungen ausgewiesen; es ist nicht zu verwechseln mit dem Fotografie-Forum Monschau (`fotografie-forum-monschau`).

## Story-Schnitt
1. `STORY-01` Forum für Fotografie Köln als Venue
2. `STORY-02` Kunstmuseum Bonn als Venue

## Abgrenzung
**Nicht enthalten:** Ausstellungen, Events und Neuigkeiten der beiden Orte (laufen über `/update-venue-data`), neue Felder oder Schemaänderungen, Änderungen an Webanwendung, Karte und Filter, Freigaben für Weiterleitungen (ADR-021), Fotograf:innen-Profile.

## Betroffene Bereiche
`data` (`data/venues.json`), Spezifikation `content/venue-erfassung`, `content/daten.feature`; ggf. bestehende Bestandstests.

## Vorbereitete Spezifikation (Phase 3)
- EARS: `content/venue-erfassung.md` (VEN-UB-6, VEN-UB-7)
- Gherkin: `content/daten.feature` („Neue Venues sind im Katalog“)
- Quality: Q-DATA-1, Q-DATA-2 (bestehend, ausreichend); keine neue Q-ID
- ADR: nicht erforderlich – reine Datenerfassung im bestehenden Modell; geltend ADR-001, ADR-006

## Klärungen (durch den Menschen bestätigt, 2026-11-09)
- Die Website des Kunstmuseums Bonn ist `https://www.kunstmuseum-bonn.de/` (die URL in der Idee war ein Kopierfehler).
- „Forum für Fotografie“ ist das Forum für Fotografie Köln, nicht das Fotografie-Forum Monschau.
- IDs `forum-fuer-fotografie-koeln` und `kunstmuseum-bonn` sind bestätigt.
- Fotografiebezug des Kunstmuseums Bonn: Dort finden Fotoausstellungen statt (Beleg: Vernissage „Herlinde Koelbl – Fadenkreuze für das Leben“); es läuft aber nicht immer eine Fotoausstellung. Der Ort gehört trotzdem in den Katalog.
- `docs/templates/` legt der Mensch an.

## Annahmen
- ANNAHME: Typen `gallery` (Forum) und `museum` (Kunstmuseum); Anschrift, Koordinaten und Besonderheiten werden in der Umsetzung aus den Webseiten recherchiert, `source.status` ist `recherchiert`.
- ANNAHME: „Katalog“ meint `data/venues.json`. Ausstellungen der Orte sind nicht Teil des Wunsches.
- ANNAHME: Die Idee-Datei `idee-012-neue-venues.md` war beim Intake nicht committet (untracked); der Branch geht von `main` aus.

## Qualitätserwartungen
Q-DATA-1, Q-DATA-2.

## Definition of Done
- Beide Venues in `data/venues.json`, Validierung (`npm run validate:data`) grün.
- Szenario „Neue Venues sind im Katalog“ als Test umgesetzt.
- Build, `npm test`, `npm run web:test`, `npm run lint:all` grün.

## Risiken
- Bestandstests mit fester Venue-Zahl oder Zählung je Stadt/Typ können brechen.
- Verwechslung mit dem Fotografie-Forum Monschau (ähnlicher Name) bei IDs, Karte und Magazin.
- Koordinaten oder Typ müssen belegt werden; keine erfundenen Angaben.
- Beim Kunstmuseum Bonn läuft nicht dauerhaft eine Fotoausstellung; der Ort kann zeitweise ohne Fotografie-Ausstellung im Magazin und in der Agenda erscheinen.

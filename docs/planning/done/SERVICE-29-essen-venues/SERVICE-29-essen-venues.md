# SERVICE-29 – Fotografie-Orte in Essen

**Status:** Abgeschlossen  ·  **Quelle:** Idee [`idee-020-essen-veneus`](../../../product/ideen/idee-020-essen-veneus.md)

> „Aktualisiere die Daten mit Informationen zu Museen, Galerien, Off-Spaces sowie weitere Ausstellungsorte und Formate für Fotografie in Essen. […] Die Recherche und die Überführung in die Datenbasis soll im Rahmen dieses Tickets erfolgen.“

Die Idee nennt Museum Folkwang (mit Zentrum für Fotografie Essen), Ruhr Museum (mit Pixelprojekt Ruhrgebiet), Folkwang Universität der Künste (Campus Zollverein und Werden) sowie das UNESCO-Welterbe Zollverein als Gelände.

## Ziel
Die in der Idee genannten Essener Fotografie-Orte sind im Ortskatalog (`data/venues.json`) erfasst und erscheinen in der Webanwendung wie die übrigen Orte.

**Zweck in einem Satz:** Besucher:innen finden die Essener Fotografie-Szene vollständig im Ortskatalog.

**Erfolgskriterien**
- Die Folkwang Universität der Künste ist mit Anschrift samt Koordinaten, Typ, Website, Besonderheiten und Herkunft (`source`) erfasst.
- Museum Folkwang und Ruhr Museum bleiben genau einmal im Katalog.
- Der Bestand steigt von 40 auf 41 Orte (Grenze 20–60 bleibt eingehalten).
- Datenvalidierung, Build, Tests und Lint bleiben grün.

## Kontext
Der Katalog hat 40 Orte; in Essen sind das Museum Folkwang und das Ruhr Museum bereits erfasst. Modell: ADR-001; Orte, Veranstalter und Festivals sind getrennte Datensätze (ADR-009).

## Story-Schnitt
1. `STORY-01` Folkwang Universität der Künste im Ortskatalog (inkl. Prüfung, dass die beiden Museen unverändert und einmalig bleiben)

## Abgrenzung
**Nicht enthalten:**
- Ausstellungen, Events und Neuigkeiten der Orte (über `/update-venue-data` und `/research-events`, jeweils mit Freigabe)
- Museum Folkwang und Ruhr Museum (bereits erfasst; Datenpflege nur über `/update-venue-data`)
- Pixelprojekt Ruhrgebiet und Zentrum für Fotografie Essen als eigene Orte, Zollverein als Gelände (siehe Annahmen)
- Schemaänderungen, Änderungen an Webanwendung, Karte und Filter
- die Orte der Idee 021 (weitere NRW-Orte)

## Betroffene Bereiche
`data` (`data/venues.json`), Spezifikation `content/venue-erfassung`, `content/daten.feature`, `content/datenqualitaet`; Bestandstests (`test/bestand.test.mjs`).

## Vorbereitete Spezifikation (Phase 3)
- EARS: `content/venue-erfassung.md` (VEN-UB-15, VEN-UB-16)
- Gherkin: `content/daten.feature` („Essener Orte sind im Katalog“, „Essener Orte liegen in Essen“)
- Quality: Q-DATA-24
- ADR: nicht erforderlich – Datenerfassung im bestehenden Modell; geltend ADR-001, ADR-006, ADR-009

## Annahmen
- ANNAHME: Museum Folkwang (`museum-folkwang-essen`) und Ruhr Museum (`ruhr-museum-essen`) sind bereits erfasst und werden nicht doppelt angelegt.
- ANNAHME: Das Zentrum für Fotografie Essen ist Teil des Museums Folkwang, das Pixelprojekt Ruhrgebiet eine Plattform am Ruhr Museum und Zollverein ein Gelände mit mehreren Häusern; keines ist ein eigener Ort. Das Pixelprojekt kann später als Veranstalter oder Ausstellung folgen.
- ANNAHME: Die Folkwang Universität der Künste wird als **ein** Ort geführt, `id` `folkwang-universitaet-der-kuenste-essen`, Typ `foundation` (nächstliegender Typ im festen Schema, wie die FH Dortmund). Der Hauptstandort bzw. der Standort mit Fotografiebezug (Campus Zollverein oder Werden) wird durch die Recherche belegt; der zweite Campus kommt in `features`/Besonderheiten, nicht als zweiter Ort.
- ANNAHME: Website, Anschrift, Koordinaten und Besonderheiten stammen aus der Recherche der Webseiten in der Umsetzung; `source.status` ist `recherchiert`. Die Idee nennt keine Koordinaten; die Anschriften der Idee können veraltet sein.
- ANNAHME: Die Idee enthält Platzhalter (`EntityCard`, `googleusercontent`-Links); sie werden ignoriert.
- ANNAHME: „Aktualisiere die Daten“ meint Ortsdaten; Ausstellungen und Events folgen später über die vorhandenen Skills.
- ANNAHME: Der Branch geht von `main` aus; es lagen keine nicht committeten Änderungen vor (die Idee-Datei 020 erhält nur die Statuspflege).

## Qualitätserwartungen
Q-DATA-1, Q-DATA-2 (Herkunft), Q-DATA-21, Q-DATA-24.

## Definition of Done
- Folkwang Universität der Künste in `data/venues.json`, `npm run validate:data` grün.
- Szenarien „Essener Orte sind im Katalog“ und „Essener Orte liegen in Essen“ als Tests umgesetzt (`test/bestand.test.mjs`).
- Build, `npm test`, `npm run web:test`, `npm run lint:all` grün.

## Risiken
- Tests mit fester Ortszahl, Zählung je Stadt oder Typ können brechen (Wert 40).
- Anschrift und Koordinaten müssen belegt sein; nicht auffindbare Angaben werden nicht erfunden, sondern an H2 gemeldet.
- Die Hochschule hat mehrere Standorte; die Wahl des Hauptstandorts ist ein Befund für H2, falls die Recherche keine eindeutige Anschrift liefert.

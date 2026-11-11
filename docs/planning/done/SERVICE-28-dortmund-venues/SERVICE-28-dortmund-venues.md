# SERVICE-28 – Fotografie-Orte in Dortmund

**Status:** Entwurf (Intake)  ·  **Quelle:** Idee [`idee-019-dortmund-veneus`](../../../product/ideen/idee-019-dortmund-veneus.md)

> „Aktualisiere die Daten mit Informationen zu Museen, Galerien, Off-Spaces sowie weitere Ausstellungsorte und Formate für Fotografie in Dortmund. […] Die Recherche und die Überführung in die Datenbasis soll im Rahmen dieses Tickets erfolgen.“

Die Idee beschreibt nach Kategorie: Projektraum Fotografie, Kulturort DEPOT, Dortmunder U (HMKV, Museum Ostwall), Kunsthalle Dortmund (nach Recherche identisch mit dem HMKV), FH Dortmund (Fachbereich Design) und das f² Fotofestival.

## Ziel
Die in der Idee genannten Dortmunder Fotografie-Orte sind als Orte im Katalog (`data/venues.json`) erfasst und erscheinen in der Webanwendung wie die übrigen Orte.

**Zweck in einem Satz:** Besucher:innen finden die Dortmunder Fotografie-Szene vollständiger im Ortskatalog.

**Erfolgskriterien**
- 4 neue Dortmunder Orte sind mit Anschrift samt Koordinaten, Typ, Website, Besonderheiten und Herkunft (`source`) erfasst.
- Der Bestand steigt von 36 auf 40 Orte (Grenze 20–60 bleibt eingehalten).
- Datenvalidierung, Build, Tests und Lint bleiben grün.

## Kontext
Der Katalog hat 36 Orte; in Dortmund ist bisher nur das Museum Ostwall erfasst. Die Bestandsgrenze wurde in SERVICE-27 auf 60 angehoben (VEN-UB-8), eine weitere Anhebung ist nicht nötig. Modell: ADR-001; Orte, Veranstalter und Festivals sind getrennte Datensätze (ADR-009).

## Story-Schnitt
1. `STORY-01` Dortmunder Off-Spaces und Kulturorte: Projektraum Fotografie, Kulturort DEPOT
2. `STORY-02` Dortmunder Ausstellungshäuser und Hochschule: Kunsthalle Dortmund (ehemals HMKV), FH Dortmund (Fachbereich Design)

## Abgrenzung
**Nicht enthalten:**
- Ausstellungen, Events, Neuigkeiten und Festivalbeteiligungen der Orte (über `/update-venue-data` und `/research-events`, jeweils mit Freigabe)
- das f² Fotofestival als Festival- oder Veranstalter-Datensatz (siehe Annahmen)
- das Museum Ostwall (bereits als `museum-ostwall-dortmund` erfasst; keine Änderung) und das Dortmunder U als Gebäude
- Schemaänderungen, Änderungen an Webanwendung, Karte und Filter
- die Orte der Idee 020 (Essen)

## Betroffene Bereiche
`data` (`data/venues.json`), Spezifikation `content/venue-erfassung`, `content/daten.feature`, `content/datenqualitaet`; Bestandstests (`test/bestand.test.mjs`).

## Vorbereitete Spezifikation (Phase 3)
- EARS: `content/venue-erfassung.md` (VEN-UB-12 bis VEN-UB-14)
- Gherkin: `content/daten.feature` („Dortmunder Orte sind im Katalog“, „Dortmunder Orte liegen in Dortmund“)
- Quality: Q-DATA-23
- ADR: nicht erforderlich – Datenerfassung im bestehenden Modell; geltend ADR-001, ADR-006, ADR-009

## Annahmen
- ANNAHME: Das Museum Ostwall ist bereits erfasst und wird nicht doppelt angelegt; der HMKV heißt inzwischen Kunsthalle Dortmund (hmkv.de leitet um; Dortmunder U, Ebene 3) und ist ein Ort `kunsthalle-dortmund` – die in der Idee genannte Anschrift Kampstraße 6 ist veraltet; das Dortmunder U selbst ist kein Ort.
- ANNAHME: `id`s: `projektraum-fotografie-dortmund`, `kulturort-depot-dortmund`, `kunsthalle-dortmund`, `fh-dortmund-design-dortmund`.
- ANNAHME: Typen: Projektraum Fotografie und DEPOT `off_space`; Kunsthalle `gallery` (Ausstellungshaus ohne eigene Sammlung); FH-Fachbereich `foundation` (nächstliegender Typ im festen Schema, keine Schemaänderung).
- ANNAHME: Das f² Fotofestival wird nicht erfasst: Ein Festival braucht einen Zeitraum und einen Veranstalter (FES-UB-2); beides nennt die Idee nicht. Es folgt über `/research-events` bzw. `/update-venue-data`, sobald eine Ausgabe belegt ist.
- ANNAHME: Der Fachbereich Design der FH Dortmund ist ein Ort (Galerie- bzw. Ausstellungsbetrieb der Hochschule); die Idee nennt „Fachbereich Fotografie“ – maßgeblich ist, was die Recherche belegt, sonst Befund für H2.
- ANNAHME: Websites, Anschriften, Koordinaten und Besonderheiten stammen aus der Recherche der Webseiten in der Umsetzung; `source.status` ist `recherchiert`. Die Idee nennt Straße und PLZ, die Koordinaten fehlen.
- ANNAHME: „Schwerpunkt“-Angaben der Idee gehören nicht ins Schema; `hasPermanentCollection` und `hasReferenceLibrary` nur mit Beleg.
- ANNAHME: „Aktualisiere die Daten“ meint Ortsdaten; Ausstellungen und Events folgen später über die vorhandenen Skills. Die Idee spricht irrtümlich von „Düsseldorf“ in der Einleitung; gemeint ist Dortmund.
- ANNAHME: Der Branch geht von `main` aus; die Idee-Dateien (019 geändert, 020) waren beim Intake nicht committet bzw. bleiben unberührt.

## Qualitätserwartungen
Q-DATA-1, Q-DATA-2 (Herkunft), Q-DATA-21, Q-DATA-23.

## Definition of Done
- 4 Orte in `data/venues.json`, `npm run validate:data` grün.
- Szenarien „Dortmunder Orte sind im Katalog“ und „Dortmunder Orte liegen in Dortmund“ als Tests umgesetzt (`test/bestand.test.mjs`).
- Build, `npm test`, `npm run web:test`, `npm run lint:all` grün.

## Risiken
- Tests mit fester Ortszahl, Zählung je Stadt oder Typ können brechen.
- Anschrift und Koordinaten müssen belegt sein; nicht auffindbare Angaben werden nicht erfunden, sondern an H2 gemeldet.
- Fotografie-Bezug einzelner Häuser (Kunsthalle, DEPOT, FH-Fachbereich) ist wechselnd und muss belegt werden, sonst Befund für H2.
- Der Zuschnitt von Fachbereichen der FH kann sich geändert haben (Fachbereich Design, Studiengang Fotografie).

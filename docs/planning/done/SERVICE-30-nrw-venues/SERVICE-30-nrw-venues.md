# SERVICE-30 – Weitere Fotografie-Orte in NRW

**Status:** Abgeschlossen  ·  **Quelle:** Idee [`idee-021-nrw-venues`](../../../product/ideen/idee-021-nrw-venues.md)

> „Diese Übersicht ergänzt Ihre Liste um weitere relevante Orte in Nordrhein-Westfalen (außerhalb der Hauptmetropolen Köln, Düsseldorf, Essen und Dortmund) sowie das Japanische Kulturinstitut. […] Die Recherche und die Überführung in die Datenbasis soll im Rahmen dieses Tickets erfolgen.“

Die Idee nennt sechs Orte: Japanisches Kulturinstitut (Köln), Gasometer Oberhausen, Camera Obscura Mülheim an der Ruhr, Von der Heydt-Museum Wuppertal, Kunstmuseen Krefeld und LWL-Museum für Kunst und Kultur Münster.

## Ziel
Die sechs Orte sind im Ortskatalog (`data/venues.json`) erfasst und erscheinen in der Webanwendung wie die übrigen Orte.

**Zweck in einem Satz:** Besucher:innen finden die Fotografie-Orte auch außerhalb der vier Großstädte im Ortskatalog.

**Erfolgskriterien**
- Alle sechs Orte sind mit Anschrift samt Koordinaten, Typ, Website, Besonderheiten und Herkunft (`source`) erfasst.
- Kein Ort ist doppelt vorhanden.
- Der Bestand steigt von 41 auf 47 Orte (Grenze 20–60 bleibt eingehalten).
- Datenvalidierung, Build, Tests und Lint bleiben grün.

## Kontext
Der Katalog hat 41 Orte, keiner der sechs ist erfasst. Modell: ADR-001; Orte, Veranstalter und Festivals sind getrennte Datensätze (ADR-009). Vorbilder: SERVICE-27 bis SERVICE-29.

## Story-Schnitt
1. `STORY-01` Weitere NRW-Orte im Ortskatalog (sechs Orte, ein gemeinsamer Datenschnitt)

## Abgrenzung
**Nicht enthalten:**
- Ausstellungen, Events und Neuigkeiten der Orte (über `/update-venue-data` und `/research-events`, jeweils mit Freigabe)
- Das Japanische Kulturinstitut als Veranstalter oder Festival-Partner (Beteiligung an der Internationalen Photoszene Köln kann später als Festivalbeteiligung folgen)
- Schemaänderungen, Änderungen an Webanwendung, Karte und Filter

## Betroffene Bereiche
`data` (`data/venues.json`), Spezifikation `content/venue-erfassung`, `content/daten.feature`, `content/datenqualitaet`; Bestandstests (`test/bestand.test.mjs`).

## Vorbereitete Spezifikation (Phase 3)
- EARS: `content/venue-erfassung.md` (VEN-UB-17 bis VEN-UB-19)
- Gherkin: `content/daten.feature` („Weitere NRW-Orte sind im Katalog“, „Weitere NRW-Orte liegen in ihrer Stadt“)
- Quality: Q-DATA-25
- ADR: nicht erforderlich – Datenerfassung im bestehenden Modell; geltend ADR-001, ADR-006, ADR-009

## Annahmen
- ANNAHME: Die sechs Orte sind noch nicht im Katalog (Abgleich der Bestands-IDs und Namen); keine Doppelanlage.
- ANNAHME: Typen sind Lesarten im festen Schema: Japanisches Kulturinstitut `foundation` (Kulturinstitut), Gasometer Oberhausen `gallery` (Großausstellungsraum ohne eigene Sammlung), Camera Obscura Mülheim `museum`, Von der Heydt-Museum `museum`, Kunstmuseen Krefeld `museum`, LWL-Museum `museum`.
- ANNAHME: Die Kunstmuseen Krefeld (Kaiser Wilhelm Museum, Haus Lange, Haus Esters) werden als **ein** Ort mit dem Hauptstandort Kaiser Wilhelm Museum (Joseph-Beuys-Platz 1) geführt; die beiden Häuser stehen in `features`/Besonderheiten.
- ANNAHME: Die IDs folgen dem Muster `<name>-<stadt>` (z. B. `japanisches-kulturinstitut-koeln`, `gasometer-oberhausen`, `camera-obscura-muelheim-an-der-ruhr`, `von-der-heydt-museum-wuppertal`, `kunstmuseen-krefeld`, `lwl-museum-fuer-kunst-und-kultur-muenster`); die endgültige Schreibweise legt die Umsetzung fest, solange VEN-UB-3 gilt.
- ANNAHME: Website, Anschrift, Koordinaten und Besonderheiten stammen aus der Recherche der Webseiten in der Umsetzung; `source.status` ist `recherchiert`. Anschriften der Idee können veraltet sein; nicht belegbare Angaben werden nicht erfunden, sondern an H2 gemeldet.
- ANNAHME: Schließzeiten des Gasometers Oberhausen sind ein Befund für H2, kein Ausschlussgrund; die Aufnahme als Ort bleibt davon unabhängig.
- ANNAHME: „Recherche und Überführung“ meint Ortsdaten; Ausstellungen und Events folgen später über die vorhandenen Skills.
- ANNAHME: Der Branch geht von `main` aus; es lagen keine nicht committeten Änderungen vor (die Idee-Datei 021 erhält nur die Statuspflege).

## Qualitätserwartungen
Q-DATA-1, Q-DATA-2 (Herkunft), Q-DATA-21, Q-DATA-25.

## Definition of Done
- Sechs Orte in `data/venues.json`, `npm run validate:data` grün.
- Szenarien „Weitere NRW-Orte sind im Katalog“ und „Weitere NRW-Orte liegen in ihrer Stadt“ als Tests umgesetzt (`test/bestand.test.mjs`).
- Build, `npm test`, `npm run web:test`, `npm run lint:all` grün.

## Risiken
- Tests mit fester Ortszahl, Zählung je Stadt oder Typ können brechen (Wert 41).
- Anschrift und Koordinaten müssen belegt sein; Webseiten können Abrufe einschränken (ADR-006).
- Das Japanische Kulturinstitut liegt in Köln; Tests je Stadt (Köln) müssen die Erweiterung vertragen.

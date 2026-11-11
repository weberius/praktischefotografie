# SERVICE-27 – Fotografie-Orte in Düsseldorf

**Status:** Entwurf (Intake)  ·  **Quelle:** Idee [`idee-018-duesseldorf-venues`](../../../product/ideen/idee-018-duesseldorf-venues.md)

> „Aktualisiere die Daten mit Informationen zu Museen, Galerien, Off-Spaces sowie weitere Ausstellungsorte und Formate für Fotografie in Düsseldorf. […] Die Recherche und die Überführung in die Datenbasis soll im Rahmen dieses Tickets erfolgen.“

Die Idee enthält eine Übersichtstabelle mit 15 Einträgen und Detailbeschreibungen nach Kategorie (Museen, Galerien, Off-Spaces, weitere Orte und Festivals).

## Ziel
Die in der Idee genannten Düsseldorfer Fotografie-Orte sind als Orte im Katalog (`data/venues.json`) erfasst und erscheinen in der Webanwendung wie die übrigen Orte (Ortsliste, Karte, Filter, Magazin).

**Zweck in einem Satz:** Besucher:innen finden die Düsseldorfer Fotografie-Szene vollständiger im Ortskatalog.

**Erfolgskriterien**
- 12 neue Düsseldorfer Orte sind mit Anschrift samt Koordinaten, Typ, Website, Besonderheiten und Herkunft (`source`) erfasst.
- Der Bestand steigt von 24 auf 36 Orte; die Bestandsgrenze der Spezifikation erlaubt das.
- Datenvalidierung, Build, Tests und Lint bleiben grün.

## Kontext
Der Katalog hat 24 Orte (Modell: ADR-001, Schema `venues`), davon in Düsseldorf das Museum Kunstpalast und das NRW-Forum. Die Spezifikation begrenzt den Bestand auf höchstens 30 Orte (VEN-UB-1, Q-DATA-2); der Review von SERVICE-21 hatte die fehlende Begründung dieser Grenze bereits als offen vermerkt. Mit den Ideen 019 (Dortmund) und 020 (Essen) steht weiteres Wachstum an. `düsseldorf photo+` ist als Veranstalter bereits erfasst und kein Ort.

## Story-Schnitt
1. `STORY-01` Bestandsrahmen für den Ortskatalog anheben (Voraussetzung der übrigen Stories)
2. `STORY-02` Düsseldorfer Museen und Institutionen: K20, K21, Stadtmuseum, Filmmuseum
3. `STORY-03` Düsseldorfer Galerien: Leica Galerie, Galerie noir blanche, Galerie Voss, LUMAS
4. `STORY-04` Düsseldorfer Off-Spaces und Kulturinstitute: Sammlung Philara, plan.d., Stiftung Gerhart-Hauptmann-Haus, Polnisches Institut

## Abgrenzung
**Nicht enthalten:**
- Ausstellungen, Events, Neuigkeiten und Festivalbeteiligungen der Orte (laufen über `/update-venue-data` und `/research-events`, jeweils mit Freigabe)
- Aktualisierung der bereits vorhandenen Orte Kunstpalast und NRW-Forum (ebenfalls über `/update-venue-data`)
- `düsseldorf photo+` (bereits Veranstalter, kein Ort) und das Verzeichnis `0211.art` (Plattform, kein Ort)
- die in der Idee nur beiläufig genannten Orte ohne Anschrift und Belegangabe (Galerie Clara Maria Sels, Sies + Höke, von fraunberg art gallery, The Pool, Piz Palü)
- neue Felder oder Schemaänderungen, Änderungen an Webanwendung, Karte und Filter
- die Orte der Ideen 019 und 020

## Betroffene Bereiche
`data` (`data/venues.json`), Spezifikation `content/venue-erfassung`, `content/daten.feature`, `content/datenqualitaet`; Bestandstests (`test/bestand.test.mjs`).

## Vorbereitete Spezifikation (Phase 3)
- EARS: `content/venue-erfassung.md` (VEN-UB-8 ersetzt VEN-UB-1; VEN-UB-9 bis VEN-UB-11)
- Gherkin: `content/daten.feature` („Datenbestand enthält 20 bis 60 Venues“, „Düsseldorfer Orte sind im Katalog“, „Düsseldorfer Orte liegen in Düsseldorf“)
- Quality: Q-DATA-21 (ersetzt die Bestandsgrenze aus Q-DATA-2), Q-DATA-22
- ADR: nicht erforderlich – Datenerfassung im bestehenden Modell, Bestandsgrenze ist eine fachliche Vorgabe; geltend ADR-001, ADR-006

## Annahmen
- ANNAHME: Die Obergrenze von 30 Orten wird auf 60 angehoben (Supersede von VEN-UB-1 und der Bestandsklausel in Q-DATA-2). 36 Orte nach diesem Ticket plus die Ideen 019 und 020 sollen darunter bleiben; die Grenze bleibt als Plausibilitätsprüfung bestehen und wird nicht gestrichen.
- ANNAHME: K20 und K21 sind zwei Orte (eigene Anschrift), `type` `museum`; `id`s `k20-duesseldorf`, `k21-duesseldorf`.
- ANNAHME: Weitere `id`s: `stadtmuseum-duesseldorf`, `filmmuseum-duesseldorf`, `leica-galerie-duesseldorf`, `galerie-noir-blanche-duesseldorf`, `galerie-voss-duesseldorf`, `lumas-duesseldorf`, `sammlung-philara-duesseldorf`, `plan-d-produzentengalerie-duesseldorf`, `gerhart-hauptmann-haus-duesseldorf`, `polnisches-institut-duesseldorf`.
- ANNAHME: Typen: Museen `museum`; Galerien `gallery`; Sammlung Philara und plan.d. `off_space`; Stiftung Gerhart-Hauptmann-Haus und Polnisches Institut `foundation` (nächstliegender Typ im festen Schema; keine Schemaänderung).
- ANNAHME: Die Leica Galerie (Ausstellungsraum im Leica Store) und LUMAS (Galerie für Editionen) gehören zum Katalog, weil sie Ausstellungsräume für Fotografie sind; PRD 1.3 schließt Kamera- und Equipment-Handel nur als Gegenstand von Testberichten aus. Die Webanwendung zeigt keine Verkaufsangebote. Zu bestätigen an H2.
- ANNAHME: Die Websites, Anschriften, Koordinaten und Besonderheiten der Orte stammen aus der Recherche der Webseiten in der Umsetzung (nicht aus der Idee); `source.status` ist `recherchiert`. Die Idee nennt nur Straße und PLZ.
- ANNAHME: Die Detailangaben der Idee („Schwerpunkt“) gehören nicht ins Schema; sie dienen als Hinweis für die Recherche. Ob ein Ort `hasPermanentCollection` bzw. `hasReferenceLibrary` hat, wird belegt oder bleibt `false`.
- ANNAHME: „Aktualisiere die Daten“ meint Ortsdaten im Katalog; die Ausstellungen und Events der Orte folgen über die vorhandenen Skills (jeweils mit Freigabe), nicht in diesem Ticket.
- ANNAHME: Der Branch geht von `main` aus; die Idee-Dateien 018 bis 020 (geändert) und `updates/2026-11-11/` (neu) waren beim Intake nicht committet und bleiben unberührt.

## Qualitätserwartungen
Q-DATA-1, Q-DATA-2 (Herkunft), Q-DATA-21, Q-DATA-22.

## Definition of Done
- 12 Orte in `data/venues.json`, `npm run validate:data` grün.
- Szenarien „Datenbestand enthält 20 bis 60 Venues“, „Düsseldorfer Orte sind im Katalog“ und „Düsseldorfer Orte liegen in Düsseldorf“ als Tests umgesetzt; der Bestandstest zur Obergrenze ist angepasst.
- Build, `npm test`, `npm run web:test`, `npm run lint:all` grün.

## Risiken
- Bestandstests oder Webtests mit fester Ortszahl, Zählung je Stadt oder Typ können brechen.
- Anschrift und Koordinaten müssen belegt sein; ein Ort mit nicht auffindbarer Website oder Anschrift wird nicht erfunden, sondern an H2 gemeldet.
- Einzelne Orte (z. B. Filmmuseum, Stadtmuseum, Polnisches Institut) haben nur zeitweise Fotografie; der Bezug muss belegt werden (Fotoausstellungen oder Sammlung), sonst ist der Ort ein Befund für H2.
- Die Karte und die Ortsliste bekommen viele Düsseldorfer Orte nah beieinander (Ehrenhof, Altstadt); ein Darstellungsproblem wäre ein eigener Wunsch.
- Wiederkehrende Obergrenzenfrage: Mit der Anhebung auf 60 ist die Grenze für die Ideen 019 und 020 vermutlich ausreichend; sonst erneut anheben.

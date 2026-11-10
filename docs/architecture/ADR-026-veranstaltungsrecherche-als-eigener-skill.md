# ADR-026: Veranstaltungsrecherche als eigener Skill auf der bestehenden Abruf- und Vorschlagspipeline

**Status:** Accepted  ·  **Datum:** 2026-11-10

## Kontext
`update-venue-data` ruft je Ort die Startseite und bis zu fünf verlinkte Seiten ab (ADR-006) und extrahiert Orte, Ausstellungen, Personen und einige Events (ADR-007). Führungen und Veranstaltungen stehen oft auf tieferen Programmseiten (Beispiel: `photographie-stiftungkultur.de/programm/fuehrungen-und-veranstaltungen` der Photographischen Sammlung) und fehlen deshalb in `data/events.json`. Der Typ „Führung“ ist im Schema nicht vorgesehen. Gewünscht ist ein Skill, der die Veranstaltungen eines Ortes oder aller Orte recherchiert.

## Entscheidung
- **Eigener Skill `research-events`** (`/research-events [--venue <id>] [--offline] [--max-age <Tage>] [--date JJJJ-MM-TT]`), nicht eine Erweiterung von `update-venue-data`: Fokus, Extraktionsregeln und Freigabe sind andere, der Ablauf von Orten und Ausstellungen bleibt unverändert.
- **Wiederverwendung der Pipeline:** Abruf (`data:fetch`), Prüfung (`data:check`), Bericht und Übernahme (`data:apply`) mit Fundstelle, Freigabe, Validierung und Rollback (ADR-006, ADR-007). Neu ist nur der Veranstaltungsmodus `--events` im Abruf: bis zu zehn statt sechs Seiten je Ort, Links zu Führungen, Veranstaltungen, Terminen, Kalender und Programm zuerst; alle Höflichkeitsregeln gelten unverändert.
- **Quellen:** nur Orte mit `website`, keine Veranstalter (Events verlangen eine `venueId`).
- **Vorschläge:** nur `events` mit `op: "add"` in `updates/<Datum>/events/<venue-id>.json`, getrennt von den Ortsvorschlägen desselben Tages. Je belegtem Termin ein Event, höchstens 30 je Ort und Lauf, nur Termine ab heute mit Datum in der Fundstelle; keine Vernissagen und Finissagen (Zuständigkeit von `update-venue-data`).
- **Neuer Event-Typ `guided_tour`** (Anzeige „Führung“) in Schema, Validierung und Webanwendung.

## Alternativen
- **`update-venue-data` um einen Modus erweitern:** Vermischt zwei Aufgaben und verlängert den ohnehin umfangreichen Skill; Freigaben würden unübersichtlich.
- **Seitenlimit generell erhöhen:** Belastet alle Läufe und Betreiber; verworfen zugunsten eines Modus.
- **Feld `eventsUrl` je Ort in `venues.json`:** Genauer, aber Schema-, Daten- und Pflegeaufwand für 24 Orte; später möglich, wenn die Link-Priorisierung nicht genügt.
- **Führungen als `workshop` oder `talk` erfassen:** Verfälscht die Typfilter.

## Konsequenzen
- Läufe über alle Orte dauern länger (bis zu 10 Seiten × 2 s je Ort, rund 24 Orte); der Zwischenspeicher (`--max-age`) und `--offline` mildern das.
- `check-proposals` und `apply-proposals` müssen den Unterordner `events/` und die Beschränkung auf `events` kennen.
- Schema, Webmodell, Beschriftung und Typfilter erhalten `guided_tour`; Bestandsdaten bleiben gültig.
- Wiederkehrende Führungen ohne einzelne Termine werden bewusst nicht erfasst.

## Auswirkungen
- EARS: VRS-UB-1 bis VRS-UB-7, VRS-OP-1, VRS-UN-1, VRS-UN-2, VRS-EV-1, VRS-EV-2, DAT-UB-8, EVT-UB-6
- Features: `setup/veranstaltungen-recherche.feature`, `content/daten.feature`, `web/events.feature`
- Quality: Q-SEC-12, Q-DATA-17, Q-REL-3, Q-USE-19
- Bezüge: ADR-006, ADR-007, ADR-008, ADR-010, ADR-002 (ersetzt keinen ADR)

# ADR-009: Festivals als eigener Datensatz

**Status:** Accepted (an H2 am 2026-10-28 bestätigt)  ·  **Datum:** 2026-10-28

## Kontext
Die Datenbasis kennt Venues und Organizer. Ein Festival (z. B. Photoszene-Festival 2027, düsseldorf photo+ 2027) hat einen Zeitraum, gehört einem Veranstalter und bündelt Ausstellungen vieler Venues. Ein Veranstalter hat mehrere Ausgaben. Heute verweist `festivalId` einer Ausstellung auf einen Organizer; die Webanwendung liest es so (ORG-UB-3, ORG-UB-4). Die Entscheidung folgt ADR-001 (JSON, Schemas, Validator).

## Entscheidung
- **Drei Ebenen:** Venue (`venues.json`), Organizer (`organizers.json`), Festival (`festivals.json`, neu).
- **Festival:** `id`, `organizerId`, `title`, `startDate`, `endDate`, `city`, optional `description`, `website`. Schema `schema/festivals.schema.json`; Validierung von Zeitraum und Referenz `organizerId`.
- **Ausstellung:** `festivalId` verweist künftig auf `festivals.json`; neu ist das optionale `isOfficialFestivalPartner` (Boolean, nur zusammen mit `festivalId`). Eine Ausstellung muss nicht innerhalb des Festivalzeitraums liegen, weil Festivalbeiträge oft darüber hinaus laufen.
- **Organizer:** optionale Felder `shortName`, `description`, `social.instagram`. `type` bleibt (`association`, `festival`, `network`, `foundation`).
- **Kein Venue für Veranstalter ohne Raum:** Einrichtungen ohne eigenen Ausstellungsraum werden als Organizer erfasst, nicht als Venue.
- **Migration:** Bestehende Daten nutzen `festivalId` nicht (`organizers.json` ist leer, alle `festivalId` sind `null`); die Änderung der Bedeutung bricht keine Daten. Webanwendung, Filter `organizer` und Spezifikation ORG-* werden angepasst (Supersede).

## Alternativen
- **Festival als Organizer mit `type: festival`:** Bleibt im alten Modell, bildet aber weder Zeitraum noch mehrere Ausgaben je Veranstalter ab.
- **`festivalId` bleibt Veranstalter-ID, Ausgabe über Jahr im Feld:** Kein neues Schema, mischt aber Veranstalter und Ausgabe und verhindert Festivalansichten mit Zeitraum.

## Konsequenzen
- Schema, Validator (`DATASETS`), Datensynchronisation, Webanwendung, Update-Skill und Tests sind betroffen.
- Festivalbezogene Ansichten (Festivalkarte, Tagesroute) lassen sich auf `festivalId` und `isOfficialFestivalPartner` stützen.
- Ein Festival ohne gesichertes Datum kann nicht erfasst werden (`startDate` und `endDate` sind Pflicht); es entsteht erst, wenn die Termine belegt sind.

## Auswirkungen
- EARS: FES-UB-1 bis FES-UB-4, FES-UN-1 bis FES-UN-3, FES-OP-1; FST-UB-1 bis FST-UB-5, FST-ST-1 bis FST-ST-3, ORG-UB-5 bis ORG-UB-8, EXH-OP-2, NAV-UB-5, NAV-UB-6; Supersede ORG-UB-3, ORG-UB-4, EXH-OP-1, NAV-UB-1, NAV-UB-2
- Features: `content/festivals.feature`, `web/festivals.feature`, `web/veranstalter.feature`, `web/ausstellungen.feature`, `web/navigation.feature`
- Quality: Q-DATA-5, Q-DATA-1, Q-USE-3, Q-USE-4, Q-SEO-1 bis Q-SEO-3

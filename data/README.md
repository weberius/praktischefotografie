# Datenpflege

Alle Inhalte liegen als JSON in diesem Ordner. Die Schemas stehen unter [`../schema/`](../schema/), die Anforderungen unter [`../docs/ears/`](../docs/ears/) (`content/datenmodell.md`, `content/venue-erfassung.md`, `setup/datenvalidierung.md`).

## Prüfen

```bash
npm run validate:data   # Schema, Referenzen, doppelte IDs, Datumsfolge, NRW-Koordinaten
npm test                # Tests inkl. Prüfung des Datenbestands
```

Die Prüfung arbeitet lokal und greift nicht auf das Netz zu.

## Regeln für Venues (`venues.json`)

- `id`: eindeutig, kebab-case, nur ASCII (`makk-koeln`).
- Pflichtfelder: `id`, `name`, `shortName`, `type`, `city`, `address` (`street`, `zip`, `city`, `lat`, `lng`), `website`, `features`, `source`.
- `type`: `museum`, `gallery`, `foundation`, `off_space` oder `library_archive`. Kamerahandel und Dienstleister gehören nicht hinein.
- `features.hasReferenceLibrary: true` erfordert `features.libraryNotes`.
- `source`: `url` der Seite, auf der die Angaben geprüft wurden, `checkedAt` (Datum der Prüfung) und `status`:
  - `recherchiert`: aus Quellen zusammengetragen, noch nicht von einer Person der Redaktion bestätigt.
  - `verifiziert`: von der Redaktion bestätigt (z. B. per Ortsbesuch oder offizieller Auskunft).
- Koordinaten müssen in NRW liegen (lat 50.3–52.6, lng 5.8–9.5).

## Verweise

`venueId`, `festivalId` (→ `organizers.json`), `photographerIds`, `linkedVenueIds`, `linkedExhibitionIds` und `contentFile` müssen auf vorhandene Ziele zeigen.

## Beiträge (`posts.json`)

`excerpt` ist optional (1 bis 300 Zeichen) und dient als Kurzvorschau im Magazin. Der Beitragstext liegt in `contentFile` (`content/posts/*.md`).

Neuigkeiten zu Ausstellungen (`neu`, `eroeffnung`, `endet-bald`, `ende`) legt `npm run news:apply` als Beiträge an. `id` und `slug` lauten `<Ausstellungs-id>-<Anlass>`, `date` ist das Datum des Anlasses (siehe [`../updates/README.md`](../updates/README.md)).

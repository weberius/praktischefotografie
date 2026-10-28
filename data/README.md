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

## Veranstalter und Festivals (`organizers.json`, `festivals.json`)

Drei Ebenen: **Venue** (Ort mit fester Adresse), **Organizer** (Veranstalter ohne eigenen Ausstellungsraum) und **Festival** (zeitlich begrenzte Ausgabe eines Veranstalters).

- Organizer: `id`, `name`, `type` (`association`, `festival`, `network`, `foundation`), `city`; optional `shortName`, `website`, `description`, `social.instagram`.
- Festival: `id`, `organizerId`, `title`, `startDate`, `endDate`, `city`; optional `description`, `website`. Ein Festival ohne belegten Zeitraum wird nicht erfasst.
- Ausstellung: `festivalId` verweist auf ein **Festival** (früher auf einen Veranstalter); `isOfficialFestivalPartner: true` ist nur zusammen mit `festivalId` zulässig. Die Ausstellung muss nicht im Festivalzeitraum liegen.
- Eine `id` darf nicht zugleich bei einem Venue und einem Veranstalter vorkommen.

## Fotograf:innen (`photographers.json`) und Portraits

- Pflicht: `id`, `name`. Studios und Duos stehen wie in den Quellen genannt. Namen sind (ohne Beachtung von Groß- und Kleinschreibung und Leerraum) eindeutig.
- Aufgenommen werden Personen, deren Bilder in einer Ausstellung gezeigt werden, nicht Kurator:innen, Sammler:innen oder Musiker:innen.
- **Jede Ausstellung mit `photographerIds` hat eine `description`, die den Namen jeder verknüpften Person nennt** (die Datenprüfung meldet Verstöße).
- Optionales Profil (vom Skill `/research-photographers`): `occupation` (Berufsbezeichnung nach Wikipedia), `life` (`from`, `to` oder `null`), `wikipedia` (`summary` mit 40 bis 90 Wörtern in eigener Formulierung, `sources` mit `lang` und `url` auf `<lang>.wikipedia.org`) und `portrait` (`file`, `width`, `height`, `source` auf `commons.wikimedia.org`, `credit`, `license`, optional `licenseUrl`).
- Portraits liegen unter `data/portraits/`, höchstens 400 Pixel breit und 200 kB groß, und erscheinen in der Webanwendung unter `portraits/`. Die Webanwendung zeigt bei jedem Portrait Urheber, Lizenz und den Link zur Commons-Dateiseite, bei der Zusammenfassung die Quellenlinks und den Hinweis CC BY-SA.


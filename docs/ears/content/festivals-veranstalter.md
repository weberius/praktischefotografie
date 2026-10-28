# EARS: Veranstalter und Festivals (Kürzel `FES`)

**Bereich:** content  ·  **Systemname:** Datenbasis  ·  **Stand:** 2026-10-28

Begriffe: Die Datenbasis kennt drei Ebenen: **Venue** (Ort mit fester Adresse), **Organizer** (Veranstalter ohne eigenen Ausstellungsraum) und **Festival** (zeitlich begrenzte Ausgabe eines Veranstalters, die viele Venues bündelt). Felddetails stehen verbindlich in den Schemas unter `schema/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| FES-UB-1 | Die Datenbasis soll je Veranstalter in `organizers.json` die Felder `id`, `name`, `type`, `city` sowie optional `shortName`, `website`, `description` und `social.instagram` führen. | `content/festivals.feature` · „Veranstalter mit Kurzbeschreibung“ | Q-DATA-5 | ADR-009 |
| FES-UB-2 | Die Datenbasis soll Festivals in `festivals.json` mit den Pflichtfeldern `id`, `organizerId`, `title`, `startDate`, `endDate`, `city` und den optionalen Feldern `description` und `website` führen. | `content/festivals.feature` · „Festival ist vollständig“ | Q-DATA-5 | ADR-009 |
| FES-UN-1 | Wenn bei einem Festival `endDate` vor `startDate` liegt oder `organizerId` auf keinen Veranstalter verweist, soll die Validierung den Datensatz als fehlerhaft melden. | `content/festivals.feature` · „Festival mit ungültigem Zeitraum“, „Festival mit unbekanntem Veranstalter“ | Q-DATA-5 | ADR-009 |
| FES-UB-3 | Die Datenbasis soll `festivalId` einer Ausstellung auf ein Festival in `festivals.json` beziehen. | `content/festivals.feature` · „Ausstellung gehört zu einem Festival“ | Q-DATA-5 | ADR-009 |
| FES-UN-2 | Wenn `festivalId` einer Ausstellung auf kein Festival verweist, soll die Validierung die Ausstellung als fehlerhaft melden. | `content/festivals.feature` · „Ausstellung mit unbekanntem Festival“ | Q-DATA-5 | ADR-009 |
| FES-OP-1 | Wo bei einer Ausstellung `isOfficialFestivalPartner` wahr ist, soll die Datenbasis ein `festivalId` verlangen; die Validierung soll eine Ausstellung mit `isOfficialFestivalPartner: true` ohne `festivalId` als fehlerhaft melden. | `content/festivals.feature` · „Offizieller Partner ohne Festival“ | Q-DATA-5 | ADR-009 |
| FES-UN-3 | Wenn dieselbe `id` bei einem Venue und einem Veranstalter vorkommt, soll die Validierung beide Datensätze als fehlerhaft melden. | `content/festivals.feature` · „Gleiche ID bei Ort und Veranstalter“ | Q-DATA-5 | ADR-009, ADR-010 |
| FES-UB-4 | Die Datenbasis soll `festivals.json` wie die übrigen Datensätze validieren, im Build zusammenführen und der Webanwendung als `data/festivals.json` bereitstellen. | `content/festivals.feature` · „Festivals im Build“ | Q-DATA-1 | ADR-009 |

**Ergänzung:** FES-UB-1 erweitert DAT-UB-1 um optionale Felder und das Festival-Schema. **Supersede (in der Spezifikation der Webanwendung nachzuziehen):** ORG-UB-3 und ORG-UB-4 lesen `festivalId` als Veranstalter-ID; mit FES-UB-3 verweist `festivalId` auf ein Festival, der Veranstalter ergibt sich über `organizerId` des Festivals.

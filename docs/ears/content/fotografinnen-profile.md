# EARS: Profile der Fotograf:innen (Kürzel `PRF`)

**Bereich:** content  ·  **Systemname:** Datenbasis  ·  **Stand:** 2026-10-28

Begriffe: „Person“ ist ein Eintrag in `photographers.json` (auch Studios und Duos, wie in den Quellen genannt). „Profil“ sind die optionalen Felder `occupation`, `life`, `wikipedia` und `portrait`. Felddetails stehen verbindlich in `schema/photographers.schema.json`. Portraits liegen unter `data/portraits/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| PRF-UB-1 | Die Datenbasis soll je Person optional `occupation` (Berufsbezeichnung nach Wikipedia, z. B. „Fotografin“ oder „Medienkünstler“), `life` (`from` Geburtsjahr, `to` Todesjahr oder `null`), `wikipedia` und `portrait` führen. | `content/fotografinnen-profile.feature` · „Person mit Profil ist gültig“ | Q-DATA-7 | ADR-011 |
| PRF-UB-2 | Die Datenbasis soll `wikipedia` mit einer Zusammenfassung `summary` von 40 bis 90 Wörtern und mindestens einer Quelle `sources` aus Sprachcode `lang` und `url` führen, wobei die `url` auf `https://<lang>.wikipedia.org/` zeigt. | `content/fotografinnen-profile.feature` · „Wikipedia-Zusammenfassung mit Quellen“ | Q-DATA-8 | ADR-011 |
| PRF-UB-3 | Die Datenbasis soll `portrait` mit `file`, `width` und `height` (Pixel), `source` (Dateiseite auf `commons.wikimedia.org`), `credit` (Urheber) und `license` (Lizenzkürzel) sowie optional `licenseUrl` führen; ein Portrait ohne Urheber oder Lizenz ist unzulässig. | `content/fotografinnen-profile.feature` · „Portrait mit Bildnachweis“ | Q-DATA-7 | ADR-011 |
| PRF-UN-1 | Wenn die Datei eines Portraits unter `data/portraits/` fehlt, größer als 200 kB ist oder `width` 400 Pixel überschreitet, soll die Validierung die Person als fehlerhaft melden. | `content/fotografinnen-profile.feature` · „Portraitdatei fehlt oder ist zu groß“ | Q-DATA-7 | ADR-011 |
| PRF-UN-2 | Wenn `life.to` vor `life.from` liegt oder zwei Personen denselben Namen tragen (ohne Beachtung von Groß- und Kleinschreibung und Leerraum), soll die Validierung sie als fehlerhaft melden. | `content/fotografinnen-profile.feature` · „Ungültige Lebensdaten“, „Doppelter Name“ | Q-DATA-7 | ADR-011 |
| PRF-UB-4 | Die Datenbasis soll bei jeder Ausstellung mit `photographerIds` eine `description` verlangen, die den Namen jeder verknüpften Person nennt; die Validierung soll fehlende Namen oder eine fehlende `description` melden. | `content/fotografinnen-profile.feature` · „Beschreibung nennt alle Fotograf:innen“, „Beschreibung ohne Namen“ | Q-DATA-9 | ADR-011 |
| PRF-UN-3 | Wenn bei einer Ausstellung die gespeicherte Art `solo` ist und mehr als eine Person verknüpft ist oder die Art `group` ist und weniger als zwei Personen verknüpft sind, soll die Validierung die Ausstellung als fehlerhaft melden. | `content/fotografinnen-profile.feature` · „Art passt zur Zahl der Personen“ | Q-DATA-11 | ADR-014 |
| PRF-UB-5 | Die Datenbasis soll `data/portraits/` im Build zusammenführen und der Webanwendung unter `portraits/` bereitstellen. | `content/fotografinnen-profile.feature` · „Portraits im Build“ | Q-DATA-1 | ADR-011 |

**Ergänzung:** PRF-UB-1 erweitert DAT-UB-1 um optionale Felder der Personen. PRF-UB-4 schränkt die bisher freie `description` von Ausstellungen mit Fotograf:innen ein (Migration bestehender Daten gehört zur Umsetzung).

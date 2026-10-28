# Changelog: SERVICE-05-STORY-02 – Neue Orte und Veranstalter erfassen

## 2026-10-28 – TASK-03: Aktuelle Ausstellung im fotoraum köln und Nachweise

- **Status:** Umgesetzt
- **Änderungen:** Ausstellung „Men Don't Cry“ (19.09.–01.11.2026) mit Fotograf Hannes Jung. Fundstellen: [fotoraum-koeln.de](https://www.fotoraum-koeln.de/) und [Detailseite](https://www.fotoraum-koeln.de/hannes-jung-men-dont-cry/). Die Beschreibung folgt der Seite.
- **Dateien:** `data/exhibitions.json`, `data/photographers.json`
- **Prüfung:** `npm run validate:data` grün. **Nicht geprüft:** Inhalt der Detailseite (nur über die Übersichtsseite gelesen).

## 2026-10-28 – TASK-02: Veranstalter und Festival

- **Status:** Umgesetzt
- **Änderungen:** Veranstalter `photoszene-koeln` (Name nach Webseite: „Internationale Photoszene Köln gUG“, Typ `association`; Instagram `photoszene_koeln` laut Vorgabe, nicht auf der Seite geprüft) und `duesseldorf-photo-plus` (Typ `festival`, Instagram laut Seite). Festival `photoszene-festival-2027` mit **14.05.–13.06.2027**; Fundstelle: [photoszene.de/de/festival](https://www.photoszene.de/de/festival/) („Das kommende Photoszene-Festival wird vom 14. Mai - 13. Juni 2027 stattfinden!“). Kein Festival für düsseldorf photo+ (Datum nicht belegt, entschieden an H1). Abweichungen zur Vorgabe: gUG statt e.V.; Zeitraum 14.5.–13.6. statt 14.–23.5.; Festival-Website `photoszene.de/de/festival/` statt `festival.photoszene.de`; Beschreibung ohne „über 80 Ausstellungen“ (nicht belegt).
- **Dateien:** `data/organizers.json`, `data/festivals.json`
- **Prüfung:** `npm run validate:data` grün.

## 2026-10-28 – TASK-01: Venues fotoraum köln und Michael Horbach Stiftung

- **Status:** Umgesetzt
- **Änderungen:** `fotoraum-koeln` (Off-Space, Herderstraße 88, 50935 Köln, Lindenthal; Beleg [Impressum](https://www.fotoraum-koeln.de/impressum)) und `michael-horbach-stiftung` (Stiftung, Wormser Straße 23, 50677 Köln, Südstadt; Beleg [DGPh-Eintrag](https://www.dgph.de/ausstellungsorte/kunstraeume-der-michael-horbach-stiftung-koeln), Sammlung laut Verzeichnissen). Koordinaten und Stadtteil aus OpenStreetMap/Nominatim (ODbL): fotoraum 50.9255743 / 6.9100216; Horbach 50.9179959 / 6.9546889 (DGPh nennt 50.91795 / 6.95470). `hasPermanentCollection` für fotoraum und `hasReferenceLibrary` für beide sind nicht belegt und stehen auf `false`. Die Website der Stiftung ist per HTTPS nicht abrufbar (Zertifikat gehört zu kasserver.com); eingetragen ist `http://www.michael-horbach-stiftung.de/`.
- **Dateien:** `data/venues.json`
- **Prüfung:** `npm run validate:data` grün; Koordinaten liegen in NRW.

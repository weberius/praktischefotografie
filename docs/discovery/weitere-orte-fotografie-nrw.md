# Recherche: Weitere Orte, Veranstalter und Festivals der Fotografie in NRW

**Stand:** 2026-10-28  ·  **Methode:** Websuche und Abruf einzelner Seiten (nicht über `data:fetch`). Alle Angaben sind **recherchiert, nicht verifiziert**; vor der Übernahme in `data/` läuft jede Angabe als Vorschlag mit Fundstelle durch `/update-venue-data`.

## Einordnung in die drei Ebenen

| Kandidat | Ebene | Beleg |
| --- | --- | --- |
| fotoraum köln | Venue (`off_space`) | [fotoraum-koeln.de](https://www.fotoraum-koeln.de/), [Impressum](https://www.fotoraum-koeln.de/impressum) |
| Kunsträume der Michael Horbach Stiftung | Venue (`foundation`) | [DGPh](https://www.dgph.de/ausstellungsorte/michael-horbach-stiftung), [koelngalerien.de](https://www.koelngalerien.de/orte/kunstraeume-der-michael-horbach-stiftung) |
| Internationale Photoszene Köln | Organizer | [photoszene.de](https://www.photoszene.de/) |
| Photoszene-Festival 2027 | Festival | [photoszene.de/festival](https://www.photoszene.de/de/festival/), [KölnTourismus](https://www.koelntourismus.de/erlebnisse-lifestyle/veranstaltungen/detail/photoszene-festival) |
| düsseldorf photo+ | Organizer und Festival (Biennale) | [duesseldorfphotoplus.de](https://www.duesseldorfphotoplus.de/), [DGPh](https://www.dgph.de/photofestivals/duesseldorf-photo) |

## Befunde je Kandidat

### fotoraum köln
- Off-Space für Fotografie und Kunst; Ausstellungsreihe „Wir haben Gäste“; feierte 2022 sein 20-jähriges Bestehen; Teil der Kunstinitiativen Köln (AIC).
- Anschrift: Herderstr. 88, 50935 Köln. Träger: Fotoraum Köln e.V. (Vorstand: Sibylle Mall, Bernadette Jansen, Rosanna D'Ortona). Kontakt: info@fotoraum-koeln.de.
- Öffnung: sonntags 15–18 Uhr, an Feiertagen und zu Festivals abweichend.
- Aktuell: Hannes Jung – „Men Don't Cry“, 19.09.–01.11.2026 (Finissage 01.11.). Zuletzt: Monika Czosnowska (27.06.–08.08.2026), Valentin Goppel (25.04.–07.06.2026).
- Nicht belegt: Sammlung oder Bibliothek, Stadtteil, Koordinaten.

### Michael Horbach Stiftung (Kunsträume)
- Wormser Str. 23, 50677 Köln (Südstadt), eröffnet am 1. Mai 2011 in der ehemaligen Galerie von Monika Sprüth und Rosemarie Trockel; Ableger auf Mallorca seit 2021.
- Dauerpräsentation der Sammlung in fünf Räumen und vier Kabinetten auf über 600 m²; Schwerpunkt zeitgenössische Fotografie, besonders aus Südamerika und Kuba; Fotopreis (10.000 €) alle zwei Jahre.
- Öffnung: Mi und Fr 15:30–18:30, So 11–14 Uhr und nach Vereinbarung.
- Quelle ist ein Verzeichnis (DGPh, koelngalerien.de, LVR), nicht die Stiftungsseite selbst: Die Seite `michael-horbach-stiftung.de` ist nicht abrufbar (TLS-Zertifikat gehört zu `kasserver.com`), der Abruf per Update-Skill wird daher voraussichtlich fehlschlagen.

### Internationale Photoszene Köln
- **Abweichung zur Vorgabe:** Die Seite nennt die Rechtsform **gUG** (gemeinnützige Unternehmergesellschaft), nicht e.V. Der Name im Datensatz sollte der Seite folgen (oder bewusst vom Impressum abweichen).
- Sitz: Im Mediapark 7, 50670 Köln (Adresse der Photographischen Sammlung; kein eigener Ausstellungsraum, daher Organizer).
- Angebote: Festival, Diskurs (Kongress „Not Knowing – Photography and the Unknown“, 22.–25.10.2026, Orangerie Theater), Artist Programme „Artist Meets Archive“ (5. Ausgabe läuft), Meet-ups, Jugendboard, Magazin.
- Archivpartner des Artist Programme: Deutsches Tanzarchiv Köln, Archiv der Fotowerkstätte Schmölz, Greven Archiv Digital, LVR-LandesMuseum Bonn, FrauenMediaTurm Köln (Kandidaten für `library_archive`).

### Photoszene-Festival 2027
- Biennale, immer im Mai/Juni. **Die Festivalseite nennt den Zeitraum wörtlich:** „Das kommende Photoszene-Festival wird vom 14. Mai - 13. Juni 2027 stattfinden!“ ([photoszene.de/de/festival](https://www.photoszene.de/de/festival/)); [KölnTourismus](https://www.koelntourismus.de/erlebnisse-lifestyle/veranstaltungen/detail/photoszene-festival) nennt denselben Zeitraum. Veranstalter ist die Internationale Photoszene Köln gUG.
- *Berichtigung 2026-10-28:* Die Startseite nennt nur „Mai 2027“; ich hatte daraus zunächst geschlossen, es gebe kein offizielles Datum. Die Festivalseite belegt es.
- **Abweichung zur Vorgabe:** Das Beispiel nennt 14.–23. Mai 2027 und „über 80 Ausstellungen“; der belegte Zeitraum ist 14. Mai bis 13. Juni 2027, die Ausstellungszahl ist nicht belegt. Eine eigene Festival-Website (`festival.photoszene.de`) gibt es laut Seite nicht; das Festival liegt unter `photoszene.de/de/festival/`.
- Anmeldung von Festivalausstellungen über die Website ab 1. Dezember 2026; Jugendfestival NEXT! im selben Zeitraum.

### düsseldorf photo+
- Biennale für visuelle und klangliche Medien; die nächste (vierte) Ausgabe soll **Mitte Februar 2027** mit über 50 Ausstellungen und Veranstaltungen stattfinden; Künstlerische Leitung Dr. Jana Johanna Haeckel (Quelle: Pressemeldung über Paris Photo 2026).
- **Träger und Anschrift nicht ermittelt:** Startseite und Impressum lieferten beim Abruf keinen Text; ein Datum für 2027 steht nicht fest. Teilnehmerliste 2027 noch nicht veröffentlicht. Frühere Ausgaben bezogen Museen, Stiftungen, Galerien und Off-Spaces ein.
- Daher Organizer-Datensatz nur mit gesicherten Feldern (Name, Stadt, Website, Instagram laut Seite) und kein Festivaldatensatz, bis der Zeitraum belegt ist.

## Weitere Kandidaten (noch nicht ausgewertet)

| Kandidat | Ebene (vorläufig) | Hinweis |
| --- | --- | --- |
| Zentrum für Fotografie Essen | Organizer (`network`) | Bündnis aus Folkwang Universität, Historischem Archiv Krupp, Museum Folkwang und Ruhr Museum ([fotozentrum-essen.de](https://fotozentrum-essen.de/en)) |
| Verein für Fotografie und Medienkunst Düsseldorf | Organizer oder Venue | [fotografie-und-medienkunst.de](http://www.fotografie-und-medienkunst.de/galerie.htm); Raum unklar |
| darktaxa (Düsseldorf) | Venue (`off_space`) | Teilnehmer von düsseldorf photo+ 2022 |
| K21 Kunstsammlung NRW, Düsseldorf | Venue (`museum`) | im DGPh-Verzeichnis, Fotografie nur zeitweise |
| Künstlerhaus Dortmund | Venue (`off_space`) | Fotografie nur zeitweise |
| Deutsches Tanzarchiv, Fotowerkstätte Schmölz, Greven Archiv, FrauenMediaTurm | Venue (`library_archive`) | Archivpartner von Artist Meets Archive; Fotografiebezug und Zugang prüfen |

**Nicht aufgenommen:** Forum Fotografie Köln (DGPh-Eintrag, Schönhauser Str. 8) trägt dieselbe Adresse wie die Zander Galerie und ist vermutlich derselbe Ort; Galerien mit reinem Kunsthandel ohne Fotografieschwerpunkt (PRD 1.3).

## Folgerungen für das Datenmodell
- Das Festival hat einen Zeitraum und kommt mit mehreren Ausgaben je Veranstalter vor; als `organizers`-Eintrag mit `type: festival` lässt sich das nicht abbilden. Ein eigener Datensatz `festivals` ist nötig.
- Die Webanwendung liest `festivalId` heute als **Veranstalter-ID** (ORG-UB-3, ORG-UB-4). Mit `festivals.json` ändert sich die Bedeutung (Supersede).
- `type` von Organizern erlaubt `association`, `festival`, `network`, `foundation`; eine gUG passt in keinen Wert eindeutig (vorläufig `association`).

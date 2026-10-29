# SERVICE-11-STORY-02 – Icon im Kopfbereich vor dem Namen

**Als** Besucher:in **möchte ich** im Kopfbereich jeder Seite das Icon vor „Praktische Fotografie“ sehen, **damit** ich die Anwendung auf jeder Seite an ihrem Erkennungszeichen erkenne und wie bisher über den Namen zur Startseite gelange.

## Akzeptanzkriterien
1. Auf jeder Seite steht im Kopfbereich das Icon unmittelbar vor dem Text „Praktische Fotografie“.
2. Icon und Text gehören zum selben Link zur Startseite; ein Klick auf eines von beiden führt zur Startseite.
3. Screenreader lesen den Link weiterhin als „Praktische Fotografie“ vor; das Icon wird nicht zusätzlich angesagt.
4. Die Kopfzeile springt beim Laden des Bildes nicht und wird durch das Icon nicht wesentlich höher.
5. Das Icon ist auch auf schmalen Bildschirmen sichtbar, ohne die Navigation zu verdrängen.

## Abhängigkeiten
`SERVICE-11-STORY-01` (das Icon als Datei).

## Spezifikation (Phase 3, vorab erstellt)
- EARS: ICO-UB-3, ICO-UB-4, ICO-UB-5, ICO-UB-6
- Gherkin: `web/markenicon.feature` (Icon im Kopfbereich, Icon auf jeder Seite gleich, Pfade relativ zum Basispfad)
- Quality: Q-USE-11, Q-PERF-7; Ergänzung Q-USE-4
- ADR: ADR-017, ADR-002

**INVEST:** I (abhängig von STORY-01) N ✔ V ✔ E ✔ S ✔ T ✔

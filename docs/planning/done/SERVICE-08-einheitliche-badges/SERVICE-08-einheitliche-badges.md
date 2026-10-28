# SERVICE-08 – Einheitliche Badges bei Ausstellungen

**Status:** Entwurf (Backlog), Stories und Spezifikation vorbereitet, Fragen an H1 beantwortet (Freigabe steht aus)  ·  **Quelle:** Vorgabe der Projektleitung, Ergebnis von SERVICE-02 und SERVICE-07

## Ziel
Die Badges von Ausstellungen sehen im Kalender, im Magazin und auf den Ausstellungsseiten gleich aus: zuerst die genaue Art („Gruppenausstellung“ bei mehreren Fotograf:innen, „Einzelausstellung“ bei einer Person), danach Status („Kommend“, „Laufend“, „Endet bald“, „Beendet“) bzw. Anlass; zwischen mehreren Badges steht ein Abstand in der Breite eines Leerzeichens.

**Zweck in einem Satz:** Besucher:innen sollen Ausstellungen überall am gleichen Aufbau der Badges erkennen und die Art genauer lesen können.

**Erfolgskriterien**
- Die Badge-Zeile beginnt auf allen fünf Seiten (Agenda, Magazinkarte, Beitragsseite, Ausstellungsliste, Ausstellungsdetail) mit der Art; danach folgt Status bzw. Anlass.
- Die Art folgt der Zahl der Personen (BDG-UB-1); Retrospektive und Dauerausstellung bleiben erhalten.
- Der Abstand zwischen zwei Badges beträgt 0,25 em; die Ausstellungsliste zeigt die Badge-Zeile über der Überschrift.

## Kontext
- Kalender: `Ausstellung` (kind), danach „Endet bald“ bzw. „Beendet“; Badges berühren sich.
- Magazin: Anlass vor Art (SERVICE-07).
- Ausstellungsliste: nur Status unter dem Datum.
- Ausstellungsdetail: Status, dann gespeicherter Typ.
- Bestandsdaten sind konsistent: `solo` hat eine Person, `group` mindestens zwei, Duane Michals ist `retrospective` mit einer Person.

## Story-Schnitt
1. `STORY-01` Art der Ausstellung aus den Personen und gemeinsame Badge-Zeile
2. `STORY-02` Badge-Zeilen in Kalender, Magazin und Ausstellungsseiten

## Abgrenzung
**Nicht enthalten:** Badges auf Orts-, Fotograf:innen-, Veranstalter- und Festivalseiten, Event-Badges, neue Datenfelder, Änderung der Statusregeln (EXH-UB-2).

## Betroffene Bereiche
`web` (Komponenten, Seiten), `content` (Validierung der Art).

## Vorbereitete Spezifikation (Phase 3)
- EARS: `web/badges.md` (BDG-UB-1 bis BDG-UB-4), CAL-UB-7 (ersetzt CAL-UB-4), BLG-UB-9 (ersetzt BLG-UB-6), EXH-UB-8, EXH-UB-9 (ersetzt EXH-UB-4), `content/fotografinnen-profile.md` (PRF-UN-3)
- Gherkin: `web/badges.feature`, `web/kalender.feature`, `web/blog.feature`, `web/ausstellungen.feature`, `content/fotografinnen-profile.feature`
- Quality: Q-USE-7, Q-DATA-11, Ergänzung Q-USE-4
- ADR: ADR-014 (`Proposed`)

## Entschieden (vor H1, 2026-10-28)
- Im Kalender ersetzt die genaue Art („Gruppenausstellung“, „Einzelausstellung“) die allgemeine Beschriftung „Ausstellung“; sie steht nicht zusätzlich da. Events bleiben „Event“.
- „Retrospektive“ und „Dauerausstellung“ bleiben bestehen; die Personenzahl entscheidet nur bei `solo` und `group`.
- „Ein Leerzeichen breit“ sind 0,25 em.
- Im Kalender zeigt die Badge-Zeile weiter nur „Endet bald“ und „Beendet“, in der Ausstellungsliste alle vier Status.
- Badges auf Orts-, Fotograf:innen-, Veranstalter- und Festivalseiten bleiben unverändert.
- Das Datenfeld `type` bleibt bestehen; der Validator prüft `solo` und `group` gegen die Personenzahl (PRF-UN-3).

## Annahmen
Keine offenen Annahmen.

## Qualitätserwartungen
Q-USE-4, Q-USE-7, Q-DATA-11.

## Definition of Done
- Spezifikation konsistent, ADR-014 bestätigt.
- `npm test`, `npm run lint`, `npm run validate:data`, `npm run web:test`, `npm run web:lint` grün; Build prerendert die Seiten.

## Risiken
- **Fachlich:** Art aus der Personenzahl kann bei später erfassten Personen springen (zum Beispiel wenn Personen ergänzt werden); Gegenmaßnahme: Validator PRF-UN-3.
- **Technisch:** Browserabhängige Tests auf berechnete Abstände; Gegenmaßnahme: Toleranz ±0,01 em und feste Referenzwerte.

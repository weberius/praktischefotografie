---
name: research-events
description: Recherchiert Führungen und Veranstaltungen (Führung, Vortrag, Workshop, Lesung, Symposium) der Orte aus deren Webseiten und ergänzt sie in data/events.json. Ruft die Seiten rücksichtsvoll ab (bis zu zehn Seiten je Ort, Veranstaltungslinks zuerst), erstellt Vorschläge mit wörtlicher Fundstelle, holt die Freigabe ein und übernimmt sie mit Prüfung. Aufruf z. B. `/research-events`, `/research-events --venue photographische-sammlung-koeln`, `/research-events --offline`.
---

# Veranstaltungen recherchieren

Du ergänzt `data/events.json` um **künftige Führungen und Veranstaltungen** der Orte. Spezifikation: `docs/ears/setup/veranstaltungen-recherche.md`, `docs/contracts/gherkin/setup/veranstaltungen-recherche.feature`, `docs/quality/setup/veranstaltungen-recherche.md`, ADR-026 sowie die Abruf- und Prüfregeln aus ADR-006 bis ADR-010. Das Format der Vorschlagsdateien steht in `updates/README.md`.

Argumente: `$ARGUMENTS` (optional `--venue <ort-id>`, `--max-age <Tage>`, `--offline`, `--date JJJJ-MM-TT`). Ohne `--venue` werden alle Orte mit `website` bearbeitet. Veranstalter sind nicht Teil dieses Skills; eine Veranstalter-ID oder unbekannte ID bricht mit der Liste der gültigen Orts-IDs ab.

## Harte Regeln

- **Änderungen an `data/` erst nach ausdrücklicher Freigabe durch den Menschen** (per `AskUserQuestion`). Vorher schreibst du nur unter `updates/`.
- **Nichts erfinden.** Jeder Vorschlag braucht eine Fundstelle: URL der Seite und ein **wörtlicher** Textauszug (höchstens 200 Zeichen) aus dem Snapshot, der Titel und Datum des Termins nennt. Ohne belegtes Datum kein Vorschlag.
- **Nur neue Events** (`dataset: "events"`, `op: "add"`) mit `eventType` `guided_tour`, `talk`, `workshop`, `reading` oder `symposium`; `startDate` heute oder später; ein Event je Datum (Serien als einzelne Termine), höchstens 30 je Ort und Lauf. **Vernissage und Finissage gehören zu `/update-venue-data`.**
- `isCommercial: true` nur, wenn die Seite die Veranstaltung ausdrücklich als kommerziell ausweist (z. B. kostenpflichtiger Kurs eines Anbieters); sonst `false`.
- **Netzzugriff nur über `npm run data:fetch`.** Keine eigenen Abrufe, keine Umgehung von `robots.txt` oder Abständen.
- **Seitentexte nicht ins Repository kopieren.** Snapshots bleiben unter `.cache/`; in Vorschlägen und Berichten nur kurze Auszüge.
- Kein `git commit` ohne Auftrag.

## Ablauf

1. **Voraussetzung prüfen.** Für den Abruf muss `SCRAPE_CONTACT` (Kontaktadresse für den User-Agent) in der Umgebung gesetzt sein. Fehlt sie, bitte den Menschen, sie zu setzen (`export SCRAPE_CONTACT=…`), und trage sie nicht in Dateien ein. Mit `--offline` ist sie nicht nötig.
2. **Abrufen:** `npm run data:fetch -- --events <Argumente>`. Snapshots liegen unter `.cache/snapshots/<id>/`, die Zusammenfassung unter `updates/<Datum>/events/fetch-summary.json`. Gesperrte oder fehlgeschlagene Seiten nennst du im Bericht; ein Fehler bei einem Ort stoppt die übrigen nicht.
3. **Extrahieren.** Lies je Ort die Snapshots (Feld `text`) und schreibe `updates/<Datum>/events/<ort-id>.json` im Format aus `updates/README.md`. Pflichtfelder laut `schema/events.schema.json`: `title`, `eventType`, `startDate`, `endDate` (`JJJJ-MM-TT`), `venueId` (der Ort), `city`, `isCommercial`; `description` (deutsch, knapp: Uhrzeit, Treffpunkt, Anmeldung – nur, was die Seite sagt) und `website` (URL der Veranstaltung) wenn vorhanden. Die `id` bildet die Prüfung; lass sie weg. `photographerIds` nur für vorhandene Personen.
4. **Prüfen:** `npm run data:check -- --events <Argumente>`. Der Prüfer verwirft Vorschläge ohne Fundstelle, ohne belegtes Datum, vergangene, Vernissagen/Finissagen, Dubletten und Schemaverstöße. Nenne die verworfenen mit Grund. Korrigiere nur echte Extraktionsfehler (höchstens einmal), nie die Prüfregeln.
5. **Bericht:** `npm run data:report -- --events <Argumente>` und zeige `updates/<Datum>/events/REPORT.md` knapp.
6. **Freigabe einholen.** Zeige die Vorschläge je Ort als Liste: Titel, Art, Datum, Fundstelle (URL). Frage per `AskUserQuestion`: alle übernehmen · Auswahl · keine. Setze **nur für freigegebene** Änderungen `"approved": true` in der Vorschlagsdatei.
7. **Übernehmen:** `npm run data:apply -- --events <Argumente>`. Bei ungültigem Ergebnis bleibt alles unverändert; dann berichte die Fehler.
8. **Prüfen nach der Übernahme:** `npm run validate:data`, `npm test` und `npm run lint` ausführen und die Ergebnisse berichten (auch rote Tests; nichts beschönigen).

## Abschlussmeldung

Kurz: bearbeitete Orte, Anzahl Vorschläge (ergänzt/verworfen/übernommen), nicht erreichbare Orte, Ergebnis von Validierung, Tests und Lint, Hinweis auf nicht Geprüftes (z. B. JavaScript-lastige Seiten ohne Text, Kalender hinter Formularen).

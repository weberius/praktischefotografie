---
name: update-venue-data
description: Aktualisiert und vervollständigt die Daten (data/) zu Orten, Veranstaltern und Festivals aus deren Webseiten und pflegt das Magazin mit Neuigkeiten zu Ausstellungen (neu, Eröffnung, Endet bald, Ende). Ruft die Seiten rücksichtsvoll ab, erstellt Vorschläge mit Fundstelle, holt die Freigabe ein und übernimmt sie mit Prüfung. Aufruf z. B. `/update-venue-data`, `/update-venue-data --venue makk-koeln`, `/update-venue-data --offline`.
---

# Ortsdaten aktualisieren

Du aktualisierst `data/venues.json` sowie die Ausstellungen, Events und Fotograf:innen der Orte aus den **Webseiten der Orte**. Spezifikation: `docs/ears/setup/webseiten-abruf.md`, `datenaktualisierung.md`, `update-skill.md`, `magazin-neuigkeiten.md`, `docs/ears/content/festivals-veranstalter.md`, ADR-006, ADR-007, ADR-008, ADR-009 und ADR-010. Das Format der Vorschlagsdateien steht in `updates/README.md`.

Argumente: `$ARGUMENTS` (optional `--venue <ort-oder-veranstalter-id>`, `--max-age <Tage>`, `--offline`, `--date JJJJ-MM-TT`). Ohne `--venue` werden alle Quellen bearbeitet: alle Orte und alle Veranstalter mit `website`.

## Harte Regeln

- **Änderungen an `data/` erst nach ausdrücklicher Freigabe durch den Menschen** (per `AskUserQuestion`). Vorher schreibst du nur unter `updates/`.
- **Nichts erfinden.** Jeder Vorschlag braucht eine Fundstelle: URL der Seite und ein **wörtlicher** Textauszug (höchstens 200 Zeichen) aus dem Snapshot, der den neuen Wert enthält. Fehlt der Beleg, schlägst du nichts vor.
- **`source` und `source.status` schlägst du nie vor.** Der Status `verifiziert` wird nur von Menschen vergeben; Vorschläge zu verifizierten Orten werden als Konflikt gemeldet und nicht übernommen.
- **Netzzugriff nur über `npm run data:fetch`.** Keine eigenen Abrufe, keine Umgehung von `robots.txt` oder Abständen.
- **Seitentexte nicht ins Repository kopieren.** Snapshots bleiben unter `.cache/`; in Vorschlägen und Berichten nur kurze Auszüge.
- **Neuigkeiten erst nach ausdrücklicher Freigabe** durch den Menschen übernehmen (Schritt 9). Vorher schreibst du nur unter `updates/`.
- **Neuigkeitentexte erfinden nichts.** Nur Angaben aus `data/` (Ausstellung, Fotograf:innen, Ort) und den Snapshots; fehlt etwas, lässt du es weg.
- Kein `git commit` ohne Auftrag.

## Ablauf

1. **Voraussetzung prüfen.** Für den Abruf muss `SCRAPE_CONTACT` (Kontaktadresse für den User-Agent) in der Umgebung gesetzt sein. Fehlt sie, bitte den Menschen, sie zu setzen (`export SCRAPE_CONTACT=…`), und trage sie nicht in Dateien ein. Mit `--offline` ist sie nicht nötig.
2. **Abrufen:** `npm run data:fetch -- <Argumente>` (Orte und Veranstalter, Snapshots unter `.cache/snapshots/<id>/`). Lies die Ausgabe und `updates/<Datum>/fetch-summary.json`. Fehlgeschlagene oder durch `robots.txt` gesperrte Seiten nennst du im Bericht; sie werden nicht umgangen.
3. **Extrahieren.** Für jeden Ort mit Snapshots (`.cache/snapshots/<venue-id>/*.json`, Feld `text`) vergleichst du den Text mit den vorhandenen Daten und schreibst `updates/<Datum>/<venue-id>.json` im Format aus `updates/README.md`. Zielfelder:
   - Ort (`venues`): `district`, `address.*`, `website`, `features.hasPermanentCollection`, `features.hasReferenceLibrary`, `features.libraryNotes`.
   - Neue Ausstellungen und Events dieses Ortes (`op: "add"`) mit allen Pflichtfeldern aus `schema/`; Daten als `JJJJ-MM-TT`; kommerzielle Events mit `isCommercial: true`; `photographerIds` nur für vorhandene Personen.
   - Die Art `type` neuer Ausstellungen passt zur Zahl der Personen: `solo` bei höchstens einer Person, `group` bei mehreren; `retrospective` und `permanent` nur, wenn die Seite es belegt. Die Prüfung verwirft andere Kombinationen.
   - Neue Fotograf:innen nur mit Beleg (`dataset: "photographers"`, `op: "add"`) und **vor** den Ausstellungen, die sie nennen. **Alle** im Seitentext genannten Personen, deren Bilder in der Ausstellung gezeigt werden (auch Studios und Duos wie „Atelier Binder“), werden ergänzt und in `photographerIds` aufgenommen; Kurator:innen, Sammler:innen, Musiker:innen und Redner:innen ohne gezeigte Bilder nicht. Die `description` der Ausstellung nennt **alle** diese Namen (Schreibweise wie in `name`); sonst verwirft der Prüfer den Vorschlag.
   - Profile (Wikipedia, Portrait) recherchierst du nicht hier, sondern mit dem Skill `/research-photographers`.
   - Veranstalter und Festivals (Quelle ist die Website des Veranstalters oder eines Ortes): Schreibe für Veranstalter-Websites `updates/<Datum>/<organizer-id>.json` mit `organizerId` statt `venueId`.
     - Veranstalter (`organizers`): `shortName`, `description`, `website`, `city`, `social.instagram`; neue Veranstalter nur mit Beleg. Orte und Veranstalter dürfen nie dieselbe `id` haben.
     - Festivals (`festivals`, `op: "add"` oder `set`): `organizerId`, `title`, `startDate`, `endDate`, `city`, optional `description` und `website`. **Nie ein Festival ohne belegten Zeitraum:** Start- und Enddatum müssen in der Fundstelle stehen; „Mai 2027“ oder „Mitte Februar“ genügt nicht. Fehlt der Zeitraum, schlägst du das Festival nicht vor.
     - Festivalzuordnung neuer Ausstellungen: `festivalId` (ein vorhandenes oder in derselben Datei zuvor ergänztes Festival) und `isOfficialFestivalPartner: true` nur, wenn die Seite die Teilnahme bzw. Partnerschaft belegt. Reihenfolge in der Datei: Veranstalter, Festival, Ausstellungen.
     - Bereich: Eine Veranstalter-Website darf den eigenen Veranstalter und dessen Festivals sowie Ausstellungen dieser Festivals vorschlagen; eine Ort-Website darf zusätzlich Veranstalter und Festivals neu aufnehmen, aber nicht ändern.
   - Zulässige Werte: `type` der Orte `museum`, `gallery`, `foundation`, `off_space`, `library_archive`. Nichts zu Kamerahandel oder Dienstleistern (PRD 1.3).
4. **Prüfen:** `npm run data:check -- <Argumente>`. Der Prüfer verwirft Vorschläge ohne Fundstelle im Snapshot, mit Schemaverstoß oder als Dublette. Nenne die verworfenen mit Grund. Korrigiere nur echte Extraktionsfehler (höchstens einmal), nie die Prüfregeln.
5. **Bericht:** `npm run data:report -- <Argumente>` und zeige `updates/<Datum>/REPORT.md` knapp.
6. **Freigabe einholen.** Zeige die Vorschläge je Ort als Liste: Datensatz, Feld, alter → neuer Wert, Art (ergänzt/geändert), Fundstelle (URL). Konflikte nennst du gesondert als „nicht übernehmbar“. Frage per `AskUserQuestion`: alle übernehmen · Auswahl · keine. Bei „Auswahl“ frage nach den Vorschlags-IDs. Setze **nur für freigegebene** Änderungen `"approved": true` in der Vorschlagsdatei.
7. **Übernehmen:** `npm run data:apply -- <Argumente>`. Bei ungültigem Ergebnis bleibt alles unverändert; dann berichte die Fehler.
8. **Neuigkeiten planen:** `npm run news:plan -- <Argumente>` (es gelten nur `--venue` und `--date`). Wurde `--venue` mit einer Veranstalter-ID aufgerufen, lässt du `--venue` hier weg. Der Plan `updates/<Datum>/news.json` enthält je Ausstellung die fehlenden Anlässe `neu`, `eroeffnung`, `endet-bald` und `ende`, auch vergangene und zukünftige (Datum = Datum des Beitrags; das Magazin zeigt Zukünftiges erst an dem Tag), sowie als `angepasst` Beiträge, deren Termin sich geändert hat. Ohne Einträge geht es mit Schritt 10 weiter.
9. **Texte schreiben, prüfen, freigeben.**
   - Ergänze je Eintrag `title`, `excerpt` (Kurztext, höchstens 300 Zeichen) und `text` im Plan. Der `title` ist **immer** `expectedTitle` aus dem Plan: Ausstellungstitel, „in“ und Stadt, **ohne Anlass** (z. B. „MYSTERIUM DER PAARE in Monschau“); den Anlass zeigt die Webanwendung als Badge. Die Prüfung verwirft jeden anderen Titel. Der Text hat **60 bis 80 Wörter** und geht auf die **Ausstellung**, die **Künstler:innen** und die **Galerie bzw. das Museum** ein. Er nennt den Titel der Ausstellung, den Namen des Ortes und alle Namen aus `context.photographers` wörtlich. Anlass: `neu` kündigt die Ausstellung an, `eroeffnung` meldet den Eröffnungstag, `endet-bald` weist auf das nahe Ende hin, `ende` blickt auf die beendete Ausstellung zurück.
   - Nenne **absolute Daten** (z. B. „bis 1. November“), nie „heute“ oder „morgen“; der Beitrag erscheint an einem anderen Tag. Schreibe nur, was in `context` oder den Snapshots (`.cache/snapshots/<venue-id>/*.json`) steht. Kein HTML, keine Überschriften.
   - Prüfen: `npm run news:check`. Korrigiere ungültige Texte (Wortzahl, fehlende Namen) höchstens zweimal. Zeige den Bericht `updates/<Datum>/NEWS.md`.
   - Zeige je Eintrag Anlass, Datum, Titel und Text. Frage per `AskUserQuestion`: alle übernehmen · Auswahl · keine. Setze **nur für freigegebene** Einträge `"approved": true` im Plan.
   - Übernehmen: `npm run news:apply`. Bei ungültigem Ergebnis bleibt alles unverändert; berichte die Fehler. Verwaiste Beiträge nennst du im Bericht und löschst sie nicht.
10. **Prüfen nach der Übernahme:** `npm run validate:data`, `npm test` und `npm run lint` ausführen und die Ergebnisse berichten (auch rote Tests; nichts beschönigen). Verweise auf `git diff data content updates` zur Durchsicht.

## Abschlussmeldung

Kurz: bearbeitete Orte und Veranstalter, Anzahl Vorschläge (ergänzt/geändert/verworfen/übernommen/Konflikte), Festivals (ergänzt/verworfen/übernommen), Neuigkeiten (geplant/verworfen/übernommen je Anlass), Fehler beim Abruf, Ergebnis von Validierung, Tests und Lint, Hinweis auf nicht Geprüftes (z. B. Inhalt der Seiten, JavaScript-lastige Seiten ohne Text).

---
name: update-venue-data
description: Aktualisiert und vervollständigt die Ortsdaten (data/) aus den Webseiten der Orte. Ruft die Seiten rücksichtsvoll ab, erstellt Vorschläge mit Fundstelle, holt die Freigabe ein und übernimmt sie mit Prüfung. Aufruf z. B. `/update-venue-data`, `/update-venue-data --venue makk-koeln`, `/update-venue-data --offline`.
---

# Ortsdaten aktualisieren

Du aktualisierst `data/venues.json` sowie die Ausstellungen, Events und Fotograf:innen der Orte aus den **Webseiten der Orte**. Spezifikation: `docs/ears/setup/webseiten-abruf.md`, `datenaktualisierung.md`, `update-skill.md`, ADR-006 und ADR-007. Das Format der Vorschlagsdateien steht in `updates/README.md`.

Argumente: `$ARGUMENTS` (optional `--venue <id>`, `--max-age <Tage>`, `--offline`, `--date JJJJ-MM-TT`). Ohne `--venue` werden alle Orte bearbeitet.

## Harte Regeln

- **Änderungen an `data/` erst nach ausdrücklicher Freigabe durch den Menschen** (per `AskUserQuestion`). Vorher schreibst du nur unter `updates/`.
- **Nichts erfinden.** Jeder Vorschlag braucht eine Fundstelle: URL der Seite und ein **wörtlicher** Textauszug (höchstens 200 Zeichen) aus dem Snapshot, der den neuen Wert enthält. Fehlt der Beleg, schlägst du nichts vor.
- **`source` und `source.status` schlägst du nie vor.** Der Status `verifiziert` wird nur von Menschen vergeben; Vorschläge zu verifizierten Orten werden als Konflikt gemeldet und nicht übernommen.
- **Netzzugriff nur über `npm run data:fetch`.** Keine eigenen Abrufe, keine Umgehung von `robots.txt` oder Abständen.
- **Seitentexte nicht ins Repository kopieren.** Snapshots bleiben unter `.cache/`; in Vorschlägen und Berichten nur kurze Auszüge.
- Kein `git commit` ohne Auftrag.

## Ablauf

1. **Voraussetzung prüfen.** Für den Abruf muss `SCRAPE_CONTACT` (Kontaktadresse für den User-Agent) in der Umgebung gesetzt sein. Fehlt sie, bitte den Menschen, sie zu setzen (`export SCRAPE_CONTACT=…`), und trage sie nicht in Dateien ein. Mit `--offline` ist sie nicht nötig.
2. **Abrufen:** `npm run data:fetch -- <Argumente>`. Lies die Ausgabe und `updates/<Datum>/fetch-summary.json`. Fehlgeschlagene oder durch `robots.txt` gesperrte Seiten nennst du im Bericht; sie werden nicht umgangen.
3. **Extrahieren.** Für jeden Ort mit Snapshots (`.cache/snapshots/<venue-id>/*.json`, Feld `text`) vergleichst du den Text mit den vorhandenen Daten und schreibst `updates/<Datum>/<venue-id>.json` im Format aus `updates/README.md`. Zielfelder:
   - Ort (`venues`): `district`, `address.*`, `website`, `features.hasPermanentCollection`, `features.hasReferenceLibrary`, `features.libraryNotes`.
   - Neue Ausstellungen und Events dieses Ortes (`op: "add"`) mit allen Pflichtfeldern aus `schema/`; Daten als `JJJJ-MM-TT`; kommerzielle Events mit `isCommercial: true`; `photographerIds` nur für vorhandene Personen.
   - Neue Fotograf:innen nur mit Beleg (`dataset: "photographers"`, `op: "add"`) und **vor** den Ausstellungen, die sie nennen.
   - Zulässige Werte: `type` der Orte `museum`, `gallery`, `foundation`, `off_space`, `library_archive`. Nichts zu Kamerahandel oder Dienstleistern (PRD 1.3).
4. **Prüfen:** `npm run data:check -- <Argumente>`. Der Prüfer verwirft Vorschläge ohne Fundstelle im Snapshot, mit Schemaverstoß oder als Dublette. Nenne die verworfenen mit Grund. Korrigiere nur echte Extraktionsfehler (höchstens einmal), nie die Prüfregeln.
5. **Bericht:** `npm run data:report -- <Argumente>` und zeige `updates/<Datum>/REPORT.md` knapp.
6. **Freigabe einholen.** Zeige die Vorschläge je Ort als Liste: Datensatz, Feld, alter → neuer Wert, Art (ergänzt/geändert), Fundstelle (URL). Konflikte nennst du gesondert als „nicht übernehmbar“. Frage per `AskUserQuestion`: alle übernehmen · Auswahl · keine. Bei „Auswahl“ frage nach den Vorschlags-IDs. Setze **nur für freigegebene** Änderungen `"approved": true` in der Vorschlagsdatei.
7. **Übernehmen:** `npm run data:apply -- <Argumente>`. Bei ungültigem Ergebnis bleibt alles unverändert; dann berichte die Fehler.
8. **Prüfen nach der Übernahme:** `npm run validate:data`, `npm test` und `npm run lint` ausführen und die Ergebnisse berichten (auch rote Tests; nichts beschönigen). Verweise auf `git diff data updates` zur Durchsicht.

## Abschlussmeldung

Kurz: bearbeitete Orte, Anzahl Vorschläge (ergänzt/geändert/verworfen/übernommen/Konflikte), Fehler beim Abruf, Ergebnis von Validierung, Tests und Lint, Hinweis auf nicht Geprüftes (z. B. Inhalt der Seiten, JavaScript-lastige Seiten ohne Text).

---
name: research-photographers
description: Recherchiert Fotograf:innen über Wikidata, die Wikipedia in mehreren Sprachen und Wikimedia Commons und ergänzt Berufsbezeichnung, Lebensdaten, Wikipedia-Zusammenfassung und Portrait mit Bildnachweis. Ruft Wikimedia rücksichtsvoll ab, schreibt eigene Zusammenfassungen, holt die Freigabe ein und übernimmt sie mit Prüfung. Aufruf z. B. `/research-photographers`, `/research-photographers --photographer august-sander`, `/research-photographers --offline`.
---

# Fotograf:innen recherchieren

Du ergänzst in `data/photographers.json` die Profile der Personen aus **Wikidata, Wikipedia (mehrere Sprachen) und Wikimedia Commons**. Spezifikation: `docs/ears/setup/fotografinnen-recherche.md`, `docs/ears/content/fotografinnen-profile.md`, ADR-011 und ADR-012. Format der Dateien: `updates/README.md`.

Argumente: `$ARGUMENTS` (optional `--photographer <id>`, `--force`, `--offline`, `--max-age <Tage>`, `--date JJJJ-MM-TT`). Ohne `--photographer` werden alle Personen ohne Wikipedia-Zusammenfassung oder ohne Portrait bearbeitet.

## Harte Regeln

- **Änderungen an `data/` erst nach ausdrücklicher Freigabe durch den Menschen** (per `AskUserQuestion`). Vorher schreibst du nur unter `updates/`.
- **Netzzugriff nur über `npm run photographers:fetch`.** Keine eigenen Abrufe (kein WebFetch, kein curl), keine Umgehung von Abständen oder Hosts.
- **Eigene Formulierung.** Zusammenfassungen sind in deinen Worten geschrieben (Deutsch, **40 bis 90 Wörter**). Keine wörtliche Folge von acht oder mehr Wörtern aus den Anfangstexten (die Prüfung verwirft sie).
- **Nichts erfinden.** Du schreibst nur, was in den Anfangstexten der Artikel (`articles[].extract`) steht. Fehlt eine Angabe, lässt du sie weg. Übersetze aus den vorhandenen Sprachen, ohne Angaben zu ergänzen.
- **Nur freie Bilder mit Nachweis.** Ein Portrait wird nur vorgeschlagen, wenn die Kandidatendatei es mit freier Lizenz, Urheber und Dateiseite enthält. Du lädst keine Bilder selbst.
- **Mehrdeutige oder nicht gefundene Personen** bleiben unverändert; du rätst keine Treffer.
- Vorhandene Profile werden nur mit `--force` und ausdrücklicher Freigabe ersetzt.
- Kein `git commit` ohne Auftrag.

## Ablauf

1. **Voraussetzung prüfen.** Für den Abruf muss `SCRAPE_CONTACT` (Kontaktadresse für den User-Agent) in der Umgebung gesetzt sein. Fehlt sie, bitte den Menschen, sie zu setzen (`export SCRAPE_CONTACT=…`), und trage sie nicht in Dateien ein. Mit `--offline` ist sie nicht nötig (Antworten aus `.cache/wikipedia/`).
2. **Abrufen:** `npm run photographers:fetch -- <Argumente>`. Lies die Ausgabe und `updates/<Datum>/photographers-candidates.json`. Je Person steht dort `status` (`gefunden`, `nicht gefunden`, `mehrdeutig`, `Fehler`), `wikidataId`, `occupations`, `life`, `articles` (Sprache, Titel, Kurzbeschreibung `description`, Anfangstext `extract`, Reihenfolge Deutsch, Englisch, Französisch, Spanisch, Italienisch, Niederländisch, danach alphabetisch; höchstens drei) und `portrait` (mit Lizenz) bzw. `portraitNote`. Nicht gefundene, mehrdeutige und fehlgeschlagene Personen nennst du im Bericht.
3. **Vorschläge schreiben.** Für jede Person mit Status `gefunden` und mindestens einem Artikel schreibst du einen Eintrag in `updates/<Datum>/photographers.json`:
   ```json
   { "date": "2026-10-28", "proposals": [
     { "id": "august-sander", "occupation": "Fotograf", "summary": "…", "sources": ["de", "en"], "portrait": true }
   ] }
   ```
   - `occupation`: kurze Berufsbezeichnung auf Deutsch, so wie die Wikipedia die Person nennt (Kurzbeschreibung `description`, erster Satz), z. B. „Fotografin“ oder „Medienkünstler“; höchstens 60 Zeichen.
   - `summary`: 40 bis 90 Wörter zu Person, Werk und Bedeutung, nur aus den Anfangstexten, eigene Worte.
   - `sources`: die Sprachen der Artikel, aus denen du geschöpft hast (1 bis 3, nur aus `articles`).
   - `portrait`: `true`, wenn die Kandidatendatei ein Portrait enthält; sonst `false`.
   - Lebensdaten und Bildnachweis trägst du **nicht** ein; sie kommen aus der Kandidatendatei.
4. **Prüfen:** `npm run photographers:check`. Verworfene Vorschläge nennst du mit Grund. Korrigiere ungültige Zusammenfassungen höchstens zweimal (Wortzahl, wörtliche Folgen); nie die Prüfregeln.
5. **Freigabe einholen.** Zeige je Person: Name, Berufsbezeichnung, Lebensdaten, Quellen (Sprache), Zusammenfassung, Portrait (Lizenz, Urheber, Dateiseite) und ob ein Profil ersetzt würde. Frage per `AskUserQuestion`: alle übernehmen · Auswahl · keine. Setze **nur für freigegebene** Vorschläge `"approved": true` in der Datei.
6. **Übernehmen:** `npm run photographers:apply -- <Argumente>` (mit `--force` nur nach ausdrücklicher Freigabe zum Ersetzen). Bei ungültigem Ergebnis bleibt alles unverändert; dann berichte die Fehler.
7. **Prüfen nach der Übernahme:** `npm run validate:data`, `npm test` und `npm run lint` ausführen und die Ergebnisse berichten (auch rote Tests; nichts beschönigen). Verweise auf `git diff data updates` zur Durchsicht.

## Abschlussmeldung

Kurz: bearbeitete Personen, Anzahl gefunden / nicht gefunden / mehrdeutig / Fehler, Vorschläge (geprüft / verworfen / übernommen), Portraits mit Lizenz, Ergebnis von Validierung, Tests und Lint, Hinweis auf nicht Geprüftes (z. B. Sachrichtigkeit der Zusammenfassungen, richtige Person bei Namensgleichheit).

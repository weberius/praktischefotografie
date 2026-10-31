---
name: research-photographers
description: Recherchiert Fotograf:innen über Wikidata, die Wikipedia in mehreren Sprachen und Wikimedia Commons und ergänzt Berufsbezeichnung, Lebensdaten, Wikipedia-Zusammenfassung und Portrait mit Bildnachweis. Ruft Wikimedia rücksichtsvoll ab, schreibt eigene Zusammenfassungen, holt die Freigabe ein und übernimmt sie mit Prüfung. Mit `--web` zusätzlich Websuche nach einer Person mit Linksammlung und Webkurztext. Aufruf z. B. `/research-photographers`, `/research-photographers --photographer august-sander`, `/research-photographers --offline`, `/research-photographers --web --name "Wendy Red Star"`.
---

# Fotograf:innen recherchieren

Du ergänzst in `data/photographers.json` die Profile der Personen aus **Wikidata, Wikipedia (mehrere Sprachen) und Wikimedia Commons**. Spezifikation: `docs/ears/setup/fotografinnen-recherche.md`, `docs/ears/content/fotografinnen-profile.md`, ADR-011 und ADR-012. Format der Dateien: `updates/README.md`.

Argumente: `$ARGUMENTS` (optional `--photographer <id>`, `--force`, `--offline`, `--max-age <Tage>`, `--date JJJJ-MM-TT`, `--no-web`, `--web`, `--name "<Name>"`). Ohne `--photographer` werden alle Personen ohne Wikipedia-Zusammenfassung oder ohne Portrait bearbeitet.

Ein Lauf umfasst **beides**: die Wikipedia in allen Sprachen (Ablauf unten) und das Web in mehreren Sprachen (Abschnitt „Websuche“; Spezifikation: `docs/ears/setup/recherche-in-allen-sprachen.md`, ADR-020). Alle Fundstellen werden als Links in `updates/photographers-links.json` gespeichert; die Seiten dahinter (Snapshots) fließen in den Text ein. **Mit `--no-web` entfällt die Websuche: keine Suchmaschine, keine Trefferseite.** `--web` ist ein Alias für den Standardlauf.

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
2. **Abrufen:** `npm run photographers:fetch -- <Argumente>`. Lies die Ausgabe und `updates/<Datum>/photographers-candidates.json`. Je Person steht dort `status` (`gefunden`, `nicht gefunden`, `mehrdeutig`, `Fehler`), `wikidataId`, `occupations`, `life`, `articles` (Sprache, Titel, Kurzbeschreibung `description`, Anfangstext `extract`, Reihenfolge Deutsch, Englisch, Französisch, Spanisch, Italienisch, Niederländisch, danach alphabetisch; höchstens zehn; `sitelinks` nennt alle Sprachversionen mit Adresse, sie werden automatisch als Links gespeichert) und `portrait` (mit Lizenz) bzw. `portraitNote`. Nicht gefundene, mehrdeutige und fehlgeschlagene Personen nennst du im Bericht.
3. **Vorschläge schreiben.** Für jede Person mit Status `gefunden` und mindestens einem Artikel schreibst du einen Eintrag in `updates/<Datum>/photographers.json`:
   ```json
   { "date": "2026-10-28", "proposals": [
     { "id": "august-sander", "occupation": "Fotograf", "summary": "…", "sources": ["de", "en"], "portrait": true }
   ] }
   ```
   - `occupation`: kurze Berufsbezeichnung auf Deutsch, so wie die Wikipedia die Person nennt (Kurzbeschreibung `description`, erster Satz), z. B. „Fotografin“ oder „Medienkünstler“; höchstens 60 Zeichen.
   - `summary`: 40 bis 90 Wörter zu Person, Werk und Bedeutung, nur aus den Anfangstexten, eigene Worte.
   - `sources`: die Sprachen der Artikel, aus denen du geschöpft hast (1 bis 10, nur aus `articles`).
   - `portrait`: `true`, wenn die Kandidatendatei ein Portrait enthält; sonst `false`.
   - Lebensdaten und Bildnachweis trägst du **nicht** ein; sie kommen aus der Kandidatendatei.
4. **Prüfen:** `npm run photographers:check`. Verworfene Vorschläge nennst du mit Grund. Korrigiere ungültige Zusammenfassungen höchstens zweimal (Wortzahl, wörtliche Folgen); nie die Prüfregeln.
5. **Freigabe einholen.** Zeige je Person: Name, Berufsbezeichnung, Lebensdaten, Quellen (Sprache), Zusammenfassung, Portrait (Lizenz, Urheber, Dateiseite) und ob ein Profil ersetzt würde. Frage per `AskUserQuestion`: alle übernehmen · Auswahl · keine. Setze **nur für freigegebene** Vorschläge `"approved": true` in der Datei.
6. **Übernehmen:** `npm run photographers:apply -- <Argumente>` (mit `--force` nur nach ausdrücklicher Freigabe zum Ersetzen). Bei ungültigem Ergebnis bleibt alles unverändert; dann berichte die Fehler.
7. **Prüfen nach der Übernahme:** `npm run validate:data`, `npm test` und `npm run lint` ausführen und die Ergebnisse berichten (auch rote Tests; nichts beschönigen). Verweise auf `git diff data updates` zur Durchsicht.

## Abschlussmeldung

Kurz: bearbeitete Personen, Anzahl gefunden / nicht gefunden / mehrdeutig / Fehler, Vorschläge (geprüft / verworfen / übernommen), Portraits mit Lizenz, Ergebnis von Validierung, Tests und Lint, Hinweis auf nicht Geprüftes (z. B. Sachrichtigkeit der Zusammenfassungen, richtige Person bei Namensgleichheit).

## Websuche

Für **eine** Person: `--photographer <id>` (vorhandene Person) oder `--name "<Name>"` (auch unbekannte Person). Fehlt beides, brich mit einem Hinweis ab. Du recherchierst im Web, sammelst die Links in `updates/photographers-links.json` und schreibst einen Webkurztext (Feld `web`), der neben der Wikipedia-Zusammenfassung steht und sie nicht ersetzt. Schreibe ihn **erst, nachdem die Seiten abgerufen sind**; eine eigene Website der Person nutzt du bevorzugt.

### Zusätzliche Regeln

- **Suche nur über dein Websuch-Werkzeug**, höchstens **sechs Suchanfragen** je Person in sechs Sprachen (`"<Name>" Fotograf`, `photographer`, `photographe`, `fotógrafo`, `fotografo`, `fotograaf`) und höchstens **zehn Treffer** je Anfrage. Seiten rufst du **nicht** selbst ab (kein WebFetch, kein curl), sondern nur über `npm run photographers:web -- pages`; dort gelten `robots.txt`, Abstand von mindestens 2 s je Website, Kennung im User-Agent, höchstens zehn Seiten je Person; Wikipedia-Seiten werden nicht über den Webabruf geladen.
- **Kurztext in eigener Formulierung** (Deutsch, **40 bis 90 Wörter**), **nur** aus Textauszügen (`snippet`) und Snapshots (`.cache/snapshots/<person-id>/`). Du schreibst nichts hinzu, was dort nicht steht, und löst **widersprüchliche Angaben nicht auf, sondern lässt sie weg**. Keine wörtliche Folge von acht oder mehr Wörtern.
- **Quellen** (1 bis 10) sind Adressen aus der Linksammlung der Person.
- **Keine Bilder aus dem Web.** Du lädst und verlinkst keine Bilder von Trefferseiten; Portraits kommen nur von Wikimedia Commons über `photographers:fetch`.
- **Neuer Kurztext nur bei neuen Links.** Hat der Lauf keinen neuen Link ergeben (`newLinks` leer), schreibst du keinen Vorschlag für `web` und lässt den vorhandenen unverändert.
- **Änderungen an `data/` erst nach ausdrücklicher Freigabe** (per `AskUserQuestion`); ersetzen nur mit `--force`.
- Eine neue Person legst du nur mit `id` und `name` an; Berufsbezeichnung, Lebensdaten und Portrait kommen aus der Wikipedia-Recherche.

### Ablauf

1. **Plan:** `npm run photographers:web -- plan --photographer <id>` bzw. `--name "<Name>"` (mit `--offline`, `--max-age <Tage>` wie oben). Die Ausgabe nennt die Person (neu oder vorhanden) und die Suchanfragen oder den Zwischenspeicher. Ist die Suche zwischengespeichert, überspringst du Schritt 2.
2. **Suchen** und `updates/<Datum>/photographers-search.json` schreiben:
   ```json
   { "date": "2026-11-02", "engine": "<Name der Suchmaschine>", "persons": [
     { "id": "wendy-red-star", "queries": [ { "query": "\"Wendy Red Star\" Fotografin", "results": [ { "title": "…", "url": "https://…", "snippet": "…" } ] } ] }
   ] }
   ```
   Schlägt die Suche fehl: `{ "id": "…", "error": "Grund" }`.
3. **Links übernehmen:** `npm run photographers:web -- links`. Lies die Ausgabe (Treffer, neue Links, Status).
4. **Seiten abrufen** (wenn neue Links da sind; vor dem Schreiben des Kurztexts): `npm run photographers:web -- pages` (`SCRAPE_CONTACT` nötig; mit `--offline` nur Snapshots).
5. **Vorschläge schreiben** in `updates/<Datum>/photographers-web-proposals.json`:
   ```json
   { "date": "2026-11-02", "proposals": [
     { "id": "uelkue-mueller-oez", "name": "Ülkü Müller-Öz", "create": true,
       "web": { "summary": "…", "sources": ["https://example.org/a"] } }
   ] }
   ```
   `create` nur für eine neue Person. `web` nur, wenn es neue Links gibt.
6. **Prüfen:** `npm run photographers:web -- check`. Verworfene Vorschläge nennst du mit Grund; korrigiere höchstens zweimal, nie die Prüfregeln.
7. **Freigabe einholen** (Name, neue Person ja/nein, Zusammenfassung, Quellen mit Titel und Adresse, Ersetzen ja/nein) per `AskUserQuestion`; setze nur für Freigegebene `"approved": true`.
8. **Übernehmen:** `npm run photographers:web -- apply` (mit `--force` nur nach ausdrücklicher Freigabe). Optional danach `npm run photographers:fetch -- --photographer <id>` für Wikipedia und Portrait der neuen Person.
9. **Prüfen:** `npm run validate:data`, `npm test`, `npm run lint`; Ergebnisse ehrlich berichten.

Der Bericht `updates/<Datum>/PHOTOGRAPHERS.md` enthält den Abschnitt „Websuche“ (Suchmaschine, Anfragen, Treffer, neue Links, angelegte Personen, aktualisierte Kurztexte). Nicht Geprüftes nennst du ausdrücklich: Sachrichtigkeit des Kurztexts, richtige Person bei Namensgleichheit, Eignung der Treffer.

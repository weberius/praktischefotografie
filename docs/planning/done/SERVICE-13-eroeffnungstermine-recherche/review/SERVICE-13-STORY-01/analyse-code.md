# Code-Review-Analyse: Eröffnung und Finissage bei der Recherche (STORY-01, STORY-02)

**Ticket:** SERVICE-13  
**Analysiert:** 2026-10-30  
**Scope:** Pfade (uncommittete Änderungen auf `feature/SERVICE-13-eroeffnungstermine-recherche`), Stories SERVICE-13-STORY-01 und -02  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-006, ADR-007, ADR-010 / `setup/eroeffnungstermine.feature` (EARS `OPN-*`, Quality Q-DATA-12, Q-DATA-13)

**Betroffene Dateien:**
- `scripts/scrape/lib/termine.mjs`
- `scripts/scrape/lib/proposals.mjs`
- `scripts/scrape/lib/report.mjs`
- `scripts/scrape/check-proposals.mjs`
- `test/scrape/termine.test.mjs`
- `test/scrape/termine-bericht.test.mjs`
- `test/scrape/skill.test.mjs`
- `test/helpers.mjs`

Hinweis: `context/AI_CONTEXT.md` existiert in diesem Repo nicht; `eslint.config.js` wurde nicht gesondert ausgewertet (siehe F). Korrektheits-Bugs sind nicht Gegenstand; wo ein Befund an Korrektheit grenzt, ist er als Semantik-Befund formuliert und für `/code-review` vermerkt.

---

## A. Zusammenfassung (Executive Summary)

### Gesamtbewertung der menschlichen Nachvollziehbarkeit

Die Änderung ist klein, gut geschnitten und konsistent mit dem Bestand: reine Textfunktionen in `termine.mjs`, eine eigene Prüffunktion `checkTermin`, ein getrennter Berichtsteil, Tests mit Szenario-Namen und OPN-/Q-Verweisen. Die stillen Fallen liegen in der Semantik: „belegt“ prüft nur, dass irgendein Datum bzw. irgendeine Uhrzeit im Textauszug steht, nicht dass es dasselbe ist; der Uhrzeit-Regex erkennt Datumsangaben als Uhrzeit; der Bericht koppelt sich über einen Regex an einen deutschen Fehlertext.

- **Nachvollziehbarkeit:** Hoch
- **Einschätzung:** hybrid – Struktur und Kommentare sind konsistent mit dem Projektstil; die Heuristiken (Regex, 80-Zeichen-Fenster) sind typisch KI-generiert, mit Fixtures nur an den Positivfällen abgesichert.

---

## B. Konkrete Befunde

### CODE-01: „Beleg“ prüft Vorhandensein, nicht Übereinstimmung von Datum und Uhrzeit

- **Kategorie:** Semantik
- **Priorität:** Mittel
- **Code-Referenz:** `scripts/scrape/lib/proposals.mjs:84-86` – `checkTermin`; `scripts/scrape/lib/termine.mjs:42-51` – `hasHint`
- **Beobachtung:** `hasHint(excerpt, kind)` ist wahr, sobald nach dem Stichwort irgendein Datum folgt; `record.startDate` wird nicht mit diesem Datum verglichen. `hasTime(record.description) && !hasTime(excerpt)` prüft nur, dass beide *irgendeine* Uhrzeit enthalten. Der Test „Uhrzeit und Anwesenheit“ fährt genau diesen Fall (Textauszug `4-6pm`, Beschreibung `16:00 bis 18:00 Uhr`) und erwartet Akzeptanz; ein abweichendes `startDate` oder `18:00` statt `16:00` würde ebenso akzeptiert. Die Anwesenheit der Künstler:innen (OPN-UB-2) wird gar nicht gegen den Textauszug geprüft.
- **Warum problematisch:** Namen und Fehlermeldungen („Eröffnung nicht belegt“, „Uhrzeit nicht belegt“) versprechen mehr, als der Code prüft. Wer in zwei Jahren Q-DATA-12 („0 übernommene Uhrzeiten, die nicht im Textauszug stehen“) nachvollzieht, geht von einem Wertvergleich aus. Die Freigabe durch Menschen (ADR-007) fängt das ab, die Prüfung ist aber nur eine Stichwortprüfung.
- **Typisches KI-Ursachenmuster:** Heuristik, die den Wortlaut der Anforderung erfüllt, nicht ihre Absicht; Tests prüfen nur Positiv- und Fehlend-Fall.
- **ADR-/Gherkin-Bezug:** OPN-UB-2, OPN-UN-1, Q-DATA-12; ADR-007. Grenzfall zu `/code-review`.

### CODE-02: `TIME` erkennt Datumsangaben als Uhrzeit

- **Kategorie:** Semantik
- **Priorität:** Mittel
- **Code-Referenz:** `scripts/scrape/lib/termine.mjs:28` – `TIME`
- **Beobachtung:** `\b\d{1,2}[:.]\d{2}\b` passt auf `07.11` in `07.11.2026` und `7.11.`. Geprüft: `hasTime('Eröffnung am 07.11.2026')` und `hasTime('Vernissage 7.11. mit Rede')` liefern `true`. Der Test `Q-DATA-12: Erkennung …` (`termine.test.mjs:112-121`) enthält keinen solchen Negativfall.
- **Warum problematisch:** Ein deutsches Datum im Textauszug zählt als „Uhrzeit belegt“ (OPN-UN-1 greift nicht), eine Beschreibung mit Datum im Format `07.11.` wird als Uhrzeit-nennend verworfen. Der Regex-Kommentar nennt `16.00 Uhr` als Ziel, die Punktvariante braucht aber `Uhr` oder Kontext.
- **Typisches KI-Ursachenmuster:** Zu großzügiges Muster, Negativfälle nicht getestet.
- **ADR-/Gherkin-Bezug:** OPN-UN-1, Q-DATA-12

### CODE-03: Dublettenprüfung kennt den Typ nicht ausdrücklich; `checkTermin` mutiert die Eingabe

- **Kategorie:** Semantik / Verständlichkeit
- **Priorität:** Niedrig
- **Code-Referenz:** `scripts/scrape/lib/proposals.mjs:81` (`record.id = id`), `proposals.mjs:176-182` (`sameTitle`/`same`)
- **Beobachtung:** (a) OPN-UB-4 fordert „gleicher Typ, Ort und Beginn“; geprüft werden Ort, Titel und `startDate`. Der Typ steckt nur über das Titelpräfix im Vergleich. Eine manuell gepflegte Vernissage mit anderem Titel am selben Tag (z. B. „Vernissage Between“) wird nicht als Dublette erkannt (Annahme, nicht per Test verifiziert). (b) `checkTermin` heißt „prüft“, setzt aber `record.id` am Eingabeobjekt (`change.record` ist dasselbe Objekt wie in `raw`); die Normalisierung ist als Nebenwirkung versteckt.
- **Warum problematisch:** Spec und Code stimmen im Wortlaut nicht überein; Nebenwirkungen in einer Prüffunktion sind eine Wartungsfalle.
- **Typisches KI-Ursachenmuster:** Wiederverwendung der bestehenden Dublettenlogik ohne Abgleich mit der neuen Anforderung.
- **ADR-/Gherkin-Bezug:** OPN-UB-4, Szenarien „Keine doppelte Vernissage/Finissage“

### CODE-04: Kopplung des Berichts an einen Fehlertext; abweichende Schlüsselreihenfolge; unnötiger Export

- **Kategorie:** Konvention / Semantik
- **Priorität:** Niedrig
- **Code-Referenz:** `scripts/scrape/lib/report.mjs:20` (`/Dublette/.test(c.reason)`) gegen `proposals.mjs:183`; `report.mjs:16` (`p.venueId ?? p.organizerId`) gegen `proposals.mjs:93,219` (`organizerId ?? venueId`); `report.mjs:11` (`export function termineSummary`)
- **Beobachtung:** „bereits vorhanden“ wird aus dem Wortlaut des Verwerfungsgrunds abgeleitet; ändert jemand die Meldung, zählt der Bericht still 0 und kennzeichnet „zu prüfen“. Die Quellen-ID wird an zwei Stellen in umgekehrter Priorität ermittelt. `termineSummary` ist exportiert, wird aber nur in `report.mjs` verwendet (kein Test importiert es).
- **Warum problematisch:** Stille Kopplung über Freitext; gleiche Idee unterschiedlich gelöst.
- **Typisches KI-Ursachenmuster:** Lokale Lösung ohne Blick auf die Gegenstelle; defensiver Export.
- **ADR-/Gherkin-Bezug:** OPN-EV-1

### CODE-05: Terminart-Wissen auf drei Stellen verteilt; verschachtelte Ternaries

- **Kategorie:** Duplikation / Verständlichkeit
- **Priorität:** Niedrig
- **Code-Referenz:** `report.mjs:8` (`KINDS` mit Labels), `termine.mjs:23-24` (`EVENT_PREFIX`, `ID_SUFFIX`), `proposals.mjs:86` (Meldungstext je Art per Ternary), `proposals.mjs:167` (`kind ? null : op === 'add' ? … : …`)
- **Beobachtung:** Art, Anzeigename und Präfix („Eröffnung“/„Finissage“) stehen als drei getrennte Tabellen bzw. Literale; die Fehlermeldung wird per Ternary mit zwei Volltexten gebaut; `needle` ist eine dreifach verschachtelte Bedingung mit Sonderwert `null`.
- **Warum problematisch:** Eine dritte Art (oder Umbenennung) erfordert Änderungen an mehreren Dateien; die `needle`-Zeile ist schwer zu lesen.
- **Typisches KI-Ursachenmuster:** Additive Änderung pro Datei statt gemeinsamer Tabelle.
- **ADR-/Gherkin-Bezug:** –

### CODE-06: `today` bedeutet in `check-proposals` den Lauf-Datumsparameter

- **Kategorie:** Semantik
- **Priorität:** Niedrig
- **Code-Referenz:** `scripts/scrape/check-proposals.mjs:16` (`today: date`), `proposals.mjs:92` (Default `new Date()`)
- **Beobachtung:** Bei `--date 2026-10-01` gilt „heute“ für OPN-UB-5 als dieser Tag, nicht das echte Datum; ohne Parameter fällt der Default auf `common.today()` zurück (identisch zu `new Date().toISOString().slice(0,10)`, aber doppelt implementiert; UTC statt lokales Datum ist Annahme).
- **Warum problematisch:** Die EARS-Definition „heute ist das aktuelle Datum“ weicht davon ab; nicht dokumentiert.
- **Typisches KI-Ursachenmuster:** Kontextblindheit gegenüber vorhandenem Helfer `today()` in `common.mjs`.
- **ADR-/Gherkin-Bezug:** OPN-UB-5

### CODE-07: Skill-Test prüft einen unbegrenzten Textabschnitt

- **Kategorie:** Verständlichkeit (Test)
- **Priorität:** Niedrig
- **Code-Referenz:** `test/scrape/skill.test.mjs:91-94`
- **Beobachtung:** `text.slice(text.indexOf('**Eröffnung und Finissage**'))` reicht bis Dateiende; fehlt die Überschrift, liefert `indexOf` `-1` und `slice(-1)` das letzte Zeichen, die Fehlermeldung nennt dann nur ein beliebiges Ziel-Stichwort. Stichwörter wie `Uhrzeit` könnten aus später folgenden Abschnitten stammen.
- **Warum problematisch:** Test kann grün sein, obwohl der Abschnitt Lücken hat; Fehlerdiagnose irreführend.
- **Typisches KI-Ursachenmuster:** Defensive Kürze, kein Randfall.
- **ADR-/Gherkin-Bezug:** OPN-UB-2, OPN-UB-6, OPN-UB-7

---

## C. Bewusst nicht gemeldet

- Regex-/Stichwortzähler statt Parser, Fehlalarme (z. B. „Opening hours … 24 December“ wird als Hinweis gezählt; geprüft): dokumentiert als Konflikt in `docs/quality/setup/eroeffnungstermine.md` und als ANNAHME in `PIPELINE.md`.
- Uhrzeit und Anwesenheit in `description` statt eigener Felder: ANNAHME in `PIPELINE.md`, keine Schemaänderung.
- Einsatz des bestehenden Validators und Snapshot-Abgleichs (ADR-001, ADR-006, ADR-007): Wiederverwendung statt Duplikation.
- Lange Funktion `checkProposal` mit verschachtelten Ternaries im Zuordnungsblock: Bestand, nicht Teil des Diffs; `checkTermin` wurde korrekt ausgelagert.
- `test/helpers.mjs` `terminEvent` folgt dem Muster von `exhibition()`.

---

## D. Abgeleitete Tasks

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| [TASK-03](TASK-03-beleg-pruefung-schaerfen.md) | Beleg-Prüfung für Datum und Uhrzeit schärfen | Medium | ~1–2 h | CODE-01, CODE-02 |
| [TASK-04](TASK-04-dublette-und-seiteneffekt.md) | Dublettenprüfung nach Typ und `checkTermin` ohne Mutation | Low | ~45 min | CODE-03, CODE-06 |
| [TASK-05](TASK-05-terminart-und-bericht-kopplung.md) | Terminart-Tabelle bündeln, Berichtskopplung lösen | Low | ~45 min | CODE-04, CODE-05 |
| [TASK-06](TASK-06-skill-test-abschnitt-begrenzen.md) | Skill-Test auf Abschnitt begrenzen | Low | ~15 min | CODE-07 |

---

## E. Meta-Bewertung

- **Gut automatisiert behebbar:** CODE-02, CODE-03(b), CODE-04, CODE-05, CODE-07.
- **Erfordert menschliche Entscheidung:** CODE-01 (wie streng soll „belegt“ sein: Datumsvergleich über mehrere Formate, DE und EN, ist eigener Aufwand; Alternative: Meldungen und Test-Namen ehrlicher benennen), CODE-06 (Bedeutung von „heute“ bei `--date`).
- **Empfehlung für künftige KI-Codegenerierung:** Für Heuristiken zu Belegen Negativ-Fixtures (Datum als Uhrzeit, abweichendes Datum) verpflichtend machen; Gründe für Verwerfungen als Konstanten/Codes statt Freitext führen, wenn andere Module sie auswerten.

---

## F. Nicht bewertbar

- `context/AI_CONTEXT.md` existiert nicht; `eslint.config.js` wurde nicht ausgewertet, `npm run lint:all`/Tests wurden nicht ausgeführt (nur lesendes Review; Befund zu `hasTime`/`hasHint` per `node -e` an den reinen Funktionen geprüft).
- Gherkin-Datei und Story-Dokumente nur über die EARS-Verweise gelesen, nicht Szenario für Szenario abgeglichen.

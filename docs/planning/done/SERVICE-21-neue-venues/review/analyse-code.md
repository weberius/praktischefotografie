# Code-Review-Analyse: SERVICE-21 – Neue Venues (Forum für Fotografie Köln, Kunstmuseum Bonn)

**Ticket:** SERVICE-21  
**Analysiert:** 2026-11-09  
**Scope:** `git diff main` auf vier Dateien (Datenbestand, Bestandstest, EARS, Gherkin)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-001, ADR-006, ADR-007 / `content/daten.feature`

**Betroffene Dateien:**
- `data/venues.json`
- `test/bestand.test.mjs`
- `docs/ears/content/venue-erfassung.md`
- `docs/contracts/gherkin/content/daten.feature`

Hinweis: `context/AI_CONTEXT.md` existiert in diesem Repository nicht. Das Review nutzt AGENTS.md und die ADRs.

---

## A. Zusammenfassung (Executive Summary)

### Gesamtbewertung der menschlichen Nachvollziehbarkeit

Die beiden Datensätze folgen dem Schema und der Feldreihenfolge der bestehenden Venues (`data/venues.json:552-602`) und sind gut lesbar. Die Fallen liegen im Test und in der Spezifikation. Der neue Test dupliziert Katalogdaten ein zweites und drittes Mal (Test, EARS, Gherkin) und prüft Quelle/Prüfstand ein zweites Mal. Eine ANNAHME in der EARS-Datei ist veraltet, und die Gherkin-Tabelle ist nicht ausgerichtet. Die Venue-Anzahl von 24 liegt weiter innerhalb von VEN-UB-1 (20–30).

- **Nachvollziehbarkeit:** Hoch
- **Einschätzung:** hybrid – Daten sind schematreu, der Test wirkt wie ein einzeln generierter Block neben bestehenden, schlanken Tests.

---

## B. Konkrete Befunde

### CODE-01: Test dupliziert Katalogdaten und bestehende Prüfung

- **Kategorie:** Duplikation
- **Priorität:** Mittel
- **Code-Referenz:** `test/bestand.test.mjs:39-52` – Szenario „Neue Venues sind im Katalog“
- **Beobachtung:** Der Test führt `id`, `type`, `city` und `website` beider Venues als Literal-Liste (Z. 40-43). Dieselben Werte stehen in `venues.json`, in VEN-UB-6/7 und in der Gherkin-Tabelle. Z. 50 wiederholt `source.url && checkedAt && status`, das bereits der Test „Jede Venue nennt Quelle und Prüfstand“ für alle Venues prüft (Z. 32-37). Die Asserts in Z. 47-49 nennen keine `id`, sodass ein Fehlschlag nicht erkennen lässt, welche Venue betroffen ist (andere Tests geben die `id` mit).
- **Warum problematisch:** Jede Datenpflege (z. B. neue Website) verlangt Änderungen an vier Stellen. Die Doppelprüfung erhöht den Wartungsaufwand ohne zusätzliche Absicherung. Die Gherkin-Schritte „besteht die Validierung“ ist hier nicht abgebildet, sondern nur im Gesamttest (Z. 64-70).
- **Typisches KI-Ursachenmuster:** Kontextblindheit gegenüber bestehenden Tests; Szenario 1:1 in Code übersetzt.
- **ADR-/Gherkin-Bezug:** VEN-UB-5, `daten.feature:95-106`

### CODE-02: Veraltete und unscharfe ANNAHME in der EARS-Datei

- **Kategorie:** Kommentare & tote Pfade
- **Priorität:** Niedrig
- **Code-Referenz:** `docs/ears/content/venue-erfassung.md:15` (und Kopfzeile Z. 3)
- **Beobachtung:** Die ANNAHME beschreibt, Adresse und Koordinaten stammten „aus der Recherche … in der Umsetzung“. Die Umsetzung ist erfolgt (Koordinaten aus OSM/Nominatim laut Story-Changelogs). Die Annahme bleibt als offener Hinweis in der normativen Datei stehen. Außerdem nennt Z. 3 weiter „Stand: 2026-10-27“, obwohl VEN-UB-6/7 am 2026-11-09 ergänzt wurden. Normative Dokumente sollen den gültigen Stand beschreiben (AGENTS.md).
- **Warum problematisch:** Leser können nicht unterscheiden, ob die Annahme noch offen ist. Der Stand ist irreführend.
- **Typisches KI-Ursachenmuster:** Pipeline-Artefakt (Phase-3-Annahme) wird nicht nach Phase 5 bereinigt.
- **ADR-/Gherkin-Bezug:** –

### CODE-03: Quell-URL der Bonner Venue an eine einzelne Ausstellung gebunden

- **Kategorie:** Semantik
- **Priorität:** Niedrig
- **Code-Referenz:** `data/venues.json:598` – `source.url` von `kunstmuseum-bonn`
- **Beobachtung:** `source.url` zeigt auf eine Einzelausstellung (`/de/ausstellungen/herlinde-koelbl/`). Das Forum nutzt dagegen die Ausstellungsübersicht (Z. 573). Die Seite ist zeitlich begrenzt (Annahme: nach Ausstellungsende entfernt oder verschoben); der Link belegt nicht dauerhaft die Venue-Daten wie Adresse oder ständige Sammlung. Es gibt allerdings Präzedenzfälle im Bestand (z. B. Z. 46, 198, 248).
- **Warum problematisch:** Eine Quelle, die später ins Leere läuft, erschwert Nachrecherche und macht `checkedAt` schwer nachvollziehbar.
- **Typisches KI-Ursachenmuster:** Wahl der zuerst gefundenen Fundstelle statt der stabilsten.
- **ADR-/Gherkin-Bezug:** ADR-006, Q-DATA-2

### CODE-04: Gherkin-Beispieltabelle nicht ausgerichtet

- **Kategorie:** Varianz
- **Priorität:** Niedrig
- **Code-Referenz:** `docs/contracts/gherkin/content/daten.feature:104-106`
- **Beobachtung:** Die Spalte `website` ist 32 Zeichen breit, die Forum-URL in Z. 105 ist 33 Zeichen lang; Spaltentrenner liegen dadurch in Z. 105 versetzt. Die vorhandenen Tabellen sind ausgerichtet (z. B. Z. 85-86).
- **Warum problematisch:** Rein optisch, erschwert aber Diffs und Lesbarkeit.
- **Typisches KI-Ursachenmuster:** Manuelle Tabellenformatierung ohne Formatierer.
- **ADR-/Gherkin-Bezug:** –

---

## C. Bewusst nicht gemeldet

- Redundante Felder `address.city`/`city` und `shortName` gleich `name` (Bonn): entspricht dem bestehenden Schema und Bestand (z. B. `venues.json:523-543`).
- Koordinaten und Venue-Typen sind eine dokumentierte Lesart (EARS-ANNAHME); fachliche Richtigkeit ist kein Gegenstand dieses Reviews.
- Spezifische Venue-Werte in EARS/Gherkin: bewusste Entscheidung des Tickets (Venue-Erfassung als Anforderung).
- Lint-Themen: durch `npm run lint:all` abgedeckt.

---

## D. Abgeleitete Tasks

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| [TASK-03](TASK-03-bestandstest-straffen.md) | Bestandstest straffen | Medium | ~20 min | CODE-01 |
| [TASK-04](TASK-04-ears-und-gherkin-bereinigen.md) | EARS-Annahme, Stand und Gherkin-Tabelle bereinigen | Low | ~10 min | CODE-02, CODE-04 |
| [TASK-05](TASK-05-quelle-bonn-stabilisieren.md) | Quell-URL Kunstmuseum Bonn prüfen | Low | ~10 min | CODE-03 |

---

## E. Meta-Bewertung

- **Gut automatisiert behebbar:** CODE-01, CODE-02, CODE-04.
- **Erfordert menschliche Entscheidung:** CODE-03 (welche Quelle ist die stabile Fundstelle?).
- **Empfehlung für künftige KI-Codegenerierung:** In der spec-pipeline Phase 5 einen Schritt „ANNAHME:-Marker und `Stand` bereinigen“ ergänzen; Bestandstests nur um Prüfungen erweitern, die nicht bereits für alle Venues gelten.

---

## F. Nicht bewertbar

- `context/AI_CONTEXT.md` fehlt.
- Ob die Quell-URLs aktuell erreichbar sind, wurde nicht geprüft (kein Webabruf im Review).

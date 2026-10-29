# Code-Review-Analyse: SERVICE-11-STORY-03 – Postkartenmotiv als eigene Datei

**Ticket:** SERVICE-11 (Story SERVICE-11-STORY-03)  
**Analysiert:** 2026-10-29  
**Scope:** `test/marken-icon.test.mjs` (Zeilen 123–166: Icon-Master, Postkartenmotiv, „Postkarte nicht im Build“), `docs/resources/postkarte.png` (nur Metadaten)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-017 / `setup/bildmaterial.feature`, `docs/ears/setup/bildmaterial.md`, `docs/quality/web/markenicon.md`; Annahmen in `PIPELINE.md`

**Betroffene Dateien:**
- `test/marken-icon.test.mjs`
- `docs/resources/postkarte.png` (1011 × 803, RGBA, 8 Bit; verifiziert mit `file`)

Die drei Tests laufen grün (`node --test test/marken-icon.test.mjs`: 13 von 13).

---

## A. Zusammenfassung (Executive Summary)

### Gesamtbewertung der menschlichen Nachvollziehbarkeit

Der Abschnitt ist kurz, gut kommentiert und trägt Gherkin-Szenario und EARS-ID im Testnamen. Die Schwellen im Randtest (6 px, 253, 2 %) sind begründet und zur Dokumentation passend. Die stillen Fallen liegen in der Aussagekraft: Der Test „Icon ohne Postkartenmotiv“ prüft sein im Namen genanntes Kriterium nicht, und die Anforderung „keine Teile des anderen Motivs“ ist für die eingecheckten Dateien nur in einem Test abgesichert, der ohne Chromium übersprungen wird. Dazu kommen kleine Stilbrüche (dynamische Imports trotz statischem Import derselben Datei).

- **Nachvollziehbarkeit:** Hoch
- **Einschätzung:** hybrid – Namens- und Kommentarstil konsistent mit dem Rest der Datei, aber typische KI-Muster bei Test-Titeln, die mehr versprechen als die Assertions halten.

---

## B. Konkrete Befunde

### CODE-01: Testname „ohne Postkartenmotiv“ wird nicht geprüft; Dateigröße als Ersatz

- **Kategorie:** Semantik
- **Priorität:** Mittel
- **Code-Referenz:** `test/marken-icon.test.mjs:147` (Name), `:153` – zweiter Test
- **Beobachtung:** Der Test heißt „das Icon ist quadratisch mit transparenten Ecken und ohne Postkartenmotiv“. Geprüft werden quadratisch, ≥ 400 px, vier transparente Ecken und `icon.png.length < postkarte.png.length` („Icon ist kleiner als die Postkarte“). Ein Icon mit einem Rest der Karte würde alle Assertions bestehen, solange die Ecken transparent und die Datei kleiner bleibt. Ein Vergleich von Byte-Größen sagt nichts über Inhalt; er ist an die Kompression und das Bildmotiv gekoppelt (ein detailreicheres Icon würde den Test brechen, ohne dass etwas falsch wäre).
- **Warum problematisch:** Wer den Test liest, glaubt, IMG-UB-1 („ohne Teile des jeweils anderen Motivs“) sei für die Datei abgesichert. Die Absicherung ist scheinbar. Die Größenbedingung ist ein willkürliches Proxy-Kriterium, das später zu Fehlalarmen führt.
- **Typisches KI-Ursachenmuster:** Test-Titel aus dem Gherkin-Satz übernommen, Assertion als nächstliegende messbare Näherung formuliert.
- **ADR-/Gherkin-Bezug:** `bildmaterial.feature` Szenario „Icon und Postkartenmotiv getrennt“, Schritt „Und keine der beiden Dateien enthält Teile des anderen Motivs“ (IMG-UB-1).

### CODE-02: „Keine Teile des anderen Motivs“ für die eingecheckten Dateien nur im überspringbaren Browser-Test

- **Kategorie:** Verständlichkeit (Testabdeckung der Spezifikation, Lücke zwischen Test-Titel und Prüfung)
- **Priorität:** Niedrig
- **Code-Referenz:** `test/marken-icon.test.mjs:133–145`; `test/make-icons.test.mjs:18` (`t.skip` ohne Chromium), `:23`
- **Beobachtung:** Der Randtest der Postkarte prüft nur „kein weißer Rand“ und „deckend“, nicht „kein Icon-Rest“. Der Zuschnitt-Test mit „ohne Reste des anderen Motivs“ steht in `make-icons.test.mjs` und läuft laut PIPELINE-Annahme (ANNAHME zu `CHROME_BIN`) in der CI nicht; er prüft zudem synthetische Quellbilder, nicht `docs/resources/*.png`. Die Datei-Tests der Story können also grün sein, obwohl `postkarte.png` einen Icon-Rest enthält. Die Changelog-Angabe „Sichtprüfung des Zuschnitts“ deckt das einmalig ab.
- **Warum problematisch:** Die Lücke ist bewusst (Sichtprüfung, Annahme dokumentiert); sie steht aber nirgends im Testcode. Ein Leser nimmt volle Abdeckung an.
- **Typisches KI-Ursachenmuster:** Kontextblindheit: Abdeckung auf zwei Dateien verteilt, ohne Querverweis.
- **ADR-/Gherkin-Bezug:** IMG-UB-1; PIPELINE-Annahme zum Chromium-Test. Hinweis, kein Fehler.

### CODE-03: Dynamischer Import von `png-helpers.mjs` trotz statischem Import derselben Datei

- **Kategorie:** Stilbruch / Varianz
- **Priorität:** Niedrig
- **Code-Referenz:** `test/marken-icon.test.mjs:7` (statisch `pngSize`), `:47`, `:134`, `:148` (`await import('./png-helpers.mjs')` für `decodePng`)
- **Beobachtung:** Dasselbe Modul wird oben statisch und in drei Tests dynamisch geladen; die Tests sind nur deshalb `async`.
- **Warum problematisch:** Kein erkennbarer Grund (kein bedingtes Laden); der Leser sucht ihn. Ein einziges `import { decodePng, pngSize }` genügt, die Tests könnten synchron sein.
- **Typisches KI-Ursachenmuster:** Schrittweise Ergänzung je Test ohne Rückblick auf die Importzeile (Pattern-Mischung).

### CODE-04: Kopfkommentar der Datei nennt nur die Icon-Szenarien; DIST-Konstante liegt weit von ihrer Verwendung

- **Kategorie:** Kommentare / Verständlichkeit
- **Priorität:** Niedrig
- **Code-Referenz:** `test/marken-icon.test.mjs:1` (Kopfkommentar nur „ICO-UB-1, ICO-UB-2; Q-PERF-7“), `:58` (`DIST` definiert) und `:159` (verwendet)
- **Beobachtung:** Die Datei prüft inzwischen auch IMG-UB-1, IMG-UB-3, IMG-UB-4, Manifest und Build-Verweise; der Kopf ist veraltet. Der Postkarten-Abschnitt nutzt `DIST` aus einem 100 Zeilen entfernten Abschnitt und benennt diese Abhängigkeit nicht; der Build-Teil ist anders als der Rest (`:101` mit `skip`-Meldung) hier ohne Meldung stillschweigend ausgelassen, wenn kein Build existiert.
- **Warum problematisch:** Beim stillen Auslassen von `DIST` meldet der Test „grün“, obwohl nur `web/public` geprüft wurde.
- **Typisches KI-Ursachenmuster:** Inkrementelles Wachsen einer Testdatei.

---

## C. Bewusst nicht gemeldet

- Magische Werte 6 px, 253 und 2 % im Randtest (`:139–144`): im Kommentar und im Changelog der Story begründet (leicht abgerundete Kartenecken, 28 von etwa 3 600 Randpixeln).
- Mindestmaße 1000 × 750 und Icon ≥ 400 (`:137`, `:151`): durch Quellauflösung (450 × 450 Master, 1011 × 803 Karte) und PIPELINE-Annahme zur 512-px-Hochskalierung gedeckt.
- `docs/resources/` fehlt in der Ablagestruktur von `AGENTS.md`: PIPELINE-Annahme.
- Der Randtest passt die Schwelle an das reale Bild an: im Changelog offen begründet.
- Byte-Gleichheit statt Bildvergleich im Build-Test (`:163`): genügt für „Datei wird kopiert“; ein umkodiertes Duplikat wird durch den Dateinamenstest nur teilweise erfasst, das ist ein theoretischer Fall (kein Befund).

---

## D. Abgeleitete Tasks

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| [TASK-21](TASK-21-icon-test-aussage-schaerfen.md) | Icon-Test: Aussage und Assertion in Einklang bringen | Medium | ~20 min | CODE-01, CODE-02 |
| [TASK-22](TASK-22-marken-icon-test-aufraeumen.md) | Testdatei aufräumen: Importe, Kopfkommentar, DIST-Hinweis | Low | ~15 min | CODE-03, CODE-04 |

---

## E. Meta-Bewertung

- **Gut automatisiert behebbar:** CODE-03, CODE-04.
- **Erfordert menschliche Entscheidung:** CODE-01/02: soll der Inhalt der Dateien automatisch geprüft werden (z. B. Randstreifen des Icons weist keine Kartenfarben auf) oder genügt die Sichtprüfung plus Test auf synthetischen Bildern?
- **Empfehlung für künftige KI-Codegenerierung:** Test-Titel nur so formulieren, wie die Assertions tragen; nicht prüfbare Gherkin-Schritte im Test als „nur Sichtprüfung“ kennzeichnen.

---

## F. Nicht bewertbar

Der Bildinhalt von `postkarte.png` (laut Auftrag nicht inhaltlich bewertet).

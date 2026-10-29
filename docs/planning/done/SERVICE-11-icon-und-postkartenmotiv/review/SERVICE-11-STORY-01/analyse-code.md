# Code-Review-Analyse: SERVICE-11-STORY-01 – Icon als Anwendungs-Icon

**Ticket:** SERVICE-11 (Story SERVICE-11-STORY-01)  
**Analysiert:** 2026-10-29  
**Scope:** Pfade der Story (Branch feature/SERVICE-11-icon-und-postkartenmotiv gegen main, ohne die Postkarten-Tests)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-003, ADR-017 (ADR-002 nur Kontext) / `web/markenicon.feature`, `setup/bildmaterial.feature`

**Betroffene Dateien:**
- `web/tools/make-icons.mjs`
- `test/make-icons.test.mjs`, `test/png-helpers.mjs`, `test/marken-icon.test.mjs`
- `web/src/index.html`, `web/public/site.webmanifest`
- `web/public/favicon.ico`, `favicon-96x96.png`, `apple-touch-icon.png`, `web-app-manifest-192x192.png`, `web-app-manifest-512x512.png`, `docs/resources/icon.png` (Binärdateien: Format, Maße, Größen geprüft, nicht inhaltlich)
- `package.json` (Skript `icons:build`), `README.md` (Abschnitt Icon und Postkartenmotiv)

Geprüft: `node --test test/make-icons.test.mjs test/marken-icon.test.mjs` mit `CHROME_BIN` (17 Tests grün, 0 übersprungen); `eslint` über die Skriptdatei ohne Meldung.

---

## A. Zusammenfassung (Executive Summary)

### Gesamtbewertung der menschlichen Nachvollziehbarkeit

Die Story ist sauber umgesetzt und gut nachvollziehbar: Das Skript hat klare Kopfkommentare mit Verweis auf ADR-017 und die EARS-IDs, die Tests tragen Gherkin-Bezug, Dateien und Verweise entsprechen Spezifikation und Klangland-Vorbild. Die stille Falle liegt in `splitInBrowser`: eine einzige 100-Zeilen-Funktion, die im Browser läuft (nicht einzeln testbar) und Erkennung, Zuschnitt, Freistellung und Quadratisierung vermischt; zwei unterschiedliche Weiß-Schwellen stehen ohne Erklärung nebeneinander. Daneben gibt es kleine Unschärfen in den Tests: Der Build-Test läuft in der CI nie, `buildIco` wird exportiert, aber nicht direkt geprüft, und ein Testtitel verspricht mehr, als die Prüfung leistet. Keine kritischen oder hohen Befunde.

- **Nachvollziehbarkeit:** Mittel bis Hoch
- **Einschätzung:** hybrid – konsistente Kommentare und Tests, aber dichte Einzeiler und eine überladene Browserfunktion wie bei generiertem Code.

---

## B. Konkrete Befunde

### CODE-01: `splitInBrowser` bündelt fünf Aufgaben, zwei Weiß-Schwellen ohne Erklärung

- **Kategorie:** Funktions-Überladung / Verständlichkeit
- **Priorität:** Mittel
- **Code-Referenz:** `web/tools/make-icons.mjs:26-125` – `splitInBrowser`
- **Beobachtung:** Eine Funktion dekodiert das Bild, findet die Motivabschnitte über Spaltenläufe (43-61), bestimmt Bounding-Boxen (65-69), schneidet zu (71-80), stellt das Icon per Flood-Fill frei und setzt Randpixel auf Alpha 128 (88-112) und füllt es quadratisch auf (113-122). Dafür gelten zwei verschiedene „Weiß“-Begriffe: `NON_WHITE = 12` als Summe der drei Kanäle (27, 40) und `WHITE = 244` als dunkelster Kanal (88-89); der Alpha-Wert 128 und die Lückenbreite 8 (43, 55) sind unbenannte Zahlen. `boxOf(cardRun)` wird zweimal berechnet (80 und 124).
- **Warum problematisch:** Die Funktion läuft per `page.evaluate` im Browser und lässt sich nur mit Chromium testen (die Zuschnitt-Tests entfallen in der CI, siehe Abschnitt C). Wer das Freistellen anpassen will (z. B. anderes Quellbild mit hellem Icon-Rand), muss die ganze Funktion verstehen. Die zwei Schwellen sehen wie dieselbe Idee aus, verhalten sich aber verschieden.
- **Typisches KI-Ursachenmuster:** Alles in einer Funktion „weil es im Browser laufen muss“; Magic Numbers statt benannter Konstanten.
- **ADR-/Gherkin-Bezug:** ADR-017 (Zuschnitt, Ecken), IMG-UB-1

### CODE-02: Duplizierte Canvas-Skalierung in `scaleInBrowser`

- **Kategorie:** Duplikation
- **Priorität:** Niedrig
- **Code-Referenz:** `web/tools/make-icons.mjs:138-158`
- **Beobachtung:** Der Verkleinerungsschritt (139-147) und der Hochskalierungsschritt (150-157) legen jeweils ein Canvas an, setzen `imageSmoothingEnabled`/`Quality` und zeichnen; nur die Zielgröße unterscheidet sich.
- **Warum problematisch:** Änderungen an der Skalierqualität müssen an zwei Stellen erfolgen; der Hochskalierpfad (512 aus 450) ist der einzige, der heute tatsächlich greift, und der Kommentar „in Stufen von höchstens Faktor 2“ im Funktionskopf (127) erwähnt ihn nicht.
- **Typisches KI-Ursachenmuster:** Nachträglich ergänzter Sonderfall (Hochskalieren) als Kopie des vorhandenen Blocks.
- **ADR-/Gherkin-Bezug:** IMG-UB-2

### CODE-03: `buildIco` unnötig exportiert, ungetestet und mit totem Zweig

- **Kategorie:** Dead Code / Over-Engineering
- **Priorität:** Niedrig
- **Code-Referenz:** `web/tools/make-icons.mjs:165-186` (`export function buildIco`), Verwendung nur in Zeile 218
- **Beobachtung:** Kein Test und kein anderes Modul importiert `buildIco` (Suche über `test/` und `web/tools/`). Der Zweig `size >= 256 ? 0 : size` (175-176) ist für die Größen 16/32/48 nie erreichbar. Das Format der ICO-Datei wird nur an der eingecheckten Datei geprüft (`test/marken-icon.test.mjs:27-44`), nicht am Erzeugen.
- **Warum problematisch:** `buildIco` ist der einzige reine Node-Teil des Skripts und damit ohne Chromium prüfbar, aber gerade er hat keinen eigenen Test; der Export suggeriert eine Nutzung, die es nicht gibt. Der 256-Pixel-Zweig ist Konfigurierbarkeit ohne Bedarf.
- **Typisches KI-Ursachenmuster:** Spezifikationsnahe Vollständigkeit (ICO-Format „richtig“ nach Norm) ohne Bedarf.
- **ADR-/Gherkin-Bezug:** ADR-017 (ICO aus PNG-Daten selbst bauen), ICO-UB-1

### CODE-04: Testtitel verspricht mehr als die Prüfung; redundante dynamische Importe

- **Kategorie:** Semantik / Varianz
- **Priorität:** Niedrig
- **Code-Referenz:** `test/marken-icon.test.mjs:147-154` (Titel „… ohne Postkartenmotiv“), `:153`, `:47`, `:134`, `:148`
- **Beobachtung:** Der Test „das Icon ist quadratisch mit transparenten Ecken und ohne Postkartenmotiv“ prüft „ohne Postkartenmotiv“ nur über `icon.png` ist kleiner als `postkarte.png` (153); das ist kein Nachweis (Icon mit Postkartenresten wäre ebenfalls kleiner). Der inhaltliche Nachweis steckt nur im Browser-Test (`test/make-icons.test.mjs:143-147`), der in der CI entfällt. Außerdem wird `decodePng` dreimal per `await import('./png-helpers.mjs')` geladen (47, 134, 148), obwohl `pngSize` aus derselben Datei in Zeile 7 statisch importiert ist.
- **Warum problematisch:** Ein grüner Test erweckt falsche Sicherheit; die dynamischen Importe sind ohne Grund uneinheitlich zum statischen Import.
- **Typisches KI-Ursachenmuster:** Test nachträglich in eine bestehende Datei ergänzt, Importstil nicht angeglichen; Titel aus der Gherkin-Formulierung übernommen, Prüfung abgekürzt.
- **ADR-/Gherkin-Bezug:** `setup/bildmaterial.feature` „Icon und Postkartenmotiv getrennt“, IMG-UB-1

### CODE-05: Build-Test läuft in der CI nie und prüft den Basispfad nicht

- **Kategorie:** Verständlichkeit / Semantik (Testwirksamkeit)
- **Priorität:** Mittel
- **Code-Referenz:** `test/marken-icon.test.mjs:101-109`; CI-Reihenfolge in `.github/workflows/` (Deploy-Workflow: Wurzel-`npm test` vor `npm run build`)
- **Beobachtung:** Der Test wird übersprungen, wenn `web/dist/web/browser/index.html` fehlt (101). Im Deploy-Workflow läuft `npm test` im Wurzelverzeichnis, bevor in `web/` gebaut wird; das Verzeichnis `web/dist` existiert dort nie, der Test ist in der CI also immer „übersprungen“. Der Test heißt „Pfade relativ zum Basispfad“, prüft aber nur, dass vier `href`s relativ sind (`hrefs.length, 4`, 106) und prüft nur drei fest eingetragene Seiten (103); den Build mit Basispfad `/pf/` aus dem Gherkin-Szenario „Pfade relativ zum Basispfad“ und Q-USE-11 („Build-Test mit Basispfad“) führt er nicht aus. Die PIPELINE-Annahme zur CI nennt nur die Chromium-Tests, nicht diesen.
- **Warum problematisch:** Die Anforderung ICO-UB-5 wird lokal nur geprüft, wenn zufällig vorher gebaut wurde, in der CI nie; der Titel suggeriert Abdeckung des Basispfad-Falls. Eine künftige Änderung an `index.html`/`<base>` fiele nicht auf.
- **Typisches KI-Ursachenmuster:** „skip, wenn Voraussetzung fehlt“ als Standardmuster, ohne zu prüfen, ob die Voraussetzung in der Umgebung je erfüllt ist.
- **ADR-/Gherkin-Bezug:** ADR-003, ADR-017; `web/markenicon.feature` „Pfade relativ zum Basispfad“; Q-USE-11

### CODE-06: Handgeschriebene Argumentverarbeitung mit uneinheitlicher Benennung

- **Kategorie:** Semantik / Varianz
- **Priorität:** Niedrig
- **Code-Referenz:** `web/tools/make-icons.mjs:9-13`, `:236-238`
- **Beobachtung:** Der Befehlszeilenschalter heißt `--public`, der Funktionsparameter `publicDir`, der Eintrag in `DEFAULTS` `public`; `--docs`/`docs` und `--source`/`source` sind dagegen einheitlich. `arg()` (236) ignoriert unbekannte Schalter, und ein Schalter ohne Wert führt zu `resolve(undefined)` und damit zur unverständlichen Meldung „The "path" argument must be of type string“ statt einer verständlichen (Q-MAIN-5: „meldet fehlende Eingaben mit einer verständlichen Meldung“).
- **Warum problematisch:** Kleine Reibung beim Lesen und bei Tippfehlern wie `--publik`, die stillschweigend die Standardpfade nutzen (das Skript würde dann echte Dateien überschreiben).
- **Typisches KI-Ursachenmuster:** Minimale Eigenlösung statt `node:util` `parseArgs`.
- **ADR-/Gherkin-Bezug:** Q-MAIN-5, IMG-UB-3

### CODE-07: Beschreibungstext doppelt gepflegt

- **Kategorie:** Duplikation
- **Priorität:** Niedrig
- **Code-Referenz:** `web/public/site.webmanifest:3`, `web/src/index.html:6`
- **Beobachtung:** Der Satz „Der Guide für Ausstellungen, Orte, Fotobücher und Begegnungen in NRW.“ steht wortgleich im Manifest und im Meta-Tag; kein Test hält beide zusammen (`test/marken-icon.test.mjs:84-99` prüft `description` nicht).
- **Warum problematisch:** Zwei Quellen derselben Aussage laufen bei einer Textänderung auseinander; das Manifest verlangt die Beschreibung nicht.
- **Typisches KI-Ursachenmuster:** Manifest nach Klangland-Vorbild vollständig ausgefüllt.
- **ADR-/Gherkin-Bezug:** Q-SEO-2 (Meta-Angaben bleiben unverändert)

---

## C. Bewusst nicht gemeldet

- **Zuschnitt-Tests und Skript nur mit Chromium, in der CI ohne `CHROME_BIN` übersprungen:** dokumentierte Annahme in `PIPELINE.md` (ADR-017 Konsequenzen). Nur der Teil, dass der Build-Test ebenfalls nie läuft, ist neu (CODE-05).
- **Manifest-Icon-Grenzen 80/400 kB, 512 px aus 450 px hochskaliert, ICO mit PNG-Daten:** dokumentierte Annahmen (Q-PERF-7-Änderung, `PIPELINE.md`).
- **`sizes="32x32"` am ICO-Link (`web/src/index.html:9`) bei drei enthaltenen Größen:** entspricht dem Klangland-Vorbild nach ADR-017; „any“ wäre präziser, aber kein Defekt und im Test festgeschrieben (`test/marken-icon.test.mjs:70`). Nur Hinweis.
- **Skript nicht im Build, Ergebnisse eingecheckt, kein neues Paket:** ADR-017.
- **`web/tools/` wird weder vom Wurzel-ESLint (ignoriert `web/`) noch von `ng lint` (nur `*.ts`/`*.html`) geprüft:** gilt für alle Skripte dort, nicht spezifisch für diese Story; `eslint --no-ignore` auf `make-icons.mjs` ist ohne Meldung. Hinweis, kein Befund.
- **`README.md`-Abschnitt und `package.json`-Skript:** konsistent mit Skript und Test; kein Befund. Dass `npm install` in `web/` Voraussetzung ist, steht in der Fehlermeldung des Skripts (21).
- **`launch()` lädt `playwright-core` dynamisch:** begründet im Kommentar (15).

## D. Abgeleitete Tasks

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| [TASK-21](TASK-21-split-in-browser-entflechten.md) | `splitInBrowser` und `scaleInBrowser` entflechten, Schwellen benennen | Medium | ~1,5 h | CODE-01, CODE-02 |
| [TASK-22](TASK-22-build-test-in-ci-wirksam.md) | Build-Test für Icon-Verweise in der CI wirksam machen (Entscheidung erforderlich) | Medium | ~1 h | CODE-05 |
| [TASK-23](TASK-23-build-ico-testen.md) | `buildIco` direkt testen, Export und toten Zweig bereinigen | Low | ~30 min | CODE-03 |
| [TASK-24](TASK-24-test-hygiene-marken-icon.md) | Testtitel und Importe in `marken-icon.test.mjs` bereinigen | Low | ~20 min | CODE-04 |
| [TASK-25](TASK-25-cli-argumente.md) | CLI-Argumente mit `parseArgs` und einheitlicher Benennung | Low | ~30 min | CODE-06 |
| [TASK-26](TASK-26-manifest-beschreibung.md) | Beschreibungstext im Manifest und im Meta-Tag abgleichen | Low | ~15 min | CODE-07 |

## E. Meta-Bewertung

- **Gut automatisiert behebbar:** CODE-02, 03, 04, 06, 07 (mechanisch, durch Tests abgesichert).
- **Erfordert menschliche Entscheidung:** CODE-05 (Reihenfolge in der CI ändern, Build-Test in den `web/`-Schritt verlegen oder den Test streichen).
- **Empfehlung für künftige KI-Codegenerierung:** In `AGENTS.md` festhalten, dass „skip, wenn Voraussetzung fehlt“ nur zulässig ist, wenn die Voraussetzung in der CI hergestellt wird; für Browser-Skripte reine Berechnung (Erkennung, Freistellung) als reine Funktionen auslagern, die ohne Chromium testbar sind.

## F. Nicht bewertbar

- Visuelle Qualität des Zuschnitts und der Freistellung (Säume, Randglättung) in `icon.png` und den Ableitungen: Binärdateien wurden nur auf Format, Maße, Größen und transparente Ecken geprüft, nicht inhaltlich beurteilt.
- Verhalten des Skripts auf anderen Chromium-Versionen als der lokalen (Version 1140).

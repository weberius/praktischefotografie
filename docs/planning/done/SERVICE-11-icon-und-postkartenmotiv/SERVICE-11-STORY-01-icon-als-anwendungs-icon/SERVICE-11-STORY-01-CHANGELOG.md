# Changelog: SERVICE-11-STORY-01 – Icon als Anwendungs-Icon

## 2026-10-29 – REVIEW-TASK-22: Build-Test für Icon-Verweise in der CI wirksam machen

- **Status:** Umgesetzt (Option A)
- **Quelle (Review):** Code-Review CODE-05, `review/SERVICE-11-STORY-01/TASK-22-build-test-in-ci-wirksam.md`; Gherkin „Pfade relativ zum Basispfad“, Q-USE-11
- **Änderungen:** Der Build-Test liest den `<base href>` der erzeugten Seiten und prüft, dass alle vier Icon-Verweise (drei Seiten) und die Manifest-Icons unterhalb des Basispfads auf vorhandene Dateien im Build führen (`distFileFor`); ein eigener Test belegt, dass ein führender Schrägstrich oder eine fremde Adresse den Basispfad verlässt. Der Deploy-Workflow führt den Test nach dem Build mit Basispfad aus (`node --test ../test/marken-icon.test.mjs`).
- **Dateien:** `test/marken-icon.test.mjs`, `.github/workflows/deploy-pages.yml`
- **Prüfung:** Lokal mit Build `--base-href /pf/`: 15 von 15 grün; Gegenprobe (im erzeugten `index.html` `href="/favicon-96x96.png"`) lässt den Test fehlschlagen, danach zurückgesetzt. Gate: `npm run build`, `npm test` (208, 0 Fehler), `npm run web:test` (238 von 238), `npm run lint:all` grün. **Nicht geprüft:** ein echter Lauf des Workflows auf GitHub.

## 2026-10-29 – REVIEW-TASK-23: `buildIco` direkt testen, toten Zweig bereinigen

- **Status:** Umgesetzt
- **Quelle (Review):** Code-Review CODE-03, `review/SERVICE-11-STORY-01/TASK-23-build-ico-testen.md`
- **Änderungen:** `buildIco` hat Tests ohne Browser (Kopf, Verzeichnis, Offsets, Längen, PNG-Daten, keine überzähligen Bytes; Größen über 255 werden abgelehnt). Der unerreichbare Zweig für 256 Pixel ist durch eine Prüfung mit Fehlermeldung ersetzt.
- **Dateien:** `web/tools/make-icons.mjs`, `test/make-icons.test.mjs`
- **Prüfung:** Tests laufen auch ohne `CHROME_BIN`. Gate: grün (siehe REVIEW-TASK-01, gemeinsamer Lauf: `npm test` 207, `npm run web:test` 238).

## 2026-10-29 – REVIEW-TASK-01: Erfolgspfad der Icon-Ableitung testen

- **Status:** Umgesetzt
- **Quelle (Review):** Architektur-Review ARCH-01, `review/SERVICE-11-STORY-01/TASK-01-icon-skript-ableitung-testen.md`
- **Änderungen:** Zwei Tests mit synthetischem Quellbild in temporären Ordnern: `makeAll` (Icon, Postkarte, fünf Icon-Dateien mit Größen, ICO 16/32/48, transparente Ecke, deckende Mitte) und Aufruf des Skripts über die Kommandozeile mit `--source/--docs/--public` (Ausgabezeile und Dateien). Ohne `CHROME_BIN` werden sie mit Meldung übersprungen; die eingecheckten Dateien bleiben unberührt.
- **Dateien:** `test/make-icons.test.mjs`
- **Prüfung:** 8 von 8 grün mit Chromium, ohne Chromium 4 grün und 4 übersprungen. Gate: `npm run build`, `npm test` (207, 0 Fehler), `npm run web:test` (238 von 238), `npm run lint:all` grün.

## 2026-10-29 – REVIEW-TASK-24: Testtitel und Importe in `marken-icon.test.mjs` bereinigen

- **Status:** Umgesetzt (gemeinsam mit STORY-03 REVIEW-TASK-21 und -22, eine Testdatei)
- **Quelle (Review):** Code-Review CODE-04, `review/SERVICE-11-STORY-01/TASK-24-test-hygiene-marken-icon.md`
- **Änderungen:** Ein statischer Import von `decodePng` und `pngSize`; die drei dynamischen Importe und die dafür `async` gemachten Tests entfallen; der Test zum Icon-Master prüft nun, was sein Titel sagt (siehe STORY-03).
- **Dateien:** `test/marken-icon.test.mjs`
- **Prüfung:** Gate (gemeinsamer Lauf für TASK-24, STORY-03 TASK-21 und TASK-22): `npm run build`, `npm test` (203, 0 Fehler), `npm run web:test` (238 von 238), `npm run lint:all` grün.

## 2026-10-29 – TASK-01 (Nachbesserung): Skript und Tests auch ohne `web/node_modules` lauffähig

- **Status:** Umgesetzt
- **Änderungen:** `playwright-core` wird in `web/tools/make-icons.mjs` erst beim Start des Browsers geladen (dynamischer Import). Grund: In der CI läuft `npm test` im Wurzelverzeichnis vor `npm ci` in `web/`; der statische Import hätte dort alle Tests von `test/make-icons.test.mjs` beim Laden scheitern lassen. Fehlt das Modul oder Chromium, meldet das Skript „Kein Chromium gefunden …“ mit Hinweis auf `npm install` in `web/` und `CHROME_BIN`.
- **Dateien:** `web/tools/make-icons.mjs`
- **Prüfung:** Simulation des CI-Zustands (`web/node_modules` zeitweise umbenannt): `node --test` auf beide neuen Testdateien ergibt 15 grün, 2 übersprungen (Browser-Tests mit Meldung), 0 Fehler; mit Modulen und Chromium 4 grün. Gate: `npm run build`, `npm test`, `npm run web:test`, `npm run lint:all` grün. **Nicht geprüft:** ein echter CI-Lauf auf GitHub.

## 2026-10-29 – TASK-04: Dokumentierter Befehl zum Neuerzeugen

- **Status:** Umgesetzt
- **Änderungen:** npm-Skript `icons:build` im Wurzel-`package.json` (`node web/tools/make-icons.mjs`); README-Abschnitt „Icon und Postkartenmotiv“ (Quelle, Ausgaben, Voraussetzung Chromium über `CHROME_BIN`, nicht im Build).
- **Dateien:** `package.json`, `README.md`, `test/marken-icon.test.mjs`
- **Prüfung:** Test (Skript, README-Begriffe, keine Bildbibliothek in `web/package.json`) zuerst rot, dann grün. `npm run icons:build` mit dem echten Quellbild läuft ohne Zwischenschritt und erzeugt alle sieben Dateien; ein zweiter Lauf ergibt **bytegleiche** Dateien (Diff leer). Gate: `npm run build`, `npm test` (199, 0 Fehler), `npm run web:test` (233 von 233), `npm run lint:all` grün.

## 2026-10-29 – TASK-03: index.html verlinkt Icons, Web-App-Manifest

- **Status:** Umgesetzt
- **Änderungen:** `web/src/index.html` verlinkt `favicon.ico` (32x32), `favicon-96x96.png`, Apple-Touch-Icon, Manifest und `theme-color #ffffff`, alle Pfade relativ ohne führenden Schrägstrich. Neu: `web/public/site.webmanifest` (Name und Kurzname „Praktische Fotografie“, `display: standalone`, Hintergrund `#fafaf7`, Icons 192 und 512).
- **Dateien:** `web/src/index.html`, `web/public/site.webmanifest`, `test/marken-icon.test.mjs`
- **Prüfung:** Drei Tests (index.html: Links, Größen, Typ, relative Pfade, Zieldateien vorhanden; Manifest: Felder, Icons mit richtigen Maßen, relative Verweise; Build: Dateien im Ausgabeverzeichnis, Verweise in drei erzeugten Seiten relativ) zuerst rot, dann grün. Gate: `npm run build`, `npm test` (198, 0 Fehler), `npm run web:test` (233 von 233), `npm run lint:all` grün. **Nicht geprüft:** Laden unter einem echten Basispfad `/pf/` im Browser (hier nur über die Relativität der Verweise belegt; Sichtprüfung folgt).

## 2026-10-29 – TASK-02: Icon-Dateien aus dem Master ableiten

- **Status:** Umgesetzt
- **Änderungen:** Das Skript hat das echte Quellbild geschnitten (`docs/resources/icon.png` 450 × 450, `docs/resources/postkarte.png` 1011 × 803) und daraus `favicon.ico` (PNG-Bilder 16/32/48), `favicon-96x96.png`, `apple-touch-icon.png` (180), `web-app-manifest-192x192.png` und `-512x512.png` nach `web/public/` geschrieben (Verkleinern in Stufen; 512 aus 450 hochskaliert). Das alte Standard-`favicon.ico` ist ersetzt.
- **Quelle (Anpassung):** Quality – Q-PERF-7: Die Grenzen der Manifest-Icons (≤ 60 kB für 192, ≤ 200 kB für 512) waren zu knapp für das Foto-Motiv (65 kB und 357 kB); angehoben auf ≤ 80 kB und ≤ 400 kB, weil diese Dateien nur beim Anlegen einer Verknüpfung abgerufen werden. Kopf-Icon (≤ 30 kB, ist 20 kB), Favicon (10 kB) und Apple-Touch-Icon (≤ 60 kB, ist 57 kB) halten die Grenzen. Eingetragen in `docs/quality/web/markenicon.md`.
- **Dateien:** `docs/resources/icon.png`, `docs/resources/postkarte.png`, `web/public/favicon.ico`, `favicon-96x96.png`, `apple-touch-icon.png`, `web-app-manifest-192x192.png`, `web-app-manifest-512x512.png`, `test/marken-icon.test.mjs`, `web/tools/make-icons.mjs` (Argument-Fehler beim Aufruf von `scaleInBrowser` behoben), `docs/quality/web/markenicon.md`
- **Prüfung:** Sechs Datei-Tests (Maße, ICO mit 16/32/48, Dateigrößen, transparente Ecken, deckende Mitte). Sichtprüfung des Zuschnitts, der Größen 96/32/16 px auf hellem und dunklem Grund sowie des Kopfs mit Text: sauber, Ecken transparent, 16 px grob, aber erkennbar (Blende und Farbfelder). Gate: `npm run build`, `npm test`, `npm run web:test`, `npm run lint:all` grün (Zahlen siehe oben).

## 2026-10-29 – TASK-01: Zuschnitt: Skript trennt Icon und Postkartenmotiv

- **Status:** Umgesetzt
- **Änderungen:** `web/tools/make-icons.mjs` (`playwright-core`, keine neue Abhängigkeit): findet im Quellbild die beiden Motive über leere Spalten, schneidet die Postkarte bis zum Rand zu und das Icon quadratisch (transparent aufgefüllt) zu; der weiße Hintergrund außerhalb der abgerundeten Ecken wird per Flutfüllung transparent, mit weichem Rand. Klare Meldungen bei fehlender Quelle, fehlendem Chromium und nicht zwei Motiven. Test-Helfer `test/png-helpers.mjs` (PNG ohne Abhängigkeit kodieren/dekodieren).
- **Dateien:** `web/tools/make-icons.mjs`, `test/make-icons.test.mjs`, `test/png-helpers.mjs`
- **Prüfung:** Vier Tests mit synthetischem Testbild (Zuschnitt exakt, quadratisch, transparente Ecken und Ränder, keine Reste des anderen Motivs, kein weißer Rand, Fehlermeldungen). Ohne Chromium werden die zwei Browser-Tests übersprungen (Meldung), mit `CHROME_BIN` laufen sie. **Hinweis:** Skript und Tests entstanden in einem Zug; die Tests waren nicht vorab rot. Gate: `npm run build`, `npm test` (189, 0 Fehler), `npm run web:test` (233 von 233), `npm run lint:all` grün. Echtes Quellbild noch nicht geschnitten (TASK-02).

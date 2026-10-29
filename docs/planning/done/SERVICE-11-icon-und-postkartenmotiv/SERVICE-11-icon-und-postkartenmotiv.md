# SERVICE-11 – Icon für die Webanwendung und Postkartenmotiv

**Status:** Entwurf (Intake), Stories und Spezifikation vorbereitet, Freigabe an H1 steht aus  ·  **Quelle:** Idee [`20261029-1100 image and icon`](../../../product/ideen/20261029-1100%20image%20and%20icon.md)

> „Ich habe mit docs/resources/zfpf.png ein image gelegt. Es enthält auf der linken Seite ein Icon. Auf der rechten Seite das Motiv für eine Postkarte. Bitte trenne die beiden Bilder und stelle für die Webanwendung das Icon ein. Orientiere Dich hier an Klangland: Das Icon soll das Icon für die Webanwendung sein. Das Icon soll im Header-Bereich der Seite vor ‚Praktische Fotografie‘ stehen.“

## Ziel
Die Webanwendung hat ein Marken-Icon: im Browser-Tab und in Lesezeichen, auf dem Startbildschirm von Mobilgeräten und im Kopfbereich jeder Seite vor dem Namen „Praktische Fotografie“. Das Quellbild wird in Icon und Postkartenmotiv getrennt; die Postkarte liegt als eigene Datei vor, wird aber nicht ausgeliefert.

**Zweck in einem Satz:** Besucher:innen sollen die Anwendung an ihrem Icon erkennen, und das Projekt soll sein Postkartenmotiv als eigene Datei besitzen.

**Erfolgskriterien**
- Jede Seite verlinkt Favicon (ICO und PNG), Apple-Touch-Icon und Manifest; die Dateien liegen in den geforderten Größen vor und laden auch unter dem Basispfad der GitHub-Pages-Auslieferung.
- Im Kopfbereich jeder Seite steht das Icon innerhalb des Startseiten-Links vor dem Text, dekorativ ausgezeichnet.
- Icon und Postkartenmotiv liegen getrennt und zugeschnitten in `docs/resources/`; ein dokumentierter Befehl erzeugt alle Dateien neu.

## Kontext
`web/public/` enthält nur ein Standard-`favicon.ico`; der Kopf zeigt nur den Text „Praktische Fotografie“. `klangland` liefert das Muster: `favicon.ico`, `favicon-96x96.png`, `apple-touch-icon.png`, `web-app-manifest-192x192.png` und `-512x512.png`, `site.webmanifest`, Verlinkung in `index.html`, Icon im Kopf als dekoratives `<img>` (2,5 rem) im Link zur Startseite. Das Quellbild ist 1536 × 1024 Pixel groß: links das Icon (abgerundetes Quadrat mit Bildcollage und Blende), rechts das Postkartenmotiv (Querformat). Auf GitHub Pages läuft die Anwendung unter einem Basispfad (ADR-003).

## Story-Schnitt
1. `STORY-01` Icon als Anwendungs-Icon (Favicon, Startbildschirm, Manifest; Zuschnitt und Skript)
2. `STORY-02` Icon im Kopfbereich vor dem Namen
3. `STORY-03` Postkartenmotiv als eigene Datei

## Abgrenzung
**Nicht enthalten:** Verwendung des Postkartenmotivs in der Webanwendung (Seite, Magazin, Social-Media-Vorschau), Service Worker oder echte PWA-Installierbarkeit, Open-Graph-/Share-Bilder, Neugestaltung des Kopfbereichs oder der Navigation, Retusche oder Neuzeichnen des Icons, Farbanpassung der Anwendung an das Icon.

## Betroffene Bereiche
`web` (`index.html`, `app.html`/CSS, `public/`), `setup` (Bildmaterial, Skript in `web/tools/`), `docs/resources/`.

## Vorbereitete Spezifikation (Phase 3)
- EARS: `web/markenicon.md` (ICO-UB-1 bis ICO-UB-6), `setup/bildmaterial.md` (IMG-UB-1 bis IMG-UB-4)
- Gherkin: `web/markenicon.feature`, `setup/bildmaterial.feature`
- Quality: `web/markenicon.md` (Q-USE-11, Q-PERF-7, Q-MAIN-5); Ergänzungen zu Q-USE-4 und Q-SEO-2
- ADR: ADR-017 (`Proposed`), ergänzt ADR-002 und ADR-003

## Annahmen
- ANNAHME: Das Icon wird auf das abgerundete Quadrat zugeschnitten; die weißen Ecken außerhalb des Motivs werden transparent. Das Postkartenmotiv wird bis zum Kartenrand zugeschnitten (ohne weißen Hintergrund des Quellbildes).
- ANNAHME: Das Postkartenmotiv wird als `docs/resources/postkarte.png`, das Icon als `docs/resources/icon.png` abgelegt und nicht ausgeliefert. `docs/resources/` steht nicht in der Ablagestruktur von `AGENTS.md`; es dient als Quellmaterial und wird nicht als Dokumentation behandelt.
- ANNAHME: Dateien und Verlinkung wie in Klangland (Namen, Größen 16/32/48, 96, 180, 192, 512; `theme-color`, Manifest mit `display: standalone`).
- ANNAHME: `theme-color` ist `#ffffff` (Kopfbereich), `background_color` im Manifest `#fafaf7` (Seitenhintergrund); Name und Kurzname im Manifest: „Praktische Fotografie“.
- ANNAHME: Das Icon im Kopf wird etwa 2 rem groß dargestellt (Datei 96 × 96 Pixel, auch für hochauflösende Bildschirme) und mit etwa 0,5 rem Abstand vor dem Namen gesetzt.
- ANNAHME: Die Bilder werden mit einem Skript auf Basis des bereits vorhandenen `playwright-core` erzeugt (ADR-017); die Ergebnisdateien werden eingecheckt, das Skript läuft nicht im Build.
- ANNAHME: Die Idee-Datei beginnt mit einer Leerzeile vor dem Dateikopf (`---`); ich habe sie nicht korrigiert.

## Qualitätserwartungen
Q-USE-11, Q-PERF-7, Q-MAIN-5; zusätzlich Q-USE-2, Q-USE-4, Q-PERF-3.

## Definition of Done
- Spezifikation konsistent, ADR-017 bestätigt.
- Build, `npm test`, `npm run web:test` und `npm run lint:all` grün; Icon- und Manifest-Prüfungen im Build-Test grün.
- Icon im Browser (Tab, Kopfbereich) einmal gesichtet.

## Risiken
- **Technisch:** Der Zuschnitt aus einem Rasterbild mit Schlagschatten und weichen Rändern kann Reste des Hintergrunds oder der Nachbargrafik enthalten; Gegenmaßnahme: Maße im Test prüfen, Ergebnis ansehen. Das Skript hängt an einem installierten Chromium.
- **Gestalterisch:** Das Icon enthält viel Detail und kann bei 16 × 16 Pixeln undeutlich sein; Gegenmaßnahme: Blende in der Mitte bleibt erkennbar, Sichtprüfung der kleinen Größen.
- **Organisatorisch:** Die Urheberschaft und Nutzungsrechte der Bilder (vermutlich KI-erzeugt) sind nicht geklärt; Gegenmaßnahme: Klärung durch den Menschen (kein Teil dieses Tickets).

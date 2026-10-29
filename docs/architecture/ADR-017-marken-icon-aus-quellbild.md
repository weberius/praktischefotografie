# ADR-017: Marken-Icon aus dem Quellbild, Auslieferung nach dem Muster von Klangland

**Status:** Accepted (an H2 am 2026-10-29 bestätigt)  ·  **Datum:** 2026-10-29

## Kontext
Mit `docs/resources/zfpf.png` liegt ein Quellbild vor: links das Icon, rechts das Motiv einer Postkarte. Die Webanwendung hat bisher nur ein Standard-`favicon.ico` und keinen Marken-Auftritt im Kopf. Das Icon soll das Icon der Anwendung sein und im Kopfbereich vor „Praktische Fotografie“ stehen; das Schwesterprojekt `klangland` zeigt die Umsetzung (Favicon-Dateien, Apple-Touch-Icon, Web-App-Manifest, Icon im Kopf). Die Anwendung läuft unter einem Basispfad auf GitHub Pages (ADR-003). Das Bild ist eine Collage aus Fotografien; es lässt sich nicht verlustfrei vektorisieren.

## Entscheidung
- **Dateien nach Vorbild Klangland.** In `web/public/` liegen `favicon.ico` (16, 32, 48 px), `favicon-96x96.png`, `apple-touch-icon.png` (180 px), `web-app-manifest-192x192.png`, `web-app-manifest-512x512.png` und `site.webmanifest`. `index.html` verlinkt sie mit `<link rel="icon">`, `rel="apple-touch-icon"`, `rel="manifest"` und setzt `theme-color` – alle Pfade relativ ohne führenden Schrägstrich, weil `<base href>` den Basispfad liefert (ADR-003).
- **Icon im Kopf als dekoratives Bild.** `app.html` zeigt im Link zur Startseite `<img src="favicon-96x96.png" alt="" aria-hidden="true" width height>` vor dem Namen; der Text bleibt der zugängliche Name. Die Darstellungsgröße legt CSS fest (etwa 2 rem), Breite und Höhe stehen als Attribute am Bild (kein Layoutsprung). Kein `loading="lazy"`, weil das Bild über dem Falz liegt.
- **Quelle und Zuschnitt.** Das Quellbild bleibt in `docs/resources/zfpf.png`. Das Icon (als Master) und das Postkartenmotiv liegen als getrennte, zugeschnittene PNG-Dateien in `docs/resources/`; sie werden nicht ausgeliefert. Das Postkartenmotiv wird ausdrücklich nicht in `web/public/` kopiert (Bundle und Ladezeit).
- **Ableitung per Skript, Ergebnis eingecheckt.** Ein Node-Skript in `web/tools/` erzeugt aus dem Quellbild den Zuschnitt und alle Icon-Dateien. Es nutzt das bereits vorhandene `playwright-core` (Chromium für Dekodieren, Zuschneiden, Skalieren und PNG-Ausgabe) und baut die ICO-Datei aus PNG-Daten selbst; es kommt keine neue Abhängigkeit hinzu. Die erzeugten Dateien sind eingecheckt, das Skript läuft weder im Build noch in der CI, nur bei Bedarf per dokumentiertem Befehl.
- **Ecken.** Das Icon wird auf das abgerundete Quadrat zugeschnitten; Ecken außerhalb des Motivs werden transparent. Die genaue Maske wird im Task festgelegt und gegen das Bild geprüft.

## Alternativen
- **`sharp` als Entwicklungsabhängigkeit:** schnell und einfach, bringt aber ein natives Modul in `web/package.json`; für ein einmaliges Zuschneiden unverhältnismäßig.
- **Online-Generator (z. B. RealFaviconGenerator) und Dateien von Hand ablegen:** erzeugt dieselben Dateinamen wie in Klangland, ist aber nicht reproduzierbar und lässt sich nicht testen.
- **SVG-Icon:** skalierbar und klein, aber das Motiv ist eine Foto-Collage und wäre nur mit starkem Verlust nachzuzeichnen.
- **ImageMagick/Python:** auf dieser Umgebung nicht installiert; ein weiteres Werkzeug außerhalb von Node.
- **Postkartenmotiv ebenfalls in `web/public/`:** unnötige Auslieferung eines etwa 1 MB großen Bildes, das die Anwendung nicht zeigt.

## Konsequenzen
- Die Anwendung hat ein Icon in Tab, Lesezeichen, Startbildschirm und Kopf.
- Das Manifest macht die Anwendung nicht automatisch installierbar (kein Service Worker); es liefert Name, Farben und Icons für Startbildschirm-Verknüpfungen.
- Das Skript setzt ein installiertes Chromium voraus (wie die Prüfungen in `web/tools/quality`); in CI und im Build wird es nicht gebraucht.
- `docs/resources/` ist nicht in der Ablagestruktur von `AGENTS.md` vorgesehen; die Dateien dort sind Quellmaterial, keine Dokumentation (siehe Annahme in der Planung).
- Das alte `web/public/favicon.ico` wird ersetzt.

## Auswirkungen
- EARS: ICO-UB-1 bis ICO-UB-6, IMG-UB-1 bis IMG-UB-4.
- Gherkin: `web/markenicon.feature`, `setup/bildmaterial.feature`.
- Quality: Q-USE-11, Q-PERF-7, Q-MAIN-5; Ergänzungen zu Q-USE-4 und Q-SEO-2.
- Ergänzt ADR-003 (relative Pfade unter dem Basispfad) und ADR-002 (Kopfbereich der Anwendung).

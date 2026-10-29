# Qualität: Marken-Icon (web)

**Stand:** 2026-10-29. Fortlaufend zu Q-USE-2, Q-USE-4 und Q-PERF-3.

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-USE-11 | Besucher:in liest den Kopfbereich mit Screenreader und Tastatur; die Anwendung läuft unter einem Basispfad (GitHub Pages). | Das Icon im Kopf ist dekorativ (`alt=""` und `aria-hidden="true"`); der Link zur Startseite hat genau den zugänglichen Namen „Zentrum für praktische Fotografie“; Icon und Text stehen in dieser Reihenfolge im Dokument; 0 axe-Verstöße auf je einer Seite jedes Seitentyps; 100 % der Icon-Verweise (Kopf, `index.html`, Manifest) sind relativ und laden unter dem Basispfad `/pf/` ohne 404. | Komponententest auf Attribute, Name und Reihenfolge; axe-Lauf (`tools/quality`); Build-Test über die erzeugten HTML-Dateien und das Manifest mit Basispfad | ICO-UB-7, ICO-UB-8, ICO-UB-5 |
| Q-PERF-7 | Besucher:in öffnet eine beliebige Seite auf einem Mobilgerät mit gedrosselter Verbindung. | Das Icon im Kopf (96 × 96 Pixel, dargestellt mit fester Breite und Höhe) ist ≤ 30 kB groß, wird nicht verzögert geladen (kein `loading="lazy"`) und verursacht keine Layoutverschiebung (CLS-Beitrag 0); `favicon.ico` ≤ 40 kB, Apple-Touch-Icon ≤ 60 kB, Manifest-Icons ≤ 80 kB (192) und ≤ 400 kB (512; werden nur beim Anlegen einer Startbildschirm-Verknüpfung abgerufen, nicht beim Seitenaufruf); Lighthouse-Performance bleibt ≥ 90 wie Q-PERF-3. | Dateigrößenprüfung im Build-Test, Komponententest auf Attribute, Lighthouse-Lauf (`tools/quality`) | ICO-UB-1, ICO-UB-2, ICO-UB-6 |
| Q-MAIN-5 | Entwickler:in tauscht das Quellbild aus und erzeugt Icon, Postkartenmotiv und alle Icon-Dateien neu. | Ein dokumentierter Befehl erzeugt alle Dateien (Icon- und Postkarten-PNG in `docs/resources/`, fünf Icon-Dateien in `web/public/`) ohne manuelle Zwischenschritte und ohne neue Abhängigkeit in `web/package.json`; das Skript meldet fehlende Eingaben mit einer verständlichen Meldung; das Postkartenmotiv gelangt nicht in `web/public/` und nicht in den Build. | Test des Skripts mit einem kleinen Testbild (Zuschnitt, Größen), Dateiprüfung des Builds | IMG-UB-1, IMG-UB-2, IMG-UB-3, IMG-UB-4 |

**Ergänzung 2026-10-29 zu Q-USE-4:** Das Icon im Kopf ist ein Bild mit Beschriftung durch den Namen daneben; es trägt keine Information, die nur über Farbe vermittelt wird.

**Ergänzung 2026-10-29 zu Q-SEO-2:** Die Meta-Angaben im Kopf von `index.html` (Titel, Beschreibung) bleiben unverändert; Icon-Verweise kommen hinzu (ICO-UB-1, ICO-UB-2).

**Änderung 2026-10-29 (Umsetzung):** Die Grenzen der Manifest-Icons in Q-PERF-7 wurden von ≤ 60 kB (192) und ≤ 200 kB (512) auf ≤ 80 kB und ≤ 400 kB angehoben. Das Foto-Motiv ergibt als PNG 65 kB (192) und 357 kB (512); die Dateien werden nicht beim Seitenaufruf geladen, die Grenzen für Kopf-Icon (≤ 30 kB), Favicon und Apple-Touch-Icon bleiben. Vorherige Fassung der Grenzen: siehe Git-Verlauf dieser Datei.

**Änderung 2026-10-29 (Namenswechsel im Kopf):** Der zugängliche Name des Startseiten-Links in Q-USE-11 lautet „Zentrum für praktische Fotografie“ (vorher „Praktische Fotografie“); EARS-Bezug ICO-UB-7 und ICO-UB-8 statt ICO-UB-3 und ICO-UB-4.

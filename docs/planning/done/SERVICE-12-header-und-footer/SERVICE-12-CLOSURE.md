# Closure: SERVICE-12 – Header und Footer überarbeiten

**Datum:** 2026-10-29  ·  **Quelle:** Idee `docs/product/ideen/idee-003-header-and-footer.md`

## Erreichtes
- Kopfbereich: Name „Zentrum für praktische Fotografie“ mit Marken-Icon im Link zur Startseite (darf umbrechen), Navigation hinter einem Burger-Menü in allen Fensterbreiten (Schaltfläche rechts, Feld in voller Breite unter dem Kopf, schließt per Linkwahl, Seitenwechsel und Escape, scrollbar bei niedrigen Fenstern), Kopf haftet oben (`sticky`) und liegt über der Karte.
- Kopfhöhe 3,56 rem bei 390 und 320 Pixeln (Maß ≤ 5 bzw. 6 rem), kein horizontales Scrollen; Sprunglink und Router-Anker landen unter dem Kopf.
- Fußbereich nach dem Vorbild von Klangland: Linkzeile Rechtliches mit vier Links, helle Fläche, Trennlinie, gedämpfte Schrift, nicht fixiert, bei kurzem Inhalt am Fensterrand.
- Rechtliche Seiten: neu `/haftungsausschluss` und `/quellen` (Quellen & Lizenzen); Impressum mit den Betreiberangaben und Datenschutz auf diese Anwendung zugeschnitten, ohne Platzhalter und ohne Klangland-Reste.
- Spezifikation: FRM-UB-1 bis FRM-UB-5, FRM-ST-1, FRM-EV-1 bis FRM-EV-3, RCH-UB-1 bis RCH-UB-5, ICO-UB-7/8 (ersetzen ICO-UB-3/4), NAV-UB-7/8 (ersetzen NAV-UB-6/5); Gherkin `seitenrahmen.feature` (11), `rechtliches.feature` (5); Q-USE-12, Q-USE-13, Q-USE-14, Q-PERF-8. Kein ADR.
- Prüfung: Build, 208 Skript-Tests, 269 Web-Tests (vorher 238), `lint:all` grün; `npm run quality` ohne axe-Befund, CLS 0, Kopfhöhe und Scrollbreite im Lauf gemessen.
- Review je Story (neun Analysen): kein Befund kritisch oder hoch; sieben mittlere Befunde freigegeben und sechs davon umgesetzt, Menü-Fehler und fehlende Tests eingeschlossen.

## Abweichungen
- Alle fünf Stories gemeinsam an H2 (wie bei SERVICE-10/11).
- Kopf bei 390 und 320 Pixeln war beim ersten Messen 5,01 und 6,74 rem hoch; behoben mit kleinerer Schrift und engerem Padding, ohne die Spezifikation zu ändern.
- Der Router-Anker ignoriert `scroll-padding`; zusätzlich `ViewportScroller.setOffset` (Konstante mit Test gegen das CSS).
- Compliance-Review (GBOS) nicht ausgeführt: `gbos-mcp` nicht verfügbar. Architektur und Security nur dort, wo sie zum Umfang passten.
- Die Tests entstanden zusammen mit dem Code (nicht strikt vorher rot); die Browser-Messungen kamen aus einem einmaligen Skript, nicht aus einem eingecheckten Test, bis der Review sie in den Qualitätslauf holte.
- Nicht geprüft: axe bei geöffnetem Menü, Aussehen auf echten Geräten, Firefox und Safari, Quellenliste gegen alle Datenquellen, juristische Prüfung der rechtlichen Seiten. Karma lief über `CHROME_BIN` (Playwright-Chromium 130).
- `npm run quality`: dieselben Befunde wie vorher (fünf doppelte Magazin-Titel, Lighthouse-Performance `/map` 82 < 90).

## Rückläufe
Keine aus H2 (Ergebnis akzeptiert). Review-Tasks: siehe `review/CHANGELOG.md` (sechs mittlere Befunde umgesetzt, in acht Task-Dateien, von denen zwei Paare dasselbe lösen; EU-Streitschlichtung offen; übrige zurückgestellt).

## Erkenntnisse
- `scroll-padding` wirkt für Browser-Anker, nicht für den Anker-Sprung des Angular-Routers; Anker-Offset und CSS brauchen eine gemeinsame Quelle oder einen Test.
- `NavigationEnd` kommt nicht, wenn man den Link der aktuellen Seite wählt; „schließt nach Seitenwechsel“ reicht für ein Menü nicht.
- Ein haftender Kopf braucht Höhenmaße bei schmalen Fenstern; ein längerer Name verlängert ihn sonst unbemerkt auf mehrere Zeilen.
- Leaflet-Ebenen reichen bis `z-index` 1000; der Kopf liegt mit 1100 darüber.

## Follow-ups / empfohlene Tickets
1. Betreiber entscheidet über den Hinweis zur EU-Streitschlichtung im Impressum (Review-Task STORY-05 TASK-21; die OS-Plattform soll seit Juli 2025 eingestellt sein), Rechtstexte juristisch prüfen.
2. Zurückgestellte Review-Tasks: Navigationsdaten für Kopf und Fuß zentral pflegen, CSS und Testhilfen aufräumen, Stapelreihenfolge benennen (`review/`).
3. axe-Lauf mit geöffnetem Menü ergänzen; Sichtprüfung auf Mobilgeräten.
4. SEC-01: Hinweis auf den Referrer bei OpenStreetMap-Kacheln in der Datenschutzerklärung und `Referrer-Policy` prüfen.
5. Bestehende Befunde von `npm run quality` (doppelte Magazin-Titel, Performance `/map`).
6. Klangland-Seiten und -Texte (Haftungsausschluss, Quellen) sind übernommen und angepasst; Herkunft der Betreiberangaben bestätigt.

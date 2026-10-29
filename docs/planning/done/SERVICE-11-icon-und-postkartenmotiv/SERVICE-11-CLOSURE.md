# Closure: SERVICE-11 – Icon für die Webanwendung und Postkartenmotiv

**Datum:** 2026-10-29  ·  **Quelle:** Idee `docs/product/ideen/20261029-1100 image and icon.md`

## Erreichtes
- Quellbild getrennt: `docs/resources/icon.png` (450 × 450, transparente Ecken) und `docs/resources/postkarte.png` (1011 × 803, bis zum Kartenrand). Die Postkarte wird nicht ausgeliefert.
- Icon der Webanwendung nach dem Muster von Klangland: `favicon.ico` (16/32/48), `favicon-96x96.png`, `apple-touch-icon.png`, zwei Manifest-Icons (192/512) und `site.webmanifest` in `web/public/`; `index.html` verlinkt sie relativ zum Basispfad, mit `theme-color`.
- Icon im Kopfbereich jeder Seite vor „Praktische Fotografie“ im Startseiten-Link (2 rem, dekorativ, der Link behält seinen Namen); unter dem Basispfad `/pf/` gemessen: Icon lädt (200), 0 fehlgeschlagene Anfragen.
- Ein dokumentierter Befehl (`npm run icons:build`, README) erzeugt alle Dateien aus dem Quellbild, ohne neue Abhängigkeit; ein zweiter Lauf ergibt bytegleiche Dateien.
- Spezifikation: ICO-UB-1 bis ICO-UB-6, IMG-UB-1 bis IMG-UB-4, elf Gherkin-Szenarien, Q-USE-11, Q-PERF-7, Q-MAIN-5, ADR-017 (Accepted).
- Prüfung: Build, 208 Skript-Tests und 238 Web-Tests, `lint:all` grün (nach jedem Task bzw. Aufgabengruppe); axe ohne Befund, CLS 0.
- Review je Story (Architektur, Code, Security; STORY-03 nur Code): kein Befund oberhalb der Schwelle, Security ohne Befunde. Sechs Tasks umgesetzt – vor allem der Build-Test für die Icon-Verweise, der in der CI vorher nie lief (jetzt Workflow-Schritt nach dem Build mit Basispfad), und Tests für `buildIco`, den Erfolgspfad des Skripts und den Icon-Rand.

## Abweichungen
- Alle drei Stories wurden auf Wunsch gemeinsam an H2 vorgelegt (wie bei SERVICE-10).
- Q-PERF-7 während der Umsetzung angepasst: Manifest-Icons ≤ 80 kB (192) und ≤ 400 kB (512) statt 60/200 kB, weil das Foto-Motiv 65 und 357 kB ergibt (nur beim Anlegen einer Verknüpfung geladen).
- Compliance-Review (GBOS) nicht ausgeführt: `gbos-mcp` nicht verfügbar. Architektur- und Security-Review für STORY-03 entfallen (nur Testdateien).
- Die ersten Tests des Skripts entstanden nach dem Skript, nicht davor (im Changelog vermerkt); bei den übrigen Tasks waren die Tests zuerst rot.
- Nicht geprüft: ein echter Lauf des erweiterten Workflows auf GitHub, Firefox und Safari, das Aussehen auf einem echten Handy-Startbildschirm. Karma lief lokal über `CHROME_BIN` (Playwright-Chromium 130).
- `npm run quality` meldet auf `main` wie mit dem Icon dieselben acht Befunde (fünf doppelte Titel von Magazinbeiträgen, Lighthouse-Performance < 90 auf `/`, `/map` und einer Ortsseite); sie stammen nicht aus diesem Ticket.

## Rückläufe
Keine aus H2. Review-Tasks: siehe `review/CHANGELOG.md` (sechs umgesetzt, fünf zurückgestellt).

## Erkenntnisse
- Ein Test, der ein Build-Ergebnis braucht, läuft in der CI nur dann, wenn er nach dem Build ausgeführt wird; ein stilles `skip` ohne Build verbirgt die Lücke. Der Test gehört an die Stelle der Pipeline, an der sein Ergebnis existiert.
- Ein statischer Import eines Moduls, das nur in einem Teil der CI installiert ist (`playwright-core` unter `web/`), lässt alle Tests der Datei scheitern; ein später Import (erst beim Start des Browsers) mit klarer Meldung löst das.
- Bei Bildableitungen aus einem Foto-Motiv sind Größenvorgaben aus der Erfahrung (60/200 kB) zu knapp; vorher an der echten Datei messen.
- Zuschnitt aus einem Rasterbild: Die Karte hatte leicht abgerundete, fast weiße Ecken; ein „kein weißer Rand“-Test muss das erlauben und an der Realität kalibriert werden.
- Der Quellbild-Zuschnitt lässt sich ohne neue Bibliothek mit dem vorhandenen Browser-Werkzeug (`playwright-core`) lösen; die Ergebnisse sind reproduzierbar (bytegleich).

## Follow-ups / empfohlene Tickets
1. Zurückgestellte Review-Tasks: `splitInBrowser` und `scaleInBrowser` entflechten, CLI-Argumente mit `parseArgs`, doppelten Beschreibungstext in Manifest und Meta-Tag abgleichen, Testaufbau in `app.spec.ts` bündeln (`review/`).
2. Echter Lauf des Workflows und Sichtprüfung des Icons auf einem Mobilgerät (Startbildschirm), in Firefox und Safari.
3. Nutzungsrechte und Herkunft der Bilder klären (das Quellbild enthält einen Herkunftsvermerk C2PA); Postkartenmotiv für Druck oder Social-Media-Vorschau verwenden (eigenes Ticket).
4. `docs/resources/` in die Ablagestruktur von `AGENTS.md` aufnehmen oder anders verorten; `docs/templates/` ergänzen.
5. Lighthouse-Performance < 90 und doppelte Magazin-Titel (bestehende Befunde von `npm run quality`).

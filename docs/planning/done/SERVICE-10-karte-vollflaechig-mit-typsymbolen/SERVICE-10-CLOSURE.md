# Closure: SERVICE-10 – Karte vollflächig, mit Typ-Symbolen und Legende

**Datum:** 2026-10-29  ·  **Quelle:** Idee `docs/product/ideen/20261029-1000 Karte überarbeiten.md`

## Erreichtes
- `/map` ohne Ortsliste: die Karte hat die Breite der Boxen auf der Kalenderseite und reicht unterhalb der Filter bis zur Trennlinie oberhalb von Impressum und Datenschutz (1280 × 800: 395 px, ohne Bildlauf; schmale Fenster: mindestens 24 rem, Fußbereich darunter). Die Listenalternative ist `/venues`; der Link „Orte als Liste anzeigen“ übernimmt alle sechs Filter.
- Fünf Ortstypen mit eigenem Symbol und eigener Farbe (Museum Säulenbau/Blau, Galerie Bilderrahmen/Orange, Stiftung Raute/Violett, Off-Space Tür/Rot, Bibliothek/Archiv Buch/Grün) als Marker mit Textalternative „Name, Typ“; Legende mit allen fünf Typen oberhalb der Karte.
- Seitenrahmen aller Seiten als Spalte: der Fußbereich steht bei kurzem Inhalt am Fensterrand.
- Spezifikation: MAP-UB-7 bis MAP-UB-13 (ersetzen MAP-UB-3 und MAP-UB-6), sechs neue Gherkin-Szenarien (zwei entfallen), Q-USE-9 und Q-USE-10 mit Ergänzungen zu Q-USE-3, Q-USE-4, Q-PERF-3 und Q-SEO-1, ADR-016 (Accepted; ersetzt in ADR-004 den Punkt „Listenalternative“ teilweise).
- Prüfung: Build, 185 Skript-Tests und 233 Web-Tests, `lint:all` grün (nach jedem Task); Playwright-Smoke grün (22 Orte, 22 Marker); Layout im Browser gemessen (1280 × 800 und 390 × 844).
- Review je Story (Architektur, Code, Security): kein Befund oberhalb der Schwelle, Security ohne Befunde. Fünf Tasks umgesetzt (u. a. falsche Listen-Ankündigung im `aria-label` und in der Meta-Beschreibung, zentrale Typliste, stabiler Größentest).

## Abweichungen
- STORY-01 und STORY-02 wurden auf Wunsch gemeinsam an H2 vorgelegt (Rückfrage „Wo ist die Legende?“ nach STORY-01).
- Compliance-Review (GBOS) nicht ausgeführt: `gbos-mcp` ist nicht verfügbar.
- Nicht geprüft: axe- und Lighthouse-Läufe, Tastaturtest im Browser, Aussehen der Symbole in Graustufen, Firefox und Safari (`:has()` ab Chrome 105, Firefox 121, Safari 15.4). Karma lief lokal über `CHROME_BIN` (Playwright-Chromium 130), nicht über eine Systeminstallation.
- Die Review-Skills verweisen auf Pfade eines anderen Projekts (`docs/product/planning/...`, `context/AI_CONTEXT.md`); die Subagents erhielten abweichende Pfade im Auftrag.

## Rückläufe
Keine aus H2. Review-Tasks: siehe `review/CHANGELOG.md` (fünf umgesetzt, fünf zurückgestellt).

## Erkenntnisse
- Wenn der Wunsch einer ADR widerspricht („Liste ganz weg“ gegen „gleichwertige Listenalternative“), die Alternative an einen anderen Ort verlegen statt streichen; ADR-016 hält das fest.
- Eine Story, die ein Merkmal des Wunsches nicht sichtbar macht (hier: Legende), sollte nicht allein zur Abnahme vorgelegt werden; der Story-Schnitt „Layout“ und „Symbole“ gehört zusammen an H2.
- Layoutzusagen („bis zur Trennlinie“) lassen sich mit `getBoundingClientRect` in Karma prüfen, wenn der Test den echten Seitenrahmen (`App`) rendert, nicht nur die Seite.
- Ein Review-Fund (Textreste „Liste“) betraf Dateien außerhalb der Dateiliste der Story; Textreste nach Verhaltensänderungen per Suche nach dem alten Begriff mitprüfen.

## Follow-ups / empfohlene Tickets
1. Zurückgestellte Struktur-Tasks: Seitenrahmen ohne Selektor einer Einzelseite steuern, Höhenkette bündeln und Mindesthöhe einmal führen, Marker-Icon aus `showMarkers` herauslösen, Ablage von `venue-symbol.ts` klären (`review/`).
2. axe, Lighthouse und Tastaturtest auf `/map` (`web/tools/quality`), Sichtprüfung der Symbole in Graustufen.
3. Marker-Cluster bei deutlich mehr Orten; Entscheidung zu einer Content-Security-Policy (Hinweis aus dem Security-Review).
4. Review-Skills an dieses Repo anpassen (Pfade) und `gbos-mcp` bereitstellen.
5. `docs/templates/` ergänzen oder den Verweis in `AGENTS.md` streichen.

# Changelog: SERVICE-11-STORY-03 – Postkartenmotiv als eigene Datei

## 2026-10-29 – REVIEW-TASK-21: Icon-Test: Aussage und Assertion in Einklang bringen

- **Status:** Umgesetzt (Variante b mit echter Randprüfung)
- **Quelle (Review):** Code-Review CODE-01 und CODE-02, `review/SERVICE-11-STORY-03/TASK-21-icon-test-aussage-schaerfen.md`
- **Änderungen:** Der Größenvergleich von Icon und Postkarte entfällt. Der Test heißt jetzt „quadratisch, transparente Ecken und transparente Seitenränder (kein Motivrest außerhalb der Form)“ und prüft die äußeren 8 Pixel links und rechts sowie die vier Ecken auf Transparenz. Ein Kommentar benennt die Grenze: Dass im Inneren des Icons nichts von der Postkarte steht, sichern die Sichtprüfung und der Zuschnitt-Test mit synthetischem Bild, nicht ein Datei-Test.
- **Dateien:** `test/marken-icon.test.mjs`
- **Prüfung:** 14 von 14 grün. Gate: siehe STORY-01 REVIEW-TASK-24 (gemeinsamer Lauf).

## 2026-10-29 – REVIEW-TASK-22: Testdatei aufräumen: Importe, Kopfkommentar, Hinweis bei fehlendem Build

- **Status:** Umgesetzt
- **Quelle (Review):** Code-Review CODE-03 und CODE-04, `review/SERVICE-11-STORY-03/TASK-22-marken-icon-test-aufraeumen.md`
- **Änderungen:** Kopfkommentar nennt alle geprüften Anforderungen (ICO-UB-1, ICO-UB-2, ICO-UB-5, IMG-UB-1, IMG-UB-3, IMG-UB-4, Q-PERF-7, Q-MAIN-5); der Test „Postkarte nicht im Build“ ist in `web/public` (läuft immer) und Produktionsbuild (mit sichtbarem Hinweis „kein Build vorhanden“, wenn übersprungen) geteilt.
- **Dateien:** `test/marken-icon.test.mjs`
- **Prüfung:** Gate siehe STORY-01 REVIEW-TASK-24 (gemeinsamer Lauf).

## 2026-10-29 – TASK-01: Postkartenmotiv prüfen und aus dem Build halten

- **Status:** Umgesetzt
- **Änderungen:** Keine Codeänderung: das Postkartenmotiv entstand mit dem Skript aus STORY-01 (`docs/resources/postkarte.png`, 1011 × 803 px, Querformat). Neu sind die Prüfungen: Maße und Querformat, jeder Randpixel deckend, kein weißer Rand außer in den leicht abgerundeten Kartenecken (28 von etwa 3 600 Randpixeln sind in den ersten 6 px der Ecken fast weiß), Icon quadratisch mit transparenten Ecken und kleiner als die Postkarte, und: weder `web/public/` noch der Produktionsbuild enthalten eine Datei `postkarte*` oder eine PNG mit dem Inhalt der Postkarte.
- **Dateien:** `test/marken-icon.test.mjs`, `docs/resources/postkarte.png` (aus STORY-01)
- **Prüfung:** Drei Tests grün. Der Randtest war zuerst zu streng (die Ecken der Karte sind nicht ganz deckend weiß-frei) und wurde auf „nur in den Ecken, höchstens 2 %“ angepasst; das ist eine Anpassung des Tests an das reale, sichtbar saubere Bild, nicht an einen Fehler. Sichtprüfung des Zuschnitts: Karte bis zum Papierrand, kein Rest des Icons. Gate: `npm run build`, `npm test` (202, 0 Fehler), `npm run web:test` (238 von 238), `npm run lint:all` grün. Der Aufwand dieser Story liegt fast ganz in STORY-01 (Skript).

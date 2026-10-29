# Qualität: Darstellung der Karte (web)

**Stand:** 2026-10-29. Fortlaufend zu Q-USE-3, Q-USE-4 und Q-PERF-3.

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-USE-9 | Besucher:in – auch mit Farbsehschwäche, mit Screenreader oder bei Graustufen – erkennt auf der Karte den Typ eines Ortes. | Jeder der fünf Ortstypen hat ein eigenes Symbol (Form paarweise verschieden) und eine eigene Farbe; der Typ ist allein an der Form erkennbar, die Farbe ist nur Zusatz. 100 % der Marker haben die Textalternative „Name, Typ“; die Legende nennt alle fünf Typen mit Symbol, Farbe und Text, mit denselben Definitionen wie die Marker; Kontrast der Markerfläche und -kontur zum Kartenhintergrund ≥ 3:1, Legendentext ≥ 4,5:1; Marker und Legende laden keine Dateien (0 zusätzliche Requests). | Komponententests (Zuordnung Typ → Symbol/Farbe, Eindeutigkeit, Textalternative, Legende), Kontrastberechnung der Palette im Test, axe `color-contrast` auf `/map`, Review der Symbole in Graustufen | MAP-UB-10, MAP-UB-11, MAP-UB-12 |
| Q-USE-10 | Besucher:in öffnet `/map` auf Desktop (1280 × 800) und Mobilgerät (390 × 844); der Fußbereich ist bei kurzem Inhalt am Fensterrand verankert. | Die Karte beginnt unterhalb der Filterleiste, hat dieselbe Breite wie die Karten auf `/calendar` (Inhaltsbereich, ± 1 px) und endet an der Trennlinie oberhalb des Fußbereichs (± 1 px), mindestens aber 24 rem hoch; bei Fenstern, in denen 24 rem nicht bis zur Fensterunterkante reichen, steht der Fußbereich unterhalb der Karte; Marker und Popup sind mit Tab und Enter bedienbar; der Link auf `/venues` ist per Tab erreichbar. | Komponententests mit `getBoundingClientRect` in beiden Fenstergrößen, Playwright-Tastaturtest | MAP-UB-8, MAP-UB-9 |

**Ergänzung 2026-10-29 zu Q-USE-3:** Die Orte stehen nicht mehr als Liste auf `/map`. Die Listenalternative ist `/venues` mit denselben Filtern (MAP-UB-8); sie muss vollständig per Tastatur erreichbar sein und den Link von `/map` aufnehmen können. Das Maß „Karteninhalte sind vollständig über die Liste erreichbar“ gilt für `/venues`.

**Ergänzung 2026-10-29 zu Q-USE-4:** Q-USE-4 gilt für die Ortstypen auf der Karte; Typ und Name stehen als Text in Legende, Textalternative und Popup (MAP-UB-1, MAP-UB-11, MAP-UB-12).

**Ergänzung 2026-10-29 zu Q-PERF-3:** Q-PERF-3 gilt für `/map` unverändert (Lighthouse-Performance ≥ 90). Symbole werden ohne Bilddateien gezeichnet; die Standard-Marker-Bilder entfallen auf `/map`.

**Ergänzung 2026-10-29 zu Q-SEO-1:** Beim Vorabrendern liefert `/map` Hauptüberschrift, Filter und den Hinweis mit dem Link auf `/venues` als Hauptinhalt (MAP-UB-13); die Ortsliste entfällt.

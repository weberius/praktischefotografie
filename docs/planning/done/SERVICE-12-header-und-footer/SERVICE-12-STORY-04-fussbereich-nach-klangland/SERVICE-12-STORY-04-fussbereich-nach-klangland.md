# SERVICE-12-STORY-04 – Fußbereich nach dem Vorbild von Klangland, scrollt mit

**Als** Besucher:in **möchte ich** am Ende jeder Seite einen schlichten Fußbereich mit den rechtlichen Links finden, **damit** ich Impressum, Haftungsausschluss, Datenschutz und Quellen & Lizenzen finde, ohne dass der Fußbereich beim Lesen im Weg steht.

## Akzeptanzkriterien
1. Der Fußbereich zeigt eine Linkzeile „Rechtliches“ mit Impressum, Haftungsausschluss, Datenschutz und Quellen & Lizenzen, in gedämpfter kleiner Schrift auf heller Fläche mit Trennlinie, im Inhaltsbereich ausgerichtet – im Aufbau wie der Fußbereich von Klangland.
2. Darunter steht weiter die Zeile „Zentrum für Praktische Fotografie · Fokus NRW“.
3. Wie im Fußbereich von Klangland ist er nicht am Fenster fixiert: Bei langem Inhalt scrollt er aus dem Bild, bei kurzem Inhalt steht er am unteren Fensterrand (wie bisher).
4. Lesbarkeit: Der Text hat ausreichend Kontrast, die Links sind per Tastatur erreichbar und haben einen sichtbaren Fokus.

## Abhängigkeiten
`SERVICE-12-STORY-05` liefert die Seiten hinter den neuen Links (die Linkzeile selbst ist unabhängig).

## Spezifikation (Phase 3, vorab erstellt)
- EARS: FRM-UB-3, FRM-UB-4; NAV-UB-8; MAP-UB-9 (unverändert)
- Gherkin: `web/seitenrahmen.feature` (Fußbereich scrollt mit dem Inhalt, Fußbereich bei kurzem Inhalt am Fensterrand, Fußbereich mit Linkzeile), `web/karte.feature` (Karte füllt die Fläche, unverändert)
- Quality: Q-USE-13, Q-USE-4 (Kontrast)
- ADR: nicht erforderlich; ADR-016, ADR-002

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

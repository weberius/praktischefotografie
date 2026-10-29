# SERVICE-11-STORY-03 – Postkartenmotiv als eigene Datei

**Als** Projektverantwortliche:r **möchte ich** das Postkartenmotiv als eigene, sauber zugeschnittene Bilddatei besitzen, **damit** ich es unabhängig vom Icon für Druck oder spätere Verwendung nutzen kann.

## Akzeptanzkriterien
1. Das Postkartenmotiv liegt als eigene Bilddatei im Quellordner vor, im Querformat und bis zum Kartenrand zugeschnitten.
2. Die Datei enthält nichts vom Icon und keinen weißen Rand des Quellbildes.
3. Die Datei wird nicht mit der Webanwendung ausgeliefert und vergrößert sie nicht.
4. Wer das Quellbild austauscht, kann die Datei mit demselben Befehl wie das Icon neu erzeugen.

## Abhängigkeiten
`SERVICE-11-STORY-01` (Skript und Zuschnitt-Verfahren).

## Spezifikation (Phase 3, vorab erstellt)
- EARS: IMG-UB-1 (Postkartenmotiv), IMG-UB-3, IMG-UB-4
- Gherkin: `setup/bildmaterial.feature` (Icon und Postkartenmotiv getrennt, Befehl erzeugt alle Dateien, Postkarte nicht im Build)
- Quality: Q-MAIN-5; Q-PERF-4 (Bundle-Budgets)
- ADR: ADR-017

**INVEST:** I (abhängig von STORY-01) N ✔ V ✔ E ✔ S ✔ T ✔

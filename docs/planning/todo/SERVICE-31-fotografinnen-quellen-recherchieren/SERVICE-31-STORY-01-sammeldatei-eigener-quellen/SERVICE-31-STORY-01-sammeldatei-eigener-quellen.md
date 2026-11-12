# SERVICE-31-STORY-01 – Eigene Quellen mehrerer Personen in einer Datei nennen und in einem Lauf verarbeiten

**Als** Redakteur:in **möchte ich** die Quellen vieler Personen in einer Datei nennen und gemeinsam verarbeiten lassen, **damit** ich nicht für jede Person einen eigenen Aufruf brauche und die Zuordnung nachvollziehbar bleibt.

## Akzeptanzkriterien
1. Eine Sammeldatei ordnet Personen (`id`) je eine Liste von Adressen zu; ohne lesbare, passende Datei endet die Recherche mit einem Hinweis.
2. Jede Person der Datei wird wie mit `--url` verarbeitet: Aufnahme in die Linksammlung ohne Dubletten und Verlust, Abruf vor Treffern, Regeln der Betreiber.
3. Eine unbekannte `id` oder eine ungültige Adresse stoppt die übrigen Personen nicht; beides steht mit Grund im Bericht.
4. Der Bericht nennt je Person alle Adressen mit Ergebnis.
5. Die Sammeldatei lässt sich nicht zusammen mit `--url` oder `--photographer`/`--name` verwenden (eindeutige Quelle).

## Abhängigkeiten
Keine (setzt auf PQL-UB-1 bis PQL-EV-2 auf).

## Spezifikation (Phase 3, vorab erstellt)
- EARS: PQL-UB-3, PQL-EV-3, PQL-UN-2 (nutzt PQL-EV-1, PQL-UB-2, PQL-UN-1, PQL-EV-2)
- Gherkin: `setup/personen-quellen.feature` (Sammeldatei in einem Lauf, Sammeldatei mit unbekannter Person oder Adresse, Sammeldatei nicht mit Einzelangaben)
- Quality: Q-DATA-26, Q-SEC-13, Q-DATA-18
- ADR: nicht erforderlich; geltend ADR-006, ADR-019

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

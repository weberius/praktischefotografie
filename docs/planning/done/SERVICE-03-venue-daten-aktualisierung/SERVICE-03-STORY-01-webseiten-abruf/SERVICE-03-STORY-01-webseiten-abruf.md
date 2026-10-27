# SERVICE-03-STORY-01 – Webseiten der Orte abrufen

**Als** Redakteur:in **möchte ich** die Webseiten aller erfassten Orte rücksichtsvoll und reproduzierbar abrufen **damit** ich Daten aus offiziellen Quellen vervollständigen kann, ohne die Betreiber zu belasten oder ihre Regeln zu verletzen.

## Akzeptanzkriterien
1. Der Abruf lässt sich für einen einzelnen Ort oder für alle Orte starten.
2. Die Regeln der Seitenbetreiber (`robots.txt`) werden beachtet; Abrufe sind zurückhaltend und als Projekt erkennbar.
3. Fällt der Abruf eines Ortes aus, laufen die übrigen weiter, und der Ausfall steht im Bericht.
4. Abgerufene Inhalte stehen lokal zur Verfügung; ein erneuter Lauf kann ohne Netz arbeiten und ruft nur veraltete Seiten erneut ab.
5. Abgerufene Seitentexte werden weder veröffentlicht noch ins Repository aufgenommen.

## Abhängigkeiten
keine

## Spezifikation (Phase 3, vorab erstellt)
- EARS: FET-EV-1, FET-UB-1 bis FET-UB-5, FET-UN-1, FET-UN-2, FET-OP-1
- Gherkin: `setup/webseiten-abruf.feature`
- Quality: Q-SEC-4, Q-REL-1, Q-PERF-5, Q-MAIN-2, Q-DATA-3
- ADR: ADR-006

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

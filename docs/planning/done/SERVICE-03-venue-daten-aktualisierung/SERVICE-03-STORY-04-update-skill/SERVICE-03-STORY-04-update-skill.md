# SERVICE-03-STORY-04 – Update-Skill für jederzeitige Aktualisierung

**Als** Redakteur:in **möchte ich** jederzeit mit einem Aufruf einen Aktualisierungslauf für einen Ort oder alle Orte starten **damit** die Daten aktuell bleiben, ohne dass ich die Einzelschritte kennen muss.

## Akzeptanzkriterien
1. Ein Aufruf führt durch Abruf, Vorschläge, Freigabe, Übernahme und Prüfung.
2. Der Lauf lässt sich auf einen einzelnen Ort beschränken; eine unbekannte Ort-ID wird mit den gültigen IDs beantwortet.
3. Am Ende steht ein Bericht inklusive Ergebnis der Validierung und der Tests.
4. Bei Fehlern gibt es einen klaren Hinweis, und die Daten bleiben konsistent.
5. Der Ablauf ist im Skill für andere nachlesbar.

## Abhängigkeiten
STORY-01, STORY-02, STORY-03

## Spezifikation (Phase 3, vorab erstellt)
- EARS: SKL-UB-1, SKL-EV-1, SKL-UB-2, SKL-UB-3, UPD-OP-1, UPD-UN-2
- Gherkin: `setup/update-skill.feature`, `setup/datenaktualisierung.feature`
- Quality: Q-DATA-3, Q-MAIN-2, Q-PERF-5
- ADR: ADR-007

**INVEST:** I (abhängig) N ✔ V ✔ E ✔ S ✔ T ✔

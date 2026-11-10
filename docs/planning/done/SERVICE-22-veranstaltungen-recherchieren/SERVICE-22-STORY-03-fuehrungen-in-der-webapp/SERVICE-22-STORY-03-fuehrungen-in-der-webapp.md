# SERVICE-22-STORY-03 – Führungen in der Webanwendung als eigener Typ zeigen

**Als** Besucher:in **möchte ich** Führungen auf der Eventseite erkennen und danach filtern, **damit** ich gezielt ein Führungsangebot eines Ortes finde.

## Akzeptanzkriterien
1. Die Datenbasis erlaubt für Events einen Typ „Führung“; bestehende Events bleiben gültig.
2. Liste und Detail kennzeichnen Führungen mit „Führung“.
3. Die Typ-Filterliste bietet „Führung“ an und ist per Tastatur bedienbar.

## Abhängigkeiten
Keine.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: DAT-UB-8 (ersetzt DAT-UB-7), EVT-UB-6
- Gherkin: `content/daten.feature` („Event-Typ Führung ist gültig“), `web/events.feature` („Führung in der Liste“, „Führung filterbar“, „Führung in der Detailansicht“)
- Quality: Q-USE-19, Q-DATA-1 (unverändert)
- ADR: nicht erforderlich als eigener ADR (Teil von ADR-026); geltend ADR-001, ADR-002

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

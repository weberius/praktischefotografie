# SERVICE-13-STORY-03 – Vernissage und Finissage unter Events anzeigen

**Als** Besucher:in **möchte ich** Eröffnungen und Finissagen in der Eventliste erkennen und danach filtern, **damit** ich Ausstellungstermine gezielt finde.

## Akzeptanzkriterien
1. Ein Event vom Typ Finissage ist als Datensatz gültig; unbekannte Typen bleiben ungültig.
2. Unter `/events` und im Eventdetail tragen Vernissagen die Kennzeichnung „Vernissage“ und Finissagen „Finissage“ als Text.
3. Der Typ-Filter bietet „Vernissage“ und „Finissage“ an und zeigt nur Events des gewählten Typs.
4. Bestehende Events und Seiten bleiben unverändert gültig und lesbar.

## Abhängigkeiten
Keine (Grundlage für `SERVICE-13-STORY-01`).

## Spezifikation (Phase 3, vorab erstellt)
- EARS: DAT-UB-7, EVT-UB-5 (EVT-UB-1 bis EVT-UB-4 unverändert)
- Gherkin: `content/daten.feature` (Event-Typ Finissage ist gültig); `web/events.feature` (Vernissage und Finissage in der Liste, Vernissage und Finissage filterbar)
- Quality: Q-DATA-1, Q-USE-4
- ADR: nicht erforderlich; ADR-001, ADR-002

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

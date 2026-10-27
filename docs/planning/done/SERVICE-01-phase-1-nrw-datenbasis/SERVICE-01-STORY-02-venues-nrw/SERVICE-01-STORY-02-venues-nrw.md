# SERVICE-01-STORY-02 – Venues in NRW erfassen

**Als** Fotofan **möchte ich** dass die Datenbasis belastbare Foto-Orte in NRW enthält **damit** die spätere Anwendung echte Orte mit nachvollziehbarer Herkunft zeigen kann.

## Akzeptanzkriterien
1. Es sind 20 bis 30 Orte in NRW erfasst, mindestens je einer in Monschau, Köln, Düsseldorf, Essen und Gelsenkirchen.
2. Jeder Ort nennt Adresse, Website und Lage sowie die Quelle und den Prüfstand der Angaben.
3. Orte liegen nachweislich in NRW; Handel und Dienstleister sind nicht enthalten.

## Abhängigkeiten
STORY-01 (Schema).

## Spezifikation (Phase 3)
- EARS: VEN-UB-1 bis VEN-UB-5
- Gherkin: `content/daten.feature`
- Quality: Q-DATA-2, Q-PERF-1, Q-USE-1
- ADR: –

ANNAHME: Ausstellungen, Events, Organizer, Fotograf:innen und Beiträge bleiben in diesem Ticket leere Listen; Referenzen werden mit Test-Fixtures geprüft.

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

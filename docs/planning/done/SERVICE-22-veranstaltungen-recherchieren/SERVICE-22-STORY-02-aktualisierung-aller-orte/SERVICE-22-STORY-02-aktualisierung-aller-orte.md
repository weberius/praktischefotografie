# SERVICE-22-STORY-02 – Veranstaltungen aller Orte in einem Lauf aktualisieren

**Als** Redakteur:in **möchte ich** die Veranstaltungen aller Orte in einem Lauf aktualisieren und einen Bericht je Ort erhalten, **damit** ich den Veranstaltungskalender regelmäßig ohne Einzelaufrufe aktuell halte.

## Akzeptanzkriterien
1. Ohne Ortsangabe werden alle Orte mit Website bearbeitet; Veranstalter-Websites werden nicht abgerufen.
2. Fällt ein Ort aus (nicht erreichbar, gesperrt), läuft der Lauf weiter und der Bericht nennt Ort, Adresse und Grund.
3. Der Bericht nennt je Ort abgerufene Seiten, Vorschläge und verworfene Vorschläge mit Grund.
4. Ein wiederholter Lauf mit unveränderten Seiten erzeugt keine neuen Vorschläge.
5. Die Freigabe erfolgt gesammelt (alle · Auswahl · keine) vor jeder Änderung an `data/`.

## Abhängigkeiten
STORY-01.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: VRS-OP-1, VRS-UN-2, VRS-EV-2, VRS-UB-6, VRS-UB-7
- Gherkin: `setup/veranstaltungen-recherche.feature` („Aktualisierung über alle Orte“, „Ort nicht erreichbar“, „Bericht je Ort“, „Wiederholter Lauf“)
- Quality: Q-REL-3, Q-SEC-12
- ADR: ADR-026 (Proposed)

**INVEST:** I ✔ (nach STORY-01) N ✔ V ✔ E ✔ S ✔ T ✔

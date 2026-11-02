# SERVICE-19-STORY-01-TASK-02 – Umschalter auf Liste, Detail und Agenda

**Story:** SERVICE-19-STORY-01  ·  **Status:** Umgesetzt
**EARS:** FAV-UB-1, FAV-EV-1, FAV-UB-2
**Gherkin:** `web/favoriten.feature` · Umschalter auf Liste, Detail und Agenda, Markieren und Aufheben, Zustand gilt über Seiten hinweg
**Quality:** Q-USE-17
**ADR:** ADR-023
**Abhängig von:** TASK-01

## Vorgehen
- `shared/favorite-toggle/`: Komponente mit `<button type="button" aria-pressed>`, Text und Symbol für den Zustand, zugänglicher Name mit Eventtitel; Zielgröße ≥ 2 rem.
- Einbau in `event-list.html`, `event-detail.html` und `calendar.html` (nur `item.kind === 'Event'`).

## Prüfkriterium
Komponententests je Seite: Button, `aria-pressed`, Name mit Titel, Text; keine Umschalter bei Ausstellungen; Tastaturbedienung. Prüf-Gate grün.

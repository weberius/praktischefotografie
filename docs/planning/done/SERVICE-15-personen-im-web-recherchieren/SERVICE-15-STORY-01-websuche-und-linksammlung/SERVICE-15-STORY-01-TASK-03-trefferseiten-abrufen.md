# SERVICE-15-STORY-01-TASK-03 – Trefferseiten höflich abrufen

**Story:** SERVICE-15-STORY-01  ·  **Status:** Umgesetzt
**EARS:** WSP-UB-3
**Gherkin:** Trefferseiten höflich abrufen
**Quality:** Q-SEC-7
**ADR:** ADR-019

## Vorgehen
- `fetcher.mjs`: Option `venue.pages` (explizite Seitenliste, keine Linkverfolgung); `fetchPages` (≤ 5 Seiten, Snapshots unter `.cache/snapshots/<person-id>/`), Befehl `pages`.

## Prüfkriterium
Test mit Testserver (robots.txt, Weiterleitung, sieben Seiten, User-Agent, Abstand) grün; bestehende Abruftests unverändert grün. Prüf-Gate grün.

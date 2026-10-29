# Changelog: Review SERVICE-12

## 2026-10-29 – Abnahme und Umsetzung
- Abnahme (H2, zweite Runde): „Alle 7 mittleren Tasks“ freigegeben; den Rechtstext zur EU-Streitschlichtung entscheidet der Betreiber.
- **Umgesetzt** (Prüf-Gate grün, Einträge in den Story-Changelogs): STORY-01 TASK-01 (Menü schließt beim Link der aktuellen Seite), TASK-02 (Menüfeld scrollbar, `max-height`), STORY-02 TASK-22 (Kopfhöhe und Scrollbreite im Qualitätslauf), STORY-03 TASK-01/TASK-21 (Versatz aus einer Konstante, Test erzwingt Übereinstimmung mit CSS) und TASK-03/TASK-22 (Test des Router-Versatzes, Testtitel angepasst), STORY-05 TASK-22 (Q-USE-14-Tests).
- **Quellen zuerst korrigiert:** Gherkin `web/seitenrahmen.feature` (zwei neue Szenarien), Quality Q-USE-12 und Q-USE-13 (Höhe des Menüfelds, Messung im Qualitätslauf).
- **Offen, Entscheidung des Betreibers:** STORY-05 TASK-21 (Hinweis zur EU-Streitschlichtung / OS-Plattform im Impressum).
- **Zurückgestellt** (niedrig, nicht verworfen): STORY-01 TASK-03, TASK-21, TASK-22; STORY-02 TASK-21; STORY-03 TASK-02, TASK-23; STORY-04 TASK-21, TASK-22; STORY-05 TASK-23; SEC-01 (kein Task).

## 2026-10-29 – Analysen erstellt
- 9 Analysen (STORY-01 Architektur und Code, STORY-02 Code, STORY-03 Architektur und Code, STORY-04 Code, STORY-05 Code, Security, Compliance), 17 vorgeschlagene Tasks. Kein Befund kritisch oder hoch. Compliance (GBOS) nicht ausführbar: `gbos-mcp` nicht verfügbar.

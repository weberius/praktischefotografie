# SERVICE-28-STORY-01 – Dortmunder Off-Spaces und Kulturorte im Ortskatalog

**Als** Besucher:in **möchte ich** den Projektraum Fotografie und den Kulturort DEPOT in Dortmund im Ortskatalog finden, **damit** ich die unabhängigen Orte für Fotografie in Dortmund kenne.

## Akzeptanzkriterien
1. Beide Orte sind mit Name, Kurzname, Typ Off-Space, Anschrift samt Koordinaten, Website und Besonderheiten erfasst.
2. Jeder Ort trägt eine Fundstelle (`source.url`), Prüfdatum und den Status „recherchiert“; der Bezug zur Fotografie ist belegt.
3. Ein Ort ohne belegbare Anschrift oder Website wird nicht erfunden, sondern als Befund gemeldet.
4. Der Katalog besteht die Validierung; die Koordinaten liegen in Dortmund.

## Abhängigkeiten
Keine. Unabhängig von `STORY-02`; beide ändern `data/venues.json`, aber verschiedene Einträge.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: VEN-UB-12 (außerdem geltend VEN-UB-2, VEN-UB-3, VEN-UB-5, DAT-UB-2 bis DAT-UB-4)
- Gherkin: `content/daten.feature` · „Dortmunder Orte sind im Katalog“, „Dortmunder Orte liegen in Dortmund“
- Quality: Q-DATA-1, Q-DATA-2, Q-DATA-23
- ADR: nicht erforderlich; ADR-001

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

# SERVICE-21-STORY-02 – Kunstmuseum Bonn als Venue

**Als** Besucher:in **möchte ich** das Kunstmuseum Bonn im Ortskatalog finden, **damit** ich einen weiteren Ort mit Fotografie in NRW kenne.

## Akzeptanzkriterien
1. Das Kunstmuseum Bonn ist als Ort mit Name, Kurzname, Typ, Anschrift samt Koordinaten, Website `https://www.kunstmuseum-bonn.de/` und Besonderheiten erfasst.
2. Die Angabe trägt eine Fundstelle (`source.url`), Prüfdatum und den Status „recherchiert“; der Bezug zur Fotografie ist belegt (Fotoausstellungen finden dort statt, aber nicht dauerhaft).
3. Der Katalog besteht die Validierung; der Gesamtbestand bleibt im zulässigen Rahmen.

## Abhängigkeiten
Keine (unabhängig von `STORY-01`; beide ändern `data/venues.json`, aber verschiedene Einträge).

## Spezifikation (Phase 3, vorab erstellt)
- EARS: VEN-UB-7 (außerdem geltend VEN-UB-1 bis VEN-UB-3, VEN-UB-5, DAT-UB-2 bis DAT-UB-4)
- Gherkin: `content/daten.feature` · „Neue Venues sind im Katalog“ (Beispiel Kunstmuseum Bonn)
- Quality: Q-DATA-1, Q-DATA-2
- ADR: nicht erforderlich; ADR-001

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

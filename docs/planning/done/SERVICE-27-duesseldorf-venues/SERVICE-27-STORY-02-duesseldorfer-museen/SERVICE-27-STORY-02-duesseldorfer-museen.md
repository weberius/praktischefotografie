# SERVICE-27-STORY-02 – Düsseldorfer Museen und Institutionen im Ortskatalog

**Als** Besucher:in **möchte ich** K20, K21, das Stadtmuseum und das Filmmuseum Düsseldorf im Ortskatalog finden, **damit** ich die großen Düsseldorfer Häuser mit Fotografie-Bezug kenne.

## Akzeptanzkriterien
1. Jeder der vier Orte ist mit Name, Kurzname, Typ Museum, Anschrift samt Koordinaten, Website und Besonderheiten erfasst.
2. Jeder Ort trägt eine Fundstelle (`source.url`), Prüfdatum und den Status „recherchiert“; der Bezug zur Fotografie ist belegt (Sammlung oder Ausstellungen).
3. K20 und K21 sind getrennte Orte mit eigener Anschrift.
4. Ein Ort ohne belegbaren Fotografie-Bezug, Anschrift oder Website wird nicht erfunden, sondern als Befund gemeldet.
5. Der Katalog besteht die Validierung; die Koordinaten liegen in Düsseldorf.

## Abhängigkeiten
`STORY-01` (Bestandsrahmen). Unabhängig von `STORY-03` und `STORY-04`; alle ändern `data/venues.json`, aber verschiedene Einträge.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: VEN-UB-9 (außerdem geltend VEN-UB-2, VEN-UB-3, VEN-UB-5, DAT-UB-2 bis DAT-UB-4)
- Gherkin: `content/daten.feature` · „Düsseldorfer Orte sind im Katalog“, „Düsseldorfer Orte liegen in Düsseldorf“
- Quality: Q-DATA-1, Q-DATA-2, Q-DATA-22
- ADR: nicht erforderlich; ADR-001

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

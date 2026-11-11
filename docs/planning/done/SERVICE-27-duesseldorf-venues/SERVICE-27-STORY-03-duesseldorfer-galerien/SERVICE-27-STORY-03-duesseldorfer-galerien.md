# SERVICE-27-STORY-03 – Düsseldorfer Galerien im Ortskatalog

**Als** Besucher:in **möchte ich** die Leica Galerie, die Galerie noir blanche, die Galerie Voss und LUMAS Düsseldorf im Ortskatalog finden, **damit** ich Galerien mit wechselnden Fotoausstellungen in Düsseldorf kenne.

## Akzeptanzkriterien
1. Jeder der vier Orte ist mit Name, Kurzname, Typ Galerie, Anschrift samt Koordinaten, Website und Besonderheiten erfasst.
2. Jeder Ort trägt eine Fundstelle (`source.url`), Prüfdatum und den Status „recherchiert“; der Bezug zur Fotografie ist belegt.
3. Die Leica Galerie ist als Ausstellungsraum erfasst; es entstehen keine Angaben zu Verkauf, Preisen oder Equipment (PRD 1.3).
4. Ein Ort ohne belegbaren Fotografie-Bezug, Anschrift oder Website wird nicht erfunden, sondern als Befund gemeldet.
5. Der Katalog besteht die Validierung; die Koordinaten liegen in Düsseldorf.

## Abhängigkeiten
`STORY-01` (Bestandsrahmen). Unabhängig von `STORY-02` und `STORY-04`.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: VEN-UB-10 (außerdem geltend VEN-UB-2, VEN-UB-3, VEN-UB-5, DAT-UB-2 bis DAT-UB-4)
- Gherkin: `content/daten.feature` · „Düsseldorfer Orte sind im Katalog“, „Düsseldorfer Orte liegen in Düsseldorf“
- Quality: Q-DATA-1, Q-DATA-2, Q-DATA-22
- ADR: nicht erforderlich; ADR-001

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

# SERVICE-30-STORY-01 – Weitere NRW-Orte im Ortskatalog

**Als** Besucher:in **möchte ich** das Japanische Kulturinstitut Köln sowie Fotografie-Orte in Oberhausen, Mülheim an der Ruhr, Wuppertal, Krefeld und Münster im Ortskatalog finden, **damit** ich die Fotografie-Szene in ganz Nordrhein-Westfalen kenne und nicht nur in den Großstädten.

## Akzeptanzkriterien
1. Jeder der sechs Orte ist mit Name, Kurzname, Typ, Anschrift samt Koordinaten, Website und Besonderheiten erfasst.
2. Jeder Ort trägt eine Fundstelle (`source.url`), Prüfdatum und den Status „recherchiert“; der Bezug zur Fotografie ist belegt.
3. Kein Ort ist doppelt im Katalog; bereits erfasste Orte bleiben unverändert.
4. Eine Angabe ohne Beleg (Anschrift, Website) wird nicht erfunden, sondern als Befund gemeldet.
5. Der Katalog besteht die Validierung; die Koordinaten der sechs Orte liegen in ihrer jeweiligen Stadt.

## Abhängigkeiten
Keine.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: VEN-UB-17, VEN-UB-18, VEN-UB-19 (außerdem geltend VEN-UB-2, VEN-UB-3, VEN-UB-5, VEN-UB-8, DAT-UB-2 bis DAT-UB-4)
- Gherkin: `content/daten.feature` · „Weitere NRW-Orte sind im Katalog“, „Weitere NRW-Orte liegen in ihrer Stadt“
- Quality: Q-DATA-1, Q-DATA-2, Q-DATA-21, Q-DATA-25
- ADR: nicht erforderlich; ADR-001

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

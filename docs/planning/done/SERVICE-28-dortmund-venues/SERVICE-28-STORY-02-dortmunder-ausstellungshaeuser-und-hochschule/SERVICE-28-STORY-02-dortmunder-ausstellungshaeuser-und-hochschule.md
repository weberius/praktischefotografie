# SERVICE-28-STORY-02 – Dortmunder Ausstellungshäuser und Hochschule im Ortskatalog

**Als** Besucher:in **möchte ich** die Kunsthalle Dortmund (ehemals HMKV) und die FH Dortmund (Fachbereich Design) im Ortskatalog finden, **damit** ich das Haus und die Hochschule mit Fotografie-Bezug in Dortmund kenne.

## Akzeptanzkriterien
1. Jeder der beiden Orte ist mit Name, Kurzname, Typ, Anschrift samt Koordinaten, Website und Besonderheiten erfasst.
2. Jeder Ort trägt eine Fundstelle (`source.url`), Prüfdatum und den Status „recherchiert“; der Bezug zur Fotografie ist belegt (Ausstellungen, Ausbildung).
3. Das bereits erfasste Museum Ostwall bleibt unverändert und genau einmal im Katalog.
4. Ein Ort ohne belegbare Anschrift oder Website wird nicht erfunden, sondern als Befund gemeldet.
5. Der Katalog besteht die Validierung; die Koordinaten liegen in Dortmund.

## Abhängigkeiten
Keine. Unabhängig von `STORY-01`.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: VEN-UB-13, VEN-UB-14 (außerdem geltend VEN-UB-2, VEN-UB-3, VEN-UB-5, DAT-UB-2 bis DAT-UB-4)
- Gherkin: `content/daten.feature` · „Dortmunder Orte sind im Katalog“, „Dortmunder Orte liegen in Dortmund“
- Quality: Q-DATA-1, Q-DATA-2, Q-DATA-23
- ADR: nicht erforderlich; ADR-001

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

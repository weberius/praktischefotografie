# SERVICE-07-STORY-01 – Magazin-Karten mit Datum, Badges, Titel und Kurztext

**Als** Besucher:in **möchte ich** im Magazin jede Karte einheitlich mit Datum, Badges, Titel und kurzem Text sehen **damit** ich schnell erkenne, wann etwas veröffentlicht wurde, worum es geht und welche Ausstellung wo stattfindet.

## Akzeptanzkriterien
1. Jede Karte zeigt in dieser Reihenfolge: Datum des Eintrags, Badges, Titel, kurzer Text.
2. Bei einer Neuigkeit zu einer Ausstellung zeigen die Badges im Stil der Ausstellungslisten den Anlass („Neu“, „Eröffnung“, „Endet bald“, „Beendet“) und die Art der Ausstellung (z. B. „Gruppenausstellung“).
3. Der Titel enthält keinen Anlass, sondern Ausstellung und Ort (z. B. „MYSTERIUM DER PAARE in Monschau“), ist als Link erkennbar (unterstrichen) und führt auf die Beitragsseite.
4. Der kurze Text bleibt die Kurzvorschau des Beitrags (z. B. „Die Ausstellung im Fotografie-Forum Monschau endet am 1. November 2026.“).
5. Die Beitragsseite zeigt dieselben Badges unter dem Datum.
6. Redaktionelle Beiträge ohne Ausstellung zeigen Datum, Titel und Kurztext ohne Badges; fehlende Datensätze führen nicht zu Fehlern.
7. Badges tragen den Inhalt als Text (nicht nur Farbe); die Reihenfolge im Dokument entspricht der Anzeige.

## Abhängigkeiten
SERVICE-04 (Neuigkeiten), STORY-02 (Titel mit Ort ohne Anlass)

## Spezifikation (Phase 3, vorab erstellt)
- EARS: BLG-UB-6, BLG-UB-7, BLG-UB-8, BLG-ST-2, BLG-UN-3 (ergänzen BLG-UB-1, BLG-UB-2)
- Gherkin: `web/blog.feature`
- Quality: Q-USE-4, Q-USE-6, Q-USE-2, Q-PERF-3
- ADR: ADR-013, ADR-002

**INVEST:** I (abhängig von STORY-02) N ✔ V ✔ E ✔ S ✔ T ✔

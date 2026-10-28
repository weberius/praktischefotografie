# SERVICE-08-STORY-02 – Badge-Zeilen in Kalender, Magazin und Ausstellungsseiten

**Als** Besucher:in **möchte ich** im Kalender, im Magazin und auf den Ausstellungsseiten die Badges in gleicher Reihenfolge sehen **damit** ich auf einen Blick Art und Stand einer Ausstellung erkenne.

## Akzeptanzkriterien
1. Kalender: Ausstellungen zeigen zuerst die Art (z. B. „Gruppenausstellung“), danach „Endet bald“ bzw. „Beendet“; Events zeigen „Event“.
2. Magazin (Karte und Beitragsseite): zuerst die Art, danach der Anlass (z. B. „Endet bald“).
3. Ausstellungsliste: Die Badge-Zeile steht oben in der Karte, vor der Überschrift: zuerst die Art, danach der Status (Kommend, Laufend, Endet bald, Beendet).
4. Ausstellungsdetail: zuerst die Art, danach der Status.
5. Zwischen den Badges steht auf allen Seiten ein Leerzeichen breiter Abstand.

## Abhängigkeiten
STORY-01, SERVICE-07 (Magazin)

## Spezifikation (Phase 3, vorab erstellt)
- EARS: CAL-UB-7 (ersetzt CAL-UB-4), BLG-UB-9 (ersetzt BLG-UB-6), EXH-UB-8, EXH-UB-9 (ersetzt EXH-UB-4), BDG-UB-2, BDG-UB-3
- Gherkin: `web/kalender.feature`, `web/blog.feature`, `web/ausstellungen.feature`, `web/badges.feature`
- Quality: Q-USE-7, Q-USE-4
- ADR: ADR-014, ADR-002, ADR-013

**INVEST:** I (abhängig von STORY-01) N ✔ V ✔ E ✔ S ✔ T ✔

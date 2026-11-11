# SERVICE-26-STORY-02 – Termin mit Uhrzeit im Gerätekalender speichern

**Als** Besucher:in **möchte ich** einen Event-Termin mit seiner Uhrzeit in den Kalender meines Geräts übernehmen, **damit** der Termin zur richtigen Zeit erscheint und ich ihn nicht von Hand anpassen muss.

## Akzeptanzkriterien
1. Hat das Event eine Startzeit, erscheint der Termin im Gerätekalender zu dieser Uhrzeit (Ortszeit des Events, Standard `Europe/Berlin`) statt ganztägig.
2. Mit Endzeit endet der Termin dort; ohne Endzeit dauert ein eintägiger Termin 2 Stunden (auch über Mitternacht); die Annahme wird nicht in den Daten gespeichert.
3. Mehrtägige Events mit Start- und Endzeit laufen von der Startzeit am ersten bis zur Endzeit am letzten Tag; ohne Endzeit bleibt der Termin ganztägig.
4. Ohne Startzeit bleibt der Termin ganztägig wie bisher.
5. Sommer- und Winterzeit sowie Events in anderen Zeitzonen führen zur richtigen Uhrzeit im Kalender.
6. Alle bisherigen Eigenschaften der Kalenderdatei (stabile Kennung, Maskierung, „frei“, kein Netzzugriff) bleiben erhalten.

## Abhängigkeiten
Felder aus STORY-01 (Schema und Modell); baut auf SERVICE-14 (ADR-018) auf.

## Spezifikation (Phase 3)
- EARS: ICS-UB-8, ICS-UB-9, ICS-UB-10, ICS-UN-2; ICS-UB-2 eingeschränkt
- Quality: Q-IOP-2; weiter Q-IOP-1, Q-SEC-6
- Gherkin: `web/kalender-export.feature`
- ADR: ADR-027 (Proposed); geltend ADR-018, ADR-002

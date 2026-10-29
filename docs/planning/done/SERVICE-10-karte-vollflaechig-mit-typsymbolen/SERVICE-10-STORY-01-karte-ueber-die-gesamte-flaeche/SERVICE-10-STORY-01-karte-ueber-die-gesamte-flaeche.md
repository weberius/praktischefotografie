# SERVICE-10-STORY-01 – Karte über die gesamte Fläche, ohne Ortsliste

**Als** Besucher:in **möchte ich** die Orte auf `/map` auf einer großen Karte sehen, die unter den Filtern die ganze Fläche einnimmt, **damit** ich Orte räumlich überblicken kann, ohne dass eine Liste Platz wegnimmt.

## Akzeptanzkriterien
1. Auf `/map` gibt es keine Liste der Orte.
2. Die Karte beginnt unterhalb der Filterleiste, hat dieselbe Breite wie die Karten auf der Kalenderseite und reicht bis zur Trennlinie oberhalb von Impressum und Datenschutz (mindestens 24 rem hoch; in kleinen Fenstern steht der Fußbereich darunter).
3. Die Filter wirken weiter sofort auf die Marker der Karte; bei fehlenden Treffern erscheinen Hinweis und Schaltfläche zum Zurücksetzen.
4. Wer die Orte als Liste lesen möchte oder keine Karte nutzen kann, erreicht sie über einen Link auf der Seite mit denselben Filtern.
5. Ohne ausgeführtes Skript zeigt die Seite Überschrift, Filter und den Hinweis auf die Ortsliste.

## Abhängigkeiten
Keine.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: MAP-UB-7, MAP-UB-8, MAP-UB-9, MAP-UB-13 (ersetzen MAP-UB-3, MAP-UB-6); unverändert MAP-UB-2, MAP-UB-4, MAP-EV-1, MAP-UN-1
- Gherkin: `web/karte.feature` (Karte ohne Ortsliste, Link zur Ortsliste mit Filtern, Karte füllt die Fläche, Karte nur im Browser), `web/veranstalter.feature`, `web/festivals.feature`
- Quality: Q-USE-10; Ergänzungen Q-USE-3, Q-PERF-3, Q-SEO-1
- ADR: ADR-016, ADR-004, ADR-002

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

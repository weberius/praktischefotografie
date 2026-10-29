# SERVICE-12-STORY-01 – Navigation als Burger-Menü

**Als** Besucher:in **möchte ich** die Navigation hinter einer Menü-Schaltfläche öffnen und schließen können, **damit** der Kopfbereich schlank bleibt und ich auf jedem Gerät auf dieselbe Weise zu allen Bereichen komme.

## Akzeptanzkriterien
1. In jeder Fensterbreite zeigt der Kopfbereich statt einer Linkliste eine Menü-Schaltfläche.
2. Ein Klick (oder Tipp, Enter, Leertaste) auf die Schaltfläche öffnet die Links zu allen bisherigen Bereichen; ein weiterer schließt sie.
3. Die Wahl eines Links bringt mich zur Seite und schließt das Menü; Escape schließt es ebenfalls.
4. Die Schaltfläche sagt Screenreadern, ob das Menü offen ist, und trägt einen verständlichen Namen.
5. Im geschlossenen Menü sind die Links weder sichtbar noch per Tabulator erreichbar; der aktive Bereich ist im geöffneten Menü erkennbar.
6. Verhalten wie in Klangland: Schaltfläche am rechten Rand des Kopfs, das geöffnete Menü liegt als Feld in voller Breite unter dem Kopf über dem Inhalt.
7. Alle bisherigen Bereiche bleiben erreichbar, Reihenfolge und Beschriftung der Links ändern sich nicht.

## Abhängigkeiten
Keine.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: FRM-UB-1, FRM-ST-1, FRM-EV-1, FRM-EV-2, FRM-EV-3; NAV-UB-8 (ersetzt NAV-UB-5)
- Gherkin: `web/seitenrahmen.feature` (Navigation steht hinter dem Burger-Menü, Menü öffnen und schließen, Menü schließt nach der Auswahl, Menü schließt mit Escape), `web/navigation.feature` (Navigation ist auf jeder Seite vorhanden)
- Quality: Q-USE-12, Q-PERF-8; Ergänzungen Q-USE-3, Q-USE-4
- ADR: nicht erforderlich; ADR-002

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

# SERVICE-19-STORY-01 – Events favorisieren

**Als** Besucher:in **möchte ich** Events als Favoriten markieren und die Markierung auf allen Seiten sehen, **damit** ich mir während meines Besuchs Termine merken und wiederfinden kann.

## Akzeptanzkriterien
1. Eventliste, Eventdetailseite und Agenda zeigen für jedes Event einen Umschalter „Favorit“; Ausstellungen in der Agenda haben ihn nicht.
2. Ein Klick markiert das Event als Favorit; ein weiterer Klick hebt es auf.
3. Der Zustand eines Events ist auf allen Seiten gleich und bleibt beim Seitenwechsel erhalten.
4. Nach dem Neuladen der Anwendung gibt es keine Favoriten; es wird nichts gespeichert.
5. Die Eventliste lässt sich auf Favoriten einschränken; ohne Favoriten erscheint ein Hinweis.
6. Der Zustand ist für Screenreader und ohne Farbe erkennbar; der Umschalter ist per Tastatur bedienbar und nennt das Event.

## Abhängigkeiten
Keine.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: FAV-UB-1, FAV-EV-1, FAV-UB-2, FAV-UB-3, FAV-UB-4, FAV-ST-1
- Gherkin: `web/favoriten.feature` (Umschalter auf Liste, Detail und Agenda; Markieren und Aufheben; Zustand über Seiten hinweg; Neuladen leert; Filter Nur Favoriten; Keine Favoriten)
- Quality: Q-USE-17, Q-SEC-10
- ADR: ADR-023 (Proposed); ADR-002

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

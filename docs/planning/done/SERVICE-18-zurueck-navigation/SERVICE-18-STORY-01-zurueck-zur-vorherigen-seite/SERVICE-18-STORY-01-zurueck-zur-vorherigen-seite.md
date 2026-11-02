# SERVICE-18-STORY-01 – Von jeder Detailseite zur vorherigen Seite zurückkehren

**Als** Besucher:in **möchte ich** auf einer Detailseite mit einem Klick zu der Seite zurückkehren, von der ich gekommen bin, **damit** ich nicht über das Menü neu suchen muss.

## Akzeptanzkriterien
1. Jede Detailseite (Beitrag, Ort, Fotograf:in, Ausstellung, Event, Festival, Veranstalter:in) zeigt oben einen Zurück-Link; auf Listen-, Karten-, Kalender- und rechtlichen Seiten gibt es ihn nicht.
2. Wer von einer anderen Seite der Webanwendung kam, gelangt mit dem Link zu dieser Seite.
3. Wer die Detailseite direkt aufruft, gelangt mit dem Link zur zugehörigen Übersicht (Magazin für Beiträge).
4. Der Link nennt sein Ziel, auch für Screenreader.
5. Der Link ist per Tastatur erreichbar und bedienbar; der Fokus ist sichtbar.
6. Der Link ist auf allen Detailseiten gleich aufgebaut und gleich platziert.

## Abhängigkeiten
Keine.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: NAV-UB-9, NAV-EV-2, NAV-ST-1
- Gherkin: `web/navigation.feature` (Zurück-Link auf jeder Detailseite, Zurück zur vorherigen Seite, Zurück bei Direktaufruf, Kein Zurück-Link auf Übersichtsseiten)
- Quality: Q-USE-16, Q-USE-3 (Ergänzung)
- ADR: ADR-022 (Proposed); ADR-002

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

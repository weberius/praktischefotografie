# SERVICE-31-STORY-02 – Profile der in der Idee genannten Personen aus ihren Quellen erstellen

**Als** Besucher:in der Webseite **möchte ich** zu Fotograf:innen eine belegte Beschreibung und weiterführende Links sehen, **damit** ich mehr über die Person erfahre, deren Ausstellung ich entdecke.

## Akzeptanzkriterien
1. Für alle 33 Personen der Idee stehen die genannten Adressen in der Linksammlung (`updates/photographers-links.json`), ohne Dubletten und ohne Verlust.
2. Die erlaubten Seiten sind rücksichtsvoll abgerufen; gesperrte, nicht abrufbare und ungültige Adressen stehen im Bericht mit Grund.
3. Für jede Person mit verwertbarem Material liegt ein Vorschlag für den Webkurztext (eigene Formulierung, 40–90 Wörter, Deutsch, mit Fundstellen) vor; Personen ohne verwertbares Material sind im Bericht genannt.
4. Nach Freigabe sind die Webkurztexte in `data/photographers.json` übernommen; die Daten sind gültig.
5. Die Personenseiten zeigen Beschreibung und „Weiterführende Links“; vorhandene Angaben (`bio`, `website`, Ausstellungen) bleiben unverändert.
6. Wikipedia-Angaben (Berufsbezeichnung, Lebensdaten, Zusammenfassung) und Portraits kommen nur dort hinzu, wo die bestehende Recherche sie liefert.

## Abhängigkeiten
`SERVICE-31-STORY-01` (Sammeldatei).

## Spezifikation (Phase 3, vorab erstellt)
- EARS: Nutzung von PQL-EV-1, PQL-UB-2, PQL-UN-1, PQL-EV-2, PQL-EV-3 sowie WSP-EV-3, WSP-UB-4 bis WSP-UB-7, PRF-UB-6, PHO-UB-12 (keine neuen Anforderungen)
- Gherkin: durch die bestehenden Szenarien abgedeckt (Datenstand wird über Q-DATA-26 geprüft, nicht als Vertrag)
- Quality: Q-DATA-26
- ADR: nicht erforderlich

**INVEST:** I ✘ (hängt von STORY-01 ab) N ✔ V ✔ E ✔ S ✔ (Datenarbeit, mehrere Läufe) T ✔ (Live-Abruf nur per Handprobe)

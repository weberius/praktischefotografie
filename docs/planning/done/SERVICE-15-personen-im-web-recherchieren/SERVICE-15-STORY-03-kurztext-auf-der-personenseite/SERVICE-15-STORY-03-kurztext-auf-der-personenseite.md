# SERVICE-15-STORY-03 – Webkurztext auf der Personenseite lesen

**Als** Besucher:in **möchte ich** auf der Seite einer Person den Kurztext aus Webquellen samt Quellen sehen, **damit** ich auch zu Personen ohne Wikipedia-Artikel Hintergründe finde und nachlesen kann, woher sie stammen.

## Akzeptanzkriterien
1. Hat die Person einen Webkurztext, erscheint ein eigener Abschnitt mit Text, Hinweis auf die Herkunft (frei zugängliche Webseiten) und je Quelle einem Link mit Titel und Host.
2. Die Links sind per Tastatur bedienbar und geben dem Zielserver keine Herkunftsangabe.
3. Ohne Webkurztext erscheint der Abschnitt nicht; der Wikipedia-Abschnitt bleibt unverändert.
4. Beim Laden der Seite entstehen keine Anfragen an Fremdhosts.

## Abhängigkeiten
STORY-02 (Feld `web`).

## Spezifikation (Phase 3, vorab erstellt)
- EARS: PHO-UB-11, PHO-ST-3 (ersetzt PHO-ST-2)
- Gherkin: `web/fotografinnen.feature` (Webkurztext mit Quellen, Person ohne Webkurztext)
- Quality: Q-USE-5, Q-SEC-2 (bestehend, unverändert)
- ADR: ADR-019 (Proposed); ADR-002, ADR-011

**INVEST:** I ~ (hängt von STORY-02 ab) N ✔ V ✔ E ✔ S ✔ T ✔

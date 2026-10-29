# SERVICE-10-STORY-02 – Ortstypen an Symbol und Farbe erkennen

**Als** Besucher:in **möchte ich** auf der Karte am Symbol und an der Farbe eines Markers erkennen, welcher Ortstyp es ist, und die Bedeutung in einer Legende nachlesen, **damit** ich passende Orte (z. B. Museen oder Galerien) schnell finde.

## Akzeptanzkriterien
1. Jeder der fünf Ortstypen (Museum, Galerie, Stiftung, Off-Space, Bibliothek / Archiv) hat ein eigenes Symbol in einer eigenen Farbe; kein anderer Typ teilt dieselbe Kombination.
2. Der Typ ist auch ohne Farbe an der Form erkennbar, zum Beispiel bei Farbsehschwäche oder in Graustufen.
3. Eine Legende auf der Seite nennt alle fünf Typen mit demselben Symbol, derselben Farbe und dem Namen als Text.
4. Jeder Marker hat eine Textalternative aus Name und Typ.
5. Das Popup eines Markers zeigt weiterhin Name, Typ und Link zur Ortsseite.

## Abhängigkeiten
Keine (die Legende und die Marker funktionieren unabhängig vom Layout aus STORY-01).

## Spezifikation (Phase 3, vorab erstellt)
- EARS: MAP-UB-10, MAP-UB-11, MAP-UB-12; unverändert MAP-UB-1
- Gherkin: `web/karte.feature` (Symbol und Farbe je Typ, Legende der Ortstypen)
- Quality: Q-USE-9; Ergänzungen Q-USE-4, Q-PERF-3
- ADR: ADR-016

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

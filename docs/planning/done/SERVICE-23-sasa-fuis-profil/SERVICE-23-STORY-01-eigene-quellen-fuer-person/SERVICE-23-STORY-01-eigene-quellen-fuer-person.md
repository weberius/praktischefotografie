# SERVICE-23-STORY-01 – Eigene Quellen zu einer Person hinterlegen und Profil von Saša Fuis erzeugen

**Als** Redakteur:in **möchte ich** der Recherche selbst gefundene Quellen zu einer Person nennen, **damit** auch Saša Fuis ohne Wikipedia-Artikel eine belegte Beschreibung mit weiterführenden Links erhält.

## Akzeptanzkriterien
1. Eigene Adressen lassen sich nur zusammen mit einer benannten Person angeben.
2. Die Adressen landen ohne Dubletten und ohne Verlust in der Linksammlung der Person und sind als von Hand genannt erkennbar.
3. Die zugehörigen Seiten werden vor Suchtreffern und nur rücksichtsvoll abgerufen (Regeln der Betreiber, Abstand, Kennung, keine internen Adressen).
4. Ungültige oder gesperrte Adressen werden nicht übernommen bzw. abgerufen und im Bericht mit Grund genannt; die übrigen werden verarbeitet.
5. Neue eigene Adressen führen zu einem Vorschlag für den Webkurztext, der nach Prüfung und Freigabe übernommen wird.
6. Der Bericht nennt je Person alle eigenen Adressen mit Ergebnis.
7. Für `sasa-fuis` entsteht aus den beiden genannten Quellen ein freigegebener Webkurztext; die Personenseite zeigt Beschreibung und „Weiterführende Links“, die Ausstellung bleibt sichtbar.

## Abhängigkeiten
Keine (setzt auf WSP, RAS, PRF-UB-6 und PHO-UB-12 auf).

## Spezifikation (Phase 3, vorab erstellt)
- EARS: PQL-UB-1, PQL-EV-1, PQL-UB-2, PQL-UN-1, PQL-EV-2 (Kriterium 7 nutzt WSP-EV-3, WSP-UB-4 bis WSP-UB-7, PRF-UB-6, PHO-UB-12)
- Gherkin: `setup/personen-quellen.feature` (Eigene Adressen nur mit Person, Eigene Adressen in der Linksammlung, Eigene Seiten zuerst und höflich, Ungültige eigene Adresse, Bericht nennt eigene Adressen)
- Quality: Q-SEC-13, Q-DATA-18
- ADR: nicht erforderlich; geltend ADR-006, ADR-007, ADR-011, ADR-012, ADR-019, ADR-020

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔ (Live-Abruf der beiden Seiten nur per Handprobe)

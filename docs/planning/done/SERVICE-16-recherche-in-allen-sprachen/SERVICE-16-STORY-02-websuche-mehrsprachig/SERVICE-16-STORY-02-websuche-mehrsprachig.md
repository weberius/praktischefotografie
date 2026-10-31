# SERVICE-16-STORY-02 – Websuche mehrsprachig im Standardlauf, Seiteninhalte für den Text nutzen

**Als** Redakteur:in **möchte ich**, dass ein Lauf des Skills die Person auch im Web in mehreren Sprachen sucht, die Fundstellen als Links speichert und die Seiten dahinter für den Text über die Person nutzt, **damit** ich mit einem Aufruf einen gut belegten, knappen Text bekomme.

## Akzeptanzkriterien
1. Der Standardlauf enthält die Websuche; sie lässt sich abschalten.
2. Die Suchanfragen decken mehrere Sprachen ab; Umfang und Belastung bleiben begrenzt.
3. Alle Treffer stehen als Links in der Linksammlung (ohne Dubletten, ohne Verlust).
4. Die Seiten hinter neuen Links werden rücksichtsvoll abgerufen (mehr Seiten je Person als bisher) und fließen in den Text ein; Seiten, die nicht abgerufen werden dürfen oder können, werden benannt, der Text stützt sich dann auf Textauszüge.
5. Der Text nennt bis zu zehn Quellen; sie stammen alle aus der Linksammlung.
6. Alle bisherigen Schutzregeln gelten weiter (Freigabe, Prüfung, Rollback, Bilder nur Commons, keine internen Adressen).

## Abhängigkeiten
`STORY-01` (Wikipedia-Links in der Linksammlung); sonst unabhängig.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: RAS-UB-3, RAS-EV-1, RAS-UB-4, RAS-UB-5, RAS-UB-6 (ersetzen Teile von WSP-UB-1, WSP-EV-1, WSP-UB-3, WSP-UB-4)
- Gherkin: `setup/recherche-in-allen-sprachen.feature` („Websuche im Standardlauf“, „Suchanfragen in mehreren Sprachen“, „Seiten für den Text“, „Quellenzahl“)
- Quality: Q-SEC-8, Q-DATA-16 (Q-SEC-7 bleibt für die übrigen Grenzen)
- ADR: ADR-020 (Proposed); ADR-006, ADR-019

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔ (echte Suchmaschine nur per Handprobe)

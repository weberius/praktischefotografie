# SERVICE-13-STORY-02 – Abdeckung der Terminhinweise im Bericht sichtbar machen

**Als** Redakteur:in **möchte ich** im Bericht sehen, wo die abgerufenen Seiten Eröffnungs- oder Finissagehinweise enthalten und was daraus wurde, **damit** ich erkenne, ob die Recherche etwas übersehen hat.

## Akzeptanzkriterien
1. Der Bericht eines Laufs nennt je Quelle, in wie vielen Snapshots ein Eröffnungs- oder Finissagehinweis steht.
2. Der Bericht nennt je Quelle, wie viele Vernissage- und Finissage-Vorschläge dazu vorliegen.
3. Quellen mit Hinweisen, aber ohne Vorschlag, sind als „zu prüfen“ erkennbar.
4. Der Bericht entsteht aus den vorhandenen Snapshots ohne zusätzlichen Netzabruf.

## Abhängigkeiten
`SERVICE-13-STORY-01` (Vorschläge, die gezählt werden; Zählung selbst unabhängig).

## Spezifikation (Phase 3, vorab erstellt)
- EARS: OPN-EV-1, UPD-EV-3 (unverändert)
- Gherkin: `setup/eroeffnungstermine.feature` (Bericht zeigt Terminhinweise, Bericht ohne Netz)
- Quality: Q-DATA-13, Q-MAIN-2
- ADR: nicht erforderlich; ADR-007

**INVEST:** I ~ (mit STORY-01 lose gekoppelt) N ✔ V ✔ E ✔ S ✔ T ✔

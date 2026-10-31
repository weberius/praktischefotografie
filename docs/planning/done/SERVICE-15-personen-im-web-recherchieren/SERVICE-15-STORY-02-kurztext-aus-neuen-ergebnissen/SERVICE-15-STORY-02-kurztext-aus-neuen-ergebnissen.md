# SERVICE-15-STORY-02 – Kurztext aus neuen Ergebnissen vorschlagen, prüfen und übernehmen

**Als** Redakteur:in **möchte ich**, dass neue Rechercheergebnisse in den Kurztext einer Person einfließen und Bilder nur aus Wikimedia Commons stammen, **damit** die Profile aktuell und belegt bleiben und die Nutzungsrechte der Bilder geklärt sind.

## Akzeptanzkriterien
1. Hat ein Lauf neue Links geliefert, gibt es einen Vorschlag für den Kurztext aus Webquellen; ohne neue Links bleibt der vorhandene Kurztext unangetastet.
2. Der Kurztext ist in eigenen Worten geschrieben, kurz (40 bis 90 Wörter), nur aus den Quellen belegt und nennt 1 bis 5 Quellen, die in der Linksammlung stehen.
3. Zu lange, zu kurze, abgeschriebene oder unbelegte Texte werden mit Grund verworfen.
4. Bilder werden nur von Wikimedia Commons mit freier Lizenz und Urheber übernommen; Bilder von Trefferseiten werden nie geladen oder verlinkt.
5. Übernommen wird erst nach ausdrücklicher Freigabe; ein vorhandener Webkurztext wird nur mit ausdrücklichem Wunsch ersetzt; bei ungültigen Daten wird alles zurückgenommen.
6. Die Datenbasis hält den Webkurztext mit Quellen fest und die Validierung meldet ungültige Angaben; der Wikipedia-Kurztext bleibt unberührt.

## Abhängigkeiten
STORY-01 (Linksammlung, Websuche).

## Spezifikation (Phase 3, vorab erstellt)
- EARS: WSP-EV-3, WSP-UB-4, WSP-UB-5, WSP-UB-6, WSP-UB-7, PRF-UB-6, PRF-UN-4
- Gherkin: `setup/personen-websuche.feature` (Neue Ergebnisse fließen in den Kurztext, Keine neuen Links, kein neuer Kurztext, Webkurztext wird geprüft, Bilder nur von Commons, Übernahme nach Freigabe, Skill schreibt nur aus den Quellen); `content/fotografinnen-profile.feature` (Webkurztext mit Quellen, Ungültiger Webkurztext)
- Quality: Q-DATA-15, Q-DATA-1 (bestehend)
- ADR: ADR-019 (Proposed); ADR-011, ADR-012

**INVEST:** I ~ (hängt von STORY-01 ab) N ✔ V ✔ E ✔ S ✔ T ✔ (Sachrichtigkeit prüft der Mensch bei der Freigabe)

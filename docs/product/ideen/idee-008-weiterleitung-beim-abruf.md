---
status: umgesetzt      # offen | in-arbeit | umgesetzt | verworfen
prio: 2              # optional, kleiner = früher
ticket: SERVICE-17   # setzt spec-intake
---
# Weiterleitungen beim Abruf von Webseiten

Der Abruf der Webseiten von Orten und Veranstaltern soll Weiterleitungen auf eine andere Website
unter klaren Bedingungen folgen können. Heute werden sie nicht verfolgt (FET-UN-2, ADR-006). Dadurch
bleiben Orte wie die Kunst- und Museumsbibliothek Köln (`museenkoeln.de` → `museen.koeln`), das
LVR-Landesmuseum Bonn (`landesmuseum-bonn.lvr.de` → `lvr.de`) und das Rheinische Bildarchiv
(`stadt-koeln.de` → `rheinisches-bildarchiv.koeln`) ohne Aktualisierung.

## Erwartungen

- Eine Weiterleitung auf einen anderen Host wird nur verfolgt, wenn der Mensch den Zielhost für
  den Ort oder Veranstalter ausdrücklich freigegeben hat, z. B. über eine Liste erlaubter Hosts
  je Quelle in den Daten.
- Für den Zielhost gelten alle bisherigen Regeln unverändert: `robots.txt` des Zielhosts lesen und
  beachten, Abstand je Host, Zeitüberschreitung, Größenlimit, Seitenlimit, Kennung (User-Agent),
  nur http/https.
- Die Zahl der Weiterleitungen je Anfrage ist begrenzt (z. B. höchstens 3); Schleifen werden erkannt.
- Nicht freigegebene Weiterleitungen werden weiterhin nicht verfolgt und im Bericht genannt.
- Der Bericht nennt, welche Weiterleitung verfolgt wurde (von → nach).
- Die neue Adresse kann zusätzlich als Änderung der `website` des Ortes vorgeschlagen werden;
  die Übernahme erfolgt nur nach Freigabe, `source.status` bleibt unverändert.

## Offen

- Ob der Beleg im Vorschlag auf die Ziel-URL zeigt (voraussichtlich ja).
- Ob die Freigabe der Hosts als Datenfeld oder in einer Konfigurationsdatei liegt.
- Ob ADR-006 per Supersede ersetzt oder ergänzt wird.

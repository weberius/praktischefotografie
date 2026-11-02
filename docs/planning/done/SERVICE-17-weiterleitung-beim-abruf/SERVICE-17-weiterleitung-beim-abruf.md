# SERVICE-17 – Weiterleitung beim Abruf

**Status:** Entwurf (Intake)  ·  **Quelle:** Idee [`idee-008-weiterleitung-beim-abruf`](../../../product/ideen/idee-008-weiterleitung-beim-abruf.md)

> „Der Abruf der Webseiten von Orten und Veranstaltern soll Weiterleitungen auf eine andere Website unter klaren Bedingungen folgen können.“ (Idee-Datei, Kurzfassung; Anlass: Orte mit Weiterleitung auf andere Domain bleiben ohne Aktualisierung.)

## Ziel
Der Abrufdienst folgt Weiterleitungen auf andere Domains, wenn der Mensch den Zielhost für den Ort bzw. Veranstalter ausdrücklich freigegeben hat, und hält dabei alle Höflichkeits- und Schutzregeln ein.

**Zweck in einem Satz:** Orte, deren Website auf eine neue Domain umgezogen ist, werden wieder aktualisiert, ohne dass `robots.txt` umgangen oder beliebige Dritte angefragt werden.

**Erfolgskriterien**
- Die drei Orte `kunst-und-museumsbibliothek-koeln`, `lvr-landesmuseum-bonn-fotosammlung` und `rheinisches-bildarchiv-koeln` lassen sich nach Freigabe des Zielhosts abrufen.
- Nicht freigegebene Weiterleitungen werden weiterhin nicht verfolgt und im Bericht genannt.
- `robots.txt`, Abstand, Zeitüberschreitung, Größe und Kennung gelten für den Zielhost.

## Kontext
`FET-UN-2` und ADR-006 verbieten jede Weiterleitung auf andere Websites; ADR-010 überträgt das auf Veranstalter. Der Lauf vom 2026-11-02 meldete drei Orte als nicht abrufbar bzw. übersprungen.

## Story-Schnitt
1. `STORY-01` Weiterleitung auf freigegebene Hosts

## Abgrenzung
**Nicht enthalten:** automatisches Freigeben von Hosts, Umstellen der `website` einzelner Orte (läuft über den normalen Vorschlag mit Freigabe), Folgen von Links (nicht Weiterleitungen) auf andere Websites, Headless-Browser und Ausführen von JavaScript, Änderungen an den Wikimedia-Regeln.

## Betroffene Bereiche
`setup` (Skript `scripts/scrape/`, Bericht), Konfiguration `scripts/scrape/redirect-hosts.json`, Spezifikation `setup/webseiten-abruf`; ADR-021 (Proposed).

## Vorbereitete Spezifikation (Phase 3)
- EARS: `setup/webseiten-abruf.md` (FET-OP-3, FET-UB-6, FET-UB-7, FET-UN-3, FET-EV-2, FET-UB-8); FET-UN-2 ersetzt durch FET-UN-3
- Gherkin: `setup/webseiten-abruf.feature` (6 neue Szenarien, „Weiterleitung auf anderen Host“ und „Weiterleitungsgrenze“ präzisiert)
- Quality: Q-SEC-9 (`quality/setup/weiterleitung-beim-abruf.md`); ersetzt in Q-SEC-4 das Maß zu fremden Hosts
- ADR: ADR-021 (Proposed); geltend ADR-006, ADR-007, ADR-010

## Annahmen
- ANNAHME: Ticket-Key `SERVICE-17`. Beim Start lagen uncommittete Dateien vor (`updates/2026-11-02/*` aus dem Lauf von `/update-venue-data`, die Idee-Datei); sie bleiben unberührt, bis auf den Status der Idee.
- ENTSCHIEDEN (2026-11-02): „Klare Bedingungen“ = ausdrückliche Freigabe je Ort/Veranstalter in einer zentralen Konfigurationsdatei `scripts/scrape/redirect-hosts.json` (Orts-/Veranstalter-ID → Hostnamen); ohne Eintrag bleibt alles wie bisher. Kein Schemaeintrag in `data/`.
- ENTSCHIEDEN: Freigegebene Hosts zählen wie die eigene Website (Unterseiten, insgesamt höchstens 6 Seiten je Ort).
- ENTSCHIEDEN: Höchstens 3 Weiterleitungen je Anfrage (alle Arten zusammen); Schleifen und Weiterleitungen auf nicht freigegebene Hosts enden mit Hinweis im Bericht.
- BESTÄTIGT: Der Snapshot trägt die Zieladresse als URL; Fundstellen in Vorschlägen verweisen damit auf den Zielhost.
- ENTSCHIEDEN: Weiterleitungen sind HTTP-3xx, Meta-Refresh und JavaScript. ANNAHME: JavaScript wird nicht ausgeführt (ADR-006), sondern nur im Quelltext erkannt (Zuweisung an `window.location`/`location.href`, `location.replace`/`assign` mit Zeichenkette), und nur auf Seiten ohne weiteren Text; komplexe Skripte bleiben unerkannt.
- BESTÄTIGT: Die Hosts der drei bekannten Orte werden nicht in diesem Ticket in `data/` eingetragen (Datenpflege nach Freigabe durch den Menschen); die Zielhosts aus dem Lauf (`www.museen.koeln`, `www.lvr.de`, `www.rheinisches-bildarchiv.koeln`) sind Hinweise, keine Belege.
- BESTÄTIGT: ADR-021 als `Proposed`, weil die Grenzen mehrere vertretbare Alternativen haben.

## Qualitätserwartungen
Q-SEC-9; weiter Q-SEC-4, Q-REL-1, Q-MAIN-2.

## Definition of Done
- Spezifikation konsistent; ADR-021 an H2 bestätigt.
- Build, `npm test`, `npm run web:test`, `npm run lint:all`, `npm run validate:data` grün; Szenarien als Tests umgesetzt.
- `updates/README.md`, Skill `update-venue-data` und README beschreiben die Weiterleitungsdatei und das Verhalten.

## Risiken
- Weiterleitungen auf Dienste Dritter (Tracking, Anmeldung): begrenzt durch Freigabeliste und Kettenlänge.
- Zielhost mit abweichender `robots.txt`: der Ort bleibt dann gesperrt (gewollt, wird berichtet).
- JavaScript-Weiterleitungen werden nur in einfachen Fällen erkannt; die Erkennung kann falsch positiv sein (Grenze: nur freigegebene Hosts werden verfolgt).

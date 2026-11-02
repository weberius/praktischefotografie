# ADR-021: Weiterleitung beim Abruf nur auf freigegebene Hosts

**Status:** Accepted  ·  **Datum:** 2026-11-02

## Kontext
ADR-006 verbietet jede Weiterleitung auf eine andere Website. Mehrere Orte (Kunst- und Museumsbibliothek Köln, LVR-Landesmuseum Bonn, Rheinisches Bildarchiv) leiten auf eine andere Domain um und bleiben deshalb ohne Aktualisierung, weil auch die `robots.txt` der Zieldomain nicht gelesen wird. Die Regel schützt vor unbeabsichtigten Abrufen bei Dritten und vor der Umgehung von `robots.txt`; sie soll nicht pauschal fallen.

## Entscheidung
- Zentrale Weiterleitungsdatei `scripts/scrape/redirect-hosts.json`: Objekt aus Orts- bzw. Veranstalter-ID und Liste von Hostnamen (ohne Schema und Pfad). Der Mensch pflegt sie; ohne Eintrag bleibt das Verhalten wie bisher. Der Abruf prüft die Datei vor der ersten Anfrage (gültige Hostnamen, bekannte IDs) und endet sonst mit Exit-Code 1. Die Datei gehört nicht zu `data/` und nicht zum Build.
- Der Abrufdienst folgt einer Weiterleitung nur auf den Host der `website` oder einen Eintrag in der Weiterleitungsdatei; andere Ziele werden nicht verfolgt und im Bericht mit Ausgangs- und Zieladresse genannt.
- Für den Zielhost gelten alle Regeln aus ADR-006 unverändert (eigene `robots.txt`, Abstand je Host, Zeitüberschreitung, Größe, Seitenlimit, Kennung, nur http/https). Freigegebene Hosts zählen wie die eigene Website (Unterseiten, Seitenlimit insgesamt ≤ 6).
- Als Weiterleitung zählen HTTP-3xx, Meta-Refresh und im Quelltext statisch erkennbare JavaScript-Weiterleitungen (Zuweisung an `window.location`/`location.href`, `location.replace`/`assign` mit Zeichenkette); JavaScript wird nicht ausgeführt (ADR-006). Höchstens drei Weiterleitungen aller Arten zusammen je Anfrage; Schleifen enden mit Hinweis im Bericht.
- Der Bericht nennt verfolgte Weiterleitungen (von → nach); der Snapshot trägt die Zieladresse als URL.
- Die `website` des Ortes bleibt unverändert; ob sie auf die neue Adresse umgestellt wird, entscheidet der Mensch über den normalen Vorschlag mit Freigabe (ADR-007).

## Alternativen
- **Immer Weiterleitungen folgen:** Einfach, aber Abrufe bei beliebigen Dritten und Weiterleitungsketten über fremde Dienste; verworfen.
- **Nur `website` umstellen:** Keine Codeänderung, aber bei jeder Weiterleitung manuell, und der Ort bleibt bis dahin ohne Daten; bleibt als Ergänzung möglich.
- **Automatisches Freigeben des Ziels bei gleicher Organisation:** Nicht zuverlässig prüfbar; verworfen.
- **Feld `redirectHosts` im Datensatz des Ortes:** Nah am Ort und mit Schemaprüfung, aber Schemaänderung in `venues` und `organizers` und Mischung von Daten und Abrufsteuerung; zugunsten der zentralen Datei verworfen.
- **JavaScript ausführen (Headless-Browser):** Würde alle JS-Weiterleitungen erfassen, widerspricht aber ADR-006 (schwer, mehr Last); verworfen, nur statisch erkennbare Weiterleitungen.

## Konsequenzen
- Keine Schemaänderung; neue Datei mit eigener Prüfung beim Start des Abrufs, von Hand gepflegt.
- JavaScript-Weiterleitungen werden nur in einfachen Fällen erkannt; komplexe Skripte bleiben unerkannt (Ort bleibt ohne Daten, Bericht nennt die leere Seite).
- Abrufdienst und Bericht ändern sich; ADR-006 bleibt gültig, die Regel „keine Weiterleitung auf andere Websites“ gilt nur noch für nicht freigegebene Hosts.
- Mehr Anfragen bei Dritten nur nach ausdrücklicher Freigabe durch den Menschen.

## Auswirkungen
- EARS: FET-OP-3, FET-UB-6, FET-UB-7, FET-UN-3, FET-EV-2, FET-UB-8; ersetzt FET-UN-2
- Feature: `setup/webseiten-abruf.feature`
- Quality: Q-SEC-9; berührt Q-SEC-4, Q-MAIN-2
- Bezüge: ADR-006, ADR-007, ADR-010

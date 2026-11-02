# SERVICE-17-STORY-01 – Weiterleitung auf freigegebene Hosts

**Als** Redakteur:in **möchte ich** festlegen können, dass der Abruf der Website eines Ortes oder Veranstalters einer Weiterleitung auf eine bestimmte andere Domain folgt, **damit** umgezogene Websites wieder aktualisiert werden, ohne dass Regeln der Betreiber verletzt werden.

## Akzeptanzkriterien
1. Ich kann je Ort und Veranstalter Hosts angeben, auf die der Abruf weiterleiten darf (zentrale Datei); ohne Angabe ändert sich nichts; ungültige Angaben werden vor dem Abruf gemeldet.
2. Weiterleitungen (HTTP, Meta-Refresh, JavaScript) auf freigegebene Hosts werden verfolgt; Weiterleitungen auf andere Hosts nicht.
3. Für den Zielhost gelten dieselben Regeln wie sonst (eigene `robots.txt`, Abstand, Zeitgrenzen, Größen- und Seitenlimit, Kennung).
4. Ketten (höchstens drei Weiterleitungen) sind begrenzt, Schleifen werden beendet; beides steht im Bericht.
5. Der Bericht zeigt jede verfolgte und jede nicht verfolgte Weiterleitung mit Ausgangs- und Zieladresse.
6. Die Fundstellen der Vorschläge verweisen auf die tatsächlich abgerufene Seite.

## Abhängigkeiten
Keine.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: FET-OP-3, FET-UB-6, FET-UB-7, FET-UN-3, FET-EV-2, FET-UB-8 (ersetzt FET-UN-2)
- Gherkin: `setup/webseiten-abruf.feature` („Freigegebener Host im Datensatz“, „Weiterleitung auf freigegebenen Host“, „robots.txt des Zielhosts“, „Weiterleitungsgrenze und Schleife“, „Meta-Refresh und JavaScript-Weiterleitung“, „Bericht und Snapshot nach Weiterleitung“, „Weiterleitung auf anderen Host“)
- Quality: Q-SEC-9
- ADR: ADR-021 (Proposed); ADR-006, ADR-007, ADR-010

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

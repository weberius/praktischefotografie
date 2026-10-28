# Closure: SERVICE-09 – Badge-Zeile auf allen Ausstellungslisten und mehr Abstand

**Datum:** 2026-10-28

## Erreichtes
- Badge-Zeile (Art, danach Status) oberhalb der Überschrift auf Orts-, Personen-, Veranstalter- und Festivalseite; „Offizieller Partner“ in der Zeile nach dem Status; Statusanzeige unter dem Zeitraum entfällt.
- Vertikaler Abstand von 0,75 rem (das Dreifache) vor und nach der Badge-Zeile, am Blockanfang 0, einmal in der gemeinsamen Komponente festgelegt und damit auf allen neun Seiten mit Ausstellungs-Badges gleich.
- Spezifikation: 6 neue Anforderungen (BDG-UB-5 bis BDG-UB-7, VNU-UB-6, PHO-UB-10, ORG-UB-9, FST-UB-6 – letztere vier ergänzen bestehende), Q-USE-8, ADR-015 accepted.
- Prüfung: 208 Web-Tests grün (Chromium 130 und Chrome 127), `ng lint` grün, Build prerendert die Seiten.

## Abweichungen
- Phase 7 (Review) nicht durchgeführt: keine `review-*`-Skills vorhanden.
- Nicht geprüft: Aussehen im Browser, axe- und Lighthouse-Läufe, Chrome 156 der Pipeline, Abstand auf jeder einzelnen der neun Seiten (geprüft an Komponente und Karten der vier neuen Seiten).

## Rückläufe
Keine.

## Erkenntnisse
- Der Außenabstand gehört in die Komponente: Eine Stelle gilt für alle Seiten, `:host(:first-child)` vermeidet doppelten Abstand am Kartenanfang.
- Einheiten für Abstände: `rem` für vertikale Abstände zum Fließtext, `em` für den Abstand zwischen Badges (mit der Badge-Schrift skalierend).

## Follow-ups / empfohlene Tickets
1. Kompakte Liste verknüpfter Ausstellungen auf der Beitragsseite auf die Badge-Zeile umstellen, falls gewünscht.
2. Aussehen im Browser, axe- und Lighthouse-Läufe.
3. Review-Skills anlegen.

# ADR-015: Badge-Zeile auf allen Ausstellungslisten und vertikaler Abstand

**Status:** Accepted (an H2 am 2026-10-28 bestätigt)  ·  **Datum:** 2026-10-28

## Kontext
ADR-014 führte die gemeinsame Badge-Zeile (`app-exhibition-badges`) für Kalender, Magazin und Ausstellungsseiten ein. Karten mit Ausstellungen auf den Seiten für Orte, Fotograf:innen, Veranstalter:innen und Festivals zeigen noch `app-status-badge` unter dem Zeitraum (auf der Festivalseite zusätzlich „Offizieller Partner“). Die Badge-Zeile steht in den Karten zu eng zwischen den Zeilen davor und danach.

## Entscheidung
- **Gleiche Komponente.** Die genannten Seiten nutzen `app-exhibition-badges` mit `exhibitionKind` (Art) und dem Statusbadge; die Badge-Zeile steht oberhalb der Überschrift der Karte, wie in der Ausstellungsliste (EXH-UB-8).
- **Weitere Kennzeichnungen.** Die Komponente nimmt eine Liste zusätzlicher Textbadges entgegen (z. B. „Offizieller Partner“), die nach dem Status folgen (BDG-UB-7).
- **Vertikaler Abstand in der Komponente.** `:host` erhält `margin: 0.75rem 0` (das Dreifache des Zeilenabstands 0,25 rem von `.card p`), `:host(:first-child)` `margin-top: 0`. Dadurch gilt der Abstand überall gleich, auch für die bereits umgestellten Seiten (BDG-UB-5).
- **`app-status-badge`** bleibt für Listen, die nicht umgestellt werden (z. B. kompakte Liste der Beitragsseite).

## Alternativen
- **Abstand je Seite in eigenen Stilen:** Wiederholt sich und weicht ab; die Komponente erzwingt Einheitlichkeit.
- **Abstand über das globale `.card p`:** Wirkt auf alle Absätze, nicht nur auf Badges.
- **Beitragsseite und weitere kompakte Listen sofort mitumstellen:** Größerer Umbau; zunächst nicht verlangt.

## Konsequenzen
- Neun Seiten teilen Reihenfolge, Abstand und Textdarstellung der Badges; Tests prüfen die berechneten Außenabstände.
- Die Karten auf Orts-, Personen-, Veranstalter- und Festivalseiten ändern ihren Aufbau (Badges oben, kein Status unter dem Zeitraum).
- Die Beitragsseite behält die kompakte Liste verknüpfter Ausstellungen mit Statusbadge.

## Auswirkungen
- EARS: BDG-UB-5 bis BDG-UB-7, VNU-UB-6, PHO-UB-10, ORG-UB-9, FST-UB-6
- Features: `web/badges.feature`, `web/orte.feature`, `web/fotografinnen.feature`, `web/veranstalter.feature`, `web/festivals.feature`
- Quality: Q-USE-4, Q-USE-7, Q-USE-8

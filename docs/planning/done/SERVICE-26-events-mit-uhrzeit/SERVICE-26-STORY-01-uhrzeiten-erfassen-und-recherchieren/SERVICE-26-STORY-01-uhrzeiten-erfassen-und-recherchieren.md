# SERVICE-26-STORY-01 – Uhrzeiten von Events erfassen, prüfen und recherchieren

**Als** Redakteur:in **möchte ich** Start- und Endzeit eines Events strukturiert speichern und bei der Recherche mit Fundstelle erfassen, auch für bereits vorhandene Events, **damit** die Uhrzeit nicht mehr nur im Beschreibungstext steht und verlässlich weiterverwendet werden kann.

## Akzeptanzkriterien
1. Ein Event kann optional eine Startzeit, eine Endzeit und eine Zeitzone tragen; ohne Angabe bleibt jedes bestehende Event gültig und der Zeitraum ändert sich nicht.
2. Ohne Zeitzone gilt `Europe/Berlin`; eine angenommene Dauer wird nicht gespeichert.
3. Unzulässige Angaben werden bei der Validierung gemeldet: Endzeit oder Zeitzone ohne Startzeit, falsches Zeitformat, ungültige Zeitzone, Ende nicht nach Beginn am selben Tag.
4. Die Recherche übernimmt eine Uhrzeit nur, wenn die Fundstelle sie wörtlich nennt; bei mehreren Zeiten zählt die Beginnzeit der Veranstaltung. Die Zeitzone wird nur bei Abweichung von `Europe/Berlin` eingetragen.
5. Eröffnungen und Finissagen aus der Ortsdatenaktualisierung tragen die belegte Uhrzeit ebenfalls als Feld; der Beschreibungstext bleibt unverändert.
6. Bereits vorhandene Events lassen sich bei der Recherche um fehlende Zeitfelder ergänzen, ohne vorhandene Werte zu überschreiben und ohne andere Felder zu ändern.
7. Nicht belegte Uhrzeiten werden verworfen und im Bericht genannt; Übernahme nur nach Freigabe mit Validierung.

## Abhängigkeiten
Setzt auf Datenmodell, Validator, Vorschlagspipeline und Skills aus SERVICE-03, SERVICE-13 und SERVICE-22 auf (ADR-007, ADR-026). STORY-02 und STORY-03 nutzen die Felder.

## Spezifikation (Phase 3)
- EARS: DAT-UB-9, DAT-UB-10, VAL-UN-6, VAL-UN-7, VAL-UN-8, VRS-UB-8, VRS-UB-9, VRS-UB-10 (ersetzt VRS-UB-2), VRS-EV-3, VRS-UN-3, OPN-UB-9, OPN-UN-3
- Quality: Q-DATA-19, Q-DATA-20, Q-DATA-12 (Ergänzung durch OPN-UB-9)
- Gherkin: `content/daten.feature`, `setup/datenvalidierung.feature`, `setup/veranstaltungen-recherche.feature`, `setup/eroeffnungstermine.feature`
- ADR: ADR-027 (Proposed); geltend ADR-001, ADR-007, ADR-026

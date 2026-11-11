# SERVICE-26-STORY-03 – Uhrzeiten in Liste, Detailseite und Agenda sehen

**Als** Besucher:in **möchte ich** die Uhrzeit eines Events direkt in Liste, Detailseite und Agenda sehen, **damit** ich Termine einordnen kann, ohne die Beschreibung zu lesen.

## Akzeptanzkriterien
1. Eintägige Events mit Startzeit zeigen „16:00–18:00 Uhr“, ohne Endzeit „ab 16:00 Uhr“; bei abweichender Zeitzone steht der Zonenname dabei.
2. Events ohne Startzeit zeigen nur das Datum; die angenommene Dauer von 2 Stunden wird nirgends angezeigt.
3. Mehrtägige Events zeigen in Liste und Agenda nur den Zeitraum; die Detailseite nennt „Start …“ und, falls vorhanden, „Ende …“.
4. Die Agenda zeigt die Uhrzeit auch in der Monatsauswahl und ordnet Einträge desselben Beginndatums nach Startzeit, Einträge ohne Zeit zuerst.
5. Die Zeitangabe ist für Screenreader eindeutig und besteht die Zugänglichkeitsprüfung.

## Abhängigkeiten
Felder aus STORY-01 (Schema und Modell); unabhängig von STORY-02.

## Spezifikation (Phase 3)
- EARS: EVT-UB-7, EVT-UB-8, CAL-UB-8, CAL-UB-9
- Quality: Q-USE-21; weiter Q-USE-4, Q-PERF-3
- Gherkin: `web/events.feature`, `web/kalender.feature`
- ADR: ADR-027 (Proposed); geltend ADR-002

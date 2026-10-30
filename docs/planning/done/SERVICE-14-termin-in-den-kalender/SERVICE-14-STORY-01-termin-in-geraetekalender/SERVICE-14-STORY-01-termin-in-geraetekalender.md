# SERVICE-14-STORY-01 – Termin eines Events in den Gerätekalender speichern

**Als** Besucher:in **möchte ich** auf der Detailseite eines Events den Termin mit einem Klick in den Kalender meines Smartphones oder Rechners übernehmen, **damit** ich ihn nicht abtippen muss und rechtzeitig daran denke.

## Akzeptanzkriterien
1. Auf der Detailseite eines nicht beendeten Events gibt es eine klar beschriftete Schaltfläche; ein sichtbarer Hinweis erklärt, dass der Kalender des Geräts gemeint ist, nicht der Kalender der Webanwendung.
2. Ein Klick liefert eine Kalenderdatei für genau dieses Event; dafür ist kein Netzzugriff nötig.
3. Der Termin enthält Titel, Zeitraum (mehrtägige Events über alle Tage), Ort mit Adresse, Beschreibung und einen Link zurück auf die Detailseite.
4. Ein erneuter Import desselben Events legt keinen zweiten Termin an, sondern aktualisiert den bestehenden.
5. Sonderzeichen, Umlaute und lange Texte erscheinen im Kalender korrekt.
6. Die Schaltfläche ist per Tastatur bedienbar und für Screenreader verständlich benannt.
7. Bei beendeten Events, in Listen, in der Agenda und bei Ausstellungen gibt es die Schaltfläche nicht.

## Abhängigkeiten
Keine.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: ICS-UB-1 bis ICS-UB-7 (ICS-UB-6 und ICS-UB-7 aus dem Review ergänzt), ICS-EV-1, ICS-ST-1, ICS-UN-1
- Gherkin: `web/kalender-export.feature` (Schaltfläche, Download, Inhalt, Mehrtägiges Event, Stabile Kennung, Maskierung und Faltung, Beendetes Event, Ort unbekannt, Nur auf der Eventdetailseite; aus dem Review: Frei und ohne Einladung, Steuerzeichen im Text)
- Quality: Q-USE-15, Q-IOP-1, Q-SEC-6, Q-USE-3 (Ergänzung)
- ADR: ADR-018 (Proposed); ADR-002, ADR-003, ADR-017

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔ (Import in echte Kalender-Apps nur per Handprobe)

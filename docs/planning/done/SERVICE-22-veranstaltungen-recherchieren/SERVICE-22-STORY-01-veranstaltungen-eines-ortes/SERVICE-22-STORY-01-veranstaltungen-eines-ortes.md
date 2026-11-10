# SERVICE-22-STORY-01 – Veranstaltungen und Führungen eines Ortes recherchieren und übernehmen

**Als** Redakteur:in **möchte ich** die Führungen und Veranstaltungen eines einzelnen Ortes aus dessen Website recherchieren und nach Prüfung übernehmen, **damit** die Webanwendung die tatsächlich angebotenen Termine eines Ortes zeigt (z. B. die Führungen der Photographischen Sammlung).

## Akzeptanzkriterien
1. Ein Aufruf des Skills mit einem Ort bearbeitet nur diesen Ort; unbekannte oder Veranstalter-IDs führen zu einem Hinweis mit den gültigen IDs.
2. Auch Veranstaltungen auf tieferen Programmseiten werden gefunden (Beispiel: „Führungen und Veranstaltungen“ der Photographischen Sammlung).
3. Vorschläge betreffen nur Veranstaltungen, haben einen belegten Termin ab heute und eine Fundstelle mit Titel und Datum.
4. Führungen, Vorträge, Workshops, Lesungen und Symposien werden dem passenden Typ zugeordnet; Vernissagen und Finissagen sind ausgenommen.
5. Mehrere Termine ergeben mehrere Events; Dubletten und ein zweiter, unveränderter Lauf erzeugen keine neuen Vorschläge.
6. Übernahme nur nach ausdrücklicher Freigabe, mit Validierung und Rücknahme bei Fehlern.
7. Der Abruf bleibt rücksichtsvoll (robots.txt, Abstand, Obergrenze von Seiten).

## Abhängigkeiten
Setzt auf Abruf, Vorschlagsprüfung und Übernahme (SERVICE-03, ADR-006/007) auf; Typ „Führung“ aus STORY-03 (für die Übernahme von Führungen erforderlich).

## Spezifikation (Phase 3, vorab erstellt)
- EARS: VRS-UB-1 bis VRS-UB-7, VRS-OP-1, VRS-UN-1, VRS-EV-1
- Gherkin: `setup/veranstaltungen-recherche.feature` („Skill ist vorhanden“, „Veranstaltungen eines Ortes“, „Unbekannte Orts-ID“, „Veranstaltungsseiten haben Vorrang“, „Nur Veranstaltungen werden vorgeschlagen“, „Veranstaltung nur mit belegtem Termin“, „Vergangene Termine“, „Führung wird als Führung erfasst“, „Keine Vernissagen“, „Mehrere Termine einer Führung“, „Obergrenze je Ort“, „Keine Dubletten“, „Wiederholter Lauf“, „Übernahme nur nach Freigabe“)
- Quality: Q-SEC-12, Q-DATA-17
- ADR: ADR-026 (Proposed); ADR-006, ADR-007

**INVEST:** I ✔ (mit Abhängigkeit zu STORY-03 bei der Übernahme) N ✔ V ✔ E ✔ S ✔ T ✔

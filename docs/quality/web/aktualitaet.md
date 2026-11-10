# Qualität: Nur aktuelle Informationen (web)

**Stand:** 2026-11-10. Ergänzt `barrierefreiheit.md` (Q-USE-4).

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-REL-4 | Die Anwendung entscheidet an Stichtagen, ob ein Eintrag aktuell ist; die Grenze darf sich weder nach Zeitzone noch Reihenfolge der Daten verschieben. | Bei festem Referenzdatum: Ende = gestern → ausgeblendet, Ende = heute → sichtbar, Ende = morgen → sichtbar (0 Abweichungen in 3 Grenzfällen je Liste); dieselbe Regel in Eventliste und Ausstellungsliste (`isOver`/`exhibitionStatus`, keine zweite Berechnung); Ergebnis unabhängig von der Reihenfolge der Daten. | Komponententests mit festem Referenzdatum (Clock-Ersatz), Grenzfalltabelle | ACT-UB-1, ACT-UB-2, ACT-UN-1 |

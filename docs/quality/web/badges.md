# Qualität: Badges von Ausstellungen (web)

**Stand:** 2026-10-28. Fortlaufend zu Q-USE-4 und Q-USE-6.

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-USE-7 | Besucher:in sieht Ausstellungen im Kalender, im Magazin und auf den Ausstellungsseiten; die Badge-Zeilen sollen überall gleich aufgebaut sein. | 100 % der Badge-Zeilen von Ausstellungen auf den fünf Seiten (Agenda, Magazinkarte, Beitragsseite, Ausstellungsliste, Ausstellungsdetail) zeigen zuerst die Art und danach Status bzw. Anlass; der berechnete horizontale Abstand zwischen zwei Badges beträgt 0,25 em (± 0,01 em); in der Ausstellungsliste steht die Badge-Zeile vor der Überschrift. | Komponententests (Reihenfolge, `getComputedStyle` auf Abstand), eine gemeinsame Komponente für alle Seiten | BDG-UB-2, BDG-UB-3, CAL-UB-7, BLG-UB-9, EXH-UB-8, EXH-UB-9 |
| Q-USE-8 | Besucher:in liest Karten mit Badge-Zeile; Zeilen davor und danach sollen sich deutlich absetzen. | 100 % der Badge-Zeilen auf allen neun Seiten mit Ausstellungs-Badges (Agenda, Magazinkarte, Beitragsseite, Ausstellungsliste, Ausstellungsdetail, Orts-, Personen-, Veranstalter- und Festivalseite) haben 0,75 rem (± 0,5 px) Abstand zur vorhergehenden und zur nachfolgenden Zeile, am Blockanfang 0; in den Ausstellungskarten steht die Badge-Zeile vor der Überschrift. | Komponententests (`getComputedStyle` auf Außenabstände und Reihenfolge) | BDG-UB-5, BDG-UB-6, VNU-UB-6, PHO-UB-10, ORG-UB-9, FST-UB-6 |

**Ergänzung 2026-10-28:** Q-USE-7 gilt zusätzlich für die Karten auf den Orts-, Personen-, Veranstalter- und Festivalseiten (BDG-UB-6); dort zeigt die Badge-Zeile zuerst die Art und danach den Status, auf der Festivalseite danach „Offizieller Partner“ (BDG-UB-7).

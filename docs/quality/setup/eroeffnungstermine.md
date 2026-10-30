# Qualität: Eröffnung und Finissage bei der Recherche (setup)

**Stand:** 2026-10-30. Ergänzt `datenaktualisierung.md` (Q-DATA-3, Q-MAIN-2); Q-SEC-4 bleibt unverändert, weil der Abruf nicht geändert wird.

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-DATA-12 | Redaktion übernimmt Vernissage- und Finissage-Vorschläge; Datum und Uhrzeit sollen stimmen und auf der Seite stehen. | Von ≥ 13 Fixtures (Opening mit Uhrzeit und Anwesenheit, Finissage mit Uhrzeit, nur Datum, Uhrzeit ohne Beleg, vergangenes Datum, Dublette je Typ, Ausstellungsende ohne Finissagehinweis, abweichendes Datum, Punktdatum statt Uhrzeit, nur Startzeit belegt, zwei Termine) werden 100 % richtig behandelt; 0 Finissage-Vorschläge ohne ausdrücklichen Beleg; 0 übernommene Termine, deren Datum nicht im Textauszug steht; 0 übernommene Uhrzeiten, die nicht im Textauszug stehen (Datumsangaben zählen nicht als Uhrzeit); Zander-Fixture „Between“ ergibt 2026-11-07, 16:00 bis 18:00 Uhr, Anwesenheit „Candida Höfer“. | Tests mit Fixtures (Textauszüge aus Snapshots, ohne Netz) | OPN-UB-1 bis OPN-UB-8, OPN-UN-1, OPN-UN-2 |
| Q-DATA-13 | Redaktion prüft im Bericht, ob Eröffnungs- oder Finissagehinweise unbeachtet blieben. | 100 % der Snapshots einer Fixture-Quelle mit Stichwort „Vernissage“, „Opening:“, „Eröffnung“, „Finissage“ oder „Closing“ plus Datum werden getrennt nach Eröffnung und Finissage gezählt; Zählung und Bericht für 20 Quellen ≤ 5 s; 0 Netzanfragen. | Test mit Snapshot-Fixtures und Zeitmessung | OPN-EV-1 |

**Konflikt zu benennen:** Der Stichwort-Zähler kann Fehlalarme liefern (z. B. Eröffnung einer Messe); das Maß fordert Vollständigkeit der Treffer, nicht Fehlerfreiheit. Treffer ohne Vorschlag sind „zu prüfen“, nicht „fehlerhaft“.

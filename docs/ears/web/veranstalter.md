# EARS: Veranstalter:innen und Festivals (Kürzel `ORG`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-10-27

Begriffe: „heute“ ist das aktuelle Datum der Anwendung (in Tests ein fester Referenzwert). Datenfelder siehe `schema/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| ORG-UB-1 | Die Webanwendung soll auf `/organizers` alle Veranstalter:innen mit Name, Typ und Stadt auflisten. | `web/veranstalter.feature` · „Übersicht der Veranstalter:innen“ | – | ADR-002 |
| ORG-UB-2 | Die Webanwendung soll auf `/organizers/:id` Name, Typ, Stadt und Website anzeigen. | `web/veranstalter.feature` · „Veranstalterseite zeigt Stammdaten“ | – | ADR-002 |
| ORG-UB-3 | ~~Die Webanwendung soll auf der Veranstalterseite alle Ausstellungen auflisten, deren `festivalId` die ID des Veranstalters ist, mit Ort und Zeitraum.~~ **Ersetzt durch ORG-UB-5** (festivalId verweist auf ein Festival, ADR-009). | `web/veranstalter.feature` · „Veranstalterseite listet Ausstellungen“ (ersetzt) | – | ADR-002 |
| ORG-ST-1 | Solange einem Veranstalter keine Ausstellungen zugeordnet sind, soll die Webanwendung auf der Veranstalterseite einen Hinweis anzeigen. | `web/veranstalter.feature` · „Veranstalter ohne Ausstellung“ | – | ADR-002 |
| ORG-UB-4 | ~~Die Webanwendung soll auf `/map` und im Ortsverzeichnis den Filter `organizer` bereitstellen, der nur Orte mit mindestens einer Ausstellung dieses Veranstalters zeigt.~~ **Ersetzt durch ORG-UB-6** (Zuordnung über Festivals, ADR-009). | `web/veranstalter.feature` · „Festivalfilter in der Karte“ (ersetzt) | – | ADR-004 |
| ORG-UB-5 | Die Webanwendung soll auf der Veranstalterseite alle Ausstellungen auflisten, deren `festivalId` auf ein Festival dieses Veranstalters verweist, mit Ort, Zeitraum und Status. | `web/veranstalter.feature` · „Veranstalterseite listet Ausstellungen über Festivals“ | – | ADR-002, ADR-009 |
| ORG-UB-6 | Die Webanwendung soll auf `/map` und `/venues` den Filter `organizer` bereitstellen, der nur Orte mit mindestens einer Ausstellung eines Festivals dieses Veranstalters zeigt. | `web/veranstalter.feature` · „Veranstalterfilter in der Karte“ | – | ADR-004, ADR-009 |
| ORG-UB-7 | Die Webanwendung soll auf der Veranstalterseite die Festivals des Veranstalters mit Titel und Zeitraum auflisten und mit `/festivals/:id` verlinken. | `web/veranstalter.feature` · „Veranstalterseite listet Festivals“ | – | ADR-002, ADR-009 |
| ORG-UB-8 | Die Webanwendung soll auf der Veranstalterseite, soweit vorhanden, Kurzbeschreibung und den Link zum Instagram-Profil anzeigen. | `web/veranstalter.feature` · „Veranstalterseite zeigt Beschreibung und Instagram“ | – | ADR-002 |

**Supersede 2026-10-28:** ORG-UB-3 und ORG-UB-4 lasen `festivalId` als Veranstalter-ID; mit dem Festival-Datensatz (ADR-009) ersetzen ORG-UB-5 und ORG-UB-6 sie. Alte Fassung oben durchgestrichen.

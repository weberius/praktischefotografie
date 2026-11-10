# EARS: Nur aktuelle Informationen (Kürzel `ACT`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-11-10

Begriffe: „heute“ ist das aktuelle Datum der Anwendung (in Tests ein fester Referenzwert). „Aktuell“ heißt: das Ende liegt nicht vor heute (Endtag gilt als laufend), also laufend, endet bald oder kommend (EXH-UB-2). „Aktuelle Liste“ sind Eventliste (`/events`) und Ausstellungsliste (`/exhibitions`). Datenfelder siehe `schema/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| ACT-UB-1 | Die Webanwendung soll in den aktuellen Listen ausschließlich aktuelle Einträge zeigen; Einträge, deren Ende vor heute liegt, soll sie dort nicht zeigen. | `web/aktualitaet.feature` · „Listen zeigen nur Aktuelles“ | Q-REL-4 | ADR-002 |
| ACT-UB-2 | Die Webanwendung soll im Statusfilter der Ausstellungsliste nur „Kommend“, „Endet bald“ und „Laufend“ anbieten und den Wert „Beendet“ nicht anbieten. | `web/aktualitaet.feature` · „Statusfilter ohne Beendet“ | Q-USE-4 | ADR-002 |
| ACT-UN-1 | Wenn die Adresse der Ausstellungsliste den Statuswert „beendet“ enthält, soll die Webanwendung den Wert wie einen unbekannten Wert behandeln und alle aktuellen Ausstellungen zeigen. | `web/aktualitaet.feature` · „Statuswert beendet in der Adresse“ | – | ADR-002 |
| ACT-ST-1 | Solange die Eventliste oder die Ausstellungsliste keinen aktuellen Eintrag für die Auswahl enthält, soll die Webanwendung einen Hinweis anzeigen. | `web/aktualitaet.feature` · „Keine aktuellen Einträge“ | – | ADR-002 |
| ACT-UB-3 | Die Webanwendung soll Detailseiten beendeter Events und Ausstellungen über ihre Adresse weiterhin anzeigen und mit „Beendet“ kennzeichnen. | `web/aktualitaet.feature` · „Detailseite beendeter Einträge“ | Q-USE-4 | ADR-002 |
| ACT-UB-4 | Die Webanwendung soll Orte, Fotograf:innen, Kalender und Magazin in ihrer Auswahl nicht nach ACT-UB-1 einschränken: Die Personenseite zeigt weiterhin alle Ausstellungen der Person, auch beendete, neueste Beginndaten zuerst (PHO-UB-3, PHO-UB-9, PHO-UB-10); die Ortsseite zeigt nur laufende und kommende Ausstellungen und Events (VNU-UB-4); der Kalender zeigt standardmäßig nur Aktuelles und blendet Beendete auf Wunsch ein (CAL-OP-1); das Magazin zeigt alle veröffentlichten Beiträge (BLG-UB-1). | `web/aktualitaet.feature` · „Andere Seiten bleiben unverändert“ | – | ADR-002 |

**Verhältnis zu bestehenden Anforderungen:** ACT-UB-1 ersetzt EVT-UB-1 und EXH-UB-1 (dort ohne Einschränkung auf Aktuelles); ACT-UB-2 ersetzt EXH-UB-3; EVT-UB-4 gilt nur noch für die Detailseite (ACT-UB-3). EVT-UB-2, FAV-UB-4 und FLT-UB-5 bleiben als zusätzliche Filter (UND) gültig. VNU-UB-4, CAL-OP-1, PHO-UB-3 und BLG-UB-1 bleiben unverändert.

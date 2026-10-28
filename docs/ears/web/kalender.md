# EARS: Kalender und Agenda (Kürzel `CAL`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-10-27

Begriffe: „heute“ ist das aktuelle Datum der Anwendung (in Tests ein fester Referenzwert). Datenfelder siehe `schema/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| CAL-UB-1 | Die Webanwendung soll Ausstellungen und Events nach Beginn aufsteigend mit Titel, Ort und Zeitraum auflisten. | `web/kalender.feature` · „Agenda zeigt Einträge chronologisch“ | Q-PERF-3 | ADR-002 |
| CAL-UB-2 | Die Webanwendung soll jeden Agendaeintrag mit seiner Detailseite verlinken. | `web/kalender.feature` · „Eintrag führt zur Detailseite“ | – | ADR-002 |
| CAL-UB-3 | Die Webanwendung soll in der Agenda Ausstellungen mit dem Status „Endet bald“ (EXH-UB-2) mit dem Text „Endet bald“ kennzeichnen. | `web/kalender.feature` · „Endet bald in der Agenda“ | – | ADR-002 |
| CAL-UB-4 | ~~Die Webanwendung soll Ausstellungen und Events in der Agenda mit dem Text „Ausstellung“ bzw. „Event“ kennzeichnen.~~ **Ersetzt durch CAL-UB-7.** | `web/kalender.feature` · „Einträge sind als Ausstellung oder Event beschriftet“ (ersetzt) | Q-USE-4 | ADR-002 |
| CAL-OP-1 | Wo die Option „Beendete anzeigen“ (Query-Parameter `ended=1`) nicht gewählt ist, soll die Webanwendung auf `/calendar` nur Einträge zeigen, die heute laufen oder später beginnen. | `web/kalender.feature` · „Beendete sind standardmäßig ausgeblendet“ | – | ADR-002 |
| CAL-EV-1 | Wenn ein Monat über `/calendar/:year/:month` gewählt wird, soll die Webanwendung alle Einträge zeigen, deren Zeitraum den Monat berührt, auch beendete. | `web/kalender.feature` · „Monatsansicht“ | – | ADR-002 |
| CAL-UB-5 | Die Webanwendung soll in der Monatsansicht Links zum vorherigen und zum nächsten Monat (auch über den Jahreswechsel) und einen Link „Ab heute“ bereitstellen. | `web/kalender.feature` · „Monatsnavigation“ | – | ADR-002 |
| CAL-UB-6 | Die Webanwendung soll beendete Ausstellungen und Events in der Agenda mit dem Text „Beendet“ kennzeichnen. | `web/kalender.feature` · „Beendete sind gekennzeichnet“ | Q-USE-4 | ADR-002 |
| CAL-ST-1 | Solange für die Auswahl keine Einträge vorhanden sind, soll die Webanwendung einen Hinweis anzeigen. | `web/kalender.feature` · „Keine Einträge in der Auswahl“ | – | ADR-002 |
| CAL-UN-1 | Wenn der Monat in der Adresse nicht zwischen 1 und 12 liegt oder das Jahr keine vierstellige Zahl ist, soll die Webanwendung die Hinweisseite für unbekannte Adressen anzeigen. | `web/kalender.feature` · „Ungültiger Monat“ | – | ADR-002 |
| CAL-UB-7 | Die Webanwendung soll Ausstellungen in der Agenda zuerst mit dem Badge der Art (BDG-UB-1, z. B. „Gruppenausstellung“) kennzeichnen, danach mit dem Status „Endet bald“ bzw. „Beendet“ (CAL-UB-3, CAL-UB-6), und Events mit dem Text „Event“. | `web/kalender.feature` · „Einträge tragen Art und Status“ | Q-USE-4, Q-USE-7 | ADR-014 |

**Supersede 2026-10-28:** CAL-UB-4 beschriftete Ausstellungen nur mit „Ausstellung“; CAL-UB-7 verlangt die genauere Art und die Reihenfolge Art, Status.


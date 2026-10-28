# EARS: Badges von Ausstellungen (Kürzel `BDG`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-10-28

Begriffe: „Badge“ ist eine kurze Textmarke (Art, Status, Anlass). „Badge-Zeile“ sind die nebeneinanderstehenden Badges einer Ausstellung im Kalender (Agenda), im Magazin (Karten und Beitragsseite) und auf den Ausstellungsseiten (Liste und Detail). „Status“ ist der Status nach EXH-UB-2, „Anlass“ der Anlass einer Neuigkeit nach BLG-UB-6.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| BDG-UB-1 | Die Webanwendung soll die Art einer Ausstellung bestimmen als „Gruppenausstellung“, wenn mehr als eine Person verknüpft ist, und als „Einzelausstellung“, wenn genau eine Person verknüpft ist; bei der gespeicherten Art `retrospective` soll sie „Retrospektive“ und bei `permanent` „Dauerausstellung“ anzeigen, unabhängig von der Zahl der Personen; ist keine Person verknüpft, soll sie die gespeicherte Art anzeigen. | `web/badges.feature` · „Art der Ausstellung nach Zahl der Personen“ | Q-USE-4 | ADR-014 |
| BDG-UB-2 | Die Webanwendung soll in jeder Badge-Zeile einer Ausstellung zuerst das Badge der Art und danach das Badge des Status bzw. des Anlasses zeigen. | `web/badges.feature` · „Reihenfolge der Badges je Seite“ | Q-USE-7 | ADR-014 |
| BDG-UB-3 | Die Webanwendung soll zwischen nebeneinanderstehenden Badges einer Badge-Zeile einen horizontalen Abstand von der Breite eines Leerzeichens (0,25 em) darstellen. | `web/badges.feature` · „Abstand zwischen Badges“ | Q-USE-7 | ADR-014 |
| BDG-UB-4 | Die Webanwendung soll Art, Status und Anlass in jeder Badge-Zeile als Text darstellen. | `web/badges.feature` · „Badges sind Text“ | Q-USE-4 | ADR-014 |
| BDG-UB-5 | Die Webanwendung soll oberhalb und unterhalb einer Badge-Zeile einen vertikalen Abstand von 0,75 rem zur vorhergehenden und zur nachfolgenden Zeile darstellen (das Dreifache des Zeilenabstands von 0,25 rem in Karten); steht die Badge-Zeile am Anfang eines Blocks, entfällt der obere Abstand. | `web/badges.feature` · „Abstand zur vorhergehenden und nachfolgenden Zeile“ | Q-USE-8 | ADR-015 |
| BDG-UB-6 | Die Webanwendung soll in jeder Karte einer Ausstellung auf den Seiten für Orte, Fotograf:innen, Veranstalter:innen und Festivals die Badge-Zeile (Art, danach Status) oberhalb der Überschrift anzeigen. | `web/badges.feature` · „Badge-Zeile in Ausstellungskarten anderer Seiten“ | Q-USE-7 | ADR-015 |
| BDG-UB-7 | Die Webanwendung soll weitere Kennzeichnungen einer Ausstellung, etwa „Offizieller Partner“ (FST-UB-3), in derselben Badge-Zeile nach dem Status zeigen. | `web/badges.feature` · „Offizieller Partner in der Badge-Zeile“ | Q-USE-4 | ADR-015 |

**Ergänzung 2026-10-28:** BDG-UB-1 bis BDG-UB-4 gelten für Kalender, Magazin und Ausstellungsseiten (CAL-UB-7, BLG-UB-9, EXH-UB-8, EXH-UB-9). Sie ersetzen die bisherige freie Darstellung („Ausstellung“ im Kalender, Typ nach Status auf der Detailseite, Anlass vor Art im Magazin).

**Ergänzung 2026-10-28 (SERVICE-09):** BDG-UB-1 bis BDG-UB-4 gelten zusätzlich für die Karten auf den Seiten für Orte (VNU-UB-6), Fotograf:innen (PHO-UB-10), Veranstalter:innen (ORG-UB-9) und Festivals (FST-UB-6). BDG-UB-5 gilt für alle Badge-Zeilen, auch die bereits vorhandenen im Kalender, im Magazin und auf den Ausstellungsseiten.


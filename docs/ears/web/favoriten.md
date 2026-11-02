# EARS: Favoriten (Kürzel `FAV`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-11-02

Begriffe: „Favorit“ ist ein Event (Datensatztyp `events`), das Besucher:innen in der laufenden Sitzung markiert haben; „Sitzung“ dauert bis zum Neuladen der Anwendung (Neuladen der Seite, neuer Tab, Aufruf per Adresse); „Agenda“ ist die Liste auf `/calendar`. Datenfelder siehe `schema/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| FAV-UB-1 | **Deprecated** (ersetzt durch FAV-UB-5: Ortsdetailseite fehlte, FAV-UB-2 verlangt den Zustand auf allen Seiten mit dem Event). Die Webanwendung soll zu jedem Event auf der Eventliste (`/events`), der Eventdetailseite (`/events/:id`) und in der Agenda (`/calendar`) einen Umschalter „Favorit“ zeigen, der den Zustand in Text und Symbol sowie für Screenreader anzeigt und das Event im zugänglichen Namen nennt; Ausstellungen in der Agenda erhalten ihn nicht. | `web/favoriten.feature` · „Umschalter auf Liste, Detail und Agenda“ | Q-USE-17, Q-USE-3 | ADR-023 |
| FAV-EV-1 | Wenn Besucher:innen den Umschalter eines Events betätigen, soll die Webanwendung das Event als Favorit markieren bzw. die Markierung aufheben. | `web/favoriten.feature` · „Markieren und Aufheben“ | Q-USE-17 | ADR-023 |
| FAV-UB-2 | Die Webanwendung soll den Favoritenzustand eines Events auf allen Seiten, die das Event zeigen, einheitlich anzeigen und beim Wechsel zwischen den Seiten der Anwendung beibehalten. | `web/favoriten.feature` · „Zustand gilt über Seiten hinweg“ | Q-USE-17 | ADR-023 |
| FAV-UB-3 | Die Webanwendung soll Favoriten ausschließlich im Speicher der laufenden Sitzung halten, sodass nach dem Neuladen keine Favoriten mehr gesetzt sind und weder Cookies noch Web-Speicher noch Netzanfragen dafür verwendet werden. | `web/favoriten.feature` · „Neuladen entfernt Favoriten“ | Q-SEC-10 | ADR-023 |
| FAV-UB-4 | Die Webanwendung soll die Eventliste mit der Option „Nur Favoriten“ auf Favoriten einschränken, kombinierbar mit dem Typfilter. | `web/favoriten.feature` · „Eventliste nur mit Favoriten“ | Q-USE-17 | ADR-023 |
| FAV-ST-1 | Solange die Option „Nur Favoriten“ gewählt ist und kein Event Favorit ist (oder keines zum Typfilter passt), soll die Webanwendung einen Hinweis statt einer leeren Liste anzeigen. | `web/favoriten.feature` · „Keine Favoriten“ | Q-USE-17 | ADR-023 |
| FAV-UB-5 | Die Webanwendung soll zu jedem Event auf der Eventliste (`/events`), der Eventdetailseite (`/events/:id`), der Ortsdetailseite (`/venues/:id`) und in der Agenda (`/calendar`) den Umschalter „Favorit“ zeigen, der den Zustand in Text und Symbol sowie für Screenreader anzeigt und das Event im zugänglichen Namen nennt; Ausstellungen erhalten ihn nicht. Ersetzt FAV-UB-1. | `web/favoriten.feature` · „Umschalter auf Liste, Detail, Ort und Agenda“ | Q-USE-17, Q-USE-3 | ADR-023 |
| FAV-UB-6 | Die Webanwendung soll die Option „Nur Favoriten“ der Eventliste in der Adresse (`favorites=1`) führen, sodass sie nach dem Wechsel auf eine Detailseite und zurück erhalten bleibt und mit dem Typfilter kombinierbar ist; die Favoriten selbst stehen nicht in der Adresse. | `web/favoriten.feature` · „Option bleibt in der Adresse“ | Q-USE-17 | ADR-024 |

**Verhältnis zu bestehenden Anforderungen:** EVT-UB-1 bis EVT-UB-5, CAL-UB-1 bis CAL-UB-7 und RCH-UB-3 bleiben unverändert gültig; FAV-UB-1 und FAV-UB-4 ergänzen Liste, Detail und Agenda. RCH-UB-3 (keine Cookies, kein Tracking) bleibt wahr, weil FAV-UB-3 nichts speichert.

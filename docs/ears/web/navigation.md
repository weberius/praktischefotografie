# EARS: Navigation und Seitenrahmen (Kürzel `NAV`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-10-27

Begriffe: „heute“ ist das aktuelle Datum der Anwendung (in Tests ein fester Referenzwert). Datenfelder siehe `schema/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| NAV-UB-1 | Die Webanwendung soll auf jeder Seite eine Navigation zu Magazin, Kalender, Karte, Orten, Fotograf:innen, Ausstellungen, Events und Veranstalter:innen sowie Links zu Impressum und Datenschutz bereitstellen. | `web/navigation.feature` · „Navigation ist auf jeder Seite vorhanden“ | Q-USE-3 | ADR-002 |
| NAV-UB-2 | Die Webanwendung soll die Adressen `/`, `/posts/:slug`, `/calendar`, `/calendar/:year/:month`, `/map`, `/venues`, `/venues/:id`, `/photographers`, `/photographers/:id`, `/exhibitions`, `/exhibitions/:id`, `/events`, `/events/:id`, `/organizers`, `/organizers/:id`, `/impressum` und `/datenschutz` bereitstellen. | `web/navigation.feature` · „Jede Adresse zeigt ihre Seite“ | Q-SEO-3 | ADR-002 |
| NAV-EV-1 | Wenn eine Adresse oder eine ID unbekannt ist, soll die Webanwendung eine Hinweisseite mit Link zur Startseite anzeigen. | `web/navigation.feature` · „Unbekannte Adresse oder ID“ | Q-USE-2 | ADR-002 |
| NAV-UB-3 | Die Webanwendung soll jeder Seite einen eigenen Titel und eine eigene Meta-Beschreibung zuweisen. | `web/navigation.feature` · „Jede Seite hat Titel und Beschreibung“ | Q-SEO-2 | ADR-002 |
| NAV-UN-1 | Wenn eine Datendatei nicht geladen werden kann, soll die Webanwendung einen Fehlerhinweis mit der Möglichkeit zum erneuten Laden anzeigen. | `web/navigation.feature` · „Daten nicht ladbar“ | Q-USE-2 | ADR-002 |
| NAV-UB-4 | Die Webanwendung soll auf der Datenschutzseite den Abruf von Kartenkacheln bei OpenStreetMap nennen. | `web/navigation.feature` · „Datenschutzseite nennt Kartenabruf“ | Q-SEC-2 | ADR-004 |

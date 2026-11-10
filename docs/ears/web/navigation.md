# EARS: Navigation und Seitenrahmen (Kürzel `NAV`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-10-27

Begriffe: „heute“ ist das aktuelle Datum der Anwendung (in Tests ein fester Referenzwert). Datenfelder siehe `schema/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| NAV-UB-1 | ~~Die Webanwendung soll auf jeder Seite eine Navigation zu Magazin, Kalender, Karte, Orten, Fotograf:innen, Ausstellungen, Events und Veranstalter:innen sowie Links zu Impressum und Datenschutz bereitstellen.~~ **Ersetzt durch NAV-UB-5.** | `web/navigation.feature` · „Navigation ist auf jeder Seite vorhanden“ | Q-USE-3 | ADR-002 |
| NAV-UB-2 | ~~Die Webanwendung soll die Adressen `/`, `/posts/:slug`, `/calendar`, `/calendar/:year/:month`, `/map`, `/venues`, `/venues/:id`, `/photographers`, `/photographers/:id`, `/exhibitions`, `/exhibitions/:id`, `/events`, `/events/:id`, `/organizers`, `/organizers/:id`, `/impressum` und `/datenschutz` bereitstellen.~~ **Ersetzt durch NAV-UB-6.** | `web/navigation.feature` · „Jede Adresse zeigt ihre Seite“ | Q-SEO-3 | ADR-002 |
| NAV-EV-1 | Wenn eine Adresse oder eine ID unbekannt ist, soll die Webanwendung eine Hinweisseite mit Link zur Startseite anzeigen. | `web/navigation.feature` · „Unbekannte Adresse oder ID“ | Q-USE-2 | ADR-002 |
| NAV-UB-3 | Die Webanwendung soll jeder Seite einen eigenen Titel und eine eigene Meta-Beschreibung zuweisen. | `web/navigation.feature` · „Jede Seite hat Titel und Beschreibung“ | Q-SEO-2 | ADR-002 |
| NAV-UN-1 | Wenn eine Datendatei nicht geladen werden kann, soll die Webanwendung einen Fehlerhinweis mit der Möglichkeit zum erneuten Laden anzeigen. | `web/navigation.feature` · „Daten nicht ladbar“ | Q-USE-2 | ADR-002 |
| NAV-UB-4 | Die Webanwendung soll auf der Datenschutzseite den Abruf von Kartenkacheln bei OpenStreetMap nennen. | `web/navigation.feature` · „Datenschutzseite nennt Kartenabruf“ | Q-SEC-2 | ADR-004 |
| NAV-UB-5 | ~~Die Webanwendung soll auf jeder Seite eine Navigation zu Magazin, Kalender, Karte, Orten, Fotograf:innen, Ausstellungen, Events, Festivals und Veranstalter:innen sowie Links zu Impressum und Datenschutz bereitstellen.~~ **Ersetzt durch NAV-UB-8.** | `web/navigation.feature` · „Navigation ist auf jeder Seite vorhanden“ | Q-USE-3 | ADR-002 |
| NAV-UB-6 | ~~Die Webanwendung soll die Adressen `/`, `/posts/:slug`, `/calendar`, `/calendar/:year/:month`, `/map`, `/venues`, `/venues/:id`, `/photographers`, `/photographers/:id`, `/exhibitions`, `/exhibitions/:id`, `/events`, `/events/:id`, `/festivals`, `/festivals/:id`, `/organizers`, `/organizers/:id`, `/impressum` und `/datenschutz` bereitstellen.~~ **Ersetzt durch NAV-UB-7.** | `web/navigation.feature` · „Jede Adresse zeigt ihre Seite“ | Q-SEO-3 | ADR-002 |
| NAV-UB-7 | ~~Die Webanwendung soll die Adressen `/`, `/posts/:slug`, `/calendar`, `/calendar/:year/:month`, `/map`, `/venues`, `/venues/:id`, `/photographers`, `/photographers/:id`, `/exhibitions`, `/exhibitions/:id`, `/events`, `/events/:id`, `/festivals`, `/festivals/:id`, `/organizers`, `/organizers/:id`, `/impressum`, `/datenschutz`, `/haftungsausschluss` und `/quellen` bereitstellen.~~ **Ersetzt durch NAV-UB-10.** | `web/navigation.feature` · „Jede Adresse zeigt ihre Seite“ | Q-SEO-3 | ADR-002 |
| NAV-UB-8 | Die Webanwendung soll auf jeder Seite eine Navigation zu Magazin, Kalender, Karte, Orten, Fotograf:innen, Ausstellungen, Events, Festivals und Veranstalter:innen sowie Links zu Impressum, Haftungsausschluss, Datenschutz und Quellen & Lizenzen bereitstellen (Darstellung: Burger-Menü im Kopfbereich und Linkzeile im Fußbereich, FRM-UB-1, FRM-UB-4). | `web/navigation.feature` · „Navigation ist auf jeder Seite vorhanden“ | Q-USE-3 | ADR-002 |

**Supersede 2026-10-28:** NAV-UB-1 und NAV-UB-2 ergänzt um Festivals; ersetzt durch NAV-UB-5 und NAV-UB-6.

**Supersede 2026-10-29:** NAV-UB-6 (Adressen) ersetzt durch NAV-UB-7 (zusätzlich `/haftungsausschluss` und `/quellen`); NAV-UB-5 (Navigation und rechtliche Links) ersetzt durch NAV-UB-8 (zusätzlich Haftungsausschluss und Quellen & Lizenzen; Darstellung siehe `seitenrahmen.md`).

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| NAV-UB-9 | Die Webanwendung soll oben auf jeder Detailseite (`/posts/:slug`, `/venues/:id`, `/photographers/:id`, `/exhibitions/:id`, `/events/:id`, `/festivals/:id`, `/organizers/:id`) einen Zurück-Link in gleicher Gestaltung und Platzierung zeigen, dessen zugänglicher Name das Ziel nennt. | `web/navigation.feature` · „Zurück-Link auf jeder Detailseite“ | Q-USE-16, Q-USE-3 | ADR-022 |
| NAV-EV-2 | Wenn Besucher:innen den Zurück-Link wählen und die Detailseite aus einer anderen Seite der Webanwendung erreicht wurde, soll die Webanwendung diese vorherige Seite anzeigen. | `web/navigation.feature` · „Zurück zur vorherigen Seite“ | Q-USE-16 | ADR-022 |
| NAV-ST-1 | Solange keine vorherige Seite der Webanwendung bekannt ist (Direktaufruf, Aufruf von außen), soll der Zurück-Link zur zugehörigen Übersicht führen (`/` für Beiträge, sonst `/venues`, `/photographers`, `/exhibitions`, `/events`, `/festivals`, `/organizers`); auf Übersichts-, Karten-, Kalender- und rechtlichen Seiten soll es keinen Zurück-Link geben. | `web/navigation.feature` · „Zurück bei Direktaufruf“, „Kein Zurück-Link auf Übersichtsseiten“ | Q-USE-16 | ADR-022 |

**Ergänzung 2026-11-02:** NAV-UB-9, NAV-EV-2 und NAV-ST-1 ergänzen die Navigation um eine Zurücknavigation; bestehende NAV-Anforderungen bleiben gültig. Der bisher unspezifizierte feste Link „‹ Alle Fotograf:innen“ auf `/photographers/:id` wird von NAV-UB-9, NAV-EV-2 und NAV-ST-1 abgedeckt (Fallback-Ziel `/photographers`).

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| NAV-UB-10 | Die Webanwendung soll die Adressen `/`, `/posts/:slug`, `/calendar`, `/calendar/:year/:month`, `/map`, `/venues`, `/venues/:id`, `/photographers`, `/photographers/:id`, `/exhibitions`, `/exhibitions/:id`, `/events`, `/events/:id`, `/festivals`, `/festivals/:id`, `/organizers`, `/organizers/:id`, `/impressum`, `/datenschutz`, `/haftungsausschluss`, `/quellen` und `/projekt` bereitstellen. | `web/navigation.feature` · „Jede Adresse zeigt ihre Seite“ | Q-SEO-3 | ADR-002 |

**Supersede 2026-11-10:** NAV-UB-7 (Adressen) ersetzt durch NAV-UB-10 (zusätzlich `/projekt`; Inhalt siehe `projekt.md`).

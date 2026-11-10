# EARS: Projektseite (Kürzel `PRJ`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-11-10

Begriffe: „Projektseite“ ist die Seite unter `/projekt`. „Menü“ ist die Navigation hinter der Menü-Schaltfläche (FRM-UB-1). „Portrait“ ist das Bild des Betreibers, „QR-Code“ die Grafik zum Teilen der Webanwendung; beide werden mit der Webanwendung ausgeliefert. Die Seite orientiert sich an der Projektseite von Klangland.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| PRJ-UB-1 | Die Webanwendung soll unter `/projekt` eine Seite mit der Überschrift „Projekt“ (genau eine `h1`) bereitstellen. | `web/projekt.feature` · „Projektseite ist erreichbar“ | Q-USE-20, Q-SEO-2 | ADR-002 |
| PRJ-UB-2 | Die Webanwendung soll auf der Projektseite unter der Überschrift den Motivationstext „Ich möchte mich über Ausstellungen und andere Ereignisse in Bezug auf Fotografie informieren.“ anzeigen. | `web/projekt.feature` · „Aufbau der Projektseite“ | Q-USE-20 | ADR-002 |
| PRJ-UB-3 | Die Webanwendung soll auf der Projektseite unter dem Motivationstext das Portrait des Betreibers mit einem Alternativtext anzeigen, der die Person nennt. | `web/projekt.feature` · „Portrait mit Alternativtext“ | Q-USE-20, Q-SEC-2 | ADR-002 |
| PRJ-UB-4 | Die Webanwendung soll auf der Projektseite unter dem Portrait den Abschnitt „Über das Projekt“ (`h2`) anzeigen, der zusammenfasst, was die Webanwendung aktuell leistet (Magazin mit Neuigkeiten, Kalender, Karte, Orte, Fotograf:innen, Ausstellungen, Events, Festivals, Veranstalter:innen), und der das OK Lab Köln als Entstehungskontext mit Link auf `https://codefor.de/koeln/` hervorhebt. | `web/projekt.feature` · „Über das Projekt nennt das OK Lab Köln“ | Q-USE-20 | ADR-002 |
| PRJ-UB-5 | Die Webanwendung soll auf der Projektseite unter „Über das Projekt“ den Abschnitt „Teilen“ (`h2`) mit der Aufforderung „Wenn Dir die Webapp gefällt, dann teile sie gerne.“ und dem QR-Code mit Alternativtext anzeigen. | `web/projekt.feature` · „Teilen mit QR-Code“ | Q-USE-20, Q-SEC-2 | ADR-002 |
| PRJ-UB-6 | Die Webanwendung soll auf der Projektseite unter „Teilen“ den Abschnitt „Zentrum für praktische Fotografie unterstützen“ (`h2`) mit einem erklärenden Text, dem Hinweis, dass der Link die Webanwendung verlässt, und einem gut erkennbaren Link zur freiwilligen Unterstützung (PayPal, `rel="noopener"`) anzeigen. | `web/projekt.feature` · „Unterstützen mit Hinweis und Link“ | Q-USE-20, Q-SEC-2 | ADR-002 |
| PRJ-UB-7 | Die Webanwendung soll die Abschnitte der Projektseite in der Reihenfolge Überschrift, Motivationstext, Portrait, „Über das Projekt“, „Teilen“, „Zentrum für praktische Fotografie unterstützen“ anordnen. | `web/projekt.feature` · „Aufbau der Projektseite“ | Q-USE-20 | ADR-002 |
| PRJ-UB-8 | Die Webanwendung soll im Menü den Eintrag „Projekt“ (Ziel `/projekt`) als letzten Eintrag anzeigen und durch eine Trennlinie von den übrigen Einträgen absetzen. | `web/projekt.feature` · „Projekt ist letzter Menüeintrag mit Trennlinie“ | Q-USE-12, Q-USE-20 | ADR-002 |
| PRJ-ST-1 | Solange Besucher:innen sich auf der Projektseite befinden, soll das Menü den Eintrag „Projekt“ als aktuelle Seite kennzeichnen. | `web/projekt.feature` · „Projekt ist letzter Menüeintrag mit Trennlinie“ | Q-USE-12 | ADR-002 |
| PRJ-UB-9 | Die Webanwendung soll der Projektseite einen eigenen Titel und eine eigene Meta-Beschreibung zuweisen, die Seite in die Sitemap aufnehmen und sie vorab erzeugen. | `web/projekt.feature` · „Projektseite ist erreichbar“ | Q-SEO-2, Q-SEO-3 | ADR-002 |
| PRJ-UB-10 | Die Webanwendung soll auf der Projektseite keinen Zurück-Link anzeigen und keine Aussagen aus Klangland (Name Klangland, Konzerte, Orchester, Komponist:innen) enthalten. | `web/projekt.feature` · „Kein Zurück-Link, keine Reste von Klangland“ | Q-USE-20 | ADR-002, ADR-022 |

**Verhältnis zu bestehenden Anforderungen:** NAV-UB-7 (Adressen) wird durch NAV-UB-10 ersetzt (zusätzlich `/projekt`, siehe `navigation.md`). FRM-UB-1 und FRM-EV-1 bleiben gültig; PRJ-UB-8 ergänzt das Menü um den abgesetzten Eintrag „Projekt“ (die in FRM-EV-1 genannten Links bleiben enthalten). NAV-ST-1 (kein Zurück-Link auf Übersichts- und rechtlichen Seiten) gilt sinngemäß auch für die Projektseite (PRJ-UB-10). Der Hinweis auf den PayPal-Link in der Datenschutzerklärung steht in RCH-UB-6 (`rechtliches.md`).

ANNAHME: Der Betreibername im Alternativtext des Portraits ist „Wolfram Eberius“ (wie im Impressum).

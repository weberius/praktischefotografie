# EARS: Rechtliche Seiten (Kürzel `RCH`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-10-29

Begriffe: „rechtliche Seiten“ sind Impressum, Haftungsausschluss, Datenschutz und Quellen & Lizenzen. „Betreiber“ ist Wolfram Eberius (Angaben wie im Impressum von Klangland). Die Links zu den Seiten stehen im Fußbereich (FRM-UB-4), die Adressen sind NAV-UB-7.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| RCH-UB-1 | Die Webanwendung soll auf `/impressum` die Angaben nach § 5 DDG des Betreibers (Name, Anschrift, Kontakt mit Telefon, E-Mail und Internetadresse, redaktionell Verantwortlicher) sowie die Hinweise zur Streitbeilegung anzeigen, ohne Platzhalter oder Hinweis auf fehlende Angaben. | `web/rechtliches.feature` · „Impressum nennt den Betreiber“ | Q-USE-14 | ADR-002 |
| RCH-UB-2 | Die Webanwendung soll auf `/haftungsausschluss` die Abschnitte „Haftung für Inhalte“ (einschließlich des Hinweises, dass recherchierte Orts- und Veranstaltungsangaben sich ändern können und vor dem Besuch beim Anbieter zu prüfen sind), „Haftung für Links“ und „Urheberrecht“ anzeigen. | `web/rechtliches.feature` · „Haftungsausschluss mit drei Abschnitten“ | Q-USE-14 | ADR-002 |
| RCH-UB-3 | Die Webanwendung soll auf `/datenschutz` erklären, dass keine Cookies und kein Tracking verwendet werden, welche Zugriffsdaten beim Hosting (GitHub Pages) anfallen, dass Kartenkacheln von OpenStreetMap geladen werden (NAV-UB-4) und welche Rechte Betroffene haben, und den Verantwortlichen mit Verweis auf das Impressum nennen, ohne Platzhalter. | `web/rechtliches.feature` · „Datenschutzerklärung entspricht dem Verhalten der Anwendung“ | Q-SEC-2, Q-USE-14 | ADR-002, ADR-003, ADR-004 |
| RCH-UB-4 | Die Webanwendung soll auf `/quellen` die genutzten Daten- und Bildquellen mit Lizenz bzw. Urheberhinweis nennen: Wikipedia, Wikimedia Commons und Wikidata (Portraits und Kurzfassungen der Fotograf:innen, CC BY-SA bzw. Lizenz je Bild), OpenStreetMap-Mitwirkende (Kartendaten und -kacheln), Leaflet (Kartenbibliothek) sowie die Angaben auf den Webseiten der Orte und Veranstalter. | `web/rechtliches.feature` · „Quellen und Lizenzen“ | Q-USE-14 | ADR-011, ADR-012 |
| RCH-UB-5 | Die Webanwendung soll in den rechtlichen Seiten den Namen der Anwendung („Zentrum für praktische Fotografie“ bzw. „Praktische Fotografie“ im Seitentitel) und die tatsächlichen Eigenschaften der Anwendung verwenden und keine Aussagen aus Klangland (Name Klangland, Veranstaltungskalender für klassische Musik, Open Opus, Favoriten) enthalten. | `web/rechtliches.feature` · „Keine Reste von Klangland“ | Q-USE-14 | ADR-002 |

**Ersetzt:** Die bisherigen Platzhalter-Texte von `/impressum` und `/datenschutz` werden durch RCH-UB-1 und RCH-UB-3 ersetzt; der Satz zum Kartenabruf (NAV-UB-4) bleibt Teil von RCH-UB-3.

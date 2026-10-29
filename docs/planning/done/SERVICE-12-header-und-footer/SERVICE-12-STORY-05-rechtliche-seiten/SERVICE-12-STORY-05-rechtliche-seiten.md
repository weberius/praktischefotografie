# SERVICE-12-STORY-05 – Rechtliche Seiten anlegen und anpassen

**Als** Besucher:in **möchte ich** im Fußbereich Impressum, Haftungsausschluss, Datenschutz und Quellen & Lizenzen aufrufen können und dort zutreffende Angaben finden, **damit** ich weiß, wer die Seite betreibt, wie mit meinen Daten umgegangen wird und woher die Inhalte stammen.

## Akzeptanzkriterien
1. Es gibt die Seiten „Haftungsausschluss“ und „Quellen & Lizenzen“ unter eigenen Adressen; sie sind wie alle Seiten vorab gerendert, haben eigene Titel und stehen in der Sitemap.
2. Das Impressum nennt den Betreiber mit Name, Anschrift und Kontakt, ohne Platzhalter.
3. Die Datenschutzerklärung beschreibt zutreffend, was die Anwendung tut (keine Cookies, kein Tracking, Hosting, Kartenkacheln von OpenStreetMap, Rechte), ohne Platzhalter.
4. Der Haftungsausschluss behandelt Inhalte (mit Hinweis auf sich ändernde Orts- und Veranstaltungsangaben), Links und Urheberrecht.
5. „Quellen & Lizenzen“ nennt die tatsächlich genutzten Quellen (Wikimedia, OpenStreetMap, Leaflet, Webseiten der Orte und Veranstalter) mit Lizenz bzw. Urheberhinweis.
6. Keine der Seiten enthält Aussagen, die nur für Klangland gelten.
7. Alle vier Seiten sind aus dem Fußbereich auf jeder Seite erreichbar.

## Abhängigkeiten
`SERVICE-12-STORY-04` (Linkzeile im Fußbereich); fachlich unabhängig.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: RCH-UB-1 bis RCH-UB-5; NAV-UB-7 (Adressen, ersetzt NAV-UB-6), NAV-UB-8 (Links, ersetzt NAV-UB-5), NAV-UB-3 (Titel), NAV-UB-4 (Kartenabruf)
- Gherkin: `web/rechtliches.feature` (5 Szenarien bzw. Grundrisse), `web/navigation.feature` (Navigation ist auf jeder Seite vorhanden, Jede Adresse zeigt ihre Seite)
- Quality: Q-USE-14; Ergänzungen Q-SEC-2, Q-SEO-2, Q-SEO-3, Q-USE-2
- ADR: nicht erforderlich; ADR-002, ADR-003, ADR-004, ADR-011, ADR-012

**INVEST:** I ✔ N ✔ V ✔ E ✔ S (vier Textseiten, eine Route je Seite) ✔ T ✔

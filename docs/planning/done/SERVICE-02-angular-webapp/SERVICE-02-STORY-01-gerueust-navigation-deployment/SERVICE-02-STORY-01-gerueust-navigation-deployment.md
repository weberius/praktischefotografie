# SERVICE-02-STORY-01 – Gerüst, Navigation und Veröffentlichung

**Als** Besucher:in **möchte ich** jederzeit zwischen Magazin, Kalender, Karte, Orten, Fotograf:innen, Ausstellungen, Events und Veranstalter:innen wechseln können **damit** ich Inhalte finden kann und jede Seite per Link teilbar ist.

## Akzeptanzkriterien
1. Von jeder Seite führt eine durchgehende Navigation zu allen Hauptbereichen.
2. Jede Seite hat eine eigene Adresse; ein direkter Aufruf (auch nach Neuladen) zeigt die richtige Seite.
3. Eine unbekannte Adresse oder ID führt zu einer verständlichen Hinweisseite mit Weg zurück.
4. Die Anwendung ist als statische Seite öffentlich erreichbar und bildet den aktuellen Datenstand ab.
5. Jede Seite hat einen eigenen Titel und eine eigene Beschreibung; ihr Inhalt ist für Suchmaschinen ohne Ausführen von Skripten lesbar, und eine Sitemap listet alle Seiten.
6. Impressum und Datenschutzhinweis sind erreichbar und nennen den Kartenabruf bei Dritten.

## Abhängigkeiten
Keine.

## Spezifikation (Phase 3)
- EARS: NAV-UB-1 bis NAV-UB-4, NAV-EV-1, NAV-UN-1, BLD-EV-1, BLD-UN-1, BLD-UB-1 bis BLD-UB-5, BLD-OP-1, EXH-UB-2
- Gherkin: `web/navigation.feature`, `setup/web-build.feature`
- Quality: Q-PERF-3, Q-PERF-4, Q-USE-2, Q-USE-3, Q-SEC-2, Q-SEO-1, Q-SEO-2, Q-SEO-3, Q-MAIN-1
- ADR: ADR-002, ADR-003, ADR-004, ADR-005

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

# ADR-022: Zurück-Link mit Anwendungsverlauf und Fallback auf die Übersicht

**Status:** Accepted (an H2 am 2026-11-02 bestätigt)  ·  **Datum:** 2026-11-02

## Kontext
Die Navigation führt vorwärts; nur `/photographers/:id` hat einen festen Link auf die Übersicht. Detailseiten sind über mehrere Wege erreichbar (Liste, Agenda, Karte, Verknüpfungen, Direktlink); ein fester Link führt oft nicht dorthin zurück, woher Besucher:innen kamen. Die Webanwendung ist eine statische Angular-SPA mit Vorrendern (ADR-002, ADR-003); der Browserverlauf existiert nur im Browser.

## Entscheidung
- **Eigene, kleine Verlaufsangabe in der Anwendung.** Ein Dienst merkt sich per Router-Ereignissen, ob die aktuelle Seite aus einer anderen Seite der Anwendung erreicht wurde (und deren Adresse). Der Zurück-Link zeigt dann auf diese Adresse; sonst auf die Übersicht des Seitentyps (Fallback).
- **Eine gemeinsame Komponente** für alle sieben Detailseitentypen (gleiche Gestaltung, Platzierung, zugänglicher Name); sie ersetzt den Sonderlink auf `/photographers/:id`.
- **Echter Link (`<a href>`)** mit der Zieladresse, damit er ohne Skript, im Vorrendern und per Tastatur funktioniert; der Fallback-Link steht schon im vorgerenderten HTML.
- Keine Persistenz (kein `sessionStorage`, keine Cookies; RCH-UB-3 bleibt unverändert).

## Alternativen
- **Fester Elternlink auf die Übersicht** (heutiger Link): einfach und vorrenderbar, führt aber nicht zur vorherigen Seite.
- **`history.back()` / `Location.back()`:** liefert exakt die vorherige Seite, aber bei Direktaufruf verlässt man die Anwendung, und der Link hat kein Ziel im vorgerenderten HTML.
- **Breadcrumbs:** nicht gewünscht; zeigen die Struktur, nicht den Weg.
- **Verlauf im `sessionStorage`:** übersteht das Neuladen, berührt aber den Datenschutztext und bringt Zustand mit.

## Konsequenzen
- Nach einem Neuladen ist der Verlauf leer; der Link führt dann zur Übersicht (NAV-ST-1).
- Zyklen zwischen Detailseiten springen zwischen zwei Seiten; das entspricht „vorherige Seite“.
- Filter und Scrollposition der Zielseite werden nicht wiederhergestellt (Folgevorhaben).
- Keine neue Abhängigkeit, keine Änderung der Datenschutzerklärung.

## Auswirkungen
- EARS: NAV-UB-9, NAV-EV-2, NAV-ST-1
- Features: `web/navigation.feature`
- Quality: Q-USE-16, Q-USE-3 (Ergänzung)
- Leitplanken: ADR-002 (statische SPA), ADR-003 (Vorrendern)

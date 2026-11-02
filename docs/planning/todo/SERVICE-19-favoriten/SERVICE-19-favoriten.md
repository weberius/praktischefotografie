# SERVICE-19 – Events favorisieren

**Status:** Entwurf (Intake)  ·  **Quelle:** Idee [`idee-010-favoriten`](../../../product/ideen/idee-010-favoriten.md)

> „Wie in Klangland (https://weberius.github.io/klangland/, bzw. https://github.com/weberius/klangland) möchte ich bestimmte Veranstaltungen favorisieren können. Die Favorisierung soll innerhalb der Webanwendung über die Seiten hinweg gelten. Wenn die Webapp neu geladen wird, sind die Favoriten entfernt.“

## Ziel
Besucher:innen markieren Events als Favoriten. Die Markierung gilt auf allen Seiten, die das Event zeigen, und endet mit dem Neuladen der Anwendung.

**Zweck in einem Satz:** Besucher:innen sollen sich während einer Sitzung Events merken und sie wiederfinden, ohne sich anzumelden oder etwas zu speichern.

**Erfolgskriterien**
- Auf Eventliste, Eventdetailseite und Agenda (`/calendar`) gibt es für jedes Event einen Umschalter „Favorit“.
- Der Zustand ist auf allen drei Seiten gleich und bleibt beim Seitenwechsel erhalten.
- Nach dem Neuladen gibt es keine Favoriten; nichts wird gespeichert.
- Die Eventliste lässt sich auf Favoriten einschränken.

## Kontext
Klangland (nicht lokal verfügbar) kennt Favoriten für Veranstaltungen. Hier sind „Veranstaltungen“ die Events (Datensatztyp `events`; Vernissage, Talk, Messe …), sichtbar in `/events`, `/events/:id` und – gemischt mit Ausstellungen – in der Agenda `/calendar`. Die Anwendung ist eine statische SPA ohne Backend (ADR-002); die Datenschutzerklärung nennt weder Cookies noch Tracking (RCH-UB-3). Die Navigation zwischen Seiten ist clientseitig, ein Dienst im Speicher überlebt sie.

## Story-Schnitt
1. `STORY-01` Events favorisieren und in der Eventliste auf Favoriten einschränken (ein kleiner Wunsch, eine Story)

## Abgrenzung
**Nicht enthalten:** Persistenz (kein `localStorage`, `sessionStorage`, Cookie oder URL-Parameter), Anmeldung oder Synchronisierung zwischen Geräten, Favoriten für Ausstellungen, Orte, Personen, Festivals oder Veranstalter:innen, eigene Favoritenseite, Favoriten-Export oder Kalenderübernahme gesammelt, Erinnerungen, Änderung der Datenschutzerklärung, Änderung des Klangland-Repositories.

## Betroffene Bereiche
`web` (Dienst für den Favoritenzustand, Umschalter als gemeinsame Komponente, `event-list`, `event-detail`, `calendar`), Spezifikation `web/favoriten`, ADR-023 (Proposed).

## Vorbereitete Spezifikation (Phase 3)
- EARS: `web/favoriten.md` (FAV-UB-1, FAV-EV-1, FAV-UB-2, FAV-UB-3, FAV-UB-4, FAV-ST-1)
- Gherkin: `web/favoriten.feature` (6 Szenarien)
- Quality: `web/favoriten.md` (Q-USE-17, Q-SEC-10)
- ADR: ADR-023 (Proposed); geltend ADR-002

## Annahmen
- ANNAHME: „Veranstaltungen“ sind die Events (Datensatztyp `events`), keine Ausstellungen; in der Agenda erhalten nur Event-Einträge den Umschalter.
- ANNAHME: Ohne Neuladen bleiben Favoriten erhalten, auch beim Wechsel zwischen Seiten und beim Browser-Zurück. „Neuladen“ umfasst Neuladen der Seite, neuen Tab und Aufruf per Adresse.
- ANNAHME: Keine Persistenz in irgendeiner Form, weil der Wunsch das Entfernen beim Neuladen ausdrücklich verlangt und die Datenschutzerklärung dann unverändert bleibt.
- ANNAHME: Ohne Anzeige wären Favoriten nutzlos; darum der Filter „Nur Favoriten“ in der Eventliste (kein eigener Bereich). Das ist über den Wortlaut hinaus gedacht und an H1 zu bestätigen.
- ANNAHME: Der Umschalter ist ein Button mit zugänglichem Namen, der das Event nennt, mit Zustandsanzeige in Text und Symbol (nicht nur Farbe).
- ANNAHME: Beendete Events können weiter favorisiert werden.
- ANNAHME: Der Zielzustand bleibt beim Wechsel der Typ-Filterauswahl erhalten.
- ANNAHME: Idee 011 (neu, nicht gelesen) ist nicht Teil dieses Tickets.
- ANNAHME: Auf `main` waren beim Start keine Änderungen an der Spezifikation offen; `SERVICE-18` ist committet (`cdd4601`), der Branch geht von dessen Stand aus.

## Qualitätserwartungen
Q-USE-17, Q-SEC-10; zusätzlich Q-USE-2, Q-USE-3, Q-USE-4.

## Definition of Done
- Spezifikation konsistent; ADR-023 an H2 bestätigt.
- Build, `npm test`, `npm run web:test`, `npm run lint:all` grün; Szenarien aus `favoriten.feature` als Tests umgesetzt.

## Risiken
- Vorgerendertes HTML und Hydration: Der Zustand ist beim Laden leer, die Umschalter müssen zum vorgerenderten Zustand passen.
- Agenda mischt Events und Ausstellungen; der Umschalter darf nur bei Events erscheinen.
- Nutzer:innen erwarten oft Persistenz; der Wunsch nennt das Gegenteil, ein Hinweis auf „bis zum Neuladen“ ist zu entscheiden (Annahme: sichtbarer Kurzhinweis an der Filteroption).

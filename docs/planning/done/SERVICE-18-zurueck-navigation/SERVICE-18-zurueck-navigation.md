# SERVICE-18 – Zurück zur vorherigen Seite navigieren

**Status:** Entwurf (Intake)  ·  **Quelle:** Idee [`idee-009-navigation`](../../../product/ideen/idee-009-navigation.md)

> „Es existiert zur Zeit nur eine sehr rudimentäre Navigation. Die einzige Seite ist die Detailseite photographers. Die Navigation erfolgt im Wesentlich auf Basis von Links und gewissermaßen immer nach vorne. Es gibt aber keine Zurücknavigation. D.h. es ist schwierig zur vorhergehenden Seite zurückzukehren. Es sollte möglich sein, ähnlich zur zurücknaviation von photographers, zurück zur vorhergehenden Seite zu navigieren.“

## Ziel
Auf allen Detailseiten gibt es – wie heute auf `/photographers/:id` – einen sichtbaren Zurück-Link, der zur Seite führt, von der Besucher:innen gekommen sind.

**Zweck in einem Satz:** Besucher:innen sollen nach dem Öffnen einer Detailseite mit einem Klick dorthin zurückkehren, woher sie kamen, statt sich über das Menü neu zu orientieren.

**Erfolgskriterien**
- Jede Detailseite (`/posts/:slug`, `/venues/:id`, `/photographers/:id`, `/exhibitions/:id`, `/events/:id`, `/festivals/:id`, `/organizers/:id`) zeigt oben einen Zurück-Link.
- Wer aus der App kam, landet auf der vorherigen Seite (Liste, Agenda, Karte, andere Detailseite); wer die Seite direkt aufruft, landet auf der zugehörigen Liste.
- Der Link ist per Tastatur und Screenreader bedienbar und benennt sein Ziel.

## Kontext
Die Navigation läuft über Links vorwärts (Liste → Detail → verknüpfte Detailseite). Nur `/photographers/:id` hat einen Link „‹ Alle Fotograf:innen“ (`photographer-detail.html`), der fest auf die Liste zeigt; dieser Link ist bisher in keiner Spezifikation beschrieben. Die Kalenderseite hat eigene Monatslinks (‹ / ›), die keine Zurücknavigation sind. Der Kopfbereich (Burger-Menü, FRM) führt nur zu Hauptbereichen.

## Story-Schnitt
1. `STORY-01` Zurück zur vorherigen Seite von jeder Detailseite (ein kleiner Wunsch, eine Story)

## Abgrenzung
**Nicht enthalten:** Favoriten (Idee 010), Breadcrumbs, ein eigener Verlauf oder Seitenstapel für Listen, Wiederherstellung von Filter- und Scrollzustand, Zurück-Link auf Listen-, Karten-, Kalender- und rechtlichen Seiten, Änderung des Browser-Zurück-Knopfs, neue Seitentypen.

## Betroffene Bereiche
`web` (Detailseiten, eine gemeinsame Zurück-Komponente, Routing/Verlauf), Spezifikation `web/navigation`, ADR-022 (Proposed).

## Vorbereitete Spezifikation (Phase 3)
- EARS: `web/navigation.md` (NAV-UB-9, NAV-EV-2, NAV-ST-1, ergänzt)
- Gherkin: `web/navigation.feature` (4 neue Szenarien)
- Quality: `web/navigation.md` (Q-USE-16) und Ergänzung Q-USE-3
- ADR: ADR-022 (Proposed); geltend ADR-002

## Annahmen
- ANNAHME: Zurück-Link nur auf **Detailseiten**; Listen, Karte, Kalender und rechtliche Seiten erreichen die Besucher:innen über das Menü, dort ist „zurück“ nicht gemeint. Die Idee nennt ausdrücklich die Detailseite als Vorbild.
- ANNAHME: „Vorherige Seite“ heißt die zuletzt besuchte Seite **der Webanwendung** (Verlauf der Sitzung), nicht eine Seite einer fremden Website; ohne solche Seite (Direktaufruf, Aufruf von außen, Neuladen in neuem Tab) führt der Link zur zugehörigen Liste (bei `/posts/:slug` zum Magazin).
- ANNAHME: Beschriftung „‹ Zurück“ mit dem Ziel im zugänglichen Namen (z. B. „Zurück zu Kalender“); der bisherige Text „‹ Alle Fotograf:innen“ entfällt als Sonderfall und wird durch denselben Mechanismus ersetzt (Fallback-Text „Alle Fotograf:innen“).
- ANNAHME: Der Browser-Zurück-Knopf bleibt unverändert und gleichberechtigt; der Link soll dasselbe Ergebnis liefern wie er, außer beim Fallback.
- ANNAHME: Wiederherstellung von Filtern und Scrollposition der Zielseite ist nicht Teil des Wunsches.
- ANNAHME: ADR-022 als `Proposed`, weil mehrere gleichwertige Wege bestehen (fester Elternlink, Browserverlauf, eigener Verlauf in der Anwendung).

## Qualitätserwartungen
Q-USE-16; zusätzlich Q-USE-2, Q-USE-3, Q-USE-13.

## Definition of Done
- Spezifikation konsistent; ADR-022 an H2 bestätigt.
- Build, `npm test`, `npm run web:test`, `npm run lint:all` grün; Szenarien aus `navigation.feature` als Tests umgesetzt.

## Risiken
- Verlauf und Server-Rendering/Prerender (ADR-002): der Verlauf existiert nur im Browser; der Fallback muss in vorgerenderten Seiten stimmen.
- Zyklen zwischen Detailseiten (A → B → A) lassen den Link hin- und herspringen; das ist mit „vorherige Seite“ bewusst vereinbar, sollte an H2 geprüft werden.
- Der Link könnte zu einem Ziel führen, das den Zustand nicht erhält (Karte, Filter); siehe Abgrenzung.

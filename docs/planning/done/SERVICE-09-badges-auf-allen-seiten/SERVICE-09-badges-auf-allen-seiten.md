# SERVICE-09 – Badge-Zeile auf allen Ausstellungslisten und mehr Abstand

**Status:** Entwurf (Backlog), Stories und Spezifikation vorbereitet, Fragen an H1 beantwortet (Freigabe steht aus)  ·  **Quelle:** Vorgabe der Projektleitung, Follow-up von SERVICE-08

## Ziel
Die Badge-Zeile aus SERVICE-08 (Art, danach Status) gilt auch für die Ausstellungen auf den Seiten für Orte, Fotograf:innen, Veranstalter:innen und Festivals. Vor und nach der Badge-Zeile steht deutlich mehr Platz (etwa das Dreifache) als bisher.

**Zweck in einem Satz:** Besucher:innen sollen Ausstellungen auf allen Seiten gleich lesen und die Badge-Zeile klar von den Zeilen davor und danach unterscheiden können.

**Erfolgskriterien**
- Jede Ausstellungskarte auf Orts-, Personen-, Veranstalter- und Festivalseite beginnt mit der Badge-Zeile (Art, danach Status; Festival zusätzlich „Offizieller Partner“).
- Der vertikale Abstand der Badge-Zeile zur vorhergehenden und zur nachfolgenden Zeile beträgt 0,75 rem (das Dreifache der bisherigen 0,25 rem), überall gleich.

## Kontext
Diese Seiten zeigen den Status als `app-status-badge` unter dem Zeitraum. Die Festivalseite zeigt daneben „Offizieller Partner“. Die gemeinsame Komponente aus SERVICE-08 hat Reihenfolge und horizontalen Abstand; der vertikale Abstand ergibt sich bisher nur aus den Absätzen der Karte (0,25 rem).

## Story-Schnitt
1. `STORY-01` Badge-Zeile auf Orts-, Personen-, Veranstalter- und Festivalseiten
2. `STORY-02` Mehr Abstand um die Badge-Zeile (alle Seiten)

## Abgrenzung
**Nicht enthalten:** Die kompakte Liste verknüpfter Ausstellungen auf der Beitragsseite, Event-Badges, neue Daten oder Statusregeln.

## Betroffene Bereiche
`web` (Komponente, vier Seiten, Tests).

## Vorbereitete Spezifikation (Phase 3)
- EARS: `web/badges.md` (BDG-UB-5 bis BDG-UB-7), VNU-UB-6, PHO-UB-10, ORG-UB-9, FST-UB-6
- Gherkin: `web/badges.feature`, `web/orte.feature`, `web/fotografinnen.feature`, `web/veranstalter.feature`, `web/festivals.feature`
- Quality: Q-USE-8, Ergänzung zu Q-USE-7
- ADR: ADR-015 (`Proposed`), ergänzt ADR-014

## Entschieden (vor H1, 2026-10-28)
- Der Abstand von 0,75 rem (3 × 0,25 rem) gilt über der Badge-Zeile und darunter, auf allen Seiten mit Badge-Zeilen, also auch im Kalender, im Magazin und auf den Ausstellungsseiten; am Anfang eines Blocks (z. B. oben in der Karte) entfällt der obere Abstand.
- Auf Orts-, Personen-, Veranstalter- und Festivalseite steht die Badge-Zeile oberhalb der Überschrift der Karte (wie in der Ausstellungsliste); das Statusbadge unter dem Zeitraum entfällt.
- Die kompakte Liste verknüpfter Ausstellungen auf der Beitragsseite bleibt unverändert.

## Annahmen
- ANNAHME: „Offizieller Partner“ steht auf der Festivalseite in der Badge-Zeile nach dem Status.

## Qualitätserwartungen
Q-USE-4, Q-USE-7, Q-USE-8.

## Definition of Done
- Spezifikation konsistent, ADR-015 bestätigt.
- `npm run web:test` und `npm run web:lint` grün; Build prerendert die Seiten.

## Risiken
- **Technisch:** Layout-Tests auf berechnete Außenabstände sind schriftabhängig (rem ist fest, gewählt statt em); Gegenmaßnahme: Messung in px mit Toleranz.
- **Fachlich:** Der größere Abstand verlängert Karten und Listen; Gegenmaßnahme: nur Außenabstand der Badge-Zeile ändern.

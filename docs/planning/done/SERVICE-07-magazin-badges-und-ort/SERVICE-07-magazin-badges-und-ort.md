# SERVICE-07 – Magazin: Karten mit Badges und Ort im Titel

**Status:** Entwurf (Backlog), Stories und Spezifikation geprüft (Layout am 2026-10-28 korrigiert), H1 steht aus  ·  **Quelle:** Vorgabe der Projektleitung, Ergebnis von SERVICE-04 und SERVICE-02

## Ziel
Die Karten im Magazin (Route `/`, Beiträge) werden einheitlich aufgebaut: **Datum des Eintrags, Badges, Titel, kurzer Text.** Die Badges („Endet bald“, „Gruppenausstellung“ usw.) entsprechen denen der Ausstellungslisten. Der Titel nennt Ausstellung und Ort ohne Anlass, z. B. „MYSTERIUM DER PAARE in Monschau“, und verlinkt auf den Beitrag; der Kurztext sagt, was ansteht, z. B. „Die Ausstellung im Fotografie-Forum Monschau endet am 1. November 2026.“

**Zweck in einem Satz:** Besucher:innen sollen im Magazin auf einen Blick sehen, wann etwas veröffentlicht wurde, worum es geht (Anlass und Art der Ausstellung) und welche Ausstellung wo stattfindet.

**Erfolgskriterien**
- Jede Karte zeigt Datum, Badges (bei Neuigkeiten zu Ausstellungen), Titel als Link auf den Beitrag und Kurztext in dieser Reihenfolge.
- Der Titel jeder Neuigkeit lautet „Ausstellungstitel in Stadt“ (ohne Anlass); bestehende Beiträge sind migriert, der Skill schreibt künftig so.
- Redaktionelle Beiträge ohne Ausstellung zeigen Datum, Titel und Kurztext ohne Badges.

## Kontext
Die Startseite zeigt je Beitrag Überschrift (Link auf `/posts/:slug`, als Link unterstrichen), Datum und Kurzvorschau. Die Neuigkeiten aus SERVICE-04 tragen den Anlass im Titel („Endet bald: MYSTERIUM DER PAARE in Monschau“) und teils abweichende Ortsformen („im MAKK Köln“, „von Tina Barney“). Die Kurztexte entsprechen bereits dem Wunsch („Die Ausstellung im Fotografie-Forum Monschau endet am 1. November 2026.“). Die Badge-Darstellung gibt es in den Ausstellungslisten; Ausstellungsart und Stadt lassen sich über die Verknüpfungen des Beitrags auflösen.

## Story-Schnitt
1. `STORY-01` Magazin-Karten mit Datum, Badges, Titel und Kurztext (Web)
2. `STORY-02` Titel der Neuigkeiten = „Ausstellungstitel in Stadt“ (Skript, Skill, Bestandsmigration)

## Abgrenzung
**Nicht enthalten:** ein eigener Ortslink in der Karte, neue Schemafelder, Filter im Magazin, Änderung der Kurztexte.

## Betroffene Bereiche
`web` (Magazin), `setup` (Neuigkeitenpflege, Skill), `content` (Beiträge).

## Vorbereitete Spezifikation (Phase 3)
- EARS: `web/blog.md` (BLG-UB-6, BLG-UB-7, BLG-UB-8, BLG-ST-2, BLG-UN-3), `setup/magazin-neuigkeiten.md` (NWS-UB-7), `setup/update-skill.md` (SKL-UB-4 ergänzt)
- Gherkin: `web/blog.feature`, `setup/magazin-neuigkeiten.feature`
- Quality: Q-DATA-10, Ergänzungen zu Q-USE-2, Q-USE-4, Q-PERF-3; Q-USE-6 gilt für die Karten im Magazin
- ADR: ADR-013 (`Proposed`), ergänzt ADR-008

## Entschieden an H1 (2026-10-28)
- Kein eigener Ortslink in der Karte; der Ort steht im Titel.
- Die Beitragsseite zeigt ebenfalls die Badges.
- Review-Schwelle: kritisch + hoch.

## Annahmen
- ANNAHME: Das Anlass-Badge stammt aus der Beitragskennung („Neu“, „Eröffnung“, „Endet bald“, „Beendet“), nicht aus dem heutigen Status der Ausstellung; „Gruppenausstellung“ ist die Art der Ausstellung.
- ANNAHME: Der Titel ist „Ausstellungstitel in Stadt“ (Stadt der Venue, z. B. „Silver Shadows in Köln“); er gilt auch auf der Beitragsseite.
- ANNAHME: Ein eigener Ortslink in der Karte entfällt (die Ortsangabe steht im Titel); die Venue bleibt über die Beitragsseite verlinkt.
- ANNAHME: Die Beitragsseite zeigt dieselben Badges unter dem Datum (an H1 entschieden); die Reihenfolge dort bleibt Titel, Datum, Badges, Text.
- ANNAHME: Das Datum steht oberhalb der Badges (nicht darunter) und bleibt ein `time`-Element.

## Qualitätserwartungen
Q-USE-2, Q-USE-4, Q-USE-6, Q-PERF-3, Q-DATA-10.

## Definition of Done
- Spezifikation konsistent, ADR-013 bestätigt.
- `npm test`, `npm run lint`, `npm run validate:data`, `npm run web:test`, `npm run web:lint` grün; Build prerendert das Magazin.
- Alle bestehenden Neuigkeiten migriert; Skill und Prüfung verlangen den Ausstellungstitel.

## Risiken
- **Fachlich:** Kennungsregel als Lesekonvention; Beiträge mit abweichender Kennung bekommen keine Badges (Gegenmaßnahme: `news:check` und Bestandstest).
- **Fachlich:** Gleichlautende Titel mehrerer Beiträge einer Ausstellung; Gegenmaßnahme: Badge, Datum und Text unterscheiden sie.
- **Technisch:** Browserabhängigkeit der Karten-Tests; bestehende Tests nutzen feste Referenzdaten.

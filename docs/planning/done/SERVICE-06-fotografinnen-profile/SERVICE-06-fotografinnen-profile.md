# SERVICE-06 – Profile der Fotograf:innen mit Wikipedia und Portraits

**Status:** Entwurf (Backlog), Stories und Spezifikation vorbereitet, Fragen an H1 beantwortet (Freigabe steht aus)  ·  **Quelle:** Vorgabe der Projektleitung, [klangland](https://github.com/weberius/klangland) (Darstellung der Komponist:innen), [PRD](../../../product/prd.md)

## Ziel
Alle in Ausstellungstexten genannten Fotograf:innen sind als Personen erfasst und auffindbar, in der Beschreibung der Ausstellung aufgeführt und mit Wikipedia-Zusammenfassung (mehrere Sprachen), Lebensdaten und Portrait (Wikimedia Commons, verkleinert, mit Attribution) versehen. Die Darstellung folgt klangland. Ein eigener Skill löst die Recherche aus.

**Zweck in einem Satz:** Besucher:innen sollen zu jeder Ausstellung die beteiligten Fotograf:innen finden und kennenlernen, ohne dass die Redaktion jedes Profil von Hand recherchiert.

**Erfolgskriterien**
- Jede in einem Ausstellungstext genannte Person steht in `photographers.json`, in `photographerIds` und in der `description`.
- Ein Aufruf des Skills `research-photographers` liefert für Kandidaten geprüfte Vorschläge; nach Freigabe stehen Zusammenfassung, Lebensdaten und – falls frei lizenziert – Portrait in den Daten.
- Jedes angezeigte Portrait trägt sichtbar Urheber, Lizenz und Link zur Commons-Dateiseite; die Wikipedia-Zusammenfassung nennt ihre Quellen und CC BY-SA.
- Alle Tests laufen ohne Netz.

## Kontext
17 Personen sind erfasst, ohne Lebensdaten, Wikipedia oder Bild. Die Seite „Mysterium der Paare“ nennt 57 Namen (darunter Studios und Duos wie „Atelier Binder“, „A. & E. Frankl“), `photographerIds` ist dort leer. Die Seiten nennen daneben Personen ohne Bildbeitrag (z. B. Kurator, Sammler, Performer), die nicht erfasst werden. Sechs Ausstellungen verletzen die geplante Namensregel (Beschreibung nennt nicht alle Personen). klangland führt `wikipedia {summary,url}` und `portrait {file,source,credit}`, speichert Portraits mit 400 px Breite unter `data/portraits/` und zeigt Name, Lebensdaten, Bild mit Bildnachweis, „Aus der Wikipedia“ (mit Quellenlink und CC BY-SA) und Listen; es nutzt nur die deutsche Wikipedia.

## Story-Schnitt
1. `STORY-01` Alle genannten Fotograf:innen erfassen (Namen, Verknüpfung, Beschreibung, Bestandsmigration)
2. `STORY-02` Profil im Datenmodell (Lebensdaten, Wikipedia, Portrait, Build)
3. `STORY-03` Skill `research-photographers` (Wikipedia mehrsprachig, Wikidata, Commons)
4. `STORY-04` Darstellung in der Webanwendung nach klangland

## Abgrenzung
**Nicht enthalten:** Personen ohne gezeigte Bilder (Kurator:innen, Sammler:innen, Musiker:innen), Fotograf:innen außerhalb von Ausstellungen, Werke oder Bildergalerien der Fotograf:innen, Übersetzung der Wikipedia-Artikel, Filter und Suche in der Personenliste, Favoriten (klangland), automatische Läufe.

## Betroffene Bereiche
`content` (Schema, Daten, Portraits), `setup` (Skill, Skripte, Update-Skill-Regeln), `web` (Liste, Personenseite).

## Vorbereitete Spezifikation (Phase 3)
- EARS: `content/fotografinnen-profile.md` (PRF), `setup/fotografinnen-recherche.md` (RSF), Ergänzungen UPD-UB-9, SKL-UB-7, `web/fotografinnen.md` (PHO-UB-5 bis PHO-UB-9, PHO-ST-2, PHO-UN-1; Supersede PHO-UB-2)
- Gherkin: `content/fotografinnen-profile.feature`, `setup/fotografinnen-recherche.feature`, `web/fotografinnen.feature`, Ergänzungen in `setup/datenaktualisierung.feature` und `setup/update-skill.feature`
- Quality: Q-DATA-7, Q-DATA-8, Q-DATA-9, Q-SEC-5, Q-MAIN-4, Q-PERF-6, Q-USE-5
- ADR: ADR-011, ADR-012 (`Proposed`)

## Entschieden (vor H1, 2026-10-28)
- **Alle Namen:** Studios und Duos (z. B. „Atelier Binder“, „A. & E. Frankl“) werden wie genannt als Personen erfasst.
- **Wer genannt wird:** Maßgeblich ist, ob die Bilder einer Person in der Ausstellung gezeigt werden. Kurator:innen, Sammler:innen, Musiker:innen, Redner:innen und Redakteur:innen sind keine Fotograf:innen im Sinne dieses Tickets, auch wenn die Seite sie nennt.
- **Bezeichnung:** „Fotograf:in“ oder „Künstler:in“ richtet sich nach der Wikipedia (Berufsangabe in Wikidata bzw. im Artikel). Sie wird je Person als Feld `occupation` erfasst und in Liste und Personenseite angezeigt; die Auflösung der Person über Wikidata akzeptiert Berufe, die dort als Fotograf:in oder als (bildende:r, Medien-) Künstler:in geführt sind.
- **Sprachen:** Reihenfolge de, en, fr, es, it, nl, danach alphabetisch; bis zu drei Quellen.
- **Namensregel:** Die Pflicht, alle Namen in der `description` zu nennen, ist ein Validierungsfehler.
- **Personenliste:** Die alphabetische Liste genügt, keine Suche.

## Qualitätserwartungen
Q-DATA-7 bis Q-DATA-9, Q-SEC-5, Q-MAIN-4, Q-PERF-6, Q-USE-5 (siehe Spezifikation).

## Definition of Done
- Spezifikation konsistent, ADR-011 und ADR-012 bestätigt.
- `npm test`, `npm run lint`, `npm run validate:data`, `npm run web:test`, `npm run web:lint` grün; Tests ohne Netz.
- Probelauf des Skills für mindestens eine Person; Bestand migriert (alle Namen erfasst, Beschreibungen vollständig).

## Risiken
- **Rechtlich:** Bildlizenzen und Attributionspflicht; Gegenmaßnahme: nur frei lizenziert, Urheber und Lizenz Pflicht, sichtbarer Bildnachweis. Lebende Personen: Portraits nur mit freier Lizenz auf Commons.
- **Fachlich:** Namensgleichheit (falsche Person); Gegenmaßnahme: Berufsangabe aus Wikidata/Wikipedia, Mehrdeutigkeit bleibt unverändert, Freigabe.
- **Fachlich:** Abgrenzung „Bilder gezeigt“ ist eine Beurteilung der Seite; Gegenmaßnahme: Freigabe der Vorschläge, Hinweis im Skill.
- **Fachlich:** Übersetzte Zusammenfassungen können Angaben verfälschen; Gegenmaßnahme: nur aus Anfangstexten, Freigabe, Quellenlinks.
- **Technisch:** Wachsende Bilddaten im Repository; Gegenmaßnahme: Größenlimit 200 kB, 400 px.
- **Prozess:** Netzlauf nur eingeschränkt automatisch testbar; Gegenmaßnahme: Testserver.

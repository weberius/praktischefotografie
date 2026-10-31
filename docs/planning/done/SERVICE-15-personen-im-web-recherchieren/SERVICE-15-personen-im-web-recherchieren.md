# SERVICE-15 – Personen im Web recherchieren

**Status:** Entwurf (Intake)  ·  **Quelle:** Idee [`idee-006-personen-recherchieren`](../../../product/ideen/idee-006-personen-recherchieren.md)

> „Zur Zeit werden über den Skill 'research-photographers' personen in der wikipedia recherchiert. Dies soll weiterhin möglich sein. Ich möchte aber auch in der Lage sein, im Internet nach Personen, vor allem Fotograf:innen zu recherchieren. Diese Recherche wird über eine Suchmaschine durchgeführt. Die gefundenen Links sollen in einer Datei gesammelt werden. Insofern es zu der Person noch keinen Eintrag gibt, soll er angelegt werden. Wenn es zu neuen Recherche Ergebnissen kommt, sollen diese in den Kurztexten berücksichtigt werden. Bilder werden nur aus der Wikicommons übernommen, weil hier die Nutzungsrechte geklärt sind.“

## Ziel
Der Skill `research-photographers` recherchiert Personen zusätzlich über eine Suchmaschine, sammelt die Fundstellen in einer Linksammlung, legt fehlende Personen an und berücksichtigt neue Ergebnisse in den Kurztexten. Bilder kommen weiterhin nur von Wikimedia Commons.

**Zweck in einem Satz:** Auch Personen ohne Wikipedia-Artikel bekommen ein belegtes Profil, und alle Fundstellen bleiben nachvollziehbar.

**Erfolgskriterien**
- `--web` mit `--photographer <id>` bzw. `--name` startet die Websuche; ohne `--web` ändert sich nichts an der Wikipedia-Recherche.
- Die Linksammlung `updates/photographers-links.json` wächst ohne Dubletten und ohne Verlust.
- Fehlende Personen werden nach Freigabe angelegt, ohne Dubletten.
- Neue Links führen zu einem Vorschlag für den Webkurztext (`web`), der geprüft, freigegeben und auf der Personenseite angezeigt wird.
- 0 Bilder von anderen Hosts als Wikimedia.

## Kontext
ADR-012 und `RSF-*` regeln die Wikimedia-Recherche (`photographers:fetch|check|apply`, Kandidaten-, Vorschlagsdatei, Freigabe, Rollback). ADR-006 und `FET-*` regeln höfliche Abrufe von Webseiten (robots.txt, Abstand, Snapshots). Profil-Felder stehen in `schema/photographers.schema.json` (`occupation`, `life`, `wikipedia`, `portrait`); die Personenseite zeigt „Aus der Wikipedia“ (`PHO-UB-8`).

## Story-Schnitt
1. `STORY-01` Person über eine Suchmaschine recherchieren, Links sammeln, fehlende Person anlegen
2. `STORY-02` Kurztext aus neuen Ergebnissen vorschlagen, prüfen und übernehmen (Datenmodell `web`, Bilder nur Commons)
3. `STORY-03` Webkurztext auf der Personenseite lesen

## Abgrenzung
**Nicht enthalten:** Änderungen an der Wikipedia-/Wikidata-/Commons-Recherche (RSF bleibt gültig), Übernahme von Bildern aus anderen Quellen, Anzeige der gesamten Linksammlung in der Webanwendung, regelmäßige/automatische Läufe, Prüfung der Erreichbarkeit gesammelter Links, Websuche für alle Personen auf einmal (ohne `--photographer`/`--name`), Recherche zu Orten oder Veranstaltern (gibt es mit `update-venue-data`), Bewertung der Rechtslage der Zusammenfassungen.

## Betroffene Bereiche
`setup` (Skill, Skripte `scripts/photographers/`), `content` (Schema, Validierung), `web` (Personenseite); Spezifikation `setup/personen-websuche`, `content/fotografinnen-profile`, `web/fotografinnen`; ADR-019 (Proposed).

## Vorbereitete Spezifikation (Phase 3)
- EARS: `setup/personen-websuche.md` (WSP-UB-1 bis WSP-UB-7, WSP-EV-1 bis WSP-EV-4, WSP-OP-1, WSP-UN-1, WSP-UN-2); `content/fotografinnen-profile.md` (PRF-UB-6, PRF-UN-4); `web/fotografinnen.md` (PHO-UB-11, PHO-ST-3 ersetzt PHO-ST-2)
- Gherkin: `setup/personen-websuche.feature` (15 Szenarien), `content/fotografinnen-profile.feature` (2), `web/fotografinnen.feature` (2)
- Quality: Q-SEC-7, Q-DATA-14, Q-DATA-15, Q-MAIN-6 (`quality/setup/personen-websuche.md`)
- ADR: ADR-019 (Proposed); geltend ADR-006, ADR-007, ADR-011, ADR-012, ADR-002

## Annahmen
- ANNAHME: Ticket-Key `SERVICE-15`, kein Jira-Ticket. Die Idee-Datei trug den Status `offen.` (mit Punkt); er wurde auf `in-arbeit` gesetzt.
- ANNAHME: Die Websuche ist eine Erweiterung des bestehenden Skills (`--web`), kein neuer Skill.
- ANNAHME: „Suchmaschine“ = die Websuche des Agenten; keine API-Schlüssel, keine Festlegung auf einen Anbieter. Suchmaschine wird im Bericht genannt.
- ANNAHME: Die „Datei“ für die Links ist `updates/photographers-links.json` (kumulativ, versioniert, nicht im Build, nicht in `data/`).
- ANNAHME: Die Websuche läuft nur für eine benannte Person (`--photographer <id>` oder `--name`), nicht für den ganzen Bestand.
- ANNAHME: „Kurztexte“ = die Zusammenfassung der Person; für Webquellen gibt es ein eigenes Feld `web` (40–90 Wörter, 1–5 Quellen) neben `wikipedia`, angezeigt als „Aus dem Web“. Ein bestehender Wikipedia-Kurztext wird nicht verändert.
- ANNAHME: „Neue Recherche-Ergebnisse“ = Links, die nicht in der Linksammlung stehen; nur dann gibt es einen neuen Vorschlag.
- ANNAHME: Eine neue Person bekommt nur `id` und `name`; Berufsbezeichnung, Lebensdaten und Portrait entstehen über den bestehenden Weg (Wikidata/Commons), sofern gefunden.
- ANNAHME: Bilder werden nur über den bestehenden Weg (Wikidata P18, Wikipedia-Titelbild auf Commons) übernommen; eine Bildsuche in Commons ohne Wikidata-Eintrag gehört nicht dazu.
- ANNAHME: Trefferseiten werden mit den Regeln aus ADR-006 abgerufen (höchstens fünf je Person); Textauszüge allein genügen, wenn Seiten gesperrt sind.
- ANNAHME: ADR-019 als `Proposed`, weil mehrere gleichwertige Wege (Such-API, Mischung in `wikipedia.summary`, Veröffentlichung der Links) bestanden.

## Qualitätserwartungen
Q-SEC-7, Q-DATA-14, Q-DATA-15, Q-MAIN-6; zusätzlich Q-SEC-4 (Abrufregeln), Q-SEC-5 (unverändert), Q-DATA-7, Q-DATA-8, Q-USE-5, Q-SEC-2.

## Definition of Done
- Spezifikation konsistent; ADR-019 an H2 bestätigt.
- Build, `npm test`, `npm run web:test`, `npm run lint:all` grün; Szenarien der drei Features als Tests umgesetzt.
- `npm run validate:data` grün; README/`updates/README.md`/Skill dokumentieren `--web`.
- Ein Live-Lauf für eine Person per Handprobe (oder als „nicht geprüft“ an H2 genannt).

## Risiken
- Namensgleiche Personen in Suchergebnissen; Prüfung liegt beim Menschen an der Freigabe.
- Die Websuche des Agenten ist nicht deterministisch und in Tests nicht verfügbar; Tests laufen gegen Fixtures.
- Urheberrechtliche Nähe der Zusammenfassung zu den Quellen; Gegenmaßnahmen: eigene Formulierung, Wortfolgen-Prüfung, Quellenangabe.
- Trefferseiten können gesperrt oder JavaScript-lastig sein.

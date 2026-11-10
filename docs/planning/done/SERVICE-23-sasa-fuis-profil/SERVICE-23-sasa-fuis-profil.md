# SERVICE-23 – Profil von Saša Fuis aus eigenen Quellen

**Status:** Entwurf (Intake)  ·  **Quelle:** Idee [`idee-014-photographer-sasa-fuis`](../../../product/ideen/idee-014-photographer-sasa-fuis.md)

> „Der Fotograf Sasa Fuis hat noch keine vollständige Seite. In der Wikipedia habe ich keine Informationen gefunden. Über ihn habe folgende Resourcen gefunden: https://www.dgph.de/ausstellungen/sasa-fuis-invisible-moments, https://www.architectureweek.cz/en/sasa-fuis-fotografie/ – Ziel ist es zusätzliche Informationen zum Fotografen hinterlegen. Er hat aktuell eine Ausstellung im Forum die Fotografien.“

## Ziel
Die Redaktion kann dem Skill `research-photographers` selbst gefundene Quellen zu einer Person nennen. Daraus entstehen Linksammlung, Webkurztext und „Weiterführende Links“ – zuerst für Saša Fuis, dessen Seite bisher nur Name und die Ausstellung zeigt.

**Zweck in einem Satz:** Auch eine Person ohne Wikipedia-Artikel bekommt ein belegtes Profil aus Quellen, die die Redaktion bereits kennt.

**Erfolgskriterien**
- `--url` mit `--photographer`/`--name` nimmt eigene Adressen in die Linksammlung auf, ohne Dubletten und ohne Verlust.
- Die Seiten der eigenen Adressen werden höflich abgerufen und fließen in den Vorschlag für den Webkurztext ein.
- Für `sasa-fuis` stehen nach Freigabe ein Webkurztext (`web`) mit den beiden genannten Quellen in `data/photographers.json`; die Personenseite zeigt Beschreibung und „Weiterführende Links“.
- Die laufende Ausstellung im Forum für Fotografie erscheint weiterhin auf der Personenseite (besteht bereits, `PHO-UB-3`).

## Kontext
Websuche, Linksammlung, Webkurztext, Prüfung und Anzeige sind spezifiziert (`WSP`, `RAS`, `PRF-UB-6`, `PHO-UB-12`, ADR-019, ADR-020). Es fehlt nur der Weg, vorhandene Adressen von Hand einzuspeisen. `data/photographers.json` führt `sasa-fuis` mit Namen „Saša Fuis“ ohne Profil; `data/exhibitions.json` verknüpft die Ausstellung „Invisible Moments“ (Forum für Fotografie Köln).

## Story-Schnitt
1. `STORY-01` Eigene Quellen zu einer Person hinterlegen und daraus das Profil von Saša Fuis erzeugen

## Abgrenzung
**Nicht enthalten:** Änderungen an Wikipedia-/Commons-Recherche und Suchlogik, Bilder von den genannten Seiten (nur Commons, `WSP-UB-5`), Portrait von Saša Fuis ohne freie Quelle, Änderungen an der Personenseite oder Ausstellungsdaten, Pflege weiterer Personen (der Weg gilt allgemein, benötigt aber keine Datenarbeit für andere).

## Betroffene Bereiche
`setup` (Skill `research-photographers`, Skripte `scripts/photographers/`), `data/` (Daten von `sasa-fuis`, `updates/photographers-links.json`). Spezifikation `setup/personen-quellen`.

## Vorbereitete Spezifikation (Phase 3)
- EARS: `setup/personen-quellen.md` (PQL-UB-1, PQL-EV-1, PQL-UB-2, PQL-UN-1, PQL-EV-2)
- Gherkin: `setup/personen-quellen.feature` (5 Szenarien)
- Quality: Q-SEC-13, Q-DATA-18 (`quality/setup/personen-quellen.md`)
- ADR: nicht erforderlich – die Erweiterung folgt ADR-019 (Websuche im Skill, Linksammlung) und ADR-006 (Abrufregeln). Geltend: ADR-006, ADR-007, ADR-011, ADR-012, ADR-019, ADR-020.

## Annahmen
- ANNAHME: Ticket-Key `SERVICE-23`; die Ideendatei ist noch nicht committet und liegt unverändert im Arbeitsverzeichnis (Branch zweigt von `main` ab).
- ANNAHME: Die Idee ist als Fähigkeit „eigene Quellen nennen“ (`--url`) gelesen, nicht als einmalige Handpflege, weil die Quellen sonst nicht in der Linksammlung nachvollziehbar wären. Der Skill wird erweitert, kein neuer Skill.
- ANNAHME: Eigene Adressen stehen mit `query` = `manuell` in der Linksammlung und gelten als neue Links (lösen einen Webkurztext-Vorschlag aus).
- ANNAHME: Eigene Seiten werden auch mit `--no-web` abgerufen; die Suchmaschine wird nur ohne `--no-web` genutzt.
- ANNAHME: Der Webkurztext (40–90 Wörter, Deutsch, eigene Formulierung) stammt ausschließlich aus den beiden Seiten und ggf. Suchtreffern; `occupation`, `life` und `portrait` bleiben leer, weil weder Wikipedia noch Commons Angaben liefern.
- ANNAHME: „Forum die Fotografien“ = Forum für Fotografie Köln; die Ausstellung ist bereits erfasst und wird nicht geändert.
- ANNAHME: Keine neue ADR, weil kein gleichwertiger Alternativweg mit Folgen besteht (Erweiterung des Skills nach ADR-019).

## Qualitätserwartungen
Q-SEC-13, Q-DATA-18; zusätzlich Q-SEC-4, Q-SEC-7, Q-DATA-14, Q-DATA-15.

## Definition of Done
- Spezifikation konsistent; Build, `npm test`, `npm run web:test`, `npm run lint:all` grün; Szenarien als Tests umgesetzt.
- `npm run validate:data` grün; Skill, README und `updates/README.md` dokumentieren `--url`.
- `sasa-fuis` trägt nach Freigabe einen gültigen Webkurztext mit den genannten Quellen; die Personenseite zeigt ihn.

## Risiken
- Trefferseiten können gesperrt oder JavaScript-lastig sein; dann genügen Textauszüge, sonst fehlt Material für den Text.
- Urheberrechtliche Nähe zu den Quelltexten; Gegenmaßnahme: eigene Formulierung und Wortfolgen-Prüfung (`WSP-UB-4`).
- Schreibweise „Sasa“/„Saša“ erschwert Suche und Abgleich.

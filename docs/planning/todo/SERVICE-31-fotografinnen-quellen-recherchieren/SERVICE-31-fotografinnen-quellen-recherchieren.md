# SERVICE-31 – Fotograf:innen aus genannten Quellen recherchieren

**Status:** Entwurf (Intake)  ·  **Quelle:** Idee [`idee-022-photographers`](../../../product/ideen/idee-022-photographers.md)

> „Es fehlen noch Detailinformationen zu Fotograf:innen. In dieser Idee habe ich alle betroffenen Fotograf:innen gesammelt und Links zu weiterführenden Informationen im Internet recherchiert. Aus diesen Informationen sollen die Daten photographers.json überarbeitet und aktualisiert werden.“

## Ziel
Die Redaktion kann die Quellen vieler Personen in einer Datei nennen und in einem Lauf verarbeiten lassen. Damit erhalten die 33 in der Idee genannten Fotograf:innen, die bisher nur einen Namen haben, ein belegtes Profil mit Webkurztext und „Weiterführenden Links“.

**Zweck in einem Satz:** Personen mit bisher leerem Profil bekommen aus den von der Redaktion recherchierten Links eine nachvollziehbare Beschreibung.

**Erfolgskriterien**
- Eine Sammeldatei ordnet Personen (`id`) ihre Adressen zu; ein Lauf verarbeitet alle wie `--url` je Person (PQL).
- Alle 33 Personen der Idee haben nach Freigabe einen Webkurztext (`web`) mit ihren Quellen in `data/photographers.json` und Links in `updates/photographers-links.json`.
- `npm run validate:data` ist grün; Personenseiten zeigen Beschreibung und „Weiterführende Links“.

## Kontext
Einzelne eigene Quellen sind spezifiziert und umgesetzt (`PQL`, ADR-019, SERVICE-23). Für 33 Personen mit 2–5 Adressen wäre das ein Aufruf je Person. Die Idee liefert die Adressen als Markdown-Liste; `data/photographers.json` führt alle 33 `id`s, bisher nur mit `name` (Ausnahmen: `hans-georg-esch` mit `bio`, `hannes-jung` mit `bio` und `website`).

## Story-Schnitt
1. `STORY-01` Eigene Quellen mehrerer Personen in einer Datei nennen und in einem Lauf verarbeiten
2. `STORY-02` Profile der in der Idee genannten Personen aus ihren Quellen erstellen

## Abgrenzung
**Nicht enthalten:** Portraits ohne freie Quelle (Commons gemäß `WSP-UB-5`), Bilder von den genannten Seiten, Änderungen an Websuche, Wikipedia-/Commons-Recherche, Personenseite und Ausstellungsdaten, Pflege weiterer Personen außerhalb der Idee, Abruf von Instagram-Seiten (nur als Link).

## Betroffene Bereiche
`setup` (Skill `research-photographers`, `scripts/photographers/`), `data/` (`photographers.json`, `updates/photographers-links.json`). Spezifikation `setup/personen-quellen`.

## Vorbereitete Spezifikation (Phase 3)
- EARS: `setup/personen-quellen.md` (PQL-UB-3, PQL-EV-3, PQL-UN-2)
- Gherkin: `setup/personen-quellen.feature` (3 neue Szenarien)
- Quality: Q-DATA-26 (`quality/setup/personen-quellen.md`); zusätzlich Q-SEC-13, Q-DATA-18
- ADR: nicht erforderlich – Erweiterung des Skills nach ADR-019, Abrufregeln ADR-006. Geltend: ADR-006, ADR-007, ADR-011, ADR-012, ADR-019, ADR-020.

## Annahmen
- ANNAHME: Ticket-Key `SERVICE-31`; Idee und die bereits geänderten Daten (`data/photographers.json`, `updates/photographers-links.json`, neue Portraits, `updates/2026-11-12/`) sind nicht committet und bleiben im Arbeitsverzeichnis (Branch zweigt von `main` ab).
- ANNAHME: Lesart als Fähigkeit „Sammeldatei“ (`--sources <datei>`, JSON `{ "<id>": ["<url>", …] }`) statt 33 Einzelaufrufen. Die Markdown-Liste der Idee wird einmalig in diese Datei überführt (Ablage `updates/<Datum>/sources.json`).
- ANNAHME: Die `id`s der Idee gelten, auch bei Abweichungen (`ayako-takashi` für „Ayako Takaishi“, `george-friedman` mit Wikipedia-Seite „George Friedmann“); Schreibweisen in `name` werden nicht geändert, abweichende Schreibweisen im Bericht vermerkt.
- ANNAHME: Wikipedia-Adressen in der Sammeldatei werden wie andere eigene Adressen in die Linksammlung aufgenommen; Wikipedia-Texte kommen weiter über die Wikimedia-Recherche, nicht über den Webabruf (`WSP-UB-3`).
- ANNAHME: Instagram, Seiten mit `robots.txt`-Sperre und leere Aufzählungspunkte der Idee werden nicht abgerufen; Instagram bleibt als Link, leere Punkte werden ignoriert.
- ANNAHME: Je Person genügt ein Webkurztext (40–90 Wörter, Deutsch, eigene Formulierung); `occupation`, `life` und `portrait` nur, wenn Wikipedia/Commons sie liefern; vorhandene `bio`/`website` bleiben unverändert.
- ANNAHME: Bei mehr als zehn Seiten je Person und Lauf gilt die bestehende Grenze (`RAS-UB-4`); die Idee liefert höchstens fünf Adressen je Person.
- ANNAHME: Keine neue ADR, weil kein gleichwertiger Alternativweg mit Folgen besteht.

## Qualitätserwartungen
Q-DATA-26; zusätzlich Q-SEC-13, Q-DATA-18, Q-SEC-4, Q-SEC-7, Q-DATA-14, Q-DATA-15.

## Definition of Done
- Spezifikation konsistent; Build, `npm test`, `npm run web:test`, `npm run lint:all` grün; Szenarien als Tests umgesetzt.
- Skill, `README.md` und `updates/README.md` dokumentieren `--sources`.
- Alle 33 Personen tragen nach Freigabe einen gültigen Webkurztext; `npm run validate:data` grün.

## Risiken
- Viele Seiten sind gesperrt, JavaScript-lastig oder dünn (z. B. `nino-sable`, `marie-watt` mit nur einer bzw. zwei Quellen); dann entsteht kein Webkurztext, und das wird berichtet statt geraten.
- Urheberrechtliche Nähe zu Quelltexten; Gegenmaßnahme: eigene Formulierung, Wortfolgen-Prüfung (`WSP-UB-4`).
- Namensähnlichkeit (z. B. Marie Watt, George Friedman) kann Texte falscher Personen liefern; Prüfung je Quelle im Vorschlag.
- Laufzeit: bis zu 330 Seitenabrufe mit 2 s Abstand je Website.

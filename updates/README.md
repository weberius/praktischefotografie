# updates/

Vorschläge und Berichte der Datenaktualisierung aus den Webseiten der Orte (ADR-006, ADR-007). Versioniert; abgerufene Seitentexte (Snapshots) liegen unter `.cache/` und werden nicht versioniert.

```
updates/<JJJJ-MM-TT>/
├── fetch-summary.json   Ergebnis des Abrufs je Ort
├── <venue-id>.json      Vorschläge für einen Ort
└── REPORT.md            Bericht des Laufs
```

## Ablauf

```bash
export SCRAPE_CONTACT="redaktion@example.org"   # Kontaktadresse für den User-Agent
npm run data:fetch -- [--venue <id>] [--offline] [--max-age 7]
# Vorschläge schreiben (Skill /update-venue-data oder von Hand)
npm run data:check -- [--venue <id>]
npm run data:report
# Freigabe: "approved": true in der Vorschlagsdatei setzen
npm run data:apply -- [--venue <id>]
npm run validate:data && npm test
```

Die komfortable Variante ist der Skill `/update-venue-data` (`.claude/skills/update-venue-data/SKILL.md`).

## Format einer Vorschlagsdatei

```json
{
  "venueId": "makk-koeln",
  "fetchedAt": "2026-10-27",
  "changes": [
    {
      "id": "c1",
      "dataset": "venues",
      "recordId": "makk-koeln",
      "field": "district",
      "newValue": "Altstadt-Nord",
      "evidence": { "url": "https://…/besuch", "excerpt": "wörtlicher Auszug, der den Wert enthält" }
    },
    {
      "id": "c2",
      "dataset": "exhibitions",
      "op": "add",
      "record": { "venueId": "makk-koeln", "title": "…", "startDate": "2026-12-01", "endDate": "2027-02-01", "type": "solo", "photographerIds": [] },
      "evidence": { "url": "https://…/programm", "excerpt": "…" }
    }
  ]
}
```

- `dataset`: `venues`, `exhibitions`, `events`, `photographers`. `op` ist `set` (Standard, mit `recordId`, `field` als Punktpfad und `newValue`) oder `add` (mit `record`; ohne `id` wird eine eindeutige kebab-case-`id` gebildet).
- Der Prüfer (`data:check`) schreibt die Datei neu: Änderungen unter `changes` sind gültig und tragen `oldValue`, `kind` (`ergänzt` oder `geändert`), `conflict` und `approved`; abgelehnte stehen unter `rejected` mit `reason`.
- Regeln: Fundstelle muss im Snapshot stehen und den Wert enthalten; `source` wird nie vorgeschlagen; Orte mit `source.status: verifiziert` ergeben Konflikte, die nicht übernommen werden; vorhandene Werte werden nur mit `"approved": true` geändert.
- `data:apply` übernimmt nur freigegebene Änderungen, setzt `source.url` (erste übernommene Fundstelle) und `source.checkedAt` (`fetchedAt`), lässt `source.status` unverändert, validiert vor dem Schreiben und vermerkt `appliedAt`.

## Neuigkeiten für das Magazin

Nach der Übernahme der Ortsdaten plant `npm run news:plan` Beiträge zu Ausstellungen (ADR-008). Je Ausstellung und Anlass gibt es höchstens einen Beitrag mit der `id` `<Ausstellungs-id>-<Anlass>`:

| Anlass | Datum des Beitrags |
| --- | --- |
| `neu` | Datum des Laufs (nur für im Lauf neu aufgenommene Ausstellungen) |
| `eroeffnung` | `startDate` |
| `endet-bald` | `endDate` minus 14 Tage (entfällt, wenn das nicht nach `startDate` liegt) |
| `ende` | `endDate` plus 1 Tag |

Beiträge mit Datum in der Zukunft zeigt das Magazin erst an dem Tag. Beim ersten Lauf werden alle Anlässe des Bestands nachgetragen, auch vergangene.

```bash
npm run news:plan -- [--venue <id>] [--date JJJJ-MM-TT]   # schreibt updates/<Datum>/news.json
# Skill: je Eintrag title, excerpt und text (60 bis 80 Wörter) ergänzen
npm run news:check                                         # Form prüfen, schreibt NEWS.md
# Freigabe: "approved": true im Plan setzen
npm run news:apply                                         # posts.json und content/posts/<id>.md
npm run validate:data && npm test
```

Der Plan enthält je Eintrag `id`, `occasion`, `exhibitionId`, `venueId`, `date`, `kind` (`anlegen` oder `angepasst`, dann mit `previousDate`) und `context` (Ausstellung, Ort, Fotograf:innen als Schreibgrundlage). `news:check` setzt `problems` und entzieht ungültigen Einträgen die Freigabe. Gültig ist ein Text mit 60 bis 80 Wörtern, der Titel der Ausstellung, Ort und alle Fotograf:innen nennt, ohne `<` und `>`; der Kurztext hat höchstens 300 Zeichen. Ändert sich ein Termin, erscheint der Beitrag beim nächsten Lauf als `angepasst`. Beiträge ohne Ausstellung werden im Bericht als verwaist genannt und nicht gelöscht. Die Sachrichtigkeit der Texte prüft die Redaktion bei der Freigabe.

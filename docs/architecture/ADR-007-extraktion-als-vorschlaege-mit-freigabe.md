# ADR-007: Extraktion als Vorschläge mit Freigabe und Update-Skill

**Status:** Accepted (an H2 am 2026-10-27 bestätigt)  ·  **Datum:** 2026-10-27

## Kontext
Aus Seitentexten sollen Ortsdaten, Ausstellungen und Events gewonnen werden. Seiten sind uneinheitlich. Die Quelle der Wahrheit sind die JSON-Dateien (ADR-001); `verifiziert` ist ein von Menschen vergebener Status.

## Entscheidung
- **Extraktion durch Claude im Skill.** Der Skill `update-venue-data` (`.claude/skills/update-venue-data/SKILL.md`) liest die Snapshots und schreibt je Ort eine Vorschlagsdatei `updates/<Datum>/<venue-id>.json`. Jeder Vorschlag nennt Datensatz, Feld, alten und neuen Wert, Fundstelle (URL, Textauszug) und Art („ergänzt“ oder „geändert“).
- **Deterministische Prüfung.** `scripts/scrape/check-proposals.mjs` verwirft Vorschläge, die dem Schema nicht entsprechen, keine Fundstelle mit dem Wert im Textauszug haben (der Auszug muss im Snapshot vorkommen) oder Dubletten sind.
- **Freigabe vor Übernahme.** Der Skill legt die geprüften Vorschläge dem Menschen vor und markiert freigegebene mit `approved: true`. `scripts/scrape/apply-proposals.mjs` übernimmt nur diese, setzt `source.url` und `source.checkedAt`, lässt `source.status` unverändert und markiert Vorschläge für Orte mit `verifiziert` als Konflikt. Danach läuft die Validierung; bei Fehlern werden alle Änderungen zurückgenommen.
- **Berichte und Vorschläge** liegen versioniert unter `updates/`, damit Änderungen nachvollziehbar bleiben; Seitentexte bleiben außerhalb des Repositories (ADR-006).
- Aufrufe: `npm run data:fetch`, `npm run data:check`, `npm run data:report` (schreibt `REPORT.md`), `npm run data:apply`; der Skill ruft sie nacheinander auf.
- Vorschlagsformat: `updates/README.md`. Der Prüfer berechnet `oldValue`, `kind` und `conflict` selbst; Angaben des Extraktors dazu zählen nicht.

## Alternativen
- **Parser je Webseite:** Genau, aber bei 20 und mehr Häusern pflegeintensiv und bei Layoutänderungen brüchig.
- **Nur JSON-LD und Metadaten:** Billig, aber viele Häuser liefern keine strukturierten Daten.
- **LLM-API direkt im Skript:** Erfordert Schlüssel und Kosten und löst sich vom Dialog; verworfen zugunsten des Skills.
- **Vollautomatische Übernahme:** Schneller, widerspricht aber dem Schutz verifizierter Angaben.

## Konsequenzen
- Die Qualität der Extraktion hängt vom Modell ab; die deterministische Prüfung begrenzt Halluzinationen (Wert muss im Textauszug stehen).
- Jede Aktualisierung braucht eine Freigabe im Dialog.
- Das Datenmodell bleibt unverändert; neue Felder wie Öffnungszeiten brauchen eine eigene Schemaänderung.

## Auswirkungen
- EARS: UPD-EV-1 bis UPD-EV-3, UPD-UB-1 bis UPD-UB-5, UPD-OP-1, UPD-UN-1, UPD-UN-2, SKL-UB-1, SKL-EV-1, SKL-UB-2, SKL-UB-3
- Features: `setup/datenaktualisierung.feature`, `setup/update-skill.feature`
- Quality: Q-DATA-3, Q-DATA-1, Q-REL-1, Q-MAIN-2

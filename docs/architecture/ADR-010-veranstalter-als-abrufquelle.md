# ADR-010: Veranstalter als Abrufquelle der Datenaktualisierung

**Status:** Accepted (an H2 am 2026-10-28 bestätigt)  ·  **Datum:** 2026-10-28

## Kontext
Die Datenaktualisierung ruft die Webseiten der Orte ab (ADR-006) und schreibt je Ort eine Vorschlagsdatei (ADR-007). Veranstalter wie die Internationale Photoszene Köln haben eine eigene Website und keinen Ort; ihre Festivals (ADR-009) sollen ebenfalls aus der Website kommen. Orte und Veranstalter haben getrennte Datensätze.

## Entscheidung
- **Quellen = Orte und Veranstalter mit `website`.** `data:fetch` ruft beide nach denselben Regeln ab (ADR-006); Snapshots liegen unter `.cache/snapshots/<id>/`. `--venue <id>` nimmt eine Ort- oder Veranstalter-ID; die Option behält ihren Namen.
- **Eindeutige IDs über beide Datensätze.** Eine ID darf nicht zugleich Ort und Veranstalter sein (Validator, FES-UN-3). Dadurch ist `<id>` als Dateiname und Snapshot-Ordner eindeutig.
- **Vorschlagsdatei je Quelle.** `updates/<Datum>/<id>.json`; Orte nutzen weiter `venueId`, Veranstalter das Feld `organizerId`. Das Format sonst unverändert.
- **Bereich je Quelle.** Eine Veranstalter-Website darf den eigenen Veranstalter ändern, dessen Festivals ergänzen und ändern sowie Ausstellungen mit `festivalId` eines eigenen Festivals ergänzen. Eine Ort-Website darf wie bisher den Ort und seine Ausstellungen und Events ändern und zusätzlich Veranstalter und Festivals ergänzen, aber nicht ändern (UPD-UB-6).
- **Keine `source` und kein „verifiziert“** für Veranstalter und Festivals; die Fundstelle im Vorschlag bleibt der Nachweis (ADR-007).
- **Festivals nur mit belegtem Zeitraum.** Schema (Pflichtfelder) und Fundstellenprüfung stellen sicher, dass kein Festival ohne gültiges Start- und Enddatum übernommen wird (UPD-UN-3).
- **Übernahme** wie bisher über `data:apply` mit Validierung und Rollback; bei Veranstaltern wird kein `source` gesetzt.

## Alternativen
- **Getrennte Skripte für Veranstalter:** Doppelter Code und eine zweite Bedienung des Skills.
- **Veranstalter als Pseudo-Orte:** Verfälscht Karte und Ortsverzeichnis.
- **Keine Veranstalter-Quellen, Festivals nur von Hand:** Widerspricht dem Ziel, Festivaldaten aktuell zu halten.

## Konsequenzen
- Berichte und Prüfer iterieren über Quellen statt über Orte; Namen wie `venueId` in der Abrufzusammenfassung bleiben aus Kompatibilität bestehen und enthalten bei Veranstaltern deren ID.
- Der Validator braucht die ID-Kollisionsprüfung.
- Der Skill erhält Extraktionsregeln für Veranstalter und Festivals.

## Auswirkungen
- EARS: FET-OP-2, UPD-UB-6, UPD-UB-7, UPD-UB-8, UPD-UN-3, UPD-OP-2, SKL-UB-6, FES-UN-3
- Features: `setup/webseiten-abruf.feature`, `setup/datenaktualisierung.feature`, `setup/update-skill.feature`, `content/festivals.feature`
- Quality: Q-DATA-6, Q-SEC-4, Q-DATA-5

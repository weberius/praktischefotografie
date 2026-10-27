# ADR-005: Demo-Daten getrennt halten und im Sync zusammenführen

**Status:** Accepted (an H2 am 2026-10-27 bestätigt)  ·  **Datum:** 2026-10-27

## Kontext
Außer den Orten sind Beiträge, Ausstellungen, Events, Fotograf:innen und Veranstalter:innen noch leer. Die Webanwendung muss mit realistischen Verknüpfungen entwickelt und getestet werden, ohne dass erfundene Daten als Redaktionsdaten erscheinen oder veröffentlicht werden.

## Entscheidung
- Demo-Daten liegen im Wurzelverzeichnis `demo/` mit derselben Struktur wie das Repository (`demo/data/*.json`, `demo/content/posts/*.md`). Sie können auf echte Datensätze aus `data/` verweisen.
- Jeder Demo-Datensatz hat eine `id` mit Präfix `demo-` und einen Titel bzw. Namen mit Präfix „[Demo]“. Der Sync lehnt andere Demo-Datensätze ab.
- `web/tools/sync-data.mjs --demo` (verwendet von `npm start` und `ng test`) führt die Arrays aus `data/` und `demo/data/` zusammen, kopiert die Beiträge beider Wurzeln und validiert das Ergebnis mit dem Validator aus ADR-001. Ohne `--demo` (Produktionsbuild) werden nur `data/` und `content/` übernommen.
- Die zusammengeführten Dateien sind Build-Artefakte (ADR-003) und werden nicht versioniert.

## Alternativen
- **Demo-Daten in `data/`:** Vermischt Redaktions- und Testdaten, Gefahr der Veröffentlichung.
- **Nur Fixtures in Tests:** Kein sichtbares Gesamtbild zur Abnahme an H2.
- **Eigene Demo-Schemas:** Doppelte Pflege.

## Konsequenzen
- Die veröffentlichte Seite zeigt Leerzustände, bis die Redaktion echte Inhalte pflegt.
- Lighthouse und axe laufen auf dem Demo-Build, um realistische Seiten zu prüfen.
- Der Validator muss Referenzen über beide Wurzeln auflösen können; er prüft dazu das zusammengeführte Ergebnis.

## Auswirkungen
- EARS: BLD-UB-3, BLD-OP-1, BLD-UB-4
- Features: `setup/web-build.feature`
- Quality: Q-SEC-2

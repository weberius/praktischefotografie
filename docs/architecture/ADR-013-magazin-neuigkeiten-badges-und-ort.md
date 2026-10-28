# ADR-013: Anlass der Neuigkeiten im Magazin als Badge, Titel mit Ort

**Status:** Accepted (an H2 am 2026-10-28 bestätigt)  ·  **Datum:** 2026-10-28

## Kontext
Neuigkeiten sind reguläre Beiträge mit der Kennung `<Ausstellungs-id>-<Anlass>` (ADR-008). Ihr Titel lautet bisher „Anlass: Ausstellung …“ (z. B. „Endet bald: MYSTERIUM DER PAARE in Monschau“). Das Magazin soll jede Karte in der Reihenfolge Datum, Badges, Titel, Kurztext aufbauen; Anlass und Art der Ausstellung erscheinen wie in den Ausstellungslisten als Badges, der Titel nennt Ausstellung und Ort („MYSTERIUM DER PAARE in Monschau“).

## Entscheidung
- **Anlass aus der Kennung.** Die Webanwendung liest den Anlass aus dem Ende der Beitragskennung (`neu`, `eroeffnung`, `endet-bald`, `ende`) und die Ausstellung aus `linkedExhibitionIds[0]`. Es gibt kein neues Schemafeld (ADR-008 bleibt gültig; die Kennung trägt den Anlass).
- **Badges.** Anlass-Badge („Neu“, „Eröffnung“, „Endet bald“, „Beendet“) und Art-Badge (`EXHIBITION_TYPE_LABEL`) mit der vorhandenen Badge-Darstellung; Text, nicht nur Farbe (Q-USE-4).
- **Titel = „Ausstellungstitel in Stadt“.** `title` einer Neuigkeit besteht aus dem Titel der Ausstellung, „in“ und der Stadt des Ortes ohne Anlass (NWS-UB-7); `news:check` verwirft abweichende Titel, der Skill schreibt so. Bestehende Neuigkeiten werden einmalig migriert (`posts.json` und Frontmatter).
- **Beitragsseite.** Die Detailseite zeigt dieselben Badges unter dem Datum (BLG-UB-8); beide Seiten nutzen dieselbe Komponente.
- **Kein eigener Ortslink in der Karte.** Die Ortsangabe steht im Titel; die Venue ist über die Beitragsseite verlinkt (BLG-UB-4).
- **Fehlende Verknüpfungen** lassen die Badges weg, ohne die Karte zu ändern (BLG-UN-3).

## Alternativen
- **Neues Feld `occasion` in `posts.json`:** Explizit, verlangt aber Schemaänderung und Migration in Daten, Web und Skripten; in ADR-008 aus denselben Gründen verworfen.
- **Anlass aus dem Titel schneiden:** Brüchig und abhängig von der Formulierung.
- **Status-Badge aus dem heutigen Datum der Ausstellung statt des Anlasses:** Drei Beiträge je Ausstellung zeigten dann dasselbe Badge und wären nicht unterscheidbar.
- **Ortsname aus der Venue zur Laufzeit an den Titel hängen:** Der Titel stünde dann nicht in den Daten (Beitragsseite, Suchmaschinen, Magazin-Feed müssten ihn kennen).

## Konsequenzen
- Die Kennungsregel aus ADR-008 wird zur Lesekonvention der Webanwendung; Beiträge mit anderer Kennung bleiben ohne Badges.
- Mehrere Beiträge zur selben Ausstellung tragen denselben Titel und unterscheiden sich durch Badge, Datum und Text.
- Zieht eine Ausstellung in eine andere Stadt um, entsteht ein abweichender Titel; der nächste Lauf der Neuigkeitenpflege meldet das über die Prüfung (Titelregel).

## Auswirkungen
- EARS: BLG-UB-6, BLG-UB-7, BLG-UB-8, BLG-ST-2, BLG-UN-3, NWS-UB-7
- Features: `web/blog.feature`, `setup/magazin-neuigkeiten.feature`
- Quality: Q-USE-4, Q-USE-6, Q-DATA-10, Q-PERF-3

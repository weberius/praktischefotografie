# Pipeline: SERVICE-21 – Neue Venues

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default, an H1 zu bestätigen)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-21-neue-venues  ·  **Quelle:** Idee `docs/product/ideen/idee-012-neue-venues.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-11-09 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben (Aufruf von /spec-pipeline) | 2026-11-09 |
| 2 UserStory | STORY-01, STORY-02 | Erledigt | 2026-11-09 |
| 3 Spezifikation · EARS | content/venue-erfassung.md (VEN-UB-6, VEN-UB-7) | Erledigt | 2026-11-09 |
| 3 Spezifikation · Gherkin | content/daten.feature („Neue Venues sind im Katalog“) | Erledigt | 2026-11-09 |
| 3 Spezifikation · Quality | Q-DATA-1, Q-DATA-2 (bestehend, unverändert) | Erledigt | 2026-11-09 |
| 3 Spezifikation · ADR | nicht erforderlich | Nicht erforderlich | 2026-11-09 |
| 3 Spezifikation · Konsistenz | siehe unten | Erledigt | 2026-11-09 |
| 4 Tasks | STORY-01-TASK-01; STORY-02-TASK-01, -02 | Erledigt | 2026-11-09 |
| 5 Implement | data/venues.json, test/bestand.test.mjs, Changelogs | Erledigt (web:test nicht geprüft) | 2026-11-09 |
| 6 Human in the Loop (H2) | Prüfpaket | Akzeptiert | 2026-11-09 |
| 7 Review | review/analyse-code.md, -architecture.md, -security.md (Compliance: kein Skill, nicht verfügbar) | Erledigt | 2026-11-09 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## ADR
Nicht erforderlich: reine Datenerfassung im bestehenden Modell, keine technische Entscheidung. Geltende ADRs als Leitplanken: ADR-001 (Schema-Validierung), ADR-006 (Abruf mit robots.txt, für spätere Aktualisierung der Orte).

## Konsistenzcheck (Phase 3)
- Akzeptanzkriterien: STORY-01 1–3 → VEN-UB-6, DAT-UB-2/-4, VEN-UB-5; 4 → VEN-UB-1, Q-DATA-1. STORY-02 1–2 → VEN-UB-7, DAT-UB-2/-4, VEN-UB-5; 3 → VEN-UB-1, Q-DATA-1.
- VEN-UB-6/-7 haben das Gherkin-Szenario „Neue Venues sind im Katalog“; Q-DATA-1/-2 haben Maß und Prüfverfahren.
- Bestand 22 + 2 = 24 liegt in VEN-UB-1 (20–30); VEN-UB-4 (Kernstädte) bleibt erfüllt. Keine bestehenden Szenarien geändert.
- Die neuen Venues liegen in Köln und Bonn (VEN-UB-2: lat 50.3–52.6, lng 5.8–9.5).

## Annahmen (zur Vorlage an H1/H2)
Vom Menschen bestätigt (2026-11-09): URL `https://www.kunstmuseum-bonn.de/`; „Forum für Fotografie“ = Köln, nicht Monschau; IDs `forum-fuer-fotografie-koeln`, `kunstmuseum-bonn`; Kunstmuseum Bonn zeigt Fotoausstellungen, aber nicht dauerhaft (Beleg: Vernissage Herlinde Koelbl).
- ANNAHME: Typen `gallery` und `museum`; Anschrift, Koordinaten, Besonderheiten werden in der Umsetzung recherchiert (Status `recherchiert`).
- ANNAHME: „Katalog“ = `data/venues.json`; Ausstellungen der Orte nicht Teil des Wunsches.
- ANNAHME: Die Idee-Datei war beim Intake untracked; der Branch geht von `main` aus.
- ANNAHME: Der Ordner `docs/templates/` fehlt noch (legt der Mensch an); Aufbau nach SERVICE-05/-20.

## Review-Triage
Schwelle kritisch + hoch: keine Befunde darüber. Alle Vorschläge (review/TASK-01 bis TASK-05, mittel/niedrig) zurückgestellt, siehe Closure. Reviews einmal für beide Stories gemeinsam (identischer Umfang).

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

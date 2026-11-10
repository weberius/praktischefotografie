# Pipeline: SERVICE-25 – Projektseite

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default, an H1 zu bestätigen)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-25-projekt-seite  ·  **Quelle:** Idee `docs/product/ideen/idee-016-projekt.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-11-10 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben (Aufruf von /spec-pipeline; Annahmen bestätigt) | 2026-11-10 |
| 2 UserStory | STORY-01 | Erledigt | 2026-11-10 |
| 3 Spezifikation · EARS | web/projekt.md (PRJ-UB-1 bis PRJ-UB-10, PRJ-ST-1); web/navigation.md (NAV-UB-10); web/rechtliches.md (RCH-UB-6) | Erledigt | 2026-11-10 |
| 3 Spezifikation · Gherkin | web/projekt.feature; Anpassungen navigation.feature, rechtliches.feature | Erledigt | 2026-11-10 |
| 3 Spezifikation · Quality | web/projekt.md (Q-USE-20); Ergänzungen Q-SEC-2, Q-SEO-2, Q-SEO-3 | Erledigt | 2026-11-10 |
| 3 Spezifikation · ADR | nicht erforderlich (statische Inhaltsseite im bestehenden Muster; Leitplanken ADR-002, ADR-022) | Nicht erforderlich | 2026-11-10 |
| 3 Spezifikation · Konsistenz | siehe unten | Erledigt | 2026-11-10 |
| 4 Tasks | STORY-01 TASK-01 bis TASK-03 | Erledigt | 2026-11-10 |
| 5 Implement | Code + Tests + CHANGELOG | Erledigt (Gate grün) | 2026-11-10 |
| 6 Human in the Loop (H2) | Prüfpaket | Offen (wartet auf Entscheidung) | 2026-11-10 |
| 7 Review | – | Offen | |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## Konsistenzcheck (Phase 3)
- STORY-01: AK 1 → PRJ-UB-1, PRJ-UB-9, NAV-UB-10; AK 2 → PRJ-UB-2, -3, -7; AK 3 → PRJ-UB-4; AK 4 → PRJ-UB-5; AK 5 → PRJ-UB-6; AK 6 → PRJ-UB-8, PRJ-ST-1; AK 7 → RCH-UB-6.
- Jede PRJ-/RCH-Anforderung hat ein Szenario; Q-USE-20 hat Maß und Prüfverfahren.
- NAV-UB-7 per Supersede durch NAV-UB-10 ersetzt; Szenario „Jede Adresse zeigt ihre Seite“ um `/projekt` ergänzt.
- Verträglich mit FRM-UB-1/FRM-EV-1 (Menülinks bleiben enthalten), NAV-ST-1 (kein Zurück-Link), Q-SEC-2 (Bilder lokal, Links nur per Klick), RCH-UB-5 (keine Klangland-Reste).
- Hinweis für Phase 5: Tests zu „Navigation ist auf jeder Seite vorhanden“ und FRM-EV-1 listen die Menülinks; „Projekt“ kommt hinzu.

## ADR
Nicht erforderlich. Geltende ADRs: ADR-002 (Angular-SPA), ADR-022 (Zurück-Link mit Anwendungsverlauf).

## Annahmen (zur Vorlage an H1/H2)
- ANNAHME: Spendenlink ist der PayPal-Link von Klangland (gleicher Betreiber); Beträge/Texte sinngemäß übernommen. Vor Livegang prüfen.
- ANNAHME: Portrait und QR-Code werden nach `web/public/assets/` kopiert und selbst ausgeliefert (Q-SEC-2).
- ANNAHME: „Über das Projekt“ beschreibt den Ist-Stand der Webanwendung; Wortlaut in Phase 5.
- ANNAHME: Kein Zurück-Link auf der Projektseite (NAV-ST-1 sinngemäß).
- ANNAHME: „Getrennt durch eine Linie“ = Trennlinie oberhalb des Menüeintrags.
- ANNAHME: Datenschutzerklärung nennt den PayPal-Link (RCH-UB-6).
- ANNAHME: Alternativtext des Portraits nennt „Wolfram Eberius“ (wie im Impressum).
- ANNAHME: Idee-Datei und `docs/grafics/` sind nicht committet; Branch von `main`; die Verschiebung des QR-Bildes (`docs/qr-praktische-fotografie.png` gelöscht) bleibt unberührt.

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

# Pipeline: SERVICE-02 – Angular-Webanwendung

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (an H1 bestätigt)  ·  **Modus:** autonom

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md | Erledigt | 2026-10-27 |
| 1 Vision (H1) | EPIC | Freigegeben | 2026-10-27 |
| 2 UserStory | STORY-01 bis STORY-10 | Erledigt | 2026-10-27 |
| 3 Spezifikation · EARS | ears/web/*.md, ears/setup/web-build.md, DAT-UB-6 (67 Anforderungen) | Erledigt | 2026-10-27 |
| 3 Spezifikation · Gherkin | contracts/gherkin/web/*.feature, setup/web-build.feature (67 Szenarien) | Erledigt | 2026-10-27 |
| 3 Spezifikation · Quality | quality/web/*.md (Q-PERF-3/4, Q-USE-2/3/4, Q-SEC-2/3, Q-SEO-1/2/3, Q-MAIN-1) | Erledigt | 2026-10-27 |
| 3 Spezifikation · ADR | ADR-002, ADR-003, ADR-004, ADR-005 | Erledigt (Accepted an H2) | 2026-10-27 |
| 3 Spezifikation · Konsistenz | Jede EARS-Anforderung hat ein Szenario (maschinell geprüft) | Erledigt | 2026-10-27 |
| 4 Tasks | STORY-01: 8, STORY-02 bis 10: je 2 Tasks | Erledigt | 2026-10-27 |
| 5 Implement | Code + Tests + CHANGELOG | Erledigt | 2026-10-27 |
| 6 Human in the Loop (H2) | Prüfpaket | Akzeptiert | 2026-10-27 |
| 7 Review | Skills `review-*` nicht vorhanden | Nicht erforderlich (offengelegt) | 2026-10-27 | |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Annahmen (zur Vorlage an H2)
- ANNAHME: Ticket-Key `SERVICE-02`, kein Jira-Ticket.
- ANNAHME: Stories und ADRs wurden auf Wunsch der Projektleitung vor H1 erstellt; der Lauf setzt mit `/spec-pipeline --resume` an H1 fort und klärt dort offene Punkte.
- Weitere ANNAHMEN stehen in der EPIC-Notiz.
- ANNAHME: Der Produktionsbuild enthält keine Demo-Daten; bis zur redaktionellen Erfassung zeigt die veröffentlichte Seite Leerzustände (Phase 1).
- ANNAHME: SEO-Ziel bedeutet technische Auffindbarkeit (Prerendering, Meta, Sitemap), kein Ranking (Phase 1).
- ANNAHME: Gherkin-Szenarien werden als Jasmine-Tests 1:1 mit Szenarioverweis umgesetzt; Browsertests (axe, Lighthouse, Tastatur, Netzwerk) laufen als Skripte gegen den Demo-Produktionsbuild, soweit ein Chromium verfügbar ist (Phase 3).
- ANNAHME: „Endet bald“ gilt bei einer Restlaufzeit von höchstens 14 Tagen (Story-Wortlaut; PRD nennt 7–14) (Phase 3, EXH-UB-2).
- ANNAHME: Merkmalskürzel `SEO` ergänzt die Q-ID-Merkmale des ID-Vertrags (Phase 3).
- ANNAHME: Beitragsvorschau über neues optionales Feld `excerpt` (DAT-UB-6) statt Ableitung aus dem Text (Phase 3).
- ANNAHME: Karma läuft mit dem vorhandenen Playwright-Chromium (Phase 3).
- BEFUND (Phase 5, Zwischenstand): Die Tests `/venues/unbekannt` usw. in `web/src/app/app.spec.ts` bleiben rot, bis die jeweilige Detailseite umgesetzt ist (Stories 03, 06 bis 10).
- HINWEIS (Phase 5): Das Impressum enthält Platzhalter; Betreiberangaben fehlen und müssen vor der Veröffentlichung ergänzt werden.
- BEFUND (Phase 5): Q-PERF-3 wurde zuerst verfehlt (78/59/77) und nach Maßnahmen erreicht (94/94/97); Maßnahmen: zoneless (ADR-002 ergänzt), Karte lazy und nach der Liste, gzip im Prüfserver. Messung nur in der Sandbox (simuliert).
- ANNAHME (Phase 5): Spezifikation nachgezogen: CAL-UB-5 (Monatsnavigation) und CAL-UB-6 („Beendet“) ergänzt, `ended=1` in CAL-OP-1; beides war implementiert, aber nicht spezifiziert (Quelle: EARS/Gherkin).
- ANNAHME (Phase 5): Die Impressum-Betreiberangaben bleiben Platzhalter; der Produktionsbuild zeigt ohne Demo-Daten Leerzustände.
- NICHT GEPRÜFT (Phase 5): GitHub-Actions-Lauf, Screenreader, reale Geräte, Chrome auf dem CI-Runner, Gesamtabdeckung nur für `core/` getrennt.
- HINWEIS: Phase 7 entfällt, weil `.claude/skills/review-{code,quality,security,governance}` nicht existieren. Annahmen und ADR-002 bis ADR-005 sind an H2 bestätigt.

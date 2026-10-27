# Pipeline: SERVICE-03 – Orts-Daten aus Webseiten aktualisieren

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (an H1 bestätigt)  ·  **Modus:** autonom

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md | Erledigt | 2026-10-27 |
| 1 Vision (H1) | EPIC | Freigegeben | 2026-10-27 |
| 2 UserStory | STORY-01 bis STORY-04 | Erledigt | 2026-10-27 |
| 3 Spezifikation · EARS | ears/setup/webseiten-abruf.md, datenaktualisierung.md, update-skill.md (24 Anforderungen) | Erledigt | 2026-10-27 |
| 3 Spezifikation · Gherkin | contracts/gherkin/setup/ (24 Szenarien) | Erledigt | 2026-10-27 |
| 3 Spezifikation · Quality | quality/setup/datenaktualisierung.md | Erledigt | 2026-10-27 |
| 3 Spezifikation · ADR | ADR-006, ADR-007 | Erledigt (Accepted an H2) | 2026-10-27 |
| 3 Spezifikation · Konsistenz | Story-Abgleich und Szenario-Abdeckung geprüft | Erledigt | 2026-10-27 |
| 4 Tasks | STORY-01: 3, STORY-02: 2, STORY-03: 2, STORY-04: 3 | Erledigt | 2026-10-27 |
| 5 Implement | Code + Tests + CHANGELOG | Erledigt | 2026-10-27 |
| 6 Human in the Loop (H2) | Prüfpaket | Akzeptiert | 2026-10-27 | |
| 7 Review | Skills `review-*` nicht vorhanden | Nicht erforderlich (offengelegt) | 2026-10-27 | |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |
| 2026-10-27 | Live-Lauf `/update-venue-data` (makk-koeln) | 0 Unterseiten gefunden: Menülinks zeigen auf `makk.de`, die Website steht als `www.makk.de` | Anforderung unklar (Host) | EARS FET-EV-1, FET-UN-2 präzisiert („Website“, `www.` zählt nicht), Gherkin, ADR-006 | `fetcher.mjs`, Tests |

## Annahmen (zur Vorlage an H2)
- ANNAHME: Ticket-Key `SERVICE-03`, kein Jira-Ticket.
- ANNAHME: Story, Spezifikation und ADRs wurden auf Wunsch der Projektleitung vor H1 erstellt; die Umsetzung startet erst auf deren Veranlassung mit `/spec-pipeline --resume` an H1.
- Weitere ANNAHMEN stehen in der EPIC-Notiz.
- ANNAHME: Q-ID-Merkmal `REL` wird erstmals verwendet; Q-Nummern fortlaufend je Merkmal.
- Entschieden an H1: Umfang = vorhandene Felder, Extraktion durch Claude im Skill, `updates/` versioniert, Schwelle kritisch + hoch. Die zugehörigen ANNAHMEN im EPIC gelten damit als bestätigt, bis auf die Kontaktadresse (`SCRAPE_CONTACT`), die der Skill beim ersten Lauf erfragt bzw. aus der Umgebung liest.
- ANNAHME (Phase 5): `robots.txt`, die nicht lesbar ist oder mit 5xx antwortet, sperrt den Host für den Lauf (vorsichtige Lesart von FET-UB-1).
- ANNAHME (Phase 5): Bei Konflikt (verifizierter Ort) werden alle Vorschläge dieses Ortes nicht übernommen, auch neue Ausstellungen (wörtliche Lesart von UPD-UB-4). Eine Übernahme ist erst nach manueller Änderung des Status möglich.
- ANNAHME (Phase 5): Der Abstand je Host zählt ab dem Eintreffen der Antwort (robuster als ab dem Absenden).
- BEFUND (Phase 5): Der Prüfer kann bei Datums- und Wahrheitswerten die Fundstelle nur im Snapshot, nicht im Wert prüfen; hier entscheidet die Freigabe.
- NICHT GEPRÜFT (Phase 5): Abruf gegen echte Webseiten und Extraktion durch Claude mit echten Seiten (benötigt `SCRAPE_CONTACT` von Ihnen und ist ein Live-Zugriff auf Dritte); Rechtslage der Betreiber.
- HINWEIS: Phase 7 entfällt, weil `.claude/skills/review-*` nicht existieren. Annahmen und ADR-006/007 sind an H2 bestätigt.

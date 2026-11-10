# Review: SERVICE-24-STORY-01 – Nur aktuelle Events und Ausstellungen

| Analyse | Stand | Gesamtrisiko | Status |
|---|---|---|---|
| [Security](analyse-security.md) | 2026-11-10 | Low | Entwurf – wartet auf Abnahme |
| [Code](analyse-code.md) | 2026-11-10 | Nachvollziehbarkeit Hoch | Entwurf – wartet auf Abnahme |
| [Architektur](analyse-architecture.md) | 2026-11-10 | Score 7/10 | Entwurf – wartet auf Abnahme |

## Vorgeschlagene Tasks

Security: keine (kein Befund ab Schweregrad Medium; nur Beobachtungen OBS-01 bis OBS-04).

Code:

| Task | Titel | Priorität | Aufwand | Status |
|---|---|---|---|---|
| [TASK-01](TASK-01-gemeinsame-aktuell-regel.md) | Eine gemeinsame Regel für „aktuell“ | Medium | ~30 min | Vorgeschlagen |
| [TASK-02](TASK-02-testluecken-schliessen.md) | Testlücken zu ACT-ST-1 und Q-REL-4 schließen | Medium | ~45 min | Vorgeschlagen |
| [TASK-03](TASK-03-texte-und-gherkin-pflegen.md) | Meta-Beschreibung und Gherkin-Format bereinigen | Low | ~20 min | Vorgeschlagen |

Architektur:

| Task | Titel | Priorität | Aufwand | Status |
|---|---|---|---|---|
| [TASK-04](TASK-04-aktualitaetsregel-zentralisieren.md) | Aktualitätsregel als ein Prädikat in `core/` bündeln (überschneidet TASK-01, TASK-03) | Medium | ~1 h | Vorgeschlagen |
| [TASK-05](TASK-05-adr-stichtag-bei-prerendering.md) | ADR zum Stichtag bei vorab erzeugten Seiten | Medium | ~2 h | Vorgeschlagen |

Änderungen: [CHANGELOG.md](CHANGELOG.md)

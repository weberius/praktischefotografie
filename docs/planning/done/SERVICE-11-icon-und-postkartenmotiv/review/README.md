# Review SERVICE-11

**Stand:** 2026-10-29  ·  **Review-Schwelle (H1):** kritisch + hoch lösen Rücklauf aus  ·  **Ergebnis:** kein Befund oberhalb der Schwelle. Abnahme (zweite H2-Runde, 2026-10-29): Empfehlung freigegeben – sechs Tasks umgesetzt, fünf zurückgestellt.

## Reviews je Story

| Review | STORY-01 | STORY-02 | STORY-03 |
| --- | --- | --- | --- |
| Architektur | [analyse-architecture.md](SERVICE-11-STORY-01/analyse-architecture.md) · 1 niedrig (8/10) | [analyse-architecture.md](SERVICE-11-STORY-02/analyse-architecture.md) · 1 niedrig (Hinweis) | nicht erforderlich: nur Testdateien, kein Produktionscode |
| Code | [analyse-code.md](SERVICE-11-STORY-01/analyse-code.md) · 2 mittel, 5 niedrig | [analyse-code.md](SERVICE-11-STORY-02/analyse-code.md) · 3 niedrig | [analyse-code.md](SERVICE-11-STORY-03/analyse-code.md) · 1 mittel, 3 niedrig |
| Security | [analyse-security.md](SERVICE-11-STORY-01/analyse-security.md) · 0 Befunde | [analyse-security.md](SERVICE-11-STORY-02/analyse-security.md) · 0 Befunde | nicht erforderlich: keine Laufzeitwirkung |
| Compliance (GBOS) | nicht verfügbar | nicht verfügbar | nicht verfügbar |

Compliance: Die Schnittstelle `gbos-mcp` steht in dieser Umgebung nicht zur Verfügung; das Review wurde nicht ausgeführt und nicht ersetzt.

## Vorgeschlagene Tasks (Status `Vorgeschlagen`)

| Story | Task | Titel | Prio | Aufwand | Befund | Empfehlung |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | [TASK-22](SERVICE-11-STORY-01/TASK-22-build-test-in-ci-wirksam.md) | Build-Test für Icon-Verweise in der CI wirksam machen (läuft dort bisher nie) | Medium | 1 h | CODE-05 | **umgesetzt** |
| 01 | [TASK-23](SERVICE-11-STORY-01/TASK-23-build-ico-testen.md) | `buildIco` direkt testen, toten Zweig bereinigen | Low | 30 min | CODE-03 | **umgesetzt** |
| 01 | [TASK-01](SERVICE-11-STORY-01/TASK-01-icon-skript-ableitung-testen.md) | Erfolgspfad der Icon-Ableitung testen | Low | 45 min | ARCH-01 | **umgesetzt** |
| 01 | [TASK-24](SERVICE-11-STORY-01/TASK-24-test-hygiene-marken-icon.md) | Testtitel und Importe bereinigen | Low | 20 min | CODE-04 | **umgesetzt** |
| 03 | [TASK-21](SERVICE-11-STORY-03/TASK-21-icon-test-aussage-schaerfen.md) | Icon-Test: Aussage („ohne Postkartenmotiv“) und Assertion in Einklang bringen | Medium | 20 min | CODE-01, CODE-02 | **umgesetzt** |
| 03 | [TASK-22](SERVICE-11-STORY-03/TASK-22-marken-icon-test-aufraeumen.md) | Testdatei aufräumen: Importe, Kopfkommentar, Hinweis bei fehlendem Build | Low | 15 min | CODE-03, CODE-04 | **umgesetzt** |
| 01 | [TASK-21](SERVICE-11-STORY-01/TASK-21-split-in-browser-entflechten.md) | `splitInBrowser` und `scaleInBrowser` entflechten, Schwellen benennen | Medium | 1,5 h | CODE-01, CODE-02 | zurückgestellt |
| 01 | [TASK-25](SERVICE-11-STORY-01/TASK-25-cli-argumente.md) | CLI-Argumente mit `parseArgs` | Low | 30 min | CODE-06 | zurückgestellt |
| 01 | [TASK-26](SERVICE-11-STORY-01/TASK-26-manifest-beschreibung.md) | Beschreibungstext in Manifest und Meta-Tag abgleichen | Low | 15 min | CODE-07 | zurückgestellt |
| 02 | [TASK-21](SERVICE-11-STORY-02/TASK-21-testaufbau-app-spec-buendeln.md) | Testaufbau im Spec von `App` bündeln | Low | 30 min | CODE-01, CODE-02 | zurückgestellt |
| 02 | [TASK-22](SERVICE-11-STORY-02/TASK-22-icon-groessentest-entschlacken.md) | Größentest des Kopf-Icons entschlacken | Low | 20 min | CODE-03 | zurückgestellt |

Die Empfehlung „zurückstellen“ ist eine Triage für die Abnahme: Sie betrifft Refactoring von funktionierendem, getestetem Code und kleine Stilfragen, nicht Verhalten oder Testlücken.

## Nicht bewertbar (aus den Analysen)
Aussehen im Browser und Verhalten unter einem fremden Basispfad (nicht Gegenstand der Reviews; im Umsetzungslauf gemessen); keine Content-Security-Policy im Repo (bekannt aus SERVICE-10); Nutzungsrechte und Metadaten des Quellbildes (C2PA-Chunk im Quellbild, nicht in den ausgelieferten Icons).

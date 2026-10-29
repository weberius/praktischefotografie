# Review SERVICE-10

**Stand:** 2026-10-29  ·  **Review-Schwelle (H1):** kritisch + hoch lösen Rücklauf aus  ·  **Ergebnis:** kein Befund oberhalb der Schwelle. Abnahme (zweite H2-Runde, 2026-10-29): Empfehlung freigegeben – fünf Tasks umgesetzt, vier Struktur-Tasks zurückgestellt.

## Reviews je Story

| Review | STORY-01 | STORY-02 |
| --- | --- | --- |
| Architektur | [analyse-architecture.md](SERVICE-10-STORY-01/analyse-architecture.md) · 2 niedrig (8/10) | [analyse-architecture.md](SERVICE-10-STORY-02/analyse-architecture.md) · 2 niedrig (8/10) |
| Code | [analyse-code.md](SERVICE-10-STORY-01/analyse-code.md) · 1 mittel, 3 niedrig | [analyse-code.md](SERVICE-10-STORY-02/analyse-code.md) · 1 mittel, 3 niedrig |
| Security | [analyse-security.md](SERVICE-10-STORY-01/analyse-security.md) · 0 Befunde | [analyse-security.md](SERVICE-10-STORY-02/analyse-security.md) · 0 Befunde |
| Compliance (GBOS) | nicht verfügbar | nicht verfügbar |

Compliance: Die Schnittstelle `gbos-mcp` steht in dieser Umgebung nicht zur Verfügung; das Review wurde nicht ausgeführt und nicht ersetzt.

## Vorgeschlagene Tasks (Status `Vorgeschlagen`)

| Story | Task | Titel | Prio | Aufwand | Befund | Empfehlung |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | [TASK-21](SERVICE-10-STORY-01/TASK-21-veraltete-listenverweise-korrigieren.md) | Veraltete Verweise auf eine Ortsliste auf /map korrigieren (u. a. `aria-label` der Karte) | Medium | 15 min | CODE-01 | **umgesetzt** |
| 01 | [TASK-22](SERVICE-10-STORY-01/TASK-22-groessentest-ohne-race.md) | Größentest gegen initialen ResizeObserver-Aufruf absichern | Low | 20 min | CODE-02 | **umgesetzt** |
| 01 | [TASK-23](SERVICE-10-STORY-01/TASK-23-toten-css-selektor-entfernen.md) | Toten Selektor `.venue-type` entfernen | Low | 5 min | CODE-03 | **umgesetzt** |
| 01 | [TASK-24](SERVICE-10-STORY-01/TASK-24-layout-kette-und-mindesthoehe.md) | Layout-Kette bündeln (Entscheidung erforderlich) | Low | 45 min | CODE-04 | zurückgestellt |
| 01 | [TASK-01](SERVICE-10-STORY-01/TASK-01-vollflaechige-seiten-ohne-seitenselektor.md) | Seitenrahmen ohne Selektor einer Einzelseite steuern | Low | 1 h | ARCH-01 | zurückgestellt |
| 01 | [TASK-02](SERVICE-10-STORY-01/TASK-02-hoehenkette-der-karte-festhalten.md) | Höhenkette dokumentieren, Mindesthöhe einmal führen | Low | 30 min | ARCH-02 | zurückgestellt (mit TASK-24 zusammenlegen) |
| 02 | [TASK-21](SERVICE-10-STORY-02/TASK-21-ortstypen-liste-zentral.md) | Liste der Ortstypen einmal zentral ableiten | Medium | 30 min | CODE-01 | **umgesetzt** |
| 02 | [TASK-22](SERVICE-10-STORY-02/TASK-22-kleine-aufraeumungen-symbol-und-legende.md) | Wirkungslose Option `alt`, Cast, Farb-Literale bereinigen | Low | 20 min | CODE-02 bis 04 | **umgesetzt** |
| 02 | [TASK-01](SERVICE-10-STORY-02/TASK-01-marker-icon-aus-showmarkers-herausloesen.md) | Marker-Icon aus `showMarkers` herauslösen | Low | 45 min | ARCH-02 | zurückgestellt |
| 02 | [TASK-02](SERVICE-10-STORY-02/TASK-02-symbolzeichnung-in-shared-ablegen.md) | Ablage der Symbolzeichnung klären | Low | 20 min | ARCH-01 | zurückgestellt |

Die Empfehlung „zurückstellen“ ist eine Triage für die Abnahme: Die Befunde liegen unter der Review-Schwelle und betreffen Struktur, nicht Verhalten.

## Nicht bewertbar (aus den Analysen)
Erkennbarkeit der Symbole in Graustufen und Kontrast auf allen OSM-Flächen; Tests und Browser liefen in den Reviews nicht (nur Code-Lektüre); keine Content-Security-Policy im Repo (außerhalb der Story).

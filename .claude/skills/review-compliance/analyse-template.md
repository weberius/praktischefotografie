# Compliance-Analyse (GBOS): <Kurzbeschreibung des Scopes>

**Ticket:** <TICKET>  
**Analysiert:** <JJJJ-MM-TT>  
**Scope:** <Branch-Diff gegen main | Pfade | gesamtes Repository>  
**Methode:** Abgleich der GBOS-Regeln (gbos-mcp: `listGbosChapters`, `getGbosChapter`) mit Code,
Konfiguration und Dokumentation; statische Analyse  
**Geprüfte Kapitel:** <chapterId, ...>  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** <ADR-xxx, ...> / <*.feature>

---

## Executive Summary

**Gesamtkonformität:** <xx %> (MUST-Quote: <n/m>)

<Kurze Zusammenfassung des Konformitätsstands und der gravierendsten Abweichungen.>

| Kapitel | Konformität | MUST-Quote | 🟢 | 🟡 | 🔴 | Nicht anwendbar |
|---|---|---|---|---|---|---|
| <GBOS-FE> (`gbos-fe`) | <xx %> | <n/m> | <n> | <n> | <n> | <n> |

| Kritikalität der Abweichungen | Anzahl |
|---|---|
| Critical | <n> |
| High | <n> |
| Medium | <n> |
| Low | <n> |

---

## Konformität pro Kapitel

### <GBOS-FE-B2B-B2E>: <Kapiteltitel> – <xx %>

| Regel-ID | Stufe | Regel | Bewertung | Nachweis / Befund |
|---|---|---|---|---|
| GBOS-FE-FRAMEWORK | MUST | <Titel> | 🟢 Erfüllt | [package.json:NN](<relativer-pfad>) |
| <ID> | SHOULD | <Titel> | 🔴 Nicht erfüllt | COMP-01 |
| <ID> | MUST | <Titel> | 🟡 Nicht bewertbar | <wer kann prüfen> |

**Geprüfte Dateien**

| Datei | Bewertung |
|---|---|
| [<pfad>](<relativer-pfad>) | 🟢 / 🟡 / 🔴 <Kurzbegründung> |

---

## Abweichungen

### COMP-01: <Titel>

- **Regel:** <Regel-ID> – <Titel> (Kapitel `<chapterId>`)
- **Stufe:** MUST / SHOULD / MAY
- **Compliance-Kriterium:** <Automated/Manual-Kriterium aus der Regel>
- **Bewertung:** Nicht erfüllt / Teilweise erfüllt
- **Kritikalität:** Low / Medium / High / Critical
- **Betroffene Stelle:** [`<datei>:<zeile>`](<relativer-pfad>)
- **Ist-Zustand:** <was im Repo vorgefunden wurde>
- **Soll-Zustand:** <was die Regel verlangt>
- **Auswirkung:** <Folgen bei Nicht-Konformität>
- **Begründung:** <warum diese Kritikalität; Annahmen kennzeichnen>
- **Empfohlene Maßnahme:** <beschreibend, keine Umsetzung>
- **References (aus GBOS):** <Links aus der Regel>
- **Bezug zu anderen Reviews:** <SEC-xx / ARCH-xx / CODE-xx | –>

---

## Begründete Abweichungen

<Regel-ID – Verstoß, gedeckt durch ADR-xxx oder die in der Regel genannte Ausnahme.>

---

## Regressionen und bekannte Abweichungen

<Status früher gemeldeter Abweichungen: behoben / weiterhin offen (mit Task-Verweis) / erneut aufgetreten.>

---

## Nicht anwendbar

<Kapitel bzw. Regel-IDs mit Kurzbegründung, warum sie diesen Scope nicht betreffen.>

---

## Positive Compliance-Maßnahmen

<Was ist nachweislich gut umgesetzt?>

---

## Abgeleitete Tasks

| Task | Titel | Priorität | Aufwand | Befunde | Regel-ID |
|---|---|---|---|---|---|
| [TASK-NN](TASK-NN-<slug>.md) | <Titel> | High | ~30 min | COMP-01 | <ID> |

---

## Nicht bewertbar / Klärungsbedarf

<Regeln, deren Nachweis außerhalb des Repos liegt (laufendes System, Lokalise, Backend, Keycloak,
Betrieb) – jeweils mit zuständiger Stelle. Verweise auf Regeln, die in keinem abgerufenen Kapitel
stehen. Fehler beim Abruf über gbos-mcp.>

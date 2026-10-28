# Security-Analyse: <Kurzbeschreibung des Scopes>

**Ticket:** <TICKET>  
**Analysiert:** <JJJJ-MM-TT>  
**Scope:** <Branch-Diff gegen main | Pfade | gesamte Codebasis inkl. Infrastruktur>  
**Methode:** Statische Code-Analyse (SAST) + Konfigurations-Review <+ npm audit>  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** <ADR-xxx, ...> / <*.feature>

---

## Executive Summary

**Gesamtrisiko:** Low / Medium / High / Critical

<Kurze Zusammenfassung des Sicherheitsniveaus und der gravierendsten Befunde.>

| Schweregrad | Anzahl |
|---|---|
| Critical | <n> |
| High | <n> |
| Medium | <n> |
| Low | <n> |

---

## Identifizierte Sicherheitsrisiken

### SEC-01: <Titel>

- **Kategorie:** <z. B. XSS, Broken Access Control>
- **OWASP-Bezug:** <A0x:2025 – …>
- **Schweregrad:** Low / Medium / High / Critical
- **Exploit-Wahrscheinlichkeit:** Niedrig / Mittel / Hoch
- **Betroffene Stelle:** `<datei>:<zeile>`
- **Beschreibung des Risikos:** <…>
- **Angriffsszenario:** <realistisch, Schritt für Schritt>
- **Auswirkung:** <Vertraulichkeit / Integrität / Verfügbarkeit>
- **Begründung:** <warum dieser Schweregrad; Annahmen kennzeichnen>
- **Empfohlene Mitigation:** <beschreibend, keine Umsetzung>

---

## Regressionen und bekannte Risiken

<Status früher gemeldeter Risiken: behoben / weiterhin offen (mit Task-Verweis) / erneut aufgetreten.>

---

## Beobachtungen ohne akutes Risiko

<Sicherheitsrelevante Auffälligkeiten ohne direkten Exploit – Defense-in-Depth-Hinweise.>

---

## Positive Sicherheitsmaßnahmen

<Was ist gut abgesichert?>

---

## Abgeleitete Tasks

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| [TASK-NN](TASK-NN-<slug>.md) | <Titel> | High | ~30 min | SEC-01 |

---

## Nicht bewertbar

<Fehlende Informationen, z. B. serverseitige Rechteprüfung, Ingress-Konfiguration, Keycloak-Realm.>

# Architektur-Analyse: <Kurzbeschreibung des Scopes>

**Ticket:** <TICKET>  
**Analysiert:** <JJJJ-MM-TT>  
**Scope:** <Branch-Diff gegen main | Pfade | gesamte Codebasis>  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** <ADR-xxx, ...> / <*.feature>

---

## 1. Executive Summary

| Kriterium | Bewertung |
|---|---|
| Gesamtarchitektur-Score | <1–10> |
| Architektur-Reifegrad | Niedrig / Mittel / Hoch |
| Komponentenorientierung | Schwach / Mittel / Stark |
| Wartbarkeit | Niedrig / Mittel / Hoch |
| Testbarkeit | Niedrig / Mittel / Hoch |
| Technische Schuld | Gering / Mittel / Hoch |
| ADR-Konformität | <n Verstöße / vollständig konform> |

<Kurzbewertung in 5–10 Sätzen.>

### Überblick Architektur (Scope)

```mermaid
graph TD
    %% reale Komponenten/Services des Scopes, Problemstellen hervorheben
```

---

## 2. Analyse nach Kategorien

Für jede Kategorie (Komponentenarchitektur, State Management & Reaktivität, Service-Schicht,
Struktur & Abhängigkeiten, Kopplung & Kohäsion):

### <Kategorie>

- **Bewertung:** Schwach / Mittel / Stark
- **Beobachtungen:** <mit `datei:zeile`>
- **Architektur-Risiko:** <…>
- **Skalierungsrisiko:** <…>
- **Wartbarkeitsauswirkung:** <…>

---

## 3. Prinzipien

Für jedes Prinzip (SRP, OCP, LSP, ISP, DIP, Separation of Concerns, Law of Demeter):

### <Prinzip> – Score <1–10>

- **Eingehalten:** <wo, mit Referenz>
- **Verletzt:** <wo, mit Referenz>
- **Auswirkung:** <Wartbarkeit / Erweiterbarkeit / Testbarkeit / Kopplung / kognitive Komplexität>

Score-Skala: 1–3 gravierende strukturelle Probleme · 4–6 inkonsistent · 7–8 überwiegend sauber ·
9–10 architektonisch sehr stark.

---

## 4. Identifizierte Architektur-Schwächen

### ARCH-01: <Titel>

- **Priorität:** Hoch / Mittel / Niedrig
- **Betroffene Stelle:** `<datei>:<zeile>`
- **Beschreibung:** <…>
- **Verletztes Prinzip / ADR:** <…>
- **Konsequenz:** <…>
- **Langfristiges Risiko:** <…>

<Optional Mermaid-Diagramm, wenn es das Problem sichtbar macht.>

---

## 5. Skalierbarkeit & Risiken

- **Wachsende Feature-Anforderungen:** <…>
- **Team-Wachstum:** <…>
- **Zunehmende fachliche Komplexität:** <…>

### Top 5 architektonische Risiken

1. <Risiko – Begründung – Bezug ARCH-xx>

### Alternative Ansätze (optional)

<Nur wenn begründet: Option, Trade-offs, betroffene ADRs. Keine Umsetzung.>

---

## 6. Positive Aspekte

<Was ist gut gelöst und sollte als Muster beibehalten werden?>

---

## 7. Bewusst nicht gemeldet

<Abweichungen von allgemeinen Best Practices, die durch ADRs gedeckt sind – mit Verweis.>

---

## 8. Abgeleitete Tasks (Top-Maßnahmen)

| Task | Titel | Priorität | Aufwand | Befunde | Erwartete Wirkung |
|---|---|---|---|---|---|
| [TASK-NN](TASK-NN-<slug>.md) | <Titel> | High | ~1 h | ARCH-01 | <…> |

---

## 9. Nicht bewertbar

<Was fehlte für eine vollständige Bewertung?>

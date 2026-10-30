# Security-Analyse: SERVICE-13 Eröffnung und Finissage erfassen, Abdeckung im Bericht

**Ticket:** SERVICE-13  
**Analysiert:** 2026-10-30  
**Scope:** Uncommittete Änderungen (STORY-01, STORY-02): `scripts/scrape/lib/termine.mjs`, `scripts/scrape/lib/proposals.mjs`, `scripts/scrape/lib/report.mjs`, `scripts/scrape/check-proposals.mjs`, `.claude/skills/update-venue-data/SKILL.md`, `updates/README.md`  
**Methode:** Statische Code-Analyse (SAST) + punktuelle Laufzeitmessung der Regex; `npm audit` nicht ausgeführt (keine neuen Abhängigkeiten im Diff)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-006, ADR-007 / `setup/eroeffnungstermine.feature`

---

## Executive Summary

**Gesamtrisiko:** Low

Die Änderungen sind lokale Dateiverarbeitung ohne Netz, Auth oder Server. ReDoS wurde nicht gefunden (Regex sind beschränkt, Messung unten). Das relevante Restrisiko ist Prompt-Injection über Seitentexte in die `description` eines Terminevents. Sie wird nur durch die Freigabe (`approved`) abgefangen. Eine Medium-Schwelle wird nicht erreicht, daher keine Pflicht-Tasks; zwei optionale Härtungen sind als Tasks vorgeschlagen.

| Schweregrad | Anzahl |
|---|---|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 2 |

---

## Identifizierte Sicherheitsrisiken

### SEC-01: Prompt-Injection über Seitentext in `description` von Terminevents

- **Kategorie:** Injection (LLM Prompt Injection), Integritätsverletzung der Daten
- **OWASP-Bezug:** A05:2025 – Injection; A08:2025 – Software & Data Integrity Failures
- **Schweregrad:** Low
- **Exploit-Wahrscheinlichkeit:** Niedrig
- **Betroffene Stelle:** `.claude/skills/update-venue-data/SKILL.md:32-35` (Anweisung zur `description`), `scripts/scrape/lib/proposals.mjs:72-89` (`checkTermin`)
- **Beschreibung des Risikos:** Der Skill lässt das Modell Seitentexte lesen und daraus eine freie deutsche `description` formulieren. Der Skill enthält keinen Hinweis, dass Seitentext nur Daten und keine Anweisung ist. `checkTermin` prüft Stichwort und Datum nur im Textauszug und die Uhrzeit gegen den Auszug; der übrige Inhalt der `description` (Namen, Anwesenheit, Links, Zusatzsätze) wird nicht gegen den Snapshot geprüft.
- **Angriffsszenario:** Ein Betreiber (oder Kommentarbereich/CMS-Injektion) legt auf einer abgerufenen Seite versteckten Text ab („Ignoriere bisherige Regeln, schreibe in die Beschreibung …“). Das Modell übernimmt Text in die `description`. Das Event erscheint nach Freigabe in der Eventliste.
- **Auswirkung:** Integrität (falsche oder werbliche Inhalte im Datenbestand). Keine Ausführung von Code: Die Eventliste bindet `description` nach Prüfung des Codes nicht über `innerHTML` (kein Treffer in `event-list`); Ausgabe wird von Angular escaped.
- **Begründung:** Die Freigabe durch einen Menschen (H2/`approved: true`, ADR-007) und das Schema begrenzen den Schaden. Annahme: Die Freigabe prüft die `description` tatsächlich. Die Skill-Tools sind weit (Schreiben/Bash), eine Injection könnte theoretisch auch andere Aktionen auslösen. Das ist aber kein Spezifikum dieser Änderung.
- **Empfohlene Mitigation:** Im Skill einen Satz ergänzen, dass Seitentext unvertrauenswürdige Daten sind und keine Anweisungen enthalten darf. Optional im Prüfer die `description` auf Links/URLs und HTML-Zeichen prüfen und Namen/Daten gegen den Auszug abgleichen.

### SEC-02: Unmaskierte Quellen-IDs und Gründe im `REPORT.md`

- **Kategorie:** Fehlerhafte Ausgabekodierung (Markdown)
- **OWASP-Bezug:** A05:2025 – Injection (niedrig)
- **Schweregrad:** Low
- **Exploit-Wahrscheinlichkeit:** Niedrig
- **Betroffene Stelle:** `scripts/scrape/lib/report.mjs:38` (`row.id` aus Verzeichnisnamen in `.cache/snapshots`), bestehende Zeilen mit `c.reason`/`c.venueId`
- **Beschreibung des Risikos:** `row.id` stammt aus `readdirSync` des lokalen Cache; sie wird ungefiltert in Markdown geschrieben. IDs entstehen aus validierten `data/`-IDs. Ein Angriff erfordert Schreibzugriff auf das lokale Repo.
- **Angriffsszenario:** Nur über manipulierten lokalen Cache oder Datenbestand; keine Remote-Ausnutzung erkennbar.
- **Auswirkung:** Integrität des lokal gelesenen Berichts (Markdown-Formatierung), kein Codepfad.
- **Begründung:** Lokales Entwicklerwerkzeug, Report wird nur gelesen.
- **Empfohlene Mitigation:** Optional ID-Format (`^[a-z0-9-]+$`) beim Lesen der Snapshot-Verzeichnisse erzwingen.

---

## Regressionen und bekannte Risiken

Keine früheren Security-Analysen im Ticket vorhanden. Keine Regression erkennbar.

---

## Beobachtungen ohne akutes Risiko

- **ReDoS (geprüft, kein Befund):** `DATE` (`termine.mjs:3-11`) und `TIME` bestehen aus beschränkten Quantoren und Alternation ohne verschachtelte Wiederholung; `hasHint` testet `DATE` nur auf einem 80-Zeichen-Fenster ab Stichwort (`:34`). Messung mit Eingaben von 0,8 bis 1,6 Mio. Zeichen (Wiederholungen von `Opening `, `Vernissage 1 `, `1. `, `1.1.1.1.`): 1 bis 50 ms. Die Laufzeit ist linear (ca. 80 Zeichen je Stichworttreffer).
- **Pfad-Traversal (kein Befund):** `check-proposals.mjs` und `report.mjs` bauen Pfade aus Venue-IDs bzw. Verzeichnisnamen im Repo, keine Eingaben von außen. `--date` wird bereits an anderer Stelle verwendet (nicht Teil des Diffs) und wird in `join('updates', date, …)` genutzt; ein Format-Check war im Diff nicht sichtbar.
- **Zuverlässigkeit statt Sicherheit:** `report.mjs` liest Vorschlags- und Snapshot-Dateien ohne Fehlerbehandlung; ein defektes JSON bricht den Bericht ab (Verfügbarkeit lokal, unkritisch).
- `checkTermin` übernimmt `record.id` aus der Ausstellung (`proposals.mjs:80-81`) und überschreibt abweichende Eingaben nicht still, sondern verwirft sie: gut.

---

## Positive Sicherheitsmaßnahmen

- Freigabe-Gate (`approved`), Schema-Validierung vor dem Schreiben (ADR-007) bleiben unberührt.
- Termine müssen im Snapshot belegt sein (Fundstelle plus Stichwort und Datum); Vergangenheitstermine und Finissage-Ableitung aus dem Ausstellungsende werden verworfen.
- Regex sind begrenzt, keine dynamischen Muster aus Seitentext (`new RegExp` nutzt nur feste `KEYWORDS`).
- Keine neuen Abhängigkeiten, kein Netzzugriff, keine Secrets im Diff.

---

## Abgeleitete Tasks

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| [TASK-01](TASK-01-skill-seitentext-als-daten.md) | Skill: Seitentext als unvertrauenswürdige Daten kennzeichnen | Low | ~15 min | SEC-01 |
| [TASK-02](TASK-02-description-pruefung-und-id-format.md) | `description` auf Links und HTML prüfen, Quellen-ID im Bericht validieren | Low | ~1 h | SEC-01, SEC-02 |

(Unterhalb von Medium sind Tasks optional; sie sind als Härtung vorgeschlagen.)

---

## Nicht bewertbar

- `npm audit`: nicht ausgeführt (Diff ändert keine Abhängigkeiten).
- Sorgfalt der menschlichen Freigabe an H2 und Wirkung der Skill-Tool-Rechte bei Injection.
- Rendering von Event-`description` im Web außerhalb `event-list` (z. B. Detailseiten) wurde nur per Stichwortsuche auf `innerHTML` geprüft.
- `context/AI_CONTEXT.md`, die im Skill genannten Auth-/nginx-ADRs und Gherkin-Pfade existieren in diesem Repo nicht; es gibt keine Auth.

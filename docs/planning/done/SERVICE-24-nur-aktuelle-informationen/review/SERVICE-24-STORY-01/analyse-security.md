# Security-Analyse: Nur aktuelle Events und Ausstellungen (SERVICE-24-STORY-01)

**Ticket:** SERVICE-24  
**Analysiert:** 2026-11-10  
**Scope:** Branch-Diff gegen main ohne `docs/product/ideen/`: `web/src/app/pages/event-list/*`, `web/src/app/pages/exhibition-list/*`, `docs/ears/web/aktualitaet.md`, `docs/contracts/gherkin/web/aktualitaet.feature`, `docs/quality/web/aktualitaet.md`  
**Methode:** Statische Code-Analyse (SAST); kein `npm audit` (keine Abhängigkeitsänderung im Scope)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-002 (Angular-SPA) / `web/aktualitaet.feature`

---

## Executive Summary

**Gesamtrisiko:** Low

Die Änderung ist eine reine clientseitige Filterung öffentlicher Daten in einer statischen Angular-SPA ohne Authentifizierung, Backend oder Rollen. Es wird kein neuer Eingabe- oder Ausgabepfad geschaffen: Die Badge-Ausgabe „Beendet“ in der Eventliste entfällt, der Statusparameter wird weiterhin gegen eine feste Liste geprüft und „beendet“ wird dabei verworfen. Befunde ab Schweregrad Medium gibt es nicht, daher werden keine Tasks vorgeschlagen. Es bleiben zwei Beobachtungen ohne akutes Risiko.

| Schweregrad | Anzahl |
|---|---|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 0 |

---

## Identifizierte Sicherheitsrisiken

Keine.

---

## Regressionen und bekannte Risiken

Keine früheren Security-Analysen unter `docs/planning/` vorhanden; es gibt keine Regression zu prüfen. Die im Repo vorhandenen `[innerHTML]`-Stellen (`post-detail.html:10`, `venue-legend.html:3`) liegen außerhalb des Scopes und werden von der Änderung nicht berührt.

---

## Beobachtungen ohne akutes Risiko

- **OBS-01 – Zugriffsbeschränkung ist keine Vertraulichkeitsmaßnahme (A01:2025 – Broken Access Control, nicht zutreffend).** Beendete Einträge werden nur aus den Listen ausgeblendet (`event-list.ts:48`, `exhibition-list.ts:44`). Sie bleiben im ausgelieferten Datensatz und per Detailadresse erreichbar (ACT-UB-3). Das ist beabsichtigt; die Daten sind öffentlich. Wer die Ausblendung später als Schutz verstehen würde, läge falsch – Annahme: keine vertraulichen Daten im Datensatz.
- **OBS-02 – „Heute“ stammt vom Client (A06:2025 – Insecure Design, ohne Auswirkung).** `Clock.today()` nutzt die Gerätezeit. Ein Nutzer kann so die Aktualitätsgrenze selbst verschieben, betrifft nur die eigene Ansicht, keine anderen Nutzer, keine Integrität.
- **OBS-03 – Prototypschlüssel beim Typfilter (vorbestehend, nicht Teil des Diffs).** `event-list.ts:39` prüft `t in EVENT_TYPE_LABEL`; der Operator `in` erfasst auch geerbte Schlüssel wie `toString`. Ein manipulierter Link `?type=toString` führt zu einer leeren Liste (Hinweis ACT-ST-1), nicht zu Codeausführung oder Datenabfluss. Rein kosmetisch; falls aufgeräumt wird, `Object.hasOwn` verwenden. Kein Task, da unter Medium und außerhalb des Diffs.
- **OBS-04 – Spezifikation verweist nur auf ADR-002.** Kein Sicherheitsbezug; die Spezifikationsdokumente enthalten keine Secrets oder personenbezogenen Daten.

---

## Positive Sicherheitsmaßnahmen

- Statusparameter wird gegen die feste Liste `STATUSES` geprüft (`exhibition-list.ts:14,34-37`); „beendet“ und beliebige Werte fallen auf „kein Filter“ zurück (ACT-UN-1, per Test abgedeckt).
- Ausgabe erfolgt ausschließlich über Angular-Interpolation (automatisches Escaping); der Diff führt kein `innerHTML`, `bypassSecurityTrust*`, direkten DOM-Zugriff, `eval` oder neue Netzwerkaufrufe ein.
- Typparameter der Eventliste wird gegen `EVENT_TYPE_LABEL` geprüft und nie in HTML, URLs oder Abfragen übernommen.
- Die einheitliche Aktualitätsregel (`isOver`/`exhibitionStatus`) vermeidet eine zweite Berechnung und damit Logikabweichungen (Q-REL-4).
- Der Diff entfernt tote Logik (`isOver`-Binding im Template) statt sie zu erweitern.

---

## Abgeleitete Tasks

Keine (kein Risiko ab Schweregrad Medium).

---

## Nicht bewertbar

- `npm audit`/Lockfile: nicht Teil des Scopes (keine Abhängigkeitsänderung).
- Header, CSP und Hosting (GitHub Pages, ADR-003): nicht Teil des Diffs.
- Abnahme per Human-in-the-Loop: im nicht interaktiven Lauf nicht abgefragt, Status bleibt „Entwurf“.

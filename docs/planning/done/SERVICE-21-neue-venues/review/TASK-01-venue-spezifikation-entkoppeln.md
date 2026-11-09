# TASK-01: Venue-spezifische Spezifikation und Test entkoppeln

**Priorität:** Medium  
**Aufwand:** ~1 h  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-01, ARCH-03  
**ADR-Bezug:** ADR-001  
**Status:** Vorgeschlagen

---

## Problem

VEN-UB-6/7 (`docs/ears/content/venue-erfassung.md:12-13`), das Gherkin-Szenario (`docs/contracts/gherkin/content/daten.feature:96-106`) und der Test (`test/bestand.test.mjs:39-52`) wiederholen `id`, `type`, Stadt und Website je Venue. Jede weitere Venue vergrößert alle drei Dokumente; Datenänderungen brechen den Test. Die `ANNAHME` in `venue-erfassung.md:15` ist eine Prozessnotiz im normativen Dokument.

## Ziel

Die Spezifikation beschreibt Eigenschaften des Bestands, nicht einzelne Einträge. Prozessnotizen stehen nicht in normativen Dokumenten.

## Betroffene Dateien

- `docs/ears/content/venue-erfassung.md`
- `docs/contracts/gherkin/content/daten.feature`
- `test/bestand.test.mjs`

## Umsetzungsvorschlag

**Entscheidung erforderlich:**
- **A:** Einzelvenue-Anforderungen behalten (bewusster Regressionsschutz gegen Löschen), aber `website` aus Spezifikation und Test entfernen; sie ändert sich am häufigsten.
- **B:** VEN-UB-6/7, Szenario und Test entfernen; Schutz über VEN-UB-1 bis VEN-UB-5 und Validator.
- **C:** Erwartete Venues als eigene Konfiguration (z. B. Mindestliste von IDs) führen, EARS beschreibt nur die Regel „Mindestliste ist vollständig“.

Unabhängig von der Wahl: `ANNAHME` in `venue-erfassung.md:15` an H2 klären und aus der Norm entfernen (Supersede/Deprecate-Regeln der Spezifikation beachten).

## Akzeptanzkriterien

- [ ] Gewählte Option dokumentiert, EARS, Gherkin und Test stimmen überein
- [ ] Keine Prozessnotiz („Umsetzung“) in `venue-erfassung.md`
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – reine Spezifikations- und Teständerung; Option B reduziert den Regressionsschutz.

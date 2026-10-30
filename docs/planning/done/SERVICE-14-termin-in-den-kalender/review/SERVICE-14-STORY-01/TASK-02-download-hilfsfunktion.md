# TASK-02: Download-Mechanik kapseln

**Priorität:** Low  
**Aufwand:** ~1 h  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-02  
**ADR-Bezug:** ADR-002  
**Status:** Zurückgestellt (2026-10-30, Struktur bzw. niedrig, kein Einfluss auf Verhalten)

---

## Problem

Blob, `createObjectURL`, Anker und `revokeObjectURL` stehen inline (`event-detail.ts:61-66`); der Test spioniert dafür auf `URL` und `HTMLAnchorElement.prototype` (`event-detail.spec.ts`).

## Ziel

Eine kleine Funktion oder ein injizierbarer Dienst in `core/` (`downloadFile(document, name, content, type)`), im Test ersetzbar.

## Betroffene Dateien

- `web/src/app/pages/event-detail/event-detail.ts`, `event-detail.spec.ts`
- neu: `web/src/app/core/file-download.ts`

## Umsetzungsvorschlag

1. Funktion/Dienst extrahieren.
2. **Entscheidung erforderlich:** Funktion mit `DOCUMENT`-Parameter (minimal) oder `providedIn: 'root'`-Dienst (leichter zu ersetzen). Lohnt sich nur, wenn ein zweiter Export absehbar ist.
3. Test ohne Prototyp-Spies.

## Akzeptanzkriterien

- [ ] Komponententest ersetzt den Download-Dienst statt globaler Prototypen
- [ ] Netzfreiheit (ICS-EV-1) weiterhin geprüft
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig.

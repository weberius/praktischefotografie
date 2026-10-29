# TASK-22: Fußbereich-Template: redundante Klasse entfernen

**Priorität:** Low  
**Aufwand:** ~10 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-04  
**ADR-Bezug:** –  
**Status:** Zurückgestellt (niedrig, begründet in PIPELINE.md)

---

## Problem

`web/src/app/app.html:38`: `<p class="muted">` im `.site-footer`, der bereits `color: var(--muted)` setzt (`web/src/styles.css`). Die Klasse hat keinen Effekt.

## Ziel

Kein wirkungsloses Klassenattribut im Fußbereich.

## Betroffene Dateien

- `web/src/app/app.html`

## Umsetzungsvorschlag

1. `class="muted"` am Absatz entfernen; Test auf `footer.querySelector('p')` bleibt gültig.

## Akzeptanzkriterien

- [ ] Absatz ohne Klasse, Farbe unverändert (Kontrasttest grün)
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – gleiche berechnete Farbe.

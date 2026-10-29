# TASK-23: Betreiberdaten und Gliederung der rechtlichen Seiten vereinheitlichen

**Priorität:** Low  
**Aufwand:** ~30 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-02, CODE-04, CODE-05  
**ADR-Bezug:** –  
**Status:** Zurückgestellt (niedrig, begründet in PIPELINE.md)

---

## Problem

Anschrift steht zweimal im Impressum (`impressum.html:3-7`, `:15-19`); Datenschutz nummeriert Überschriften, die anderen Seiten nicht (`datenschutz.html`); Logfiles und Hosting sind getrennt beschrieben; `browser-check.mjs:13` ist eine 20-Einträge-Zeile.

## Ziel

Einheitliche Gliederung, eine Wahrheit je Angabe, besser lesbare Seitenliste.

## Betroffene Dateien

- `web/src/app/pages/impressum/impressum.html`
- `web/src/app/pages/datenschutz/datenschutz.html`
- `web/tools/quality/browser-check.mjs`
- `web/src/app/app.spec.ts`

## Umsetzungsvorschlag

1. **Entscheidung erforderlich:** Nummerierung der Datenschutz-Überschriften beibehalten oder entfernen; Anschrift unter „Redaktionell verantwortlich“ wiederholen oder darauf verweisen.
2. Logfile- und Hosting-Absatz zusammenführen oder gegenseitig verweisen.
3. `samplePages` auf ein Array mit einem Eintrag je Zeile umbrechen.
4. Test auf Betreiberdaten auf die Pflichtangaben beschränken.

## Akzeptanzkriterien

TASK-23-betreiberdaten-und-gliederung-vereinheitlichen.md0

## Risiko

TASK-23-betreiberdaten-und-gliederung-vereinheitlichen.md1

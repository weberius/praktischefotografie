# SERVICE-12-STORY-03-TASK-01 – Kopfbereich haftet am oberen Rand über dem Inhalt
- **Status:** Umgesetzt
- **Story:** STORY-03
- **EARS:** FRM-UB-2, FRM-UB-5
- **Gherkin:** `web/seitenrahmen.feature` · Kopfbereich bleibt beim Scrollen im Vordergrund, Kopfbereich verdeckt keinen Inhalt
- **Quality:** Q-USE-13 (Position, `elementFromPoint` auch auf `/map`, Höhe ≤ 5 rem bei 390 Pixeln, kein horizontales Scrollen), Q-PERF-8 (CLS 0, reines CSS)
- **ADR:** ADR-002, ADR-016
- **Aufgabe:** CSS: `.site-header { position: sticky; top: 0; z-index }` höher als Leaflet-Ebenen (> 1000) bzw. Stapelebene für `main` (`isolation: isolate`); `scroll-padding-top` auf `html` in Höhe des Kopfs, damit Sprungziele und fokussierte Elemente nicht verdeckt werden; Sprunglink bleibt oberhalb; die Spalte (ADR-016, `:host`) bleibt erhalten.
- **Prüfkriterium:** Komponententests auf berechnete Stile (`position: sticky`, `top: 0`, z-Index über 1000, `scroll-padding-top` ≥ Kopfhöhe); Browserprüfung (Playwright gegen den Build) auf `/venues` und `/map`: nach dem Scrollen liegt der Kopf bei 0 px, `elementFromPoint` in der Kopfmitte liefert ein Kopf-Element, Kopfhöhe bei 390 und 320 Pixeln, `scrollWidth` ≤ `clientWidth` bei 320; Prüf-Gate grün.

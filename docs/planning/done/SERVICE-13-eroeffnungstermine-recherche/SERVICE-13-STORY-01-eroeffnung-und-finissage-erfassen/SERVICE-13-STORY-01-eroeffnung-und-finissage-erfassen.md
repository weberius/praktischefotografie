# SERVICE-13-STORY-01 – Eröffnung und Finissage als Event erfassen

**Als** Besucher:in **möchte ich** zu einer Ausstellung Eröffnung und Finissage mit Datum, Uhrzeit und dem Hinweis, ob die Künstler:innen anwesend sind, finden, **damit** ich diese Termine besuchen kann.

## Akzeptanzkriterien
1. Nennt die Webseite eines Ortes für eine Ausstellung einen Eröffnungstermin mit Datum, liegt nach der Recherche ein Vorschlag für eine Vernissage vor; nennt sie eine Finissage mit Datum, ein Vorschlag für eine Finissage.
2. Die Vorschläge nennen Datum, Uhrzeit (falls belegt) und, wenn die Seite es belegt, die Anwesenheit der Künstler:innen; sie enthalten nichts, was die Seite nicht sagt.
3. Für „Between“ ergibt sich: 7. November 2026, 16:00 bis 18:00 Uhr, Candida Höfer ist anwesend.
4. Eine Finissage wird nur vorgeschlagen, wenn die Seite sie nennt, nicht allein aus dem Ausstellungsende.
5. Ein Termin, der schon als Event vorhanden ist, wird nicht doppelt vorgeschlagen; vergangene Termine werden nicht vorgeschlagen.
6. Ein Vorschlag mit Uhrzeit ohne Uhrzeit in der Fundstelle wird verworfen.

## Abhängigkeiten
`SERVICE-13-STORY-03` (Typ `finissage` im Datenmodell).

## Spezifikation (Phase 3, vorab erstellt)
- EARS: OPN-UB-1 bis OPN-UB-8, OPN-UN-1
- Gherkin: `setup/eroeffnungstermine.feature` (Vernissage aus Eröffnungshinweis, Finissage aus Finissagehinweis, Uhrzeit und Anwesenheit, Titel und Kennung je Typ, Keine Dubletten je Typ, Keine Finissage ohne Beleg, Vergangener Termin, Uhrzeit ohne Beleg)
- Quality: Q-DATA-12, Q-DATA-3
- ADR: nicht erforderlich; ADR-007, ADR-010

**INVEST:** I ~ (mit STORY-03 gekoppelt) N ✔ V ✔ E ✔ S ✔ T ✔

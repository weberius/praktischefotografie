# SERVICE-25 – Projektseite

**Status:** Entwurf (Intake)  ·  **Quelle:** Idee [`idee-016-projekt`](../../../product/ideen/idee-016-projekt.md)

> „Es soll eine Seite Projekt eingeführt werden. Sie orientiert sich an der Seite Projekt im Projekt Klangland. Sie soll der untereste Eintrag in der Navigation sein, getrennt durch eine Linie. Die Seite ist überschrieben mit ‚Projekt‘. Es folgt ein kurzer Motivationstext: Ich möchte mich über Ausstellungen und andere Ereignisse in Bezug auf Fotografie informieren. Darunter mein Portrait. […] Darunter ‚Über das Projekt‘ […] Hebe auch hier das OK Lab Köln hervor. Darunter ‚Teilen‘: Wenn Dir die Webapp gefällt, dann teile sie gerne. Nutze dafür den QR-Code […]. Darunter ‚Zentrum für praktische Fotografie unterstützen‘; orientiere Dich hierfür wieder am Projekt Klangland.“

## Ziel
Besucher:innen erfahren auf einer eigenen Seite, wozu das Projekt dient, wer dahintersteht, wie sie es weitergeben und unterstützen können.

**Zweck in einem Satz:** Besucher:innen verstehen das Projekt und können es teilen oder freiwillig unterstützen.

**Erfolgskriterien**
- `/projekt` zeigt die vier Abschnitte in der vorgegebenen Reihenfolge.
- „Projekt“ ist der letzte, durch eine Linie abgesetzte Menüeintrag.

## Kontext
Klangland hat eine Projektseite (Motivation, Portrait, Projektbeschreibung mit OK Lab Köln, Unterstützung per PayPal). Die Webanwendung ist eine Angular-SPA (ADR-002) mit Burger-Menü (FRM-UB-1), vorab erzeugten Seiten und Sitemap. Portrait (`docs/grafics/wolfram.jpg`) und QR-Code (`docs/grafics/qr-praktische-fotografie.png`) liegen im Repository und noch nicht in der Webanwendung.

## Story-Schnitt
1. `STORY-01` Projektseite mit abgesetztem Menüeintrag (eine kleine, zusammenhängende Änderung)

## Abgrenzung
**Nicht enthalten:** Mehrsprachigkeit, weitere Bezahlanbieter, Spendenstatistik, Änderung der rechtlichen Seiten über den PayPal-Hinweis hinaus, Änderung von Daten, Skills und Schema, Fußbereich-Link auf die Projektseite.

## Betroffene Bereiche
`web` (neue Seite, Routen, Menü in `app.html`/`app.ts`, Vorab-Erzeugung, Sitemap, Bilder in `web/public`), Spezifikation `web/projekt`, Supersede NAV-UB-7, Ergänzung RCH-UB-6. ADR: nicht erforderlich.

## Vorbereitete Spezifikation (Phase 3)
- EARS: `web/projekt.md` (PRJ-UB-1 bis PRJ-UB-10, PRJ-ST-1); `web/navigation.md` (NAV-UB-10 ersetzt NAV-UB-7); `web/rechtliches.md` (RCH-UB-6)
- Gherkin: `web/projekt.feature`; angepasst `web/navigation.feature`, `web/rechtliches.feature`
- Quality: `web/projekt.md` (Q-USE-20); Ergänzungen zu Q-SEC-2, Q-SEO-2, Q-SEO-3
- ADR: nicht erforderlich; Leitplanken ADR-002, ADR-022

## Annahmen
- ANNAHME: Der Spendenlink ist der PayPal-Link von Klangland (`https://www.paypal.com/donate/?hosted_button_id=798KM567KPRFE`), da der Betreiber derselbe ist; Beträge und Texte aus Klangland werden sinngemäß mit neuem Namen übernommen. Ein eigener Button für dieses Projekt wäre vor Livegang zu prüfen.
- ANNAHME: Portrait und QR-Code werden von `docs/grafics/` nach `web/public/assets/` kopiert und selbst ausgeliefert (kein Fremdhost wie bei Klangland), damit Q-SEC-2 gilt.
- ANNAHME: Der Text „Über das Projekt“ beschreibt den Ist-Stand (Magazin, Kalender, Karte, Orte, Fotograf:innen, Ausstellungen, Events, Festivals, Veranstalter:innen); Wortlaut in Phase 5.
- ANNAHME: Kein Zurück-Link auf der Projektseite (wie bei Übersichts- und rechtlichen Seiten, NAV-ST-1); Klangland zeigt „‹ Zum Kalender“.
- ANNAHME: „Getrennt durch eine Linie“ meint eine Trennlinie oberhalb des Eintrags im geöffneten Menü.
- ANNAHME: Die Datenschutzerklärung nennt den PayPal-Link (RCH-UB-6), da die Seite einen Link zu einem Drittanbieter enthält.
- ANNAHME: Die Idee-Datei und `docs/grafics/` sind nicht committet (`??`); der Branch zweigt von `main` ab, die Löschung von `docs/qr-praktische-fotografie.png` (Verschiebung nach `docs/grafics/`) bleibt unberührt.

## Qualitätserwartungen
Q-USE-20; zusätzlich Q-USE-12, Q-USE-4, Q-SEC-2, Q-SEO-2, Q-SEO-3.

## Definition of Done
- Spezifikation konsistent; Szenarien aus `projekt.feature` als Tests umgesetzt.
- Build, `npm test`, `npm run web:test`, `npm run lint:all` grün.

## Risiken
- Spendenlink gehört evtl. zu Klangland (siehe Annahme).
- Bildgrößen können Q-PERF-Maße belasten (Bilder verkleinern, `loading="lazy"`).
- Menü mit Trennlinie darf Q-USE-12 (Tastatur, Fokus) nicht verschlechtern.

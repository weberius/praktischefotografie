# SERVICE-05-STORY-03 – Festivals in der Webanwendung

**Als** Festivalbesucher:in **möchte ich** ein Festival mit Zeitraum und allen beteiligten Ausstellungen sehen **damit** ich weiß, welche Ausstellungen zum Festival gehören.

## Akzeptanzkriterien
1. Es gibt eine Übersicht der Festivals mit Titel, Veranstalter, Zeitraum und Stadt.
2. Eine Festivalseite zeigt Stammdaten, Veranstalter und alle zugeordneten Ausstellungen mit Ort und Zeitraum; offizielle Partner sind erkennbar.
3. Die Veranstalterseite nennt die Festivals des Veranstalters, und die Ausstellungsseite verweist auf das Festival.
4. Der bisherige Filter nach Veranstalter in Karte und Ortsverzeichnis bleibt nutzbar (jetzt über Festivals).
5. Ein Festival ohne Ausstellungen zeigt einen Hinweis.

## Abgrenzung
Festival-Kartenmodus und Tagesroute (PRD Phase 3).

## Abhängigkeiten
STORY-01

## Spezifikation (Phase 3)
- EARS: FST-UB-1 bis FST-UB-5, FST-ST-1 bis FST-ST-3, ORG-UB-5 bis ORG-UB-8 (ersetzen ORG-UB-3, ORG-UB-4), EXH-OP-2 (ersetzt EXH-OP-1), NAV-UB-5, NAV-UB-6 (ersetzen NAV-UB-1, NAV-UB-2)
- Gherkin: `web/festivals.feature`, `web/veranstalter.feature`, `web/ausstellungen.feature`, `web/navigation.feature`
- Quality: Q-USE-2 bis Q-USE-4, Q-SEO-1 bis Q-SEO-3
- ADR: ADR-009, ADR-002, ADR-004

**INVEST:** I (abhängig) N ✔ V ✔ E ✔ S (grenzwertig) T ✔

# SERVICE-16-STORY-01 – Wikipedia in allen Sprachen recherchieren und als Links speichern

**Als** Redakteur:in **möchte ich**, dass die Recherche alle Sprachversionen einer Person in der Wikipedia berücksichtigt und als Links festhält, **damit** der Text über die Person auf mehr als zwei oder drei Anfangstexten beruht und alle Artikel nachvollziehbar bleiben.

## Akzeptanzkriterien
1. Die Kandidatendatei nennt alle Sprachversionen der Person mit Sprache, Titel und Adresse.
2. Die Anfangstexte werden für mehr Sprachversionen als bisher (bis zu zehn) herangezogen; die Reihenfolge der Sprachen bleibt festgelegt.
3. Alle Adressen der Sprachversionen stehen in der Linksammlung, ohne Dubletten und ohne dass Vorhandenes verloren geht.
4. Die Prüfung der Zusammenfassung erlaubt bis zu zehn Quellsprachen und prüft weiterhin auf wörtliche Übernahmen aus allen genutzten Anfangstexten.
5. Die Belastung von Wikimedia bleibt begrenzt (Abstand, Zwischenspeicher, Offline).

## Abhängigkeiten
Keine (setzt auf RSF und die Linksammlung aus SERVICE-15 auf).

## Spezifikation (Phase 3, vorab erstellt)
- EARS: RAS-UB-1, RAS-UB-2 (ersetzt RSF-UB-2)
- Gherkin: `setup/recherche-in-allen-sprachen.feature` („Alle Sprachversionen als Links“, „Anfangstexte bis zu zehn Sprachen“)
- Quality: Q-DATA-16, Q-SEC-5 (unverändert)
- ADR: ADR-020 (Proposed); ADR-012

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

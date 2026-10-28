# SERVICE-06-STORY-02 – Profil im Datenmodell

**Als** Redakteur:in **möchte ich** zu Fotograf:innen Lebensdaten, eine Wikipedia-Zusammenfassung mit Quellen und ein Portrait mit Bildnachweis erfassen **damit** die Webanwendung Profile wie bei den Komponist:innen in klangland zeigen kann.

## Akzeptanzkriterien
1. Berufsbezeichnung (nach Wikipedia, z. B. Fotografin oder Medienkünstler), Lebensdaten, Wikipedia-Zusammenfassung (40 bis 90 Wörter, mit Quellen in mehreren Sprachen) und Portrait (Datei, Urheber, Lizenz, Dateiseite) lassen sich je Person erfassen.
2. Ein Portrait ohne Urheber oder Lizenz, mit fehlender oder zu großer Datei oder mit fremder Quelle wird bei der Datenprüfung gemeldet.
3. Ungültige Lebensdaten und doppelte Namen werden gemeldet.
4. Portraitdateien stehen der Webanwendung nach dem Build zur Verfügung.
5. Bestehende Daten bleiben gültig.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: PRF-UB-1 bis PRF-UB-3, PRF-UN-1, PRF-UN-2, PRF-UB-5
- Gherkin: `content/fotografinnen-profile.feature`
- Quality: Q-DATA-7, Q-DATA-8, Q-DATA-1
- ADR: ADR-011

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔

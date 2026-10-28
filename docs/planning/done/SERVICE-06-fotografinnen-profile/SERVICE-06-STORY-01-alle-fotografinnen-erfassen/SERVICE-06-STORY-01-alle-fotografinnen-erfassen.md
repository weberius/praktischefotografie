# SERVICE-06-STORY-01 – Alle genannten Fotograf:innen erfassen

**Als** Redakteur:in **möchte ich** dass alle in einem Ausstellungstext genannten Personen mit gezeigten Bildern als Personen erfasst, mit der Ausstellung verknüpft und in deren Beschreibung aufgeführt werden **damit** Besucher:innen zu jeder Ausstellung alle Beteiligten finden.

## Akzeptanzkriterien
1. Jede im Ausstellungstext genannte Person, deren Bilder in der Ausstellung gezeigt werden, steht als Person unter Fotograf:innen und in `photographerIds` der Ausstellung; alle Namen werden übernommen, Studios und Duos zählen wie genannt. Kurator:innen, Sammler:innen, Musiker:innen und andere ohne gezeigte Bilder werden nicht erfasst.
2. Die Beschreibung der Ausstellung nennt alle diese Namen.
3. Die Datenprüfung meldet eine Ausstellung mit Personen, deren Beschreibung fehlt oder einen Namen nicht nennt.
4. Die Datenaktualisierung (Skill `update-venue-data`) befolgt das bei neuen Ausstellungen und verwirft Vorschläge, bei denen ein Name fehlt.
5. Der Bestand ist migriert: „Mysterium der Paare“ mit allen Namen der Seite (57 Namen), die anderen fünf Ausstellungen mit vollständiger Beschreibung.
6. Jede Person ist über die Liste der Fotograf:innen auffindbar und verlinkt ihre Ausstellungen.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: PRF-UB-4, PRF-UN-2, UPD-UB-9, SKL-UB-7
- Gherkin: `content/fotografinnen-profile.feature`, `setup/datenaktualisierung.feature`, `setup/update-skill.feature`
- Quality: Q-DATA-9, Q-DATA-7
- ADR: ADR-011

**INVEST:** I ✔ N ✔ V ✔ E (Migration von 57 Namen: grob) S (grenzwertig) T ✔

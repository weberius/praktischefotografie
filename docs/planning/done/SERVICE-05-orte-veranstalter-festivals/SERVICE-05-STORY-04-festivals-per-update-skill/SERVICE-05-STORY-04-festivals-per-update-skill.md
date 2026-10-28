# SERVICE-05-STORY-04 – Festivals per Update-Skill pflegen

**Als** Redakteur:in **möchte ich** dass der Update-Skill auch Veranstalter, Festivals und die Festivalzuordnung von Ausstellungen aus den Webseiten vorschlägt **damit** die Festivaldaten aktuell bleiben, ohne dass ich sie von Hand recherchiere.

## Akzeptanzkriterien
1. Der Skill kann Veranstalter und Festivals mit Fundstelle vorschlagen und nach Freigabe übernehmen.
2. Der Skill kann bei neuen Ausstellungen das Festival und die Partnerkennzeichnung vorschlagen, wenn die Seite sie belegt.
3. Die Regeln der Vorschläge (Fundstelle im Snapshot, Freigabe, Dublettenschutz, Schutz verifizierter Orte) gelten unverändert.
4. Festivals ohne belegten Zeitraum werden nicht vorgeschlagen.
5. Die Webseiten von Veranstaltern können wie Orte abgerufen werden (Regeln aus ADR-006).

## Abhängigkeiten
STORY-01, SERVICE-03-STORY-02 und -03

## Spezifikation (Phase 3)
- EARS: FET-OP-2, UPD-UB-6 bis UPD-UB-8, UPD-UN-3, UPD-OP-2, SKL-UB-6
- Gherkin: `setup/webseiten-abruf.feature`, `setup/datenaktualisierung.feature`, `setup/update-skill.feature`
- Quality: Q-DATA-6, Q-SEC-4
- ADR: ADR-010 (Proposed), ADR-006, ADR-007

**INVEST:** I (abhängig) N ✔ V ✔ E ✔ S (grenzwertig) T ✔

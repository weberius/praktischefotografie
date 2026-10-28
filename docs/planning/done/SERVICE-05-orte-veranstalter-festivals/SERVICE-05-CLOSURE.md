# Closure: SERVICE-05 – Weitere Orte, Veranstalter und Festivals

**Datum:** 2026-10-28

## Erreichtes
- Dreistufiges Datenmodell: Venues, Organizer (neue optionale Felder) und Festivals (`festivals.json`, Schema, Validierung); `festivalId` verweist auf Festivals, `isOfficialFestivalPartner` kennzeichnet Partner; Orte und Veranstalter teilen keine IDs.
- Neue Daten: fotoraum köln, Michael Horbach Stiftung, Internationale Photoszene Köln gUG, düsseldorf photo+, Photoszene-Festival 2027 (14.05.–13.06.2027), Ausstellung „Men Don't Cry“ mit Fotograf Hannes Jung.
- Webanwendung: Festivalübersicht und Festivalseite, Navigation, Prerender, Filter `festival` und `organizer` (über Festivals), Veranstalter- und Ausstellungsseite mit Festivalbezug, Beschreibung, Instagram und „Offizieller Partner“.
- Update-Skill: Veranstalter als Abrufquelle, Vorschlagsregeln für Veranstalter und Festivals (Bereich je Quelle, Dubletten, Festival nur mit belegtem Zeitraum), Skill-Regeln und Dokumentation.
- Spezifikation: 30 neue Anforderungen (FES 8, FST 8, ORG 4, EXH 1, NAV 2, FET 1, UPD 5, SKL 1), 5 ersetzte Anforderungen per Supersede, Q-DATA-5, Q-DATA-6, ADR-009 und ADR-010 accepted.
- Prüfung: 140 Tests im Repo-Root (offline) und 170 Web-Tests grün, Lint und Datenvalidierung grün, Build prerendert die Festivalseiten.

## Abweichungen
- Phase 7 (Review) nicht durchgeführt: keine `review-*`-Skills vorhanden.
- Nicht geprüft: Aussehen im Browser, axe-/Lighthouse-Läufe, ein vollständiger Skill-Lauf mit Veranstalter-Websites, Abruf der echten Seiten.
- Abweichungen zur Vorgabe (gUG statt e.V., Zeitraum des Festivals, Festival-Website, Zahl der Ausstellungen) sind in der Recherche und im Changelog von STORY-02 dokumentiert.

## Rückläufe
Keine. Eine Berichtigung an der Recherche (Festival-Zeitraum auf der Festivalseite belegt) wurde vor H2 eingearbeitet.

## Erkenntnisse
- Der Bedeutungswechsel von `festivalId` (Veranstalter → Festival) ließ sich ohne Datenmigration umsetzen, weil keine Ausstellung `festivalId` nutzte; Web und Spezifikation mussten angepasst werden (Supersede).
- Die Startseite einer Website nennt oft weniger als die Unterseite: Der exakte Zeitraum stand nur auf der Festivalseite. Eine Zusammenfassung durch Werkzeuge ist kein Beleg; Fundstellen müssen auf der konkreten Seite stehen.
- Die Website der Horbach Stiftung hat ein ungültiges TLS-Zertifikat; der Abruf per Skill wird fehlschlagen und muss im Bericht auftauchen (nicht umgehen).
- Die generische Quellenabstraktion (`id` plus `website`) im Abrufdienst machte Veranstalter als Quelle fast kostenlos.

## Follow-ups / empfohlene Tickets
1. Ersten Lauf von `/update-venue-data` für die neuen Quellen (fotoraum köln, Photoszene, düsseldorf photo+) durchführen; Horbach-Website separat klären.
2. düsseldorf photo+ 2027 erfassen, sobald der Zeitraum belegt ist; Träger und Impressum auswerten.
3. Weitere Kandidaten aus der Recherche (Zentrum für Fotografie Essen, darktaxa, Archive der Photoszene u. a.).
4. Festival-Kartenmodus mit Tagesroute (PRD Phase 3).
5. Eigener Typ oder Rechtsformfeld für Veranstalter (gUG passt in keinen `type`).
6. Review-Skills anlegen.

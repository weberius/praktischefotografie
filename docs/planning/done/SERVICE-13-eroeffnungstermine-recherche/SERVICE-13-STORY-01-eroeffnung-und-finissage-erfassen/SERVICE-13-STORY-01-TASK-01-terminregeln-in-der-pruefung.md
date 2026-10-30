# SERVICE-13-STORY-01-TASK-01-terminregeln-in-der-pruefung – Terminevents in der Vorschlagsprüfung

**Story:** SERVICE-13-STORY-01  ·  **Status:** Umgesetzt
**EARS:** OPN-UB-1, OPN-UB-3 bis OPN-UB-8, OPN-UN-1 (OPN-UB-2 durch Skill, Task 02)
**Gherkin:** setup/eroeffnungstermine.feature · Vernissage aus Eröffnungshinweis, Finissage aus Finissagehinweis, Titel und Kennung (je Typ), Keine doppelte Vernissage/Finissage, Keine Finissage ohne Beleg, Vergangener Termin, Uhrzeit ohne Beleg
**Quality:** Q-DATA-12, Q-DATA-3
**ADR:** ADR-007

## Vorgehen
- Neues Modul `scripts/scrape/lib/termine.mjs`: Stichwörter und Datumserkennung (Eröffnung, Finissage), Uhrzeiterkennung; gemeinsam mit dem Bericht (STORY-02) genutzt.
- `proposals.mjs`: für `events` mit Typ `vernissage`/`finissage` (op add): Titelpräfix, Ausstellung desselben Ortes (vorhanden oder zuvor ergänzt), `id` = `<Ausstellungs-id>-eroeffnung|-finissage`, Fundstelle mit Stichwort des Typs, Datum nicht vor heute (`--date` bzw. Heute), Uhrzeit in `description` nur mit Uhrzeit im Textauszug; die Fundstellenprüfung vergleicht den Ausstellungstitel statt des Event-Titels.
- Tests mit Fixtures (Zander „Between“ als Grundlage).

## Prüfkriterium
Alle Szenarien der Feature-Datei (ohne Bericht) als Tests grün; Q-DATA-12: ≥ 9 Fixtures richtig behandelt; Prüf-Gate grün.

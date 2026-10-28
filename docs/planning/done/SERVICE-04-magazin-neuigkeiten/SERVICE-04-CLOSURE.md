# Closure: SERVICE-04 – Magazin-Neuigkeiten bei der Datenpflege

**Datum:** 2026-10-28

## Erreichtes
- Neuigkeitenpflege (`scripts/news/`): `news:plan` (fehlende und geänderte Anlässe `neu`, `eroeffnung`, `endet-bald`, `ende`, vorab datiert), `news:check` (60–80 Wörter, Titel, Ort, Künstler:innen, kein HTML, Kurztext, Bericht `NEWS.md`), `news:apply` (nur freigegebene, gültige Einträge, Validierung, Rollback).
- Skill `/update-venue-data` pflegt nach der Datenübernahme das Magazin: Planung, Textbildung nach Regeln (absolute Daten, nichts erfunden), Prüfung, Freigabe, Übernahme.
- Spezifikation: 15 Anforderungen (13 NWS, 2 SKL), 18 Szenarien, Q-DATA-4, Q-REL-2, Q-MAIN-3, ADR-008 accepted.
- Prüfung: 111 Tests im Repo-Root grün (offline), Lint und Datenvalidierung grün.

## Abweichungen
- Phase 7 (Review) nicht durchgeführt: keine `review-*`-Skills vorhanden.
- Kein vollständiger Skill-Lauf mit echter Textbildung; die Anzeige im Magazin mit realen Beiträgen wurde nicht geprüft (keine Web-Änderung).

## Rückläufe
Keine.

## Erkenntnisse
- Eine deterministische Kennung `<Ausstellungs-id>-<Anlass>` ersetzt ein neues Schemafeld und liefert Dublettenschutz und Wiedererkennung.
- Vorab datierte Beiträge entkoppeln die Meldungen von den Lauftagen, da das Magazin Zukünftiges ausblendet (BLG-UN-1).
- Automatisch prüfbar sind nur Form und Namen im Text; die Sachrichtigkeit bleibt bei der Freigabe durch die Redaktion.

## Follow-ups / empfohlene Tickets
1. Ersten echten Lauf durchführen: beim Bestand entstehen 39 Beiträge; ggf. je Ort mit `--venue` freigeben.
2. Anzeige im Magazin mit realen Beiträgen prüfen (Zukunftsdatum, Verlinkung von Ort und Ausstellung).
3. Hinweis auf verwaiste Beiträge mit eigenem Löschweg.
4. Review-Skills anlegen.

# SERVICE-04 – Magazin-Neuigkeiten bei der Datenpflege

**Status:** Entwurf, an H1 geklärt (Freigabe steht aus)  ·  **Quelle:** Vorgabe der Projektleitung, [PRD](../../../product/prd.md) 2.1 und 3.2, Ergebnis von SERVICE-02 und SERVICE-03

## Ziel
Bei jeder Datenpflege (`/update-venue-data`) pflegt der Skill auch das Magazin: Zu neuen, eröffnenden, bald endenden und beendeten Ausstellungen entstehen Beiträge mit je 60 bis 80 Wörtern.

**Zweck in einem Satz:** Besucher:innen sollen im Magazin sehen, was neu ist, was heute eröffnet und was bald endet, ohne dass die Redaktion dafür einen weiteren Schritt aufrufen muss.

**Erfolgskriterien**
- Ein Aufruf des Skills pflegt Daten und Magazin.
- Zu jedem Anlass gibt es je Ausstellung höchstens einen Beitrag; wiederholte Läufe erzeugen keine Dubletten.
- Jeder Text hat 60 bis 80 Wörter und nennt Ausstellung, Künstler:innen und Ort ohne erfundene Angaben.
- Eröffnungs-, „Endet bald“- und Ende-Beiträge erscheinen am richtigen Tag, auch wenn an dem Tag kein Lauf stattfindet.

## Kontext
Das Magazin (`/`) listet Beiträge aus `data/posts.json` mit Markdown-Text unter `content/posts/`; Beiträge mit Datum in der Zukunft werden nicht angezeigt (BLG-UN-1). `data/posts.json` ist leer, 13 Ausstellungen sind erfasst. Der Skill `update-venue-data` ändert `data/` nur nach Freigabe (ADR-007). „Endet bald“ ist in `web/src/app/core/exhibition-status.ts` definiert (höchstens 14 Tage bis zum Ende).

## Abgrenzung
**Enthalten:** Erzeugen, Anpassen und Freigeben von Neuigkeiten-Beiträgen im Lauf des Skills, Dublettenschutz, Bericht.
**Nicht enthalten:**
- Neuigkeiten zu Events, Orten oder Fotograf:innen.
- Redaktionelle Beiträge von Hand (Guides, Rezensionen) und Änderungen an Darstellung und Aufbau des Magazins.
- Automatische, zeitgesteuerte Läufe.
- Neue Abrufe über `data:fetch` hinaus.

## Erwarteter Story-Schnitt
Eine Story (`STORY-01`): Neuigkeiten bei der Datenpflege.

## Betroffene Bereiche
`setup` (Skill, Skripte), `content` (Beiträge, Schema), `web` (nur Verknüpfung und Anzeige, falls nötig).

## Qualitätserwartungen
Q-DATA (Nachvollziehbarkeit, Quellentreue der Texte), Q-MAIN (offline testbar), Q-SEC (Textbereinigung, BLG-UB-5), Q-REL (Idempotenz).

## Definition of Done
- Spezifikation konsistent; neue ADRs bestätigt.
- `npm test`, `npm run lint` und `npm run validate:data` grün; Tests ohne Netz.
- Ein Probelauf erzeugt Beiträge für den Bestand; die Texte sind an H2 vom Menschen geprüft.

## Risiken
- **Fachlich:** Texte aus Modell und Daten können Angaben erfinden; Gegenmaßnahme: nur belegte Angaben, Freigabe der Texte, Wortzahl prüfbar.
- **Fachlich:** Terminänderungen machen vorab angelegte Beiträge falsch; Gegenmaßnahme: Abgleich bei jedem Lauf (Beitrag anpassen oder entfernen, mit Freigabe).
- **Prozess:** Textbildung erfolgt durch Claude im Skill und lässt sich nur auf Form (Wortzahl, Verknüpfung, Datum) automatisch prüfen.

## Entschieden an H1
- Zeitpunkt: Beiträge werden beim Fund **vorab mit Zukunftsdatum** angelegt (Eröffnung, „Endet bald“ = Ende minus 14 Tage, Ende = Enddatum plus 1); das Magazin blendet sie bis dahin aus.
- Freigabe: Texte werden im bestehenden **Freigabeschritt des Skills** gezeigt und freigegeben.
- Bestand: **Alles nachtragen**, auch vergangene Anlässe mit ihrem Datum.
- Story-Schnitt: **eine Story**.

## ANNAHMEN
- ANNAHME: Der Anlass „Neu gefunden“ gilt nur für Ausstellungen, die der Lauf neu aufnimmt (Datum = Fundtag). Für den Bestand entstehen Beiträge zu Eröffnung, „Endet bald“ und Ende.
- ANNAHME: Beiträge sind regulär Einträge in `posts.json` mit `linkedVenueIds` und `linkedExhibitionIds` plus Markdown unter `content/posts/`; Schemaänderungen nur, wenn Anlass und Ausstellung sonst nicht eindeutig erkennbar sind (Dublettenschutz).
- ANNAHME: Ist eine Ausstellung kürzer als 14 Tage, entfällt der „Endet bald“-Beitrag, wenn er zeitlich vor oder mit der Eröffnung läge.
- ANNAHME: Der Text nennt Künstler:innen aus `photographerIds` bzw. belegten Angaben; fehlen sie, wird darauf verzichtet, nichts erfunden.

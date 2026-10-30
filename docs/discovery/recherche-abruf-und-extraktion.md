# Recherche: Abruf und Extraktion im Skill `update-venue-data`

**Stand:** 2026-10-30  ·  **Anlass:** Idee [`idee-004-recherche`](../product/ideen/idee-004-recherche.md)  ·  **Methode:** Durchsicht von `scripts/scrape/`, ADR-006/007, `.cache/snapshots/` und `data/`; kein Netzabruf.

## Frage
Findet der Skill bei „Between“ (Zander Galerie) nicht, dass Candida Höfer am 07.11.2026 von 16:00 bis 18:00 Uhr bei der Eröffnung anwesend ist. Wäre es besser, die Seiten per `wget` bzw. Python in ein temporäres Verzeichnis zu laden, dort auf Aktualisierungen zu untersuchen, die Einträge zu machen und die Daten wieder zu löschen?

## Befund 1: Das beschriebene Vorgehen gibt es bereits
`npm run data:fetch` (ADR-006) lädt Startseite und bis zu fünf Unterseiten je Quelle mit `fetch`, beachtet `robots.txt`, hält 2 s Abstand und kennzeichnet sich mit `SCRAPE_CONTACT` im `User-Agent`. Der bereinigte Text liegt als Snapshot unter `.cache/snapshots/<id>/` (nicht versioniert, nicht im Build, `.cache/` ist ignoriert). Die Extraktion (ADR-007) liest diese Snapshots, nicht die Live-Seite. `wget` oder Python würden dieselben Seiten mit denselben Regeln laden; ein Wechsel brächte keinen Informationsgewinn.

## Befund 2: Die Information lag im Snapshot vor
Der Snapshot `https://zandergalerie.com/exhibitions/between-238e989f/` (abgerufen 2026-10-27) enthält wörtlich: „Opening: Saturday, 7 November 2026, 4-6pm The artist is present. Introduction by Prof. (em.) Dr. Herbert Burkert at 4:30 pm.“ Der Abruf hat also nichts übersehen; die **Extraktion** hat den Termin nicht übernommen.

## Ursache
- Der Skill kennt kein Ziel für Eröffnungstermine: Seine Zielfelder (Ort, Ausstellung, Fotograf:innen, Veranstalter, Festivals) enthalten weder Uhrzeit noch Anwesenheit; die `description` der Ausstellung (Schema) trägt nur Inhalt der Ausstellung.
- Das Schema `events` kennt `eventType: vernissage`, die Webanwendung zeigt es als „Vernissage“ (`web/src/app/core/models.ts`); `data/events.json` enthält aber keine einzige Vernissage. Der Anlass `eroeffnung` im Magazin leitet sich nur aus `startDate` ab (NWS-UB-2) und kennt Uhrzeit und Anwesenheit nicht.
- Es gibt keine Kontrolle, die zeigt, was in den Snapshots steht und nicht verarbeitet wurde. Ein Stichwort-Zähler über die Snapshots findet Eröffnungshinweise (Vernissage, „Opening:“, „Eröffnung“ mit Datum) bei sieben Quellen (u. a. Fotografie Forum Monschau, Michael Horbach Stiftung, Photobookmuseum, Schloss Moyland, Zander Galerie); keiner ist als Event erfasst.

## Bewertung der Wege
| Weg | Ergebnis |
| --- | --- |
| Abruf per `wget`/Python in Temp-Ordner, danach löschen | Gleiche Seiten, gleiche Regeln; Verlust der Snapshots als Beleg für den Prüfer (Fundstelle muss im Snapshot stehen, UPD-UB-2). Kein Nutzen. |
| Mehr Seiten je Quelle abrufen | Hier nicht nötig (die Detailseite wurde abgerufen). Mehr Last bei Betreibern (Q-SEC-4); nicht Teil dieses Wunsches. |
| Headless-Browser | Nur bei Seiten ohne Text nötig; bei Zander nicht (ADR-006, Alternativen). |
| **Extraktion um Eröffnungstermine erweitern, Abdeckung im Bericht sichtbar machen** | Behebt die Ursache, ohne Schema, Abrufdienst oder Netzlast zu ändern. **Empfohlen.** |

## Folgerung
Abrufweg und Snapshot-Cache bleiben (ADR-006/007 gelten weiter). Gebraucht werden: (1) Eröffnungstermine als `vernissage`-Events vorschlagen (Datum, Uhrzeit, Anwesenheit der Künstler:innen in der `description`), (2) ein Bericht, der je Quelle zeigt, wie viele Snapshots Eröffnungshinweise enthalten und was daraus wurde.

## Offen
- Uhrzeit bleibt Text in der `description`, weil das Schema nur Datumsfelder kennt; ein strukturiertes Feld (`startTime`) wäre eine Schemaänderung samt Anzeige und ist nicht Teil dieses Vorhabens.

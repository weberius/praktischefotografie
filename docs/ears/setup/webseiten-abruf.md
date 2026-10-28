# EARS: Abruf der Webseiten von Orten (Kürzel `FET`)

**Bereich:** setup  ·  **Systemname:** Abrufdienst  ·  **Stand:** 2026-10-27 (FET-EV-1 und FET-UN-2 präzisiert: „Host“ → „Website“, ersetzt die frühere Fassung wegen eines Befunds im ersten Live-Lauf)

Begriffe: „dieselbe Website“ heißt gleicher Host, wobei ein führendes `www.` nicht als Unterschied zählt (`makk.de` und `www.makk.de` sind dieselbe Website); „heute“ ist das aktuelle Datum; „Snapshot“ ist die lokal gespeicherte Fassung einer abgerufenen Seite; „Vorschlag“ ist eine noch nicht übernommene Änderung.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| FET-EV-1 | Wenn der Abruf für einen Ort gestartet wird, soll der Abrufdienst die Startseite aus `website` und bis zu fünf weitere Seiten derselben Website abrufen, die über Links mit Hinweis auf Programm, Ausstellungen, Veranstaltungen oder Besuch gefunden werden. | `setup/webseiten-abruf.feature` · „Abruf von Startseite und Unterseiten“ | Q-PERF-5 | ADR-006 |
| FET-UB-1 | Der Abrufdienst soll vor dem Abruf die `robots.txt` des Hosts auswerten und nur erlaubte Seiten abrufen; nicht erlaubte Seiten soll er im Bericht nennen. | `setup/webseiten-abruf.feature` · „robots.txt wird beachtet“ | Q-SEC-4 | ADR-006 |
| FET-UB-2 | Der Abrufdienst soll je Host mindestens 2 Sekunden zwischen zwei Anfragen warten, eine Anfrage nach 15 Sekunden abbrechen und Antworten über 2 MB verwerfen. | `setup/webseiten-abruf.feature` · „Höflichkeitsregeln“ | Q-SEC-4 | ADR-006 |
| FET-UB-3 | Der Abrufdienst soll sich im `User-Agent` mit Projektname und der konfigurierten Kontaktadresse (`SCRAPE_CONTACT`) zu erkennen geben und außer im Offline-Modus ohne Kontaktadresse nicht starten. | `setup/webseiten-abruf.feature` · „Kennung im User-Agent“ | Q-SEC-4 | ADR-006 |
| FET-UN-1 | Wenn eine Seite nicht erreichbar ist (HTTP-Status ab 400, Zeitüberschreitung, Namensauflösung), soll der Abrufdienst den Fehler mit Ort und URL im Bericht nennen, mit den übrigen Orten fortfahren und den vorhandenen Snapshot unverändert lassen. | `setup/webseiten-abruf.feature` · „Seite nicht erreichbar“ | Q-REL-1 | ADR-006 |
| FET-UN-2 | Wenn eine Anfrage auf eine andere Website weiterleitet, soll der Abrufdienst der Weiterleitung nicht folgen und sie im Bericht nennen. | `setup/webseiten-abruf.feature` · „Weiterleitung auf anderen Host“ | Q-SEC-4 | ADR-006 |
| FET-UB-4 | Der Abrufdienst soll je abgerufener Seite einen Snapshot mit URL, Abrufzeit, HTTP-Status, Inhaltshash und bereinigtem Text unter `.cache/snapshots/<venue-id>/` ablegen; Snapshots werden nicht versioniert und nicht veröffentlicht. | `setup/webseiten-abruf.feature` · „Snapshot wird gespeichert“ | Q-DATA-3 | ADR-006 |
| FET-OP-1 | Wo `--offline` gewählt ist oder der vorhandene Snapshot jünger ist als `--max-age` (Standard 7 Tage), soll der Abrufdienst keine Netzanfrage senden und den Snapshot verwenden. | `setup/webseiten-abruf.feature` · „Cache und Offline-Modus“ | Q-MAIN-2 | ADR-006 |
| FET-UB-5 | Der Abrufdienst soll nur Adressen mit http oder https abrufen und keine Formulare absenden und sich nirgends anmelden. | `setup/webseiten-abruf.feature` · „Nur lesende Abrufe“ | Q-SEC-4 | ADR-006 |
| FET-OP-2 | Wo ein Veranstalter eine `website` führt, soll der Abrufdienst sie wie die Website eines Ortes abrufen und Snapshots unter `.cache/snapshots/<organizer-id>/` ablegen; `--venue <id>` soll eine Ort- oder Veranstalter-ID annehmen. | `setup/webseiten-abruf.feature` · „Abruf der Website eines Veranstalters“ | Q-SEC-4 | ADR-006, ADR-010 |

**Ergänzung 2026-10-28:** FET-EV-1 gilt sinngemäß für Veranstalter („Quelle“ statt „Ort“); alle Regeln zu `robots.txt`, Abständen, Kennung und Weiterleitungen (FET-UB-1 bis FET-UN-2) gelten unverändert auch für Veranstalter.

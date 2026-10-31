# EARS: Fotograf:innen (Kürzel `PHO`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-10-27

Begriffe: „heute“ ist das aktuelle Datum der Anwendung (in Tests ein fester Referenzwert). Datenfelder siehe `schema/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| PHO-UB-1 | Die Webanwendung soll auf `/photographers` alle Fotograf:innen alphabetisch nach Name auflisten. | `web/fotografinnen.feature` · „Übersicht alphabetisch“ | – | ADR-002 |
| PHO-UB-2 | ~~Die Webanwendung soll auf `/photographers/:id` Name, Kurzbiografie und Website der Person anzeigen.~~ **Ersetzt durch PHO-UB-6.** | `web/fotografinnen.feature` · „Personenseite zeigt Stammdaten“ (ersetzt) | – | ADR-002 |
| PHO-UB-3 | Die Webanwendung soll auf der Personenseite alle Ausstellungen der Person mit Ort und Zeitraum absteigend nach Beginn auflisten. | `web/fotografinnen.feature` · „Personenseite listet Ausstellungen“ | – | ADR-002 |
| PHO-ST-1 | Solange einer Person keine Ausstellung zugeordnet ist, soll die Webanwendung auf der Personenseite einen Hinweis anzeigen. | `web/fotografinnen.feature` · „Person ohne Ausstellung“ | – | ADR-002 |
| PHO-UB-5 | Die Webanwendung soll auf `/photographers` jede Person als Karte mit Name, Berufsbezeichnung und Lebensdaten (soweit vorhanden) und Portrait (soweit vorhanden, verzögert geladen, mit Alternativtext) zeigen und mit `/photographers/:id` verlinken. | `web/fotografinnen.feature` · „Übersicht mit Portrait und Lebensdaten“ | Q-PERF-6 | ADR-002, ADR-011 |
| PHO-UB-6 | Die Webanwendung soll auf `/photographers/:id` Name, Berufsbezeichnung, Lebensdaten, Kurzbiografie und Website der Person anzeigen. | `web/fotografinnen.feature` · „Personenseite zeigt Stammdaten“ | – | ADR-002, ADR-011 |
| PHO-UB-7 | Die Webanwendung soll auf der Personenseite das Portrait mit sichtbarem Bildnachweis (Urheber, Lizenz, Link zur Commons-Dateiseite) anzeigen. | `web/fotografinnen.feature` · „Portrait mit Bildnachweis“ | Q-USE-5 | ADR-011 |
| PHO-UB-8 | Die Webanwendung soll auf der Personenseite unter „Aus der Wikipedia“ die Zusammenfassung, den Hinweis auf Zusammenfassung auf Basis der Wikipedia (CC BY-SA) und je Quelle einen Link auf den Artikel mit Sprachbezeichnung zeigen. | `web/fotografinnen.feature` · „Wikipedia-Zusammenfassung mit Quellen“ | Q-USE-5 | ADR-011 |
| PHO-UB-9 | Die Webanwendung soll auf der Personenseite die Überschrift „Ausstellungen (n)“ mit der Anzahl der Ausstellungen anzeigen. | `web/fotografinnen.feature` · „Personenseite listet Ausstellungen“ | – | ADR-002 |
| PHO-ST-2 | Solange eine Person kein Portrait hat, soll die Webanwendung weder Bild noch Bildnachweis zeigen; solange sie keine Wikipedia-Zusammenfassung hat, soll sie den Abschnitt „Aus der Wikipedia“ nicht zeigen. | `web/fotografinnen.feature` · „Person ohne Portrait und Wikipedia“ | – | ADR-002 |
| PHO-UN-1 | Wenn das Portrait nicht geladen werden kann, soll die Webanwendung die Personenseite ohne Bild und ohne Bildnachweis weiter anzeigen. | `web/fotografinnen.feature` · „Portrait nicht ladbar“ | Q-USE-2 | ADR-002 |

**Supersede 2026-10-28:** PHO-UB-2 wird durch PHO-UB-6 ersetzt (Lebensdaten ergänzt). Darstellung und Aufbau folgen der Komponist:innen-Seite von klangland.
| PHO-UB-10 | Die Webanwendung soll auf der Personenseite jede Ausstellung der Person mit der Badge-Zeile (Art, danach Status) oberhalb der Überschrift zeigen. | `web/fotografinnen.feature` · „Ausstellungen der Person tragen Badges“ | Q-USE-4, Q-USE-7 | ADR-015 |

**Ergänzung 2026-10-28:** PHO-UB-10 ergänzt PHO-UB-3; der Status steht in der Badge-Zeile statt unter dem Zeitraum.

| PHO-UB-11 | Die Webanwendung soll auf der Personenseite, wenn die Person einen Webkurztext hat, unter „Aus dem Web“ die Zusammenfassung, den Hinweis, dass sie aus frei zugänglichen Webseiten zusammengefasst wurde, und je Quelle einen Link mit Titel und Host zeigen; Links sollen sich ohne Referrer in neuem Kontext öffnen. | `web/fotografinnen.feature` · „Webkurztext mit Quellen“ | Q-USE-5, Q-SEC-2 | ADR-019 |
| PHO-ST-3 | Solange eine Person kein Portrait hat, soll die Webanwendung weder Bild noch Bildnachweis zeigen; solange sie keine Wikipedia-Zusammenfassung hat, soll sie den Abschnitt „Aus der Wikipedia“ nicht zeigen; solange sie keinen Webkurztext hat, soll sie den Abschnitt „Aus dem Web“ nicht zeigen. | `web/fotografinnen.feature` · „Person ohne Portrait und Wikipedia“, „Person ohne Webkurztext“ | – | ADR-002 |

**Supersede 2026-10-31:** PHO-ST-3 ersetzt PHO-ST-2 (Abschnitt „Aus dem Web“ ergänzt). PHO-UB-11 ergänzt PHO-UB-8; der Abschnitt „Aus der Wikipedia“ bleibt unverändert.

# SERVICE-15-STORY-01 – Person über eine Suchmaschine recherchieren, Links sammeln, fehlende Person anlegen

**Als** Redakteur:in **möchte ich** eine Person (vor allem Fotograf:innen) über eine Suchmaschine recherchieren, die gefundenen Links in einer Datei sammeln und eine noch fehlende Person anlegen lassen, **damit** ich auch Personen ohne Wikipedia-Eintrag belegt erfasse und die Fundstellen nachvollziehen kann.

## Akzeptanzkriterien
1. Die Websuche startet nur auf ausdrücklichen Wunsch und nur für eine benannte Person; die Wikipedia-Recherche bleibt unverändert möglich.
2. Die Treffer der Suche (Titel, Adresse, Textauszug) werden festgehalten; Umfang und Belastung bleiben begrenzt.
3. Die gefundenen Links stehen in einer Datei, die über mehrere Läufe wächst, ohne Dubletten und ohne dass Vorhandenes verloren geht.
4. Seiten der Treffer werden nur rücksichtsvoll abgerufen (Regeln der Betreiber, Abstand, Kennung).
5. Gibt es die Person noch nicht, wird sie nach Freigabe mit Namen angelegt; eine vorhandene Person wird nie doppelt angelegt.
6. Ohne Treffer oder bei Fehlern bleibt alles unverändert und der Bericht nennt den Grund.
7. Offline oder bei frischen Zwischenspeichern entstehen keine Netzanfragen.
8. Der Bericht nennt Suchmaschine, Zahl der Anfragen, Treffer, neuen Links und angelegten Personen.

## Abhängigkeiten
Keine (setzt auf die bestehende Recherche RSF und den Abrufdienst FET auf).

## Spezifikation (Phase 3, vorab erstellt)
- EARS: WSP-UB-1, WSP-EV-1, WSP-UB-2, WSP-UB-3, WSP-OP-1, WSP-UN-1, WSP-EV-2, WSP-UN-2, WSP-EV-4
- Gherkin: `setup/personen-websuche.feature` (Websuche nur auf Wunsch, Treffer werden festgehalten, Linksammlung wird fortgeschrieben, Trefferseiten höflich abrufen, Offline und Cache der Suche, Suche ohne Treffer, Neue Person wird angelegt, Vorhandene Person wird nicht doppelt angelegt, Bericht der Websuche)
- Quality: Q-SEC-7, Q-DATA-14, Q-MAIN-6
- ADR: ADR-019 (Proposed); ADR-006, ADR-007, ADR-012

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔ (echte Suchmaschine nur per Handprobe)

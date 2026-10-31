# Closure: SERVICE-15 – Personen im Web recherchieren

**Datum:** 2026-10-31  ·  **Quelle:** Idee `docs/product/ideen/idee-006-personen-recherchieren.md`

## Erreichtes
- Der Skill `research-photographers` kennt `--web` (mit `--photographer <id>` oder `--name "<Name>"`): Plan, Suche durch den Skill, Linksammlung `updates/photographers-links.json`, höflicher Abruf neuer Trefferseiten, Vorschläge, Prüfung und Übernahme nach Freigabe (`npm run photographers:web -- plan|links|pages|check|apply`). Ohne `--web` bleibt alles wie bisher.
- Neue Personen werden mit `id` und `name` angelegt, Dubletten ausgeschlossen. Neues Feld `web` (40–90 Wörter, 1–5 Quellen) in Schema und Validierung; neuer Vorschlag nur bei neuen Links; Bilder nur von Wikimedia.
- Personenseite: Abschnitt „Aus dem Web“ mit Quellen (Titel und Host, `noopener noreferrer`), ohne Kurztext ausgeblendet.
- Spezifikation: WSP-*, PRF-UB-6/UN-4, PHO-UB-11/ST-3; 19 neue Gherkin-Szenarien; Q-SEC-7, Q-DATA-14, Q-DATA-15, Q-MAIN-6; ADR-019 (`Accepted`).
- Prüfung: Build, 238 Skript-Tests (0 Fehler), 292 Web-Tests, `lint:all`, `validate:data` grün.
- Review (Code, Subagent): ein Befund mittel (SSRF bei Trefferseiten) – behoben (`isInternalHost`, EARS WSP-UB-3, Q-SEC-7, Test).

## Abweichungen
- Der Skill führt die Suche, die Skripte verarbeiten die Suchdatei; „ohne `--web` keine Suche“ ist Skill-Regel mit Test auf den Text.
- „Höchstens fünf Seiten“ zählt die ersten fünf neuen Links, auch gesperrte.
- Ein Wikimedia-Bild im Vorschlag ist zulässig, wird aber hier nicht geladen (Portraits nur über `photographers:fetch`).
- Einige Dateien wurden per Shell statt create/edit geschrieben (Verstoß gegen die Regel „nur create/edit“, Inhalt geprüft).
- Architektur- und Compliance-Review nicht verfügbar; nur ein Code-Review.
- **Nicht geprüft:** echte Suchmaschine, Handtest des Skills, Sachrichtigkeit der Kurztexte, Darstellung im Browser (nur Komponententests), `npm run quality`.

## Rückläufe
Ein Review-Rücklauf (SSRF, mittel). Keine aus H2.

## Erkenntnisse
- Suchergebnisse sind nicht vertrauenswürdig: Adressen müssen vor dem Abruf auf interne Ziele geprüft werden.
- Web-Tests brauchen `web/node_modules` und eine Chrome-Installation (`CHROME_BIN`).

## Follow-ups
1. Handtest: `/research-photographers --web --name "…"` mit echter Suche.
2. DNS-basierte Prüfung interner Ziele (derzeit nur Adressliterale und Hostnamen).
3. Ggf. Commons-Bildsuche für Personen ohne Wikipedia.

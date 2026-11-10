# EARS: Eigene Quellen für Personen (Kürzel `PQL`)

**Bereich:** setup  ·  **Systemname:** Personen-Recherche  ·  **Stand:** 2026-11-10

Ergänzt `personen-websuche.md` (WSP) und `recherche-in-allen-sprachen.md` (RAS); deren Regeln gelten fort. Begriffe wie dort. „Eigene Adresse“ ist eine Webadresse, die die Redaktion der Recherche mit `--url` nennt, weil sie die Seite als Quelle zu einer Person kennt.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| PQL-UB-1 | Der Skill `research-photographers` soll `--url <adresse>` (mehrfach angebbar) zusammen mit `--photographer <id>` oder `--name "<Name>"` anbieten; ohne Person soll er mit einem Hinweis enden. | `setup/personen-quellen.feature` · „Eigene Adressen nur mit Person“ | Q-DATA-18 | ADR-019 |
| PQL-EV-1 | Wenn eigene Adressen genannt werden, soll die Recherche sie in die Linksammlung der Person übernehmen (`query` = `manuell`, `title` aus dem Seitentitel, sonst der Host, `foundAt`) und dabei die Regeln aus WSP-UB-2 anwenden (nur http und https, ohne Fragment und Tracking-Parameter, keine Dubletten, vorhandene Einträge unverändert); eine so hinzugekommene Adresse gilt als neuer Link im Sinn von WSP-EV-3. | `setup/personen-quellen.feature` · „Eigene Adressen in der Linksammlung“ | Q-DATA-18 | ADR-019 |
| PQL-UB-2 | Die Recherche soll die Seiten eigener Adressen vor den Treffern der Websuche abrufen, innerhalb der Grenze aus RAS-UB-4, nach denselben Regeln wie der Abrufdienst (WSP-UB-3), und die Seiten auch dann abrufen, wenn die Websuche mit `--no-web` ausgelassen wird. | `setup/personen-quellen.feature` · „Eigene Seiten zuerst und höflich“ | Q-SEC-13 | ADR-006, ADR-019 |
| PQL-UN-1 | Wenn eine eigene Adresse kein http oder https nutzt, auf einen internen Host zeigt oder kein gültiges URL-Format hat, soll die Recherche sie nicht übernehmen und nicht abrufen, sie im Bericht mit Grund nennen und mit den übrigen Adressen fortfahren. | `setup/personen-quellen.feature` · „Ungültige eigene Adresse“ | Q-SEC-13 | ADR-019 |
| PQL-EV-2 | Wenn ein Lauf mit eigenen Adressen endet, soll die Recherche im Bericht (WSP-EV-4) je Person die eigenen Adressen mit Ergebnis (übernommen, schon vorhanden, abgelehnt, gesperrt, nicht abrufbar) nennen. | `setup/personen-quellen.feature` · „Bericht nennt eigene Adressen“ | Q-DATA-18 | ADR-019 |

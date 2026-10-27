# EARS: Build und Veröffentlichung der Webanwendung (Kürzel `BLD`)

**Bereich:** setup  ·  **Systemname:** Build-System  ·  **Stand:** 2026-10-27

Begriffe: „heute“ ist das aktuelle Datum der Anwendung (in Tests ein fester Referenzwert). Datenfelder siehe `schema/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| BLD-EV-1 | Wenn der Produktionsbuild gestartet wird, soll das Build-System `data/` nach `web/public/data` und `content/` nach `web/public/content` kopieren, nachdem die Datenvalidierung bestanden ist. | `setup/web-build.feature` · „Build kopiert validierte Daten“ | Q-MAIN-1 | ADR-003 |
| BLD-UN-1 | Wenn die Datenvalidierung beim Build fehlschlägt, soll das Build-System den Build abbrechen und die Validierungsfehler ausgeben. | `setup/web-build.feature` · „Build bricht bei ungültigen Daten ab“ | Q-DATA-1 | ADR-003 |
| BLD-UB-1 | Das Build-System soll beim Produktionsbuild für jede Adresse aus NAV-UB-2 eine vorab gerenderte Seite erzeugen, deren Inhalt ohne Skriptausführung lesbar ist. | `setup/web-build.feature` · „Seiten sind vorab gerendert“ | Q-SEO-1 | ADR-002, ADR-003 |
| BLD-UB-2 | Das Build-System soll beim Produktionsbuild eine `sitemap.xml` mit allen Adressen und eine `robots.txt` erzeugen. | `setup/web-build.feature` · „Sitemap und robots.txt“ | Q-SEO-3 | ADR-002 |
| BLD-UB-3 | Das Build-System soll beim Produktionsbuild nur Daten aus `data/` und `content/` ausliefern. | `setup/web-build.feature` · „Produktionsbuild ohne Demo-Daten“ | Q-SEC-2 | ADR-005 |
| BLD-OP-1 | Wo der Demo-Modus gewählt ist, soll das Build-System die Datensätze und Beiträge aus `demo/` mit denen aus `data/` und `content/` zusammenführen und das Ergebnis validieren. | `setup/web-build.feature` · „Demo-Modus führt Daten zusammen“ | – | ADR-005 |
| BLD-UB-4 | Das Build-System soll nur Demo-Datensätze zulassen, deren `id` mit `demo-` beginnt und deren Titel bzw. Name mit „[Demo]“ beginnt. | `setup/web-build.feature` · „Demo-Datensätze sind gekennzeichnet“ | – | ADR-005 |
| BLD-UB-5 | Das Build-System soll für unbekannte Adressen die Hinweisseite als `404.html` ausliefern. | `setup/web-build.feature` · „404-Seite“ | – | ADR-003 |

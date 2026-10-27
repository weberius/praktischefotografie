# Changelog: SERVICE-02-STORY-03 – Beitrag lesen

## 2026-10-27 – TASK-02: Beitrag-Detailseite
**Status:** umgesetzt
**Änderungen:** Seite `/posts/:slug` (Routenparameter `slug` per `input()`) mit Titel, Datum, Beitragstext (`[innerHTML]`, Angular-Sanitizer), Infobox mit verknüpften Orten (Name, Adresse als Text, Hinweis „Präsenzbibliothek“, Link `/venues/:id`) und Ausstellungen (Titel, Laufzeit, Status-Badge, Link `/exhibitions/:id`). Unbekannter oder noch nicht veröffentlichter Slug zeigt `<app-not-found />` und den Titel „Nicht gefunden“. Textladefehler: Hinweis (`role="status"`), Metadaten und Verknüpfungen bleiben. Titel/Beschreibung aus dem Beitrag.
**Dateien:** `web/src/app/pages/post-detail/post-detail.ts`, `.html`, `.css`, `.spec.ts`
**Prüfung:** Karma-Tests (Szenarien Text, verknüpfte Inhalte, Text fehlt, Zukunft, unbekannter Slug, 6 Angriffsmuster) grün; `ng lint` ohne Befunde. Nicht geprüft: manuelle Barrierefreiheitsprüfung, `ng build`, Q-SEO-2 (Prerendering/Crawler).

## 2026-10-27 – TASK-01: Markdown-Service
**Status:** umgesetzt
**Änderungen:** `MarkdownService.load(url)` lädt Markdown per HttpClient (`responseType: 'text'`, relative URL), entfernt Frontmatter (`stripFrontmatter`) und rendert mit `marked` (`markdownToHtml`). Die Ausgabe ist unbereinigt und wird nur über `[innerHTML]` gebunden (DomSanitizer, Q-SEC-3). Ladefehler werden als Observable-Fehler gemeldet.
**Dateien:** `web/src/app/core/markdown.service.ts`, `web/src/app/core/markdown.service.spec.ts`
**Prüfung:** Service-Tests (Frontmatter, Rendering, Ladefehler) grün; Q-SEC-3 über die Detailseiten-Tests mit 6 Angriffsmustern (script, onerror, javascript:-Link, iframe, svg onload, Handler/object/embed): 0 Skripte ausgeführt, 0 Elemente/Attribute im DOM. Gesamt 18 von 18 Tests grün; `ng lint` ohne Befunde.

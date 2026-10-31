# SERVICE-16-STORY-01 Changelog: Wikipedia in allen Sprachen

- `scripts/photographers/lib/research.mjs`: `loadSitelinks` liest alle Sprachversionen; Anfangstexte für bis zu 10 Sprachen (`MAX_ARTICLES`); `sitelinks` in der Kandidatendatei; `addWikipediaLinks` schreibt alle Sprachversionen ohne Duplikate in `updates/photographers-links.json` (`query: wikipedia:<lang>`).
- `schema/photographers.schema.json`: `wikipedia.sources` bis 10.
- Tests: `test/photographers/research.test.mjs`, `test/photographer-profiles.test.mjs`.

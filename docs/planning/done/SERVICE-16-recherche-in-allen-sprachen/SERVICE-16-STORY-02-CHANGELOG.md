# SERVICE-16-STORY-02 Changelog: Websuche mehrsprachig

- `scripts/photographers/lib/websearch.mjs`: 6 Anfragen in 6 Sprachen (`queriesFor`), höchstens 10 Seiten und 10 Quellen; Wikimedia-Seiten werden nicht über den Webabruf geladen (`isWikimediaPage`).
- `scripts/photographers/web.mjs`: `plan` ohne `--web` (Standardlauf).
- `schema/photographers.schema.json`: `web.sources` bis 10.
- `.claude/skills/research-photographers/SKILL.md`, `README.md`, `updates/README.md`: Standardlauf Wikipedia + Web, `--no-web`, Seiten vor dem Text.
- Tests: `test/photographers/web.test.mjs`, `test/photographers/skill.test.mjs`.

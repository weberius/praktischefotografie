// Gherkin: docs/contracts/gherkin/setup/update-skill.feature (SKL-*), Q-MAIN-2
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const file = fileURLToPath(new URL('../../.claude/skills/update-venue-data/SKILL.md', import.meta.url));
const skill = () => readFileSync(file, 'utf8');

test('Szenario: Skill ist vorhanden (SKL-UB-1)', () => {
  assert.ok(existsSync(file));
  const text = skill();
  assert.match(text, /^---\nname: update-venue-data\ndescription: .+\n---/);
  assert.match(text, /\/update-venue-data --venue makk-koeln/);
});

test('Szenario: Skill führt den Ablauf aus (SKL-EV-1)', () => {
  const text = skill();
  const ablauf = text.slice(text.indexOf('## Ablauf'));
  let position = -1;
  for (const step of ['npm run data:fetch', 'npm run data:check', 'npm run data:report', 'AskUserQuestion', 'npm run data:apply']) {
    const next = ablauf.indexOf(step, position + 1);
    assert.ok(next > position, `Schritt "${step}" fehlt oder steht in falscher Reihenfolge`);
    position = next;
  }
});

test('Szenario: Skill übernimmt nur nach Freigabe (SKL-UB-2)', () => {
  const text = skill();
  assert.match(text, /erst nach ausdrücklicher Freigabe/);
  assert.match(text, /nur für freigegebene.* `"approved": true`/);
});

test('Szenario: Skill prüft nach Übernahme (SKL-UB-3)', () => {
  const text = skill();
  for (const command of ['npm run validate:data', 'npm test', 'npm run lint']) assert.ok(text.includes(command), command);
  assert.ok(text.indexOf('npm run validate:data') > text.indexOf('npm run data:apply'));
});

test('Skill-Dokumentation und Format sind vorhanden', () => {
  assert.ok(existsSync(fileURLToPath(new URL('../../updates/README.md', import.meta.url))));
});

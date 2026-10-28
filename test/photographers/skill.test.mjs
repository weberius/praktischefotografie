// Gherkin: docs/contracts/gherkin/setup/fotografinnen-recherche.feature (Skill ist vorhanden, Skill schreibt nur aus den Quellen), Q-MAIN-4
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const file = fileURLToPath(new URL('../../.claude/skills/research-photographers/SKILL.md', import.meta.url));
const skill = () => readFileSync(file, 'utf8');

test('Szenario: Skill ist vorhanden (RSF-UB-1)', () => {
  assert.ok(existsSync(file));
  const text = skill();
  assert.match(text, /^---\nname: research-photographers\ndescription: .+\n---/);
  assert.match(text, /\/research-photographers --photographer august-sander/);
});

test('Skill führt den Ablauf in der richtigen Reihenfolge aus (RSF-UB-1)', () => {
  const text = skill();
  const ablauf = text.slice(text.indexOf('## Ablauf'));
  let position = -1;
  for (const step of ['npm run photographers:fetch', 'npm run photographers:check', 'AskUserQuestion', 'npm run photographers:apply', 'npm run validate:data']) {
    const next = ablauf.indexOf(step, position + 1);
    assert.ok(next > position, `Schritt "${step}" fehlt oder steht in falscher Reihenfolge`);
    position = next;
  }
});

test('Szenario: Skill schreibt nur aus den Quellen (RSF-UB-7)', () => {
  const text = skill();
  assert.match(text, /erst nach ausdrücklicher Freigabe/);
  assert.match(text, /40 bis 90 Wörter/);
  assert.match(text, /wörtliche Folge von acht oder mehr Wörtern/);
  assert.match(text, /Nichts erfinden/);
  assert.match(text, /Du lädst keine Bilder selbst/);
  assert.match(text, /nur für freigegebene\*\* Vorschläge `"approved": true`/);
});

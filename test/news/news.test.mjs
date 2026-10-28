// Gherkin: docs/contracts/gherkin/setup/magazin-neuigkeiten.feature (NWS-*), Q-DATA-4, Q-REL-2, Q-MAIN-3
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { main as plan } from '../../scripts/news/plan-news.mjs';
import { main as check } from '../../scripts/news/check-news.mjs';
import { main as apply } from '../../scripts/news/apply-news.mjs';
import { exhibition, validSet, venue } from '../helpers.mjs';

const DATE = '2026-10-28';
const goodText = (n = 70) => `Die Ausstellung Test im MAKK Köln zeigt Arbeiten von Martin Parr. ${Array.from({ length: n - 11 }, (_, i) => `wort${i}`).join(' ')}`;

function workspace({ exhibitions = [exhibition({ id: 'schau-2026', title: 'Test' })], posts = [], venues = [venue()] } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'pf-news-'));
  mkdirSync(join(root, 'data'), { recursive: true });
  const set = { ...validSet(), venues, exhibitions, posts };
  for (const [name, records] of Object.entries(set)) writeFileSync(join(root, 'data', `${name}.json`), JSON.stringify(records, null, 2));
  return root;
}
const read = (root, ...p) => JSON.parse(readFileSync(join(root, ...p), 'utf8'));
const planOf = (root) => read(root, 'updates', DATE, 'news.json');
const argv = (...a) => ['--date', DATE, ...a];
const edit = (root, fn) => {
  const p = planOf(root);
  fn(p);
  writeFileSync(join(root, 'updates', DATE, 'news.json'), JSON.stringify(p));
};
const fill = (root, id, over = {}) => edit(root, (p) => Object.assign(p.items.find((i) => i.id === id), { title: 'Test in Köln', excerpt: 'Kurz.', text: goodText(), ...over }));

test('Szenario: Eindeutige Kennung, Datum je Anlass und Plan mit fehlenden Anlässen (NWS-UB-1, NWS-UB-2, NWS-EV-1)', () => {
  const root = workspace();
  plan(argv(), root);
  const items = planOf(root).items;
  assert.deepEqual(items.map((i) => i.id), ['schau-2026-eroeffnung', 'schau-2026-endet-bald', 'schau-2026-ende']);
  assert.deepEqual(items.map((i) => i.date), ['2026-08-09', '2026-10-18', '2026-11-02']);
  assert.ok(items.every((i) => i.venueId === 'makk-koeln' && i.exhibitionId === 'schau-2026' && i.kind === 'anlegen'));
  assert.equal(items[0].context.photographers[0].name, 'Martin Parr');
});

test('Szenario: Anlass neu nur für neu aufgenommene Ausstellungen (NWS-UB-3)', () => {
  const root = workspace();
  plan(argv(), root);
  assert.ok(!planOf(root).items.some((i) => i.occasion === 'neu'));
  mkdirSync(join(root, 'updates', DATE), { recursive: true });
  writeFileSync(join(root, 'updates', DATE, 'makk-koeln.json'), JSON.stringify({ changes: [{ dataset: 'exhibitions', op: 'add', record: { id: 'schau-2026' }, appliedAt: DATE }] }));
  plan(argv(), root);
  const neu = planOf(root).items.find((i) => i.occasion === 'neu');
  assert.equal(neu.id, 'schau-2026-neu');
  assert.equal(neu.date, DATE);
});

test('Szenario: Kurze Ausstellung ohne Endet-bald (NWS-UB-4)', () => {
  const root = workspace({ exhibitions: [exhibition({ id: 'kurz', startDate: '2026-11-01', endDate: '2026-11-10' })] });
  plan(argv(), root);
  assert.deepEqual(planOf(root).items.map((i) => i.occasion), ['eroeffnung', 'ende']);
});

test('Szenario: Geänderter Termin und zweiter Lauf ohne Änderung (NWS-UN-1, Q-REL-2)', () => {
  const posts = [{ id: 'schau-2026-ende', slug: 'schau-2026-ende', title: 'x', date: '2026-10-31', contentFile: 'content/posts/x.md' }];
  const root = workspace({ posts });
  plan(argv(), root);
  const ende = planOf(root).items.find((i) => i.id === 'schau-2026-ende');
  assert.equal(ende.kind, 'angepasst');
  assert.equal(ende.date, '2026-11-02');
  assert.equal(ende.previousDate, '2026-10-31');

  const all = workspace({ exhibitions: [exhibition({ id: 'schau-2026', title: 'Test' })] });
  plan(argv(), all);
  for (const i of planOf(all).items) fill(all, i.id);
  edit(all, (p) => p.items.forEach((i) => (i.approved = true)));
  assert.equal(apply(argv(), all).applied.length, 3);
  assert.equal(plan(argv(), all).items.length, 0);
  assert.equal(read(all, 'data', 'posts.json').length, 3);
});

test('Szenario: Text mit falscher Wortzahl (NWS-UB-5)', () => {
  const root = workspace();
  plan(argv(), root);
  for (const [n, ok] of [[59, false], [60, true], [80, true], [81, false]]) {
    fill(root, 'schau-2026-ende', { text: goodText(n) });
    const item = check(argv(), root).items.find((i) => i.id === 'schau-2026-ende');
    assert.equal(item.problems.length === 0, ok, `${n} Wörter`);
    if (!ok) assert.match(item.problems[0], /Wortzahl/);
  }
});

test('Szenario: Text ohne Künstler:in, Ort oder Titel, mit HTML (NWS-UB-5)', () => {
  const root = workspace();
  plan(argv(), root);
  fill(root, 'schau-2026-ende', { text: goodText().replace('Martin Parr', 'jemandem') });
  assert.match(check(argv(), root).items.find((i) => i.id === 'schau-2026-ende').problems.join(), /Martin Parr/);
  fill(root, 'schau-2026-ende', { text: goodText().replace('MAKK Köln', 'dem Haus') });
  assert.match(check(argv(), root).items.find((i) => i.id === 'schau-2026-ende').problems.join(), /Ort/);
  fill(root, 'schau-2026-ende', { text: goodText().replace('Ausstellung Test', 'Ausstellung') });
  assert.match(check(argv(), root).items.find((i) => i.id === 'schau-2026-ende').problems.join(), /Titel/);
  fill(root, 'schau-2026-ende', { text: `${goodText()} <b>x</b>` });
  assert.match(check(argv(), root).items.find((i) => i.id === 'schau-2026-ende').problems.join(), /HTML/);
  fill(root, 'schau-2026-ende', { excerpt: 'x'.repeat(301) });
  assert.match(check(argv(), root).items.find((i) => i.id === 'schau-2026-ende').problems.join(), /Kurztext/);
});

test('Szenario: Übernahme nur nach Freigabe (NWS-UB-6)', () => {
  const root = workspace();
  plan(argv(), root);
  fill(root, 'schau-2026-ende');
  check(argv(), root);
  const result = apply(argv(), root);
  assert.equal(result.applied.length, 0);
  assert.deepEqual(read(root, 'data', 'posts.json'), []);
  assert.ok(!existsSync(join(root, 'content', 'posts', 'schau-2026-ende.md')));
});

test('Freigabe eines ungültigen Eintrags wird nicht übernommen (NWS-UB-6, Q-DATA-4)', () => {
  const root = workspace();
  plan(argv(), root);
  fill(root, 'schau-2026-ende', { text: goodText(40), approved: true });
  const result = apply(argv(), root);
  assert.deepEqual(result.applied, []);
  assert.match(result.skipped.find((s) => s.id === 'schau-2026-ende').reason, /ungültig/);
  assert.deepEqual(read(root, 'data', 'posts.json'), []);
});

test('Szenario: Beitrag wird angelegt und ersetzt (NWS-EV-2)', () => {
  const root = workspace();
  plan(argv(), root);
  fill(root, 'schau-2026-ende', { approved: true });
  check(argv(), root);
  assert.deepEqual(apply(argv(), root).applied, ['schau-2026-ende']);
  const [post] = read(root, 'data', 'posts.json');
  assert.deepEqual(post, { id: 'schau-2026-ende', slug: 'schau-2026-ende', title: 'Test in Köln', date: '2026-11-02', excerpt: 'Kurz.', linkedVenueIds: ['makk-koeln'], linkedExhibitionIds: ['schau-2026'], contentFile: 'content/posts/schau-2026-ende.md' });
  const md = readFileSync(join(root, 'content', 'posts', 'schau-2026-ende.md'), 'utf8');
  assert.match(md, /^---\ntitle: "Test in Köln"\ndate: 2026-11-02\n---\n\nDie Ausstellung Test im MAKK Köln/);

  // Termin ändert sich: Beitrag wird ersetzt
  const ex = read(root, 'data', 'exhibitions.json');
  ex[0].endDate = '2026-11-05';
  writeFileSync(join(root, 'data', 'exhibitions.json'), JSON.stringify(ex));
  plan(argv(), root);
  const angepasst = planOf(root).items.find((i) => i.id === 'schau-2026-ende');
  assert.equal(angepasst.kind, 'angepasst');
  fill(root, 'schau-2026-ende', { approved: true });
  assert.deepEqual(apply(argv(), root).applied, ['schau-2026-ende']);
  assert.equal(read(root, 'data', 'posts.json').filter((p) => p.id === 'schau-2026-ende').length, 1);
  assert.equal(read(root, 'data', 'posts.json')[0].date, '2026-11-06');
});

test('Szenario: Übernahme wird zurückgerollt (NWS-UN-2)', () => {
  const root = workspace();
  plan(argv(), root);
  // Slug-Muster verletzt: ungültige Kennung erzeugt ein Schemaproblem.
  edit(root, (p) => {
    const item = p.items.find((i) => i.id === 'schau-2026-ende');
    Object.assign(item, { id: 'Ungültig Ende', title: 'Test in Köln', excerpt: 'K', text: goodText(), approved: true });
  });
  const before = readFileSync(join(root, 'data', 'posts.json'), 'utf8');
  const result = apply(argv(), root);
  assert.equal(result.ok, false);
  assert.ok(result.errors.length > 0);
  assert.equal(readFileSync(join(root, 'data', 'posts.json'), 'utf8'), before);
  assert.ok(!existsSync(join(root, 'content', 'posts', 'Ungültig Ende.md')));
});

test('Szenario: Bericht der Neuigkeiten und verwaiste Neuigkeit (NWS-EV-3, NWS-UN-3)', () => {
  const posts = [{ id: 'alt-2025-ende', slug: 'alt-2025-ende', title: 'x', date: '2025-01-01', contentFile: 'content/posts/alt.md' }];
  const root = workspace({ posts });
  writeFileSync(join(root, 'data', 'posts.json'), JSON.stringify(posts));
  plan(argv(), root);
  fill(root, 'schau-2026-ende', { text: goodText(30) });
  check(argv(), root);
  const report = readFileSync(join(root, 'updates', DATE, 'NEWS.md'), 'utf8');
  assert.match(report, /\| Eröffnung \| 1 \| 1 \| 0 \| 0 \|/);
  assert.match(report, /\| Ende \| 1 \| 1 \| 0 \| 0 \|/);
  assert.match(report, /alt-2025-ende/);
  assert.equal(read(root, 'data', 'posts.json').length, 1);
});

test('Szenario: Einzelner Ort oder alle (NWS-OP-1)', () => {
  const other = venue({ id: 'andere', shortName: 'Andere', name: 'Andere' });
  const root = workspace({ venues: [venue(), other], exhibitions: [exhibition({ id: 'a-2026' }), exhibition({ id: 'b-2026', venueId: 'andere' })] });
  plan(argv('--venue', 'andere'), root);
  assert.ok(planOf(root).items.every((i) => i.venueId === 'andere'));
  plan(argv(), root);
  assert.deepEqual([...new Set(planOf(root).items.map((i) => i.venueId))].sort(), ['andere', 'makk-koeln']);
  assert.throws(() => plan(argv('--venue', 'gibt-es-nicht'), root), /Gültige IDs: makk-koeln, andere/);
});

test('Re-Planung behält Texte und Freigaben bei gleichem Datum', () => {
  const root = workspace();
  plan(argv(), root);
  fill(root, 'schau-2026-ende', { approved: true });
  plan(argv(), root);
  const item = planOf(root).items.find((i) => i.id === 'schau-2026-ende');
  assert.equal(item.approved, true);
  assert.ok(item.text);
});

test('Szenario: Titel ist Ausstellungstitel mit Stadt (NWS-UB-7, Q-DATA-10)', () => {
  const root = workspace();
  plan(argv(), root);
  assert.ok(planOf(root).items.every((i) => i.expectedTitle === 'Test in Köln'));
  for (const title of ['Endet bald: Test im MAKK Köln', 'Test', 'Test in Essen', 'Endet bald: Test in Köln']) {
    fill(root, 'schau-2026-ende', { title });
    const item = check(argv(), root).items.find((i) => i.id === 'schau-2026-ende');
    assert.match(item.problems.join(), /Titel muss "Test in Köln" lauten/, title);
  }
  fill(root, 'schau-2026-ende', { title: '  Test   in Köln ' });
  assert.deepEqual(check(argv(), root).items.find((i) => i.id === 'schau-2026-ende').problems, []);
  fill(root, 'schau-2026-ende', { approved: true });
  assert.equal(apply(argv(), root).applied[0], 'schau-2026-ende');
  assert.equal(read(root, 'data', 'posts.json')[0].title, 'Test in Köln');
});


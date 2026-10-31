// Gherkin: docs/contracts/gherkin/setup/personen-websuche.feature (WSP-*), Q-SEC-7, Q-DATA-14, Q-DATA-15, Q-MAIN-6
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { main } from '../../scripts/photographers/web.mjs';
import { main as fetchMain } from '../../scripts/photographers/fetch-photographers.mjs';
import { isInternalHost, normalizeUrl, slugify } from '../../scripts/photographers/lib/websearch.mjs';
import { page, testServer } from '../scrape/server.mjs';
import { validSet } from '../helpers.mjs';

const DATE = '2026-11-02';
const CONTACT = 'redaktion@example.org';
const words = (prefix, n) => Array.from({ length: n }, (_, i) => `${prefix}${i}`).join(' ');
const argv = (...a) => [...a, '--date', DATE];
const readJson = (root, ...p) => JSON.parse(readFileSync(join(root, ...p), 'utf8'));
const quiet = async (fn) => {
  const log = console.log;
  console.log = () => {};
  try {
    return await fn();
  } finally {
    console.log = log;
  }
};
const run = (root, ...a) => quiet(() => main(argv(...a), { SCRAPE_CONTACT: CONTACT }, root));

function workspace(people = [{ id: 'wendy-red-star', name: 'Wendy Red Star' }]) {
  const root = mkdtempSync(join(tmpdir(), 'pf-wsp-'));
  mkdirSync(join(root, 'data'), { recursive: true });
  const set = { ...validSet(), photographers: people, exhibitions: [] };
  for (const [n, records] of Object.entries(set)) writeFileSync(join(root, 'data', `${n}.json`), JSON.stringify(records, null, 2));
  mkdirSync(join(root, 'updates', DATE), { recursive: true });
  return root;
}
const hits = (n, base = 'https://example.org/p') => Array.from({ length: n }, (_, i) => ({ title: `Treffer ${i}`, url: `${base}${i}`, snippet: `Auszug ${i}` }));
const writeSearch = (root, persons, engine = 'Testsuche') => writeFileSync(join(root, 'updates', DATE, 'photographers-search.json'), JSON.stringify({ date: DATE, engine, persons }, null, 2));
const search = (id, results, queries = 3) => ({ id, queries: Array.from({ length: queries }, (_, i) => ({ query: `Anfrage ${i}`, results })) });
const links = (root) => readJson(root, 'updates', 'photographers-links.json');
const people = (root) => readJson(root, 'data', 'photographers.json');
const proposals = (root, list) => writeFileSync(join(root, 'updates', DATE, 'photographers-web-proposals.json'), JSON.stringify({ date: DATE, proposals: list }, null, 2));
const readProposals = (root) => readJson(root, 'updates', DATE, 'photographers-web-proposals.json').proposals;

test('Szenario: Websuche im Standardlauf, ohne Person Hinweis (RAS-UB-3, Q-SEC-8)', async () => {
  const root = workspace();
  await assert.rejects(() => main(argv('plan'), {}, root), /--photographer <id> oder --name/);
  assert.ok(!existsSync(join(root, 'updates', DATE, 'photographers-web.json')));
  const person = await run(root, 'plan', '--photographer', 'wendy-red-star');
  assert.equal(person.id, 'wendy-red-star', 'der Plan braucht kein --web');
  await run(root, 'plan', '--web', '--photographer', 'wendy-red-star');
  // Die Wikipedia-Recherche fragt nur Wikimedia ab und kennt keine Suchmaschine: offline ohne Anfrage.
  const file = await quiet(() => fetchMain(argv('--offline'), {}, root));
  assert.equal(file.offline, true);
  assert.ok(!existsSync(join(root, '.cache', 'websearch')));
});

test('Szenario: Treffer werden festgehalten (WSP-EV-1, Q-SEC-7)', async () => {
  const root = workspace();
  await run(root, 'plan', '--photographer', 'wendy-red-star');
  const plan = readJson(root, 'updates', DATE, 'photographers-web.json');
  assert.equal(plan.persons[0].queries.length, 6);
  assert.deepEqual(plan.persons[0].queries.map((q) => q.split(' ').pop()), ['Fotograf', 'photographer', 'photographe', 'fotógrafo', 'fotografo', 'fotograaf'].map((t) => t));
  writeSearch(root, [search('wendy-red-star', hits(12), 8)]);
  await run(root, 'links');
  const out = readJson(root, 'updates', DATE, 'photographers-search.json').persons[0];
  assert.equal(out.queries.length, 6);
  for (const q of out.queries) {
    assert.equal(q.results.length, 10);
    for (const r of q.results) assert.deepEqual(Object.keys(r).sort(), ['foundAt', 'query', 'snippet', 'title', 'url']);
  }
  const p = readJson(root, 'updates', DATE, 'photographers-web.json').persons[0];
  assert.deepEqual([p.queryCount, p.hitCount, p.engine], [6, 60, 'Testsuche']);
});

test('Szenario: Linksammlung wird fortgeschrieben (WSP-UB-2, Q-DATA-14)', async () => {
  const root = workspace();
  writeFileSync(join(root, 'updates', 'photographers-links.json'), JSON.stringify({ 'wendy-red-star': [{ url: 'https://example.org/a', title: 'Alt', query: 'q', foundAt: '2026-01-01T00:00:00.000Z' }] }));
  await run(root, 'plan', '--web', '--photographer', 'wendy-red-star');
  const results = ['https://EXAMPLE.org/a/', 'https://example.org/b?utm_source=x#top', 'ftp://example.org/c', 'https://example.org/d', 'https://example.org/d/'].map((url, i) => ({ title: `T${i}`, url, snippet: '' }));
  writeSearch(root, [search('wendy-red-star', results, 1)]);
  await run(root, 'links');
  const list = links(root)['wendy-red-star'];
  assert.deepEqual(list.map((l) => l.url), ['https://example.org/a', 'https://example.org/b', 'https://example.org/d']);
  assert.deepEqual(list[0], { url: 'https://example.org/a', title: 'Alt', query: 'q', foundAt: '2026-01-01T00:00:00.000Z' });
  for (const l of list.slice(1)) assert.deepEqual(Object.keys(l).sort(), ['foundAt', 'query', 'title', 'url']);
  assert.deepEqual(readJson(root, 'updates', DATE, 'photographers-web.json').persons[0].newLinks, ['https://example.org/b', 'https://example.org/d']);
  // zweiter Lauf mit teils gleichen Treffern: keine Dubletten, Vorhandenes unverändert
  await run(root, 'plan', '--web', '--photographer', 'wendy-red-star', '--max-age', '0');
  writeSearch(root, [search('wendy-red-star', [{ title: 'x', url: 'https://example.org/d' }, { title: 'y', url: 'https://example.org/e' }], 1)]);
  await run(root, 'links');
  assert.deepEqual(links(root)['wendy-red-star'].map((l) => l.url), ['https://example.org/a', 'https://example.org/b', 'https://example.org/d', 'https://example.org/e']);
  assert.equal(links(root)['wendy-red-star'][1].title, 'T1');
});

test('Normalisierung der Adressen (WSP-UB-2)', () => {
  assert.equal(normalizeUrl('HTTPS://Example.ORG/a/?fbclid=1&x=2&gclid=3&utm_medium=m#frag'), 'https://example.org/a?x=2');
  assert.equal(normalizeUrl('https://example.org/'), 'https://example.org');
  assert.equal(normalizeUrl('javascript:alert(1)'), null);
  assert.equal(normalizeUrl('kein url'), null);
});

test('Szenario: Offline und Cache der Suche (WSP-OP-1, Q-SEC-7)', async () => {
  const root = workspace();
  await run(root, 'plan', '--web', '--photographer', 'wendy-red-star', '--offline');
  writeSearch(root, [search('wendy-red-star', hits(2), 1)]);
  await run(root, 'links', '--offline');
  let p = readJson(root, 'updates', DATE, 'photographers-web.json').persons[0];
  assert.equal(p.status, 'keine Suche');
  assert.match(p.note, /offline/);
  assert.ok(!existsSync(join(root, '.cache', 'websearch', 'wendy-red-star.json')));
  // Suche einmal zwischenspeichern, dann ohne neue Suchanfrage wiederverwenden
  await run(root, 'plan', '--web', '--photographer', 'wendy-red-star');
  await run(root, 'links');
  assert.ok(existsSync(join(root, '.cache', 'websearch', 'wendy-red-star.json')));
  for (const extra of [[], ['--offline']]) {
    writeSearch(root, []);
    await run(root, 'plan', '--web', '--photographer', 'wendy-red-star', ...extra);
    await run(root, 'links', ...extra);
    p = readJson(root, 'updates', DATE, 'photographers-web.json').persons[0];
    assert.equal(p.status, 'aus dem Zwischenspeicher');
    assert.equal(p.queryCount, 0);
    assert.equal(p.hitCount, 2);
  }
});

test('Szenario: Suche ohne Treffer (WSP-UN-1, Q-DATA-14)', async () => {
  const root = workspace([{ id: 'a-fehler', name: 'A Fehler' }, { id: 'b-leer', name: 'B Leer' }, { id: 'c-ok', name: 'C Ok' }]);
  for (const id of ['a-fehler', 'b-leer', 'c-ok']) await run(root, 'plan', '--web', '--photographer', id);
  const before = readFileSync(join(root, 'data', 'photographers.json'), 'utf8');
  writeSearch(root, [{ id: 'a-fehler', error: 'Suchmaschine nicht erreichbar' }, search('b-leer', [], 3), search('c-ok', hits(1), 1)]);
  await run(root, 'links');
  const byId = Object.fromEntries(readJson(root, 'updates', DATE, 'photographers-web.json').persons.map((p) => [p.id, p]));
  assert.deepEqual([byId['a-fehler'].status, byId['a-fehler'].note], ['Fehler', 'Suchmaschine nicht erreichbar']);
  assert.equal(byId['b-leer'].status, 'keine Treffer');
  assert.equal(byId['c-ok'].newLinks.length, 1);
  assert.equal(readFileSync(join(root, 'data', 'photographers.json'), 'utf8'), before);
  assert.deepEqual(Object.keys(links(root)), ['c-ok']);
  const report = readFileSync(join(root, 'updates', DATE, 'PHOTOGRAPHERS.md'), 'utf8');
  assert.match(report, /a-fehler.*Fehler – Suchmaschine nicht erreichbar/);
  assert.match(report, /b-leer.*keine Treffer/);
});

test('Szenario: Neue Person wird angelegt (WSP-EV-2) und Vorhandene nicht doppelt (WSP-UN-2)', async () => {
  const root = workspace([{ id: 'man-ray', name: 'Man Ray' }]);
  assert.equal(slugify('Ülkü Müller-Öz'), 'uelkue-mueller-oez');
  assert.equal(slugify('  Straße  Čapek '), 'strasse-capek');
  const existing = await run(root, 'plan', '--web', '--name', '  man  ray ');
  assert.deepEqual([existing.id, existing.isNew], ['man-ray', false]);
  const fresh = await run(root, 'plan', '--web', '--name', 'Ülkü Müller-Öz');
  assert.deepEqual([fresh.id, fresh.name, fresh.isNew], ['uelkue-mueller-oez', 'Ülkü Müller-Öz', true]);
  writeSearch(root, [search('uelkue-mueller-oez', hits(1), 1), search('man-ray', hits(1, 'https://example.org/m'), 1)]);
  await run(root, 'links');
  proposals(root, [
    { id: 'uelkue-mueller-oez', name: 'Ülkü Müller-Öz', create: true, approved: true },
    { id: 'man-ray', name: 'Man Ray', create: true, approved: true },
  ]);
  await run(root, 'check');
  const [ok, dup] = readProposals(root);
  assert.deepEqual(ok.problems, []);
  assert.match(dup.problems.join(), /existiert bereits/);
  const result = await run(root, 'apply');
  assert.deepEqual(result.applied, ['uelkue-mueller-oez']);
  assert.deepEqual(people(root).at(-1), { id: 'uelkue-mueller-oez', name: 'Ülkü Müller-Öz' });
  assert.equal(people(root).filter((p) => p.name === 'Man Ray').length, 1);
});

test('Szenario: Trefferseiten höflich abrufen (WSP-UB-3, Q-SEC-7)', async () => {
  const server = await testServer({
    '/robots.txt': { body: 'User-agent: *\nDisallow: /gesperrt\n' },
    '/gesperrt': { body: page('Gesperrt') },
    '/weiter': { status: 302, headers: { location: 'http://localhost:1/anders' } },
    ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`/ok${i}`, { body: page(`Seite ${i}`, `<p>Inhalt ${i}</p>`) }])),
  });
  try {
    const root = workspace();
    await run(root, 'plan', '--web', '--photographer', 'wendy-red-star');
    const urls = ['https://de.wikipedia.org/wiki/Wendy_Red_Star', `${server.url}/gesperrt`, `${server.url}/weiter`, ...Array.from({ length: 12 }, (_, i) => `${server.url}/ok${i}`)];
    writeSearch(root, [search('wendy-red-star', urls.map((url, i) => ({ title: `T${i}`, url, snippet: '' })), 1)]);
    await run(root, 'links');
    const sleeps = [];
    await quiet(() => main(argv('pages'), { SCRAPE_CONTACT: CONTACT }, root, { allowInternal: true, fetchOptions: { sleep: async (ms) => sleeps.push(ms) } }));
    const paths = server.requests.map((r) => r.path);
    assert.ok(!paths.includes('/gesperrt'));
    assert.ok(paths.includes('/weiter'));
    assert.ok(!paths.includes('/anders'));
    assert.equal(paths.filter((p) => p !== '/robots.txt').length, 8); // höchstens zehn Treffer je Anfrage, Wikipedia (Wikipedia läuft nicht über den Webabruf), die gesperrte wird nicht angefragt
    assert.ok(paths.includes('/ok6') && !paths.includes('/ok7'));
    assert.ok(sleeps.length > 0 && sleeps.every((ms) => ms > 0 && ms <= 2000));
    assert.ok(server.requests.every((r) => r.userAgent.includes('praktischefotografie-bot') && r.userAgent.includes(CONTACT)));
    assert.equal(readdirSync(join(root, '.cache', 'snapshots', 'wendy-red-star')).length, 7);
    const report = readFileSync(join(root, 'updates', DATE, 'PHOTOGRAPHERS.md'), 'utf8');
    assert.match(report, /laut robots\.txt nicht erlaubt/);
    assert.match(report, /Weiterleitung auf andere Website/);
  } finally {
    await server.close();
  }
});

test('Szenario: Neue Ergebnisse fließen in den Kurztext, ohne neue Links kein neuer Kurztext (WSP-EV-3, WSP-UB-4, WSP-UB-5, Q-DATA-15)', async () => {
  const root = workspace();
  await run(root, 'plan', '--web', '--photographer', 'wendy-red-star');
  const snippet = `${words('quelle', 20)}`;
  writeSearch(root, [search('wendy-red-star', [{ title: 'Porträt', url: 'https://example.org/a', snippet }, { title: 'Interview', url: 'https://example.org/b', snippet: '' }, ...Array.from({ length: 9 }, (_, i) => ({ title: `X${i}`, url: `https://x.org/${i}`, snippet: '' }))], 1)]);
  await run(root, 'links');
  const ok = (n) => ({ summary: words('eigen', n), sources: ['https://example.org/a'] });
  const verbatim = { summary: `${words('eigen', 40)} ${words('quelle', 8)}`, sources: ['https://example.org/a'] };
  const cases = {
    'zu kurz': { web: ok(39) },
    '40': { web: ok(40) },
    '90': { web: ok(90) },
    '91': { web: ok(91) },
    wörtlich: { web: verbatim },
    'Quelle fremd': { web: { ...ok(50), sources: ['https://example.org/fremd'] } },
    '10 Quellen': { web: { ...ok(50), sources: ['https://example.org/a', 'https://example.org/b', ...Array.from({ length: 8 }, (_, i) => `https://x.org/${i}`)] } },
    'elf Quellen': { web: { ...ok(50), sources: ['https://example.org/a', 'https://example.org/b', ...Array.from({ length: 9 }, (_, i) => `https://x.org/${i}`)] } },
    'Bild fremd': { web: ok(50), image: 'https://example.org/foto.jpg' },
    'Bild Commons': { web: ok(50), image: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Foto.jpg' },
    leer: {},
  };
  proposals(root, Object.entries(cases).map(([k, v]) => ({ id: 'wendy-red-star', label: k, ...v })));
  await run(root, 'check');
  const verdict = Object.fromEntries(readProposals(root).map((p) => [p.label, p.problems]));
  for (const k of ['40', '90', '10 Quellen', 'Bild Commons']) assert.deepEqual(verdict[k], [], k);
  for (const k of ['zu kurz', '91', 'wörtlich', 'Quelle fremd', 'elf Quellen', 'Bild fremd', 'leer']) assert.ok(verdict[k].length > 0, k);
  assert.match(verdict['Bild fremd'].join(), /Wikimedia Commons/);
  assert.match(verdict['wörtlich'].join(), /wörtliche Folge/);
  assert.equal(readProposals(root).find((p) => p.label === '40').result.web.sources[0].title, 'Porträt');
  // zweiter Lauf, alle Treffer bekannt: kein Vorschlag für den Webkurztext
  proposals(root, [{ id: 'wendy-red-star', web: ok(50), approved: true }]);
  await run(root, 'apply');
  assert.equal(people(root)[0].web.sources[0].url, 'https://example.org/a');
  await run(root, 'plan', '--web', '--photographer', 'wendy-red-star', '--max-age', '0');
  writeSearch(root, [search('wendy-red-star', [{ title: 'Porträt', url: 'https://example.org/a/' }], 1)]);
  await run(root, 'links');
  assert.deepEqual(readJson(root, 'updates', DATE, 'photographers-web.json').persons[0].newLinks, []);
  proposals(root, [{ id: 'wendy-red-star', web: ok(50) }]);
  await run(root, 'check');
  assert.match(readProposals(root)[0].problems.join(), /Kein neuer Link/);
});

test('Szenario: Übernahme nach Freigabe (WSP-UB-6)', async () => {
  const root = workspace([{ id: 'wendy-red-star', name: 'Wendy Red Star', web: { summary: words('alt', 50), sources: [{ title: 'Alt', url: 'https://example.org/alt' }] } }]);
  await run(root, 'plan', '--web', '--photographer', 'wendy-red-star');
  writeSearch(root, [search('wendy-red-star', hits(2), 1)]);
  await run(root, 'links');
  const web = { summary: words('neu', 50), sources: ['https://example.org/p0'] };
  proposals(root, [{ id: 'wendy-red-star', web, approved: false }]);
  await run(root, 'check');
  const before = readFileSync(join(root, 'data', 'photographers.json'), 'utf8');
  assert.deepEqual((await run(root, 'apply')).skipped, [{ id: 'wendy-red-star', reason: 'keine Freigabe' }]);
  assert.equal(readFileSync(join(root, 'data', 'photographers.json'), 'utf8'), before);
  proposals(root, [{ id: 'wendy-red-star', web, approved: true }]);
  assert.match((await run(root, 'apply')).skipped[0].reason, /nur mit --force/);
  assert.equal(readFileSync(join(root, 'data', 'photographers.json'), 'utf8'), before);
  assert.deepEqual((await run(root, 'apply', '--force')).applied, ['wendy-red-star']);
  assert.equal(people(root)[0].web.sources[0].title, 'Treffer 0');
  assert.ok(readProposals(root)[0].appliedAt);
  // Ungültige Daten: alles zurücknehmen
  const stale = people(root);
  stale[0].life = { from: 1990, to: 1980 };
  writeFileSync(join(root, 'data', 'photographers.json'), JSON.stringify(stale));
  const broken = readFileSync(join(root, 'data', 'photographers.json'), 'utf8');
  proposals(root, [{ id: 'wendy-red-star', web: { ...web, sources: ['https://example.org/p1'] }, approved: true }]);
  const result = await run(root, 'apply', '--force');
  assert.equal(result.ok, false);
  assert.equal(readFileSync(join(root, 'data', 'photographers.json'), 'utf8'), broken);
});

test('Szenario: Bericht der Websuche (WSP-EV-4)', async () => {
  const root = workspace();
  await run(root, 'plan', '--web', '--photographer', 'wendy-red-star');
  writeSearch(root, [search('wendy-red-star', hits(2), 2)], 'Beispielsuche');
  await run(root, 'links');
  proposals(root, [{ id: 'wendy-red-star', web: { summary: words('eigen', 50), sources: ['https://example.org/p0'] }, approved: true }]);
  await run(root, 'check');
  await run(root, 'apply');
  const report = readFileSync(join(root, 'updates', DATE, 'PHOTOGRAPHERS.md'), 'utf8');
  for (const line of ['- Suchanfragen: 2', '- Treffer: 4', '- Neue Links: 2', '- Angelegte Personen: 0', '- Aktualisierte Webkurztexte: 1', 'Suchmaschine: Beispielsuche', '- genutzt: https://example.org/p0', '- neuer Link: https://example.org/p1']) assert.ok(report.includes(line), line);
});

test('Interne Adressen werden nie abgerufen (Q-SEC-7)', async () => {
  for (const url of ['http://localhost/a', 'http://127.0.0.1/a', 'http://10.1.2.3/a', 'http://169.254.169.254/latest', 'http://192.168.0.1/', 'http://172.20.0.1/', 'http://[::1]/', 'http://intranet/a', 'http://host.local/a']) assert.ok(isInternalHost(url), url);
  for (const url of ['https://example.org/a', 'https://8.8.8.8/', 'http://172.32.0.1/']) assert.ok(!isInternalHost(url), url);
  const server = await testServer({ '/a': { body: page('A') } });
  try {
    const root = workspace();
    await run(root, 'plan', '--web', '--photographer', 'wendy-red-star');
    writeSearch(root, [search('wendy-red-star', [{ title: 'Intern', url: `${server.url}/a`, snippet: '' }], 1)]);
    await run(root, 'links');
    await quiet(() => main(argv('pages'), { SCRAPE_CONTACT: CONTACT }, root));
    assert.equal(server.requests.length, 0);
    assert.match(readFileSync(join(root, 'updates', DATE, 'PHOTOGRAPHERS.md'), 'utf8'), /interne Adresse nicht abgerufen/);
  } finally {
    await server.close();
  }
});

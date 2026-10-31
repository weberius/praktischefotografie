// Gherkin: docs/contracts/gherkin/setup/fotografinnen-recherche.feature (RSF-*), Q-SEC-5, Q-MAIN-4, Q-DATA-7, Q-DATA-8
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { main as fetchMain } from '../../scripts/photographers/fetch-photographers.mjs';
import { main as checkMain } from '../../scripts/photographers/check-photographers.mjs';
import { main as applyMain } from '../../scripts/photographers/apply-photographers.mjs';
import { commonsFileName, orderLangs, sharesSequence } from '../../scripts/photographers/lib/research.mjs';
import { createClient } from '../../scripts/photographers/lib/wikimedia.mjs';
import { exhibition, validSet } from '../helpers.mjs';

const DATE = '2026-10-28';
const CONTACT = 'redaktion@example.org';
const words = (prefix, n) => Array.from({ length: n }, (_, i) => `${prefix}${i}`).join(' ');

const entity = (over) => ({ labels: { de: { value: over.label } }, descriptions: { de: { value: 'deutscher Fotograf' } }, claims: { P106: [{ mainsnak: { datavalue: { value: { id: 'Q33231' } } } }], ...over.claims }, sitelinks: over.sitelinks ?? { dewiki: { title: over.label }, enwiki: { title: over.label } } });
const time = (t) => [{ mainsnak: { datavalue: { value: { time: t } } } }];
const image = (name) => [{ mainsnak: { datavalue: { value: name } } }];

const ENTITIES = {
  Q100: entity({ label: 'August Sander', claims: { P569: time('+1876-11-17T00:00:00Z'), P570: time('+1964-04-20T00:00:00Z'), P18: image('August Sander.jpg') }, sitelinks: { ptwiki: { title: 'August Sander' }, jawiki: { title: 'アウグスト・ザンダー' }, frwiki: { title: 'August Sander' }, enwiki: { title: 'August Sander' }, dewiki: { title: 'August Sander' }, commonswiki: { title: 'Category:August Sander' } } }),
  Q101: entity({ label: 'August Sander', claims: { P106: [{ mainsnak: { datavalue: { value: { id: 'Q82955' } } } }] } }),
  Q200: entity({ label: 'Maria Muster' }),
  Q201: entity({ label: 'Maria Muster' }),
  Q300: entity({ label: 'Fritz Unfrei', claims: { P18: image('Unfrei.jpg') } }),
  Q400: entity({ label: 'Karl Anonym', claims: { P18: image('Anonym.jpg') } }),
  Q500: entity({ label: 'Gross Bild', claims: { P18: image('Gross.jpg') } }),
  Q600: entity({ label: 'Evil Host', claims: { P18: image('Evil.jpg') } }),
  Q700: entity({ label: 'Candida Höfer', claims: { P569: time('+1944-00-00T00:00:00Z') } }),
  Q800: entity({ label: 'Bild Ersatz' }),
  Q900: entity({ label: 'Viel Sprachen', sitelinks: Object.fromEntries(['de', 'en', 'fr', 'es', 'it', 'nl', 'pt', 'sv', 'da', 'fi', 'pl', 'cs'].map((l) => [`${l}wiki`, { title: 'Viel Sprachen' }])) }),
};
const SEARCH = { 'August Sander': ['Q100', 'Q101'], 'Maria Muster': ['Q200', 'Q201'], 'Fritz Unfrei': ['Q300'], 'Karl Anonym': ['Q400'], 'Gross Bild': ['Q500'], 'Evil Host': ['Q600'], 'Candida Höfer': ['Q700'], 'Bild Ersatz': ['Q800'], 'Viel Sprachen': ['Q900'] };
const EXTRACT = `August Sander war ein deutscher Fotograf und gilt als Wegbereiter der dokumentarischen Porträtfotografie. ${words('quelle', 40)}`;

async function wikimedia() {
  const requests = [];
  let base;
  const handlers = {
    wikidata: (u) => {
      const q = u.searchParams;
      if (q.get('action') === 'wbsearchentities') return { search: (SEARCH[q.get('search')] ?? []).map((id) => ({ id })) };
      return { entities: Object.fromEntries(q.get('ids').split('|').map((id) => [id, { ...ENTITIES[id], id }])) };
    },
    commons: (u) => {
      const file = u.searchParams.get('titles').replace('File:', '');
      const width = u.searchParams.get('iiurlwidth');
      const meta = (artist, license) => ({ Artist: { value: artist }, LicenseShortName: { value: license }, LicenseUrl: { value: 'https://creativecommons.org/licenses/by-sa/4.0/' } });
      const infos = {
        'August Sander.jpg': { thumburl: `${base}/thumb/sander.jpg`, thumbwidth: 400, thumbheight: 520, extmetadata: meta('<a href="//x">Jane Doe</a>', 'CC BY-SA 4.0'), descriptionurl: 'https://commons.wikimedia.org/wiki/File:August_Sander.jpg' },
        'Unfrei.jpg': { thumburl: `${base}/thumb/sander.jpg`, extmetadata: meta('X', 'Fair use'), descriptionurl: 'https://commons.wikimedia.org/wiki/File:Unfrei.jpg' },
        'Anonym.jpg': { thumburl: `${base}/thumb/sander.jpg`, extmetadata: meta('', 'CC0'), descriptionurl: 'https://commons.wikimedia.org/wiki/File:Anonym.jpg' },
        'Gross.jpg': { thumburl: `${base}/thumb/gross-${width}.jpg`, thumbwidth: Number(width), thumbheight: 300, extmetadata: meta('Jane Doe', 'CC BY 4.0'), descriptionurl: 'https://commons.wikimedia.org/wiki/File:Gross.jpg' },
        'Titelbild.jpg': { thumburl: `${base}/thumb/sander.jpg`, thumbwidth: 400, thumbheight: 300, extmetadata: meta('Jane Doe', 'CC0'), descriptionurl: 'https://commons.wikimedia.org/wiki/File:Titelbild.jpg' },
        'Evil.jpg': { thumburl: 'http://evil.example/x.jpg', extmetadata: meta('Jane Doe', 'CC BY 4.0'), descriptionurl: 'https://commons.wikimedia.org/wiki/File:Evil.jpg' },
      };
      return { query: { pages: [{ imageinfo: [infos[file]] }] } };
    },
  };
  const server = createServer((req, res) => {
    requests.push({ path: req.url, userAgent: req.headers['user-agent'], at: Date.now() });
    const u = new URL(req.url, 'http://x');
    const send = (status, type, body) => (res.writeHead(status, { 'content-type': type }), res.end(body));
    const thumb = /^\/thumb\/(.+)\.jpg$/.exec(u.pathname);
    if (thumb) return send(200, 'image/jpeg', Buffer.alloc({ 'gross-400': 250_000, 'gross-300': 150_000 }[thumb[1]] ?? 5000, 7));
    const summary = /^\/wp-([a-z]+)\/api\/rest_v1\/page\/summary\/(.+)$/.exec(u.pathname);
    if (summary) return send(200, 'application/json', JSON.stringify({ type: 'standard', title: decodeURIComponent(summary[2]), extract: EXTRACT, originalimage: u.pathname.includes('Bild_Ersatz') ? { source: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Titelbild.jpg' } : u.pathname.includes('Sander') ? { source: 'https://upload.wikimedia.org/wikipedia/en/a/ab/Nur_en.jpg' } : undefined, description: summary[1] === 'de' ? 'deutscher Fotograf' : 'German photographer' }));
    const area = /^\/(wikidata|commons)\/w\/api\.php$/.exec(u.pathname);
    if (area) return send(200, 'application/json', JSON.stringify(handlers[area[1]](u)));
    return send(404, 'text/plain', 'nicht gefunden');
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
  return {
    base,
    requests,
    options: { endpoints: { wikidata: `${base}/wikidata`, commons: `${base}/commons`, wikipedia: (lang) => `${base}/wp-${lang}` }, allowHost: (h) => h === '127.0.0.1', minDelayMs: 0, retryWaitsMs: [1, 1] },
    close: () => new Promise((resolve) => (server.closeAllConnections(), server.close(resolve))),
  };
}

function workspace(people) {
  const root = mkdtempSync(join(tmpdir(), 'pf-rsf-'));
  mkdirSync(join(root, 'data'), { recursive: true });
  const set = { ...validSet(), photographers: people.map((name) => ({ id: name.toLowerCase().replace(/[^a-z]+/g, '-'), name })), exhibitions: [] };
  for (const [n, records] of Object.entries(set)) writeFileSync(join(root, 'data', `${n}.json`), JSON.stringify(records, null, 2));
  return root;
}
const argv = (...a) => ['--date', DATE, ...a];
const readJson = (root, ...p) => JSON.parse(readFileSync(join(root, ...p), 'utf8'));
const candidates = (root) => readJson(root, 'updates', DATE, 'photographers-candidates.json');
const env = { SCRAPE_CONTACT: CONTACT };
const fetchAll = (w, root, ...a) => fetchMain(argv(...a), env, root, w.options);

test('Szenario: Kandidat wird über Wikidata aufgelöst (RSF-EV-1)', async () => {
  const w = await wikimedia();
  try {
    const root = workspace(['August Sander']);
    await fetchAll(w, root);
    const [r] = candidates(root).results;
    assert.equal(r.status, 'gefunden');
    assert.equal(r.wikidataId, 'Q100', 'der Eintrag mit Politiker-Beruf kommt nicht infrage');
    assert.deepEqual(r.life, { from: 1876, to: 1964 });
    assert.deepEqual(r.occupations, ['Fotograf']);
    assert.equal(r.articles[0].url, 'https://de.wikipedia.org/wiki/August_Sander');
    assert.equal(r.articles[0].description, 'deutscher Fotograf');
    assert.match(r.articles[0].extract, /Wegbereiter/);
    assert.equal(r.portrait.license, 'CC BY-SA 4.0');
  } finally {
    await w.close();
  }
});

test('Szenario: Sprachreihenfolge (RSF-UB-2)', async () => {
  assert.deepEqual(orderLangs(['pt', 'en', 'ja', 'de', 'fr', 'sv', 'es']), ['de', 'en', 'fr', 'es', 'ja', 'pt', 'sv']);
  const w = await wikimedia();
  try {
    const root = workspace(['August Sander']);
    await fetchAll(w, root);
    assert.deepEqual(candidates(root).results[0].articles.map((a) => a.lang), ['de', 'en', 'fr', 'ja', 'pt']);
  } finally {
    await w.close();
  }
});

test('Szenario: Alle Sprachversionen als Links, Anfangstexte bis zu zehn Sprachen (RAS-UB-1, RAS-UB-2)', async () => {
  const w = await wikimedia();
  try {
    const root = workspace(['Viel Sprachen']);
    const linksFile = join(root, 'updates', 'photographers-links.json');
    mkdirSync(join(root, 'updates'), { recursive: true });
    const known = { url: 'https://de.wikipedia.org/wiki/Viel_Sprachen', title: 'alt', query: 'manuell', foundAt: '2026-01-01T00:00:00.000Z' };
    writeFileSync(linksFile, JSON.stringify({ 'viel-sprachen': [known] }));
    await fetchAll(w, root);
    const [r] = candidates(root).results;
    assert.equal(r.sitelinks.length, 12);
    assert.deepEqual(r.articles.map((a) => a.lang), ['de', 'en', 'fr', 'es', 'it', 'nl', 'cs', 'da', 'fi', 'pl']);
    const links = readJson(root, 'updates', 'photographers-links.json')['viel-sprachen'];
    assert.equal(links.length, 12);
    assert.deepEqual(links[0], known);
    assert.ok(links.slice(1).every((l) => /^wikipedia:[a-z]+$/.test(l.query)));
    await fetchAll(w, root);
    assert.equal(readJson(root, 'updates', 'photographers-links.json')['viel-sprachen'].length, 12, 'zweiter Lauf ohne Dubletten');
  } finally {
    await w.close();
  }
});

test('Szenario: Person nicht gefunden oder mehrdeutig (RSF-UN-1)', async () => {
  const w = await wikimedia();
  try {
    const root = workspace(['Unbekannt Person', 'Maria Muster']);
    const before = readFileSync(join(root, 'data', 'photographers.json'), 'utf8');
    await fetchAll(w, root);
    const [a, b] = candidates(root).results;
    assert.equal(a.status, 'nicht gefunden');
    assert.equal(b.status, 'mehrdeutig');
    assert.equal(readFileSync(join(root, 'data', 'photographers.json'), 'utf8'), before);
    const report = readFileSync(join(root, 'updates', DATE, 'PHOTOGRAPHERS.md'), 'utf8');
    assert.match(report, /Nicht gefunden: 1/);
    assert.match(report, /Mehrdeutig: 1/);
  } finally {
    await w.close();
  }
});

test('Szenario: Höfliche Abrufe nur an Wikimedia (RSF-UB-3, Q-SEC-5)', async () => {
  const w = await wikimedia();
  try {
    const root = workspace(['August Sander']);
    await fetchMain(argv(), env, root, { ...w.options, minDelayMs: 60 });
    const gaps = w.requests.slice(1).map((r, i) => r.at - w.requests[i].at);
    assert.ok(gaps.every((g) => g >= 50), `Abstände ${gaps}`);
    assert.ok(w.requests.every((r) => r.userAgent.includes(CONTACT) && r.userAgent.startsWith('praktischefotografie-photographers/')));
    // Standard: nur Wikimedia-Hosts
    const strict = createClient({ contact: CONTACT, cacheDir: join(root, 'c') });
    await assert.rejects(strict.getJson('https://evil.example/x.json'), /nicht erlaubt/);
    await assert.rejects(strict.getJson('http://127.0.0.1:1/x.json'), /nicht erlaubt/);
    // ohne Kontaktadresse kein Abruf
    assert.throws(() => createClient({ cacheDir: join(root, 'c') }), /SCRAPE_CONTACT fehlt/);
    await assert.rejects(fetchMain(argv(), {}, root, w.options), /SCRAPE_CONTACT fehlt/);
  } finally {
    await w.close();
  }
});

test('Titelbild des Artikels ersetzt ein fehlendes Wikidata-Bild nur, wenn es auf Commons liegt (RSF-UB-4)', async () => {
  const w = await wikimedia();
  try {
    const root = workspace(['Bild Ersatz']);
    await fetchAll(w, root);
    const [r] = candidates(root).results;
    assert.equal(r.portrait.source, 'https://commons.wikimedia.org/wiki/File:Titelbild.jpg');
    assert.equal(r.portrait.license, 'CC0');
    assert.equal(commonsFileName('https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Foto_Name.jpg/320px-Foto_Name.jpg'), 'Foto Name.jpg');
    assert.equal(commonsFileName('https://upload.wikimedia.org/wikipedia/en/a/ab/Nur_en.jpg'), null, 'lokale Dateien der Sprachversion sind keine Commons-Dateien');
  } finally {
    await w.close();
  }
});

test('Weiterleitungen auf fremde Hosts werden nicht verfolgt (RSF-UB-3)', async () => {
  const hit = [];
  const client = createClient({
    contact: CONTACT,
    cacheDir: mkdtempSync(join(tmpdir(), 'pf-redir-')),
    minDelayMs: 0,
    fetchFn: async (url) => {
      hit.push(url);
      return url.includes('upload.wikimedia.org')
        ? new Response(null, { status: 302, headers: { location: 'https://evil.example/x.json' } })
        : new Response('{}', { status: 200 });
    },
  });
  await assert.rejects(client.getJson('https://upload.wikimedia.org/a.json'), /Host "evil\.example" ist nicht erlaubt/);
  assert.deepEqual(hit, ['https://upload.wikimedia.org/a.json']);
  assert.deepEqual(await client.getJson('https://thumb.wikimedia.org/b.json'), {}, 'thumb.wikimedia.org ist erlaubt');
});

test('Ein Bild von einem fremden Host wird nicht geladen (RSF-UB-3)', async () => {
  const w = await wikimedia();
  try {
    const root = workspace(['Evil Host']);
    await fetchAll(w, root);
    const [r] = candidates(root).results;
    assert.equal(r.status, 'Fehler');
    assert.match(r.note, /Host "evil\.example" ist nicht erlaubt/);
  } finally {
    await w.close();
  }
});

test('Szenario: Offline und Cache (RSF-OP-1, Q-MAIN-4)', async () => {
  const w = await wikimedia();
  try {
    const root = workspace(['August Sander']);
    await fetchAll(w, root);
    const first = w.requests.length;
    assert.ok(first > 0);
    await fetchAll(w, root);
    assert.equal(w.requests.length, first + 1, 'nur der Bilddownload wird wiederholt, Metadaten kommen aus dem Cache');
    assert.equal(portraitRequests(w), 2);
    const before = w.requests.length;
    await fetchMain(argv('--offline'), {}, root, w.options);
    // offline: Metadaten aus dem Cache, Vorschaubild aus .cache/portraits
    assert.equal(w.requests.length, before);
    assert.equal(candidates(root).results[0].status, 'gefunden');
    assert.equal(candidates(root).results[0].portrait.file, 'august-sander.jpg');
    const empty = workspace(['August Sander']);
    await fetchMain(argv('--offline'), {}, empty, w.options);
    assert.match(candidates(empty).results[0].note, /Offline und nicht im Cache/);
    assert.equal(w.requests.length, before);
  } finally {
    await w.close();
  }
});
const portraitRequests = (w) => w.requests.filter((r) => r.path.startsWith('/thumb/')).length;

test('Szenario: Portrait mit freier Lizenz (RSF-UB-4)', async () => {
  const w = await wikimedia();
  try {
    const root = workspace(['August Sander']);
    await fetchAll(w, root);
    const { portrait } = candidates(root).results[0];
    assert.equal(portrait.credit, 'Jane Doe', 'HTML wird entfernt');
    assert.equal(portrait.source, 'https://commons.wikimedia.org/wiki/File:August_Sander.jpg');
    assert.equal(portrait.licenseUrl, 'https://creativecommons.org/licenses/by-sa/4.0/');
    assert.deepEqual([portrait.width, portrait.height, portrait.file], [400, 520, 'august-sander.jpg']);
    assert.ok(statSync(join(root, portrait.cacheFile)).size <= 200 * 1024);
  } finally {
    await w.close();
  }
});

test('Szenario: Bild ohne freie Lizenz, ohne Urheber oder zu groß (RSF-UB-4)', async () => {
  const w = await wikimedia();
  try {
    const root = workspace(['Fritz Unfrei', 'Karl Anonym', 'Gross Bild']);
    await fetchAll(w, root);
    const [unfrei, anonym, gross] = candidates(root).results;
    assert.equal(unfrei.portrait, null);
    assert.match(unfrei.portraitNote, /keine freie Lizenz \(Fair use\)/);
    assert.equal(anonym.portrait, null);
    assert.match(anonym.portraitNote, /kein Urheber/);
    assert.equal(gross.portrait.width, 300, 'zu große Datei wird mit kleinerer Breite erneut geladen');
    assert.ok(gross.portrait.bytes <= 200 * 1024);
    assert.deepEqual(readdirSync(join(root, '.cache', 'portraits')), ['gross-bild.jpg']);
  } finally {
    await w.close();
  }
});

const person = { id: 'august-sander', occupation: 'Fotograf', sources: ['de', 'en'], portrait: true };
const summaryOf = (n) => words('eigen', n);

async function prepared(proposals, people = ['August Sander']) {
  const w = await wikimedia();
  const root = workspace(people);
  await fetchAll(w, root);
  writeFileSync(join(root, 'updates', DATE, 'photographers.json'), JSON.stringify({ date: DATE, proposals }, null, 2));
  return { w, root };
}
const approve = (root, ids) => {
  const file = join(root, 'updates', DATE, 'photographers.json');
  const p = JSON.parse(readFileSync(file, 'utf8'));
  p.proposals.forEach((x) => { if (!ids || ids.includes(x.id)) x.approved = true; });
  writeFileSync(file, JSON.stringify(p, null, 2));
};

test('Szenario: Zusammenfassung wird geprüft (RSF-UB-5, Q-DATA-8)', async () => {
  const verbatim = EXTRACT.split(' ').slice(0, 8).join(' ');
  const { w, root } = await prepared([
    { ...person, id: 'august-sander', summary: summaryOf(39) },
    { ...person, summary: summaryOf(40) },
    { ...person, summary: summaryOf(90) },
    { ...person, summary: summaryOf(91) },
    { ...person, summary: `${verbatim} ${summaryOf(45)}` },
    { ...person, summary: summaryOf(50), sources: ['sv'] },
    { ...person, summary: summaryOf(50), occupation: '' },
    { ...person, summary: summaryOf(50), occupation: 'x'.repeat(61) },
  ]);
  try {
    const checked = checkMain(argv(), root);
    const good = checked.proposals.map((p) => p.problems.length === 0);
    assert.deepEqual(good, [false, true, true, false, false, false, false, false]);
    assert.match(checked.proposals[0].problems[0], /39 Wörter/);
    assert.match(checked.proposals[4].problems.join(), /wörtliche Folge von 8 Wörtern/);
    assert.match(checked.proposals[5].problems.join(), /Quelle "sv" steht nicht/);
    assert.deepEqual(checked.proposals[1].result.wikipedia.sources.map((s) => s.lang), ['de', 'en']);
    assert.equal(checked.proposals[1].result.life.to, 1964);
  } finally {
    await w.close();
  }
});

test('sharesSequence erkennt wörtliche Folgen unabhängig von Groß-/Kleinschreibung und Satzzeichen', () => {
  assert.equal(sharesSequence('Er war, wie WIR wissen, ein sehr guter Fotograf aus Köln und Umgebung', 'Er war wie wir wissen ein sehr guter Fotograf aus Herdorf'), true);
  assert.equal(sharesSequence('ganz andere Worte hier im Text', 'Er war wie wir wissen ein sehr guter Fotograf aus Herdorf'), false);
});

test('Szenario: Übernahme nur nach Freigabe (RSF-UB-6)', async () => {
  const { w, root } = await prepared([{ ...person, summary: summaryOf(60) }]);
  try {
    checkMain(argv(), root);
    const before = readFileSync(join(root, 'data', 'photographers.json'), 'utf8');
    const result = applyMain(argv(), root);
    assert.deepEqual(result.applied, []);
    assert.equal(result.skipped[0].reason, 'keine Freigabe');
    assert.equal(readFileSync(join(root, 'data', 'photographers.json'), 'utf8'), before);
    assert.ok(!existsSync(join(root, 'data', 'portraits', 'august-sander.jpg')));
    approve(root);
    const done = applyMain(argv(), root);
    assert.deepEqual(done.applied, ['august-sander']);
    const [p] = readJson(root, 'data', 'photographers.json');
    assert.equal(p.occupation, 'Fotograf');
    assert.deepEqual(p.life, { from: 1876, to: 1964 });
    assert.equal(p.wikipedia.sources[0].url, 'https://de.wikipedia.org/wiki/August_Sander');
    assert.deepEqual(p.portrait, { file: 'august-sander.jpg', width: 400, height: 520, source: 'https://commons.wikimedia.org/wiki/File:August_Sander.jpg', credit: 'Jane Doe', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' });
    assert.ok(existsSync(join(root, 'data', 'portraits', 'august-sander.jpg')));
    assert.match(readFileSync(join(root, 'updates', DATE, 'PHOTOGRAPHERS.md'), 'utf8'), /Übernommen: 1/);
  } finally {
    await w.close();
  }
});

test('Szenario: Kein Überschreiben ohne Force (RSF-UB-6)', async () => {
  const { w, root } = await prepared([{ ...person, portrait: false, summary: summaryOf(60) }]);
  try {
    const people = readJson(root, 'data', 'photographers.json');
    people[0].wikipedia = { summary: summaryOf(50), sources: [{ lang: 'de', url: 'https://de.wikipedia.org/wiki/Alt' }] };
    writeFileSync(join(root, 'data', 'photographers.json'), JSON.stringify(people));
    checkMain(argv(), root);
    approve(root);
    const result = applyMain(argv(), root);
    assert.match(result.skipped[0].reason, /nur mit --force/);
    assert.equal(readJson(root, 'data', 'photographers.json')[0].wikipedia.sources[0].url, 'https://de.wikipedia.org/wiki/Alt');
    const forced = applyMain(argv('--force'), root);
    assert.deepEqual(forced.applied, ['august-sander']);
    assert.equal(readJson(root, 'data', 'photographers.json')[0].wikipedia.sources[0].url, 'https://de.wikipedia.org/wiki/August_Sander');
  } finally {
    await w.close();
  }
});

test('Szenario: Übernahme wird zurückgerollt (RSF-UN-2)', async () => {
  const { w, root } = await prepared([{ ...person, summary: summaryOf(60) }, { id: 'candida-h-fer', occupation: 'Fotografin', sources: ['de'], portrait: false, summary: summaryOf(60) }], ['August Sander', 'Candida Höfer']);
  try {
    // Candida Höfer hat Geburtsjahr 1944 ohne Todesjahr; Sander bekommt ein ungültiges Todesjahr in der Kandidatendatei.
    const file = join(root, 'updates', DATE, 'photographers-candidates.json');
    const c = JSON.parse(readFileSync(file, 'utf8'));
    c.results.find((r) => r.id === 'august-sander').life = { from: 2000, to: 1900 };
    writeFileSync(file, JSON.stringify(c));
    checkMain(argv(), root);
    approve(root);
    const before = readFileSync(join(root, 'data', 'photographers.json'), 'utf8');
    const result = applyMain(argv(), root);
    assert.equal(result.ok, false);
    assert.match(result.errors.join('\n'), /Todesjahr liegt vor dem Geburtsjahr/);
    assert.equal(readFileSync(join(root, 'data', 'photographers.json'), 'utf8'), before);
    assert.ok(!existsSync(join(root, 'data', 'portraits', 'august-sander.jpg')));
  } finally {
    await w.close();
  }
});

test('Szenario: Einzelne Person (RSF-OP-2)', async () => {
  const w = await wikimedia();
  try {
    const root = workspace(['August Sander', 'Maria Muster']);
    await fetchAll(w, root, '--photographer', 'maria-muster');
    assert.deepEqual(candidates(root).results.map((r) => r.id), ['maria-muster']);
    await fetchAll(w, root, '--photographer', 'maria-muster,august-sander');
    assert.deepEqual(candidates(root).results.map((r) => r.id), ['maria-muster', 'august-sander'], 'mehrere IDs mit Komma');
    await assert.rejects(fetchAll(w, root, '--photographer', 'gibt-es-nicht'), /Unbekannte Personen-ID "gibt-es-nicht"\. Gültige IDs: august-sander, maria-muster/);
    // Kandidaten ohne Optionen: nur Personen ohne Profil
    const people = readJson(root, 'data', 'photographers.json');
    people[0].wikipedia = { summary: 'x', sources: [] };
    people[0].portrait = { file: 'a.jpg' };
    writeFileSync(join(root, 'data', 'photographers.json'), JSON.stringify(people));
    await fetchAll(w, root);
    assert.deepEqual(candidates(root).results.map((r) => r.id), ['maria-muster']);
    await fetchAll(w, root, '--force');
    assert.deepEqual(candidates(root).results.map((r) => r.id), ['august-sander', 'maria-muster']);
  } finally {
    await w.close();
  }
});

test('Szenario: Bericht der Recherche (RSF-EV-2)', async () => {
  const { w, root } = await prepared([{ ...person, summary: summaryOf(60) }]);
  try {
    checkMain(argv(), root);
    approve(root);
    applyMain(argv(), root);
    const report = readFileSync(join(root, 'updates', DATE, 'PHOTOGRAPHERS.md'), 'utf8');
    assert.match(report, /Gefunden: 1/);
    assert.match(report, /`august-sander` \(August Sander\): gefunden; Sprachen: de, en, fr, ja, pt; Bild: CC BY-SA 4\.0; übernommen/);
  } finally {
    await w.close();
  }
});

test('Ausstellungsbeschreibungen bleiben nach Übernahme valide (PRF-UB-4)', async () => {
  const { w, root } = await prepared([{ ...person, summary: summaryOf(60) }]);
  try {
    const set = JSON.parse(readFileSync(join(root, 'data', 'exhibitions.json'), 'utf8'));
    assert.deepEqual(set, []);
    writeFileSync(join(root, 'data', 'exhibitions.json'), JSON.stringify([exhibition({ photographerIds: ['august-sander'], description: 'Ausstellung mit August Sander.' })]));
    checkMain(argv(), root);
    approve(root);
    assert.equal(applyMain(argv(), root).ok, true);
  } finally {
    await w.close();
  }
});

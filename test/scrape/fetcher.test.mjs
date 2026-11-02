// Gherkin: docs/contracts/gherkin/setup/webseiten-abruf.feature (FET-*), Q-SEC-4, Q-REL-1, Q-MAIN-2
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULTS, extractPage, fetchVenues, siteOf } from '../../scripts/scrape/lib/fetcher.mjs';
import { loadRedirectHosts, loadSources } from '../../scripts/scrape/lib/common.mjs';
import { testServer, page } from './server.mjs';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const FAST = { minDelayMs: 0, timeoutMs: 2000, contact: 'redaktion@example.org' };
const venue = (url, id = 'ort') => ({ id, website: url });
const tmp = () => mkdtempSync(join(tmpdir(), 'pf-snap-'));

test('Standardwerte entsprechen FET-UB-2 und FET-EV-1', () => {
  assert.equal(DEFAULTS.minDelayMs, 2000);
  assert.equal(DEFAULTS.timeoutMs, 15_000);
  assert.equal(DEFAULTS.maxBytes, 2 * 1024 * 1024);
  assert.equal(DEFAULTS.maxPages, 6);
  assert.equal(DEFAULTS.maxAgeDays, 7);
});

test('Szenario: Abruf von Startseite und Unterseiten (FET-EV-1)', async () => {
  const links = Array.from({ length: 6 }, (_, i) => `<a href="/programm-${i}">Programm ${i}</a>`).join('');
  const s = await testServer({
    '/': { body: page('Start', `${links}<a href="http://localhost:1/ausstellung-extern">Ausstellung extern</a><a href="/ueber-uns">Über uns</a>`) },
    ...Object.fromEntries(Array.from({ length: 6 }, (_, i) => [`/programm-${i}`, { body: page(`P${i}`) }])),
  });
  try {
    const [summary] = await fetchVenues([venue(s.url)], { ...FAST, snapshotDir: tmp() });
    const paths = s.requests.map((r) => r.path).filter((p) => p !== '/robots.txt');
    assert.deepEqual(paths, ['/', '/programm-0', '/programm-1', '/programm-2', '/programm-3', '/programm-4']);
    assert.equal(summary.pages, 6);
    assert.equal(summary.status, 'abgerufen');
  } finally {
    await s.close();
  }
});

test('Szenario: robots.txt wird beachtet (FET-UB-1, Q-SEC-4)', async () => {
  const s = await testServer({
    '/robots.txt': { status: 200, headers: { 'content-type': 'text/plain' }, body: 'User-agent: *\nDisallow: /programm\n' },
    '/': { body: page('Start', '<a href="/programm">Programm</a><a href="/ausstellungen">Ausstellungen</a>') },
    '/ausstellungen': { body: page('A') },
  });
  try {
    const [summary] = await fetchVenues([venue(s.url)], { ...FAST, snapshotDir: tmp() });
    assert.ok(!s.requests.some((r) => r.path === '/programm'));
    assert.ok(s.requests.some((r) => r.path === '/ausstellungen'));
    assert.ok(summary.notes.some((n) => n.includes('/programm') && n.includes('robots.txt')));
    assert.equal(s.requests[0].path, '/robots.txt', 'robots.txt zuerst');
  } finally {
    await s.close();
  }
});

test('Szenario: Höflichkeitsregeln (FET-UB-2, Q-SEC-4)', async () => {
  const s = await testServer({
    '/': { body: page('Start', '<a href="/programm">Programm</a><a href="/ausstellungen">Ausstellungen</a>') },
    '/programm': { body: page('P') },
    '/ausstellungen': { body: page('A') },
  });
  try {
    await fetchVenues([venue(s.url)], { ...FAST, minDelayMs: 150, snapshotDir: tmp() });
    const gaps = s.requests.slice(1).map((r, i) => r.at - s.requests[i].at);
    assert.ok(gaps.length >= 3 && gaps.every((g) => g >= 145), `Abstände: ${gaps}`);
  } finally {
    await s.close();
  }
});

test('Höflichkeitsregeln: zu große Antworten und Zeitüberschreitungen (FET-UB-2)', async () => {
  const s = await testServer({
    '/': { body: page('Start', '<a href="/programm">Programm</a><a href="/ausstellungen">Ausstellungen</a>') },
    '/programm': { body: page('Groß', 'x'.repeat(5000)) },
    '/ausstellungen': { body: page('Langsam'), delay: 600 },
  });
  try {
    const [summary] = await fetchVenues([venue(s.url)], { ...FAST, maxBytes: 3000, timeoutMs: 200, snapshotDir: tmp() });
    const reasons = summary.errors.map((e) => `${e.url.replace(s.url, '')}: ${e.reason}`);
    assert.ok(reasons.some((r) => r.startsWith('/programm: Antwort größer')), reasons.join('\n'));
    assert.ok(reasons.some((r) => r.startsWith('/ausstellungen: Zeitüberschreitung')), reasons.join('\n'));
  } finally {
    await s.close();
  }
});

test('Szenario: Kennung im User-Agent (FET-UB-3, Q-SEC-4)', async () => {
  const s = await testServer({ '/': { body: page('Start') } });
  try {
    await fetchVenues([venue(s.url)], { ...FAST, snapshotDir: tmp() });
    assert.ok(s.requests.length > 0);
    for (const r of s.requests) assert.match(r.userAgent, /praktischefotografie-bot.*redaktion@example\.org/);
    s.requests.length = 0;
    await assert.rejects(fetchVenues([venue(s.url)], { ...FAST, contact: undefined, snapshotDir: tmp() }), /SCRAPE_CONTACT/);
    assert.equal(s.requests.length, 0, 'keine Anfrage ohne Kontaktadresse');
  } finally {
    await s.close();
  }
});

test('Szenario: Kennung im User-Agent – CLI endet ohne Kontaktadresse mit Exit-Code 1', () => {
  const env = { ...process.env };
  delete env.SCRAPE_CONTACT;
  const r = spawnSync('node', ['scripts/scrape/fetch-venues.mjs', '--venue', 'makk-koeln'], { cwd: ROOT, env, encoding: 'utf8' });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /SCRAPE_CONTACT/);
});

test('Szenario: Seite nicht erreichbar (FET-UN-1, Q-REL-1)', async () => {
  const s = await testServer({ '/a': { status: 503, body: 'Wartung' }, '/b': { body: page('B') } });
  const dir = tmp();
  try {
    const summaries = await fetchVenues([venue(`${s.url}/a`, 'ort-a'), venue(`${s.url}/b`, 'ort-b')], { ...FAST, snapshotDir: dir });
    assert.equal(summaries[0].status, 'fehlgeschlagen');
    assert.deepEqual(summaries[0].errors.map((e) => e.reason), ['HTTP 503']);
    assert.equal(summaries[1].status, 'abgerufen');
    assert.ok(existsSync(join(dir, 'ort-b')));
    assert.ok(!existsSync(join(dir, 'ort-a')));
  } finally {
    await s.close();
  }
});

test('Szenario: Seite nicht erreichbar – vorhandener Snapshot bleibt unverändert (FET-UN-1)', async () => {
  const routes = { '/': { body: page('Alt') } };
  const s = await testServer(routes);
  const dir = tmp();
  try {
    await fetchVenues([venue(s.url)], { ...FAST, snapshotDir: dir, now: new Date('2026-10-01') });
    const file = join(dir, 'ort', readdirSync(join(dir, 'ort'))[0]);
    const before = readFileSync(file, 'utf8');
    routes['/'] = { status: 503, body: 'down' };
    const [summary] = await fetchVenues([venue(s.url)], { ...FAST, snapshotDir: dir, now: new Date('2026-10-20') });
    assert.equal(readFileSync(file, 'utf8'), before);
    assert.ok(summary.errors.length > 0);
  } finally {
    await s.close();
  }
});

test('Q-REL-1: bei 5 Ausfällen unter 20 Orten werden 15 verarbeitet und 5 berichtet', async () => {
  const routes = {};
  const venues = Array.from({ length: 20 }, (_, i) => {
    routes[`/o${i}`] = i < 5 ? { status: 500, body: 'Fehler' } : { body: page(`Ort ${i}`) };
    return venue(`SERVER/o${i}`, `ort-${i}`);
  });
  const s = await testServer(routes);
  try {
    const summaries = await fetchVenues(venues.map((v) => ({ ...v, website: v.website.replace('SERVER', s.url) })), { ...FAST, snapshotDir: tmp() });
    assert.equal(summaries.length, 20);
    assert.equal(summaries.filter((x) => x.status === 'abgerufen').length, 15);
    assert.equal(summaries.filter((x) => x.status === 'fehlgeschlagen').length, 5);
  } finally {
    await s.close();
  }
});

test('Szenario: Weiterleitung auf anderen Host (FET-UN-3, Q-SEC-4)', async () => {
  // "localhost" statt "127.0.0.1" ist für den Abrufdienst ein anderer Host.
  const other = await testServer({ '/ziel': { body: page('Ziel') } });
  const s = await testServer({ '/': { status: 302, headers: { location: `http://localhost:${other.port}/ziel` }, body: '' } });
  try {
    const [summary] = await fetchVenues([venue(s.url)], { ...FAST, snapshotDir: tmp() });
    assert.equal(other.requests.length, 0, 'der anderen Adresse wird nicht gefolgt');
    assert.ok(summary.notes.some((n) => n.includes('Weiterleitung auf andere Website')), summary.notes.join('\n'));
  } finally {
    await s.close();
    await other.close();
  }
});

const to = (port, path = '/ziel') => `http://localhost:${port}${path}`;
const redirect = (location) => ({ status: 302, headers: { location }, body: '' });
const allow = { redirectHosts: { ort: ['localhost'] } };

test('Szenario: Weiterleitung auf freigegebenen Host (FET-EV-2, FET-UB-6)', async () => {
  const other = await testServer({ '/ziel': { body: page('Ziel', '<p>Inhalt</p>') } });
  const s = await testServer({ '/': redirect(to(other.port)) });
  const dir = tmp();
  try {
    const [summary] = await fetchVenues([venue(s.url)], { ...FAST, ...allow, snapshotDir: dir });
    assert.equal(summary.status, 'abgerufen');
    assert.ok(summary.notes.some((n) => n.includes('Weiterleitung verfolgt')), summary.notes.join('\n'));
    assert.ok(other.requests.some((r) => r.path === '/robots.txt'), 'robots.txt des Zielhosts wird geprüft');
    const [file] = readdirSync(join(dir, 'ort'));
    assert.equal(JSON.parse(readFileSync(join(dir, 'ort', file), 'utf8')).url, to(other.port));
  } finally {
    await s.close();
    await other.close();
  }
});

test('Szenario: robots.txt des Zielhosts verbietet den Abruf (FET-UB-6)', async () => {
  const other = await testServer({ '/robots.txt': { body: 'User-agent: *\nDisallow: /' }, '/ziel': { body: page('Ziel') } });
  const s = await testServer({ '/': redirect(to(other.port)) });
  try {
    const [summary] = await fetchVenues([venue(s.url)], { ...FAST, ...allow, snapshotDir: tmp() });
    assert.ok(!other.requests.some((r) => r.path === '/ziel'));
    assert.notEqual(summary.status, 'abgerufen');
  } finally {
    await s.close();
    await other.close();
  }
});

test('Szenario: Weiterleitungsgrenze und Schleife (FET-UB-7)', async () => {
  const s = await testServer({
    '/': redirect('/a'), '/a': redirect('/b'), '/b': redirect('/c'), '/c': redirect('/d'), '/d': { body: page('Ende') },
  });
  const loop = await testServer({ '/': redirect('/x'), '/x': redirect('/') });
  try {
    const [tooLong] = await fetchVenues([venue(s.url)], { ...FAST, snapshotDir: tmp() });
    assert.ok(!s.requests.some((r) => r.path === '/d'), 'höchstens 3 Weiterleitungen');
    assert.notEqual(tooLong.status, 'abgerufen');
    const [looped] = await fetchVenues([venue(loop.url)], { ...FAST, snapshotDir: tmp() });
    assert.notEqual(looped.status, 'abgerufen');
    assert.ok(loop.requests.filter((r) => r.path !== '/robots.txt').length <= 4);
  } finally {
    await s.close();
    await loop.close();
  }
});

test('Szenario: Meta-Refresh und JavaScript-Weiterleitung (FET-UB-8)', async () => {
  const other = await testServer({ '/ziel': { body: page('Ziel', '<p>Inhalt</p>') } });
  const meta = `<html><head><meta http-equiv="refresh" content="0; url=${to(other.port)}"></head><body></body></html>`;
  const js = `<html><head></head><body><script>window.location.href = '${to(other.port)}';</script></body></html>`;
  const content = `<html><head><title>Start</title></head><body><h1>Programm</h1><p>${'Ausstellung im Haus. '.repeat(10)}</p><script>window.location = '${to(other.port)}';</script></body></html>`;
  const s = await testServer({ '/': { body: meta }, '/js': { body: js }, '/inhalt': { body: content } });
  try {
    for (const path of ['/', '/js']) {
      const [summary] = await fetchVenues([venue(s.url + path)], { ...FAST, ...allow, snapshotDir: tmp() });
      assert.equal(summary.status, 'abgerufen', path);
      assert.ok(summary.notes.some((n) => n.includes('Weiterleitung verfolgt')), path);
    }
    const before = other.requests.length;
    await fetchVenues([venue(s.url + '/inhalt')], { ...FAST, ...allow, snapshotDir: tmp() });
    assert.equal(other.requests.length, before, 'Seite mit Inhalt wird nicht als Weiterleitung gewertet');
  } finally {
    await s.close();
    await other.close();
  }
});

test('Szenario: Weiterleitungsdatei wird geprüft (FET-OP-3)', () => {
  const root = mkdtempSync(join(tmpdir(), 'pf-rh-'));
  const write = (obj) => {
    mkdirSync(join(root, 'scripts', 'scrape'), { recursive: true });
    writeFileSync(join(root, 'scripts', 'scrape', 'redirect-hosts.json'), JSON.stringify(obj));
  };
  const sources = [{ id: 'ort' }];
  write({ ort: ['www.example.org'] });
  assert.deepEqual(loadRedirectHosts(sources, root), { ort: ['www.example.org'] });
  write({ ort: ['https://example.org/pfad'] });
  assert.throws(() => loadRedirectHosts(sources, root), /ungültiger Hostname/);
  write({ unbekannt: ['example.org'] });
  assert.throws(() => loadRedirectHosts(sources, root), /unbekannte/);
  assert.deepEqual(loadRedirectHosts(loadSources(ROOT), ROOT), loadRedirectHosts(loadSources(ROOT)), 'mitgelieferte Datei ist gültig');
});

test('Szenario: Snapshot wird gespeichert (FET-UB-4)', async () => {
  const s = await testServer({ '/': { body: page('Startseite', '<p>Hallo   Welt</p>') } });
  const dir = tmp();
  try {
    await fetchVenues([venue(s.url, 'ort-x')], { ...FAST, snapshotDir: dir, now: new Date('2026-10-27T10:00:00Z') });
    const [file] = readdirSync(join(dir, 'ort-x'));
    const snapshot = JSON.parse(readFileSync(join(dir, 'ort-x', file), 'utf8'));
    assert.equal(snapshot.url, s.url);
    assert.equal(snapshot.fetchedAt, '2026-10-27T10:00:00.000Z');
    assert.equal(snapshot.status, 200);
    assert.match(snapshot.hash, /^[0-9a-f]{64}$/);
    assert.match(snapshot.text, /Hallo Welt/);
    assert.doesNotMatch(snapshot.text, /var x=1/, 'Skripte sind entfernt');
    assert.doesNotThrow(() => execFileSync('git', ['check-ignore', '-q', '.cache/snapshots/ort-x/x.json'], { cwd: ROOT }), '.cache ist von Git ausgeschlossen');
  } finally {
    await s.close();
  }
});

test('Szenario: Cache und Offline-Modus (FET-OP-1, Q-MAIN-2)', async () => {
  const s = await testServer({ '/': { body: page('Start') } });
  const dir = tmp();
  const T0 = new Date('2026-10-01T10:00:00Z');
  const day = (n) => new Date(T0.getTime() + n * 86_400_000);
  const count = () => s.requests.filter((r) => r.path === '/').length;
  try {
    await fetchVenues([venue(s.url)], { ...FAST, snapshotDir: dir, now: T0 });
    assert.equal(count(), 1);
    const [fresh] = await fetchVenues([venue(s.url)], { ...FAST, snapshotDir: dir, now: day(2), maxAgeDays: 7 });
    assert.equal(count(), 1, 'Snapshot ist 2 Tage alt: keine Netzanfrage');
    assert.equal(fresh.status, 'zwischengespeichert');
    await fetchVenues([venue(s.url)], { ...FAST, snapshotDir: dir, now: day(10), maxAgeDays: 7 });
    assert.equal(count(), 2, 'Snapshot ist 10 Tage alt: neu abgerufen');
    const before = s.requests.length;
    const [offline] = await fetchVenues([venue(s.url)], { snapshotDir: dir, offline: true, now: day(30) });
    assert.equal(s.requests.length, before, 'offline: keine Anfrage');
    assert.equal(offline.status, 'zwischengespeichert');
    const [none] = await fetchVenues([venue(s.url, 'anderer')], { snapshotDir: dir, offline: true });
    assert.equal(none.status, 'übersprungen');
  } finally {
    await s.close();
  }
});

test('Szenario: Nur lesende Abrufe (FET-UB-5, Q-SEC-4)', async () => {
  const s = await testServer({
    '/': { body: page('Start', '<a href="ftp://example.org/programm">Programm</a><a href="mailto:a@b.de">Besuch</a><form action="/senden" method="post"><input name="q"></form><a href="/ausstellungen">Ausstellungen</a>') },
    '/ausstellungen': { body: page('A') },
  });
  try {
    await fetchVenues([venue(s.url)], { ...FAST, snapshotDir: tmp() });
    assert.ok(s.requests.every((r) => r.method === 'GET'));
    assert.ok(!s.requests.some((r) => r.path === '/senden'));
    const [bad] = await fetchVenues([venue('ftp://example.org/')], { ...FAST, snapshotDir: tmp() });
    assert.equal(bad.status, 'fehlgeschlagen');
    assert.match(bad.errors[0].reason, /nicht erlaubt/);
  } finally {
    await s.close();
  }
});

test('Q-MAIN-2: Offline-Modus ruft nie die Netzfunktion auf', async () => {
  let calls = 0;
  const fetchFn = () => {
    calls++;
    throw new Error('Netzzugriff verboten');
  };
  await fetchVenues([venue('https://fremd.example.org/')], { snapshotDir: tmp(), offline: true, fetchFn });
  assert.equal(calls, 0);
  const [summary] = await fetchVenues([venue('https://fremd.example.org/')], { ...FAST, snapshotDir: tmp(), fetchFn });
  assert.equal(summary.status, 'fehlgeschlagen', 'ein Abruf an einen fremden Host schlägt im Test fehl');
});

test('Q-PERF-5: Abruf aller 20 Orte dauert bei den Standardregeln höchstens 10 Minuten (rechnerisch)', () => {
  const requestsPerVenue = DEFAULTS.maxPages + 1; // Seiten plus robots.txt
  const seconds = 20 * requestsPerVenue * (DEFAULTS.minDelayMs / 1000);
  assert.ok(seconds <= 600, `${seconds} s`);
});

test('Szenario: Links mit und ohne www gehören zur selben Website (FET-EV-1)', () => {
  assert.equal(siteOf('https://www.makk.de/'), siteOf('https://makk.de/besuchen'));
  assert.notEqual(siteOf('https://makk.de/'), siteOf('https://makk.example.org/'));
  const html = page('Start', '<a href="https://makk.de/besuchen/ausstellungen/sonderausstellungen">Sonderausstellungen</a><a href="https://shop.makk.de/ausstellung">Ausstellung Shop</a><a href="https://fremd.example.org/programm">Programm</a>');
  const { links } = extractPage(html, 'https://www.makk.de/');
  assert.deepEqual(links, ['https://makk.de/besuchen/ausstellungen/sonderausstellungen']);
});

test('Links zu Ausstellungen und Programm stehen vor allgemeinen Besuchsseiten (FET-EV-1)', () => {
  const html = page('Start', ['besuchen/a', 'besuchen/b', 'besuchen/c', 'besuchen/d', 'besuchen/e', 'besuchen/ausstellungen/sonderausstellungen', 'veranstaltungskalender'].map((p) => `<a href="/${p}">${p}</a>`).join(''));
  const { links } = extractPage(html, 'https://makk.example.org/');
  assert.deepEqual(links.slice(0, 2).map((l) => new URL(l).pathname), ['/besuchen/ausstellungen/sonderausstellungen', '/veranstaltungskalender']);
  assert.equal(links.length, 7);
});

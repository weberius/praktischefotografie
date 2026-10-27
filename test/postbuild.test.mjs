// Gherkin: docs/contracts/gherkin/setup/web-build.feature (Sitemap und robots.txt, 404-Seite)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { postbuild } from '../web/tools/postbuild.mjs';

function dist(paths) {
  const d = mkdtempSync(join(tmpdir(), 'pf-dist-'));
  for (const p of paths) {
    mkdirSync(join(d, p), { recursive: true });
    writeFileSync(join(d, p, 'index.html'), `<h1>${p}</h1>`);
  }
  return d;
}

test('Szenario: Sitemap und robots.txt (BLD-UB-2)', () => {
  const d = dist(['.', 'venues', 'venues/makk-koeln', 'posts/mein-beitrag', '404']);
  postbuild({ dist: d, siteUrl: 'https://example.org', baseHref: '/pf/' });
  const sitemap = readFileSync(join(d, 'sitemap.xml'), 'utf8');
  for (const p of ['/pf/', '/pf/venues', '/pf/venues/makk-koeln', '/pf/posts/mein-beitrag']) assert.ok(sitemap.includes(`<loc>https://example.org${p}</loc>`), p);
  assert.ok(!sitemap.includes('404'), '404 gehört nicht in die Sitemap');
  assert.match(readFileSync(join(d, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/example\.org\/pf\/sitemap\.xml/);
});

test('Szenario: 404-Seite (BLD-UB-5)', () => {
  const d = dist(['.', '404']);
  postbuild({ dist: d });
  assert.equal(readFileSync(join(d, '404.html'), 'utf8'), '<h1>404</h1>');
  assert.ok(existsSync(join(d, '404.html')));
});

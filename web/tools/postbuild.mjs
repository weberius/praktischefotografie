// Nach dem Build: 404.html, sitemap.xml und robots.txt erzeugen (BLD-UB-2, BLD-UB-5).
// Aufruf: node tools/postbuild.mjs [--dist <ordner>]   Umgebung: SITE_URL (Origin), BASE_HREF (Pfad, Standard "/")
import { copyFileSync, existsSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));

/** Alle Adressen mit vorab gerenderter Seite (ohne 404), z. B. "/", "/venues/makk-koeln". */
export function prerenderedPaths(dist) {
  const paths = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (name === 'index.html') paths.push('/' + relative(dist, dir).split('\\').join('/'));
    }
  };
  walk(dist);
  return paths.filter((p) => p !== '/404').map((p) => (p === '/' ? '/' : p.replace(/\/$/, ''))).sort();
}

export function postbuild({ dist, siteUrl = 'https://praktischefotografie.de', baseHref = '/' }) {
  const base = baseHref.endsWith('/') ? baseHref : `${baseHref}/`;
  const origin = siteUrl.replace(/\/$/, '');
  const urlFor = (p) => `${origin}${base}${p.replace(/^\//, '')}`;
  const paths = prerenderedPaths(dist);
  const xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...paths.map((p) => `  <url><loc>${urlFor(p)}</loc></url>`), '</urlset>', ''].join('\n');
  writeFileSync(join(dist, 'sitemap.xml'), xml);
  writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}${base}sitemap.xml\n`);
  const notFound = join(dist, '404', 'index.html');
  if (existsSync(notFound)) copyFileSync(notFound, join(dist, '404.html'));
  return { paths };
}

function main() {
  const i = process.argv.indexOf('--dist');
  const dist = i > -1 ? resolve(process.argv[i + 1]) : resolve(HERE, '../dist/web/browser');
  const { paths } = postbuild({ dist, siteUrl: process.env.SITE_URL, baseHref: process.env.BASE_HREF });
  console.log(`sitemap.xml mit ${paths.length} Adressen, robots.txt und 404.html erzeugt.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();

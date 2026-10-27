// Q-SEO-1, Q-SEO-2, Q-SEO-3: prüft die vorab gerenderten Seiten im Build-Ordner.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { prerenderedPaths } from '../postbuild.mjs';

const textOf = (html, re) => (re.exec(html)?.[1] ?? '').replace(/<[^>]+>/g, '').trim();

export function seoCheck(dist) {
  const errors = [];
  const paths = prerenderedPaths(dist);
  const titles = new Map();
  for (const p of paths) {
    const html = readFileSync(join(dist, p === '/' ? '' : p, 'index.html'), 'utf8');
    if (!textOf(html, /<h1[^>]*>([\s\S]*?)<\/h1>/)) errors.push(`${p}: keine Hauptüberschrift im HTML (Q-SEO-1)`);
    if (textOf(html, /<main[^>]*>([\s\S]*?)<\/main>/).length < 40) errors.push(`${p}: kaum Hauptinhalt im HTML (Q-SEO-1)`);
    const title = textOf(html, /<title>([\s\S]*?)<\/title>/);
    if (!title) errors.push(`${p}: kein Titel (Q-SEO-2)`);
    if (!/<meta name="description" content="[^"]+"/.test(html)) errors.push(`${p}: keine Meta-Beschreibung (Q-SEO-2)`);
    if (titles.has(title)) errors.push(`${p}: Titel doppelt mit ${titles.get(title)} (Q-SEO-2)`);
    titles.set(title, p);
  }
  const sitemap = existsSync(join(dist, 'sitemap.xml')) ? readFileSync(join(dist, 'sitemap.xml'), 'utf8') : '';
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.length !== paths.length) errors.push(`sitemap.xml enthält ${locs.length} statt ${paths.length} Adressen (Q-SEO-3)`);
  for (const p of paths) if (!locs.some((l) => (p === '/' ? /\/$/.test(l) || !/\/[^/]+$/.test(l) : l.endsWith(p)))) errors.push(`${p}: fehlt in sitemap.xml (Q-SEO-3)`);
  if (!/Sitemap: \S+sitemap\.xml/.test(existsSync(join(dist, 'robots.txt')) ? readFileSync(join(dist, 'robots.txt'), 'utf8') : '')) errors.push('robots.txt verweist nicht auf die Sitemap (Q-SEO-3)');
  if (!existsSync(join(dist, '404.html'))) errors.push('404.html fehlt (BLD-UB-5)');
  return { errors, pages: paths.length };
}

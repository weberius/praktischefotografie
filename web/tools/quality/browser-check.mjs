// Q-USE-2 (axe), Q-USE-3 (Tastatur), Q-SEC-2 (Netzwerk) gegen den Produktionsbuild.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright-core';

const require = createRequire(import.meta.url);
const AXE = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const ALLOWED_HOST = /(^|\.)tile\.openstreetmap\.org$/;

/** Je Seitentyp eine Adresse (aus der Sitemap abgeleitet) plus Hinweisseite. */
export function samplePages(paths) {
  const first = (re) => paths.find((p) => re.test(p));
  return ['/', '/calendar', first(/^\/calendar\/\d{4}\/\d+$/), '/map', '/venues', first(/^\/venues\/.+/), '/photographers', first(/^\/photographers\/.+/), '/exhibitions', first(/^\/exhibitions\/.+/), '/events', first(/^\/events\/.+/), '/festivals', first(/^\/festivals\/.+/), '/organizers', first(/^\/organizers\/.+/), first(/^\/posts\/.+/), '/impressum', '/haftungsausschluss', '/datenschutz', '/quellen', '/404.html'].filter(Boolean);
}

export async function browserCheck({ baseUrl, paths, executablePath }) {
  const browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
  const report = { axe: {}, network: {}, keyboard: {}, layout: {}, errors: [] };
  try {
    for (const path of samplePages(paths)) {
      const page = await browser.newPage();
      const external = new Set();
      page.on('request', (req) => {
        const host = new URL(req.url()).hostname;
        if (host !== '127.0.0.1' && !(path === '/map' && ALLOWED_HOST.test(host))) external.add(host);
      });
      await page.goto(baseUrl + path, { waitUntil: 'networkidle' }).catch(() => undefined);
      await page.waitForSelector('h1');

      await page.evaluate(AXE);
      const axe = await page.evaluate(() => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } }));
      report.axe[path] = axe.violations.map((v) => `${v.id} (${v.nodes.length}×): ${v.help}`);
      if (axe.violations.length) report.errors.push(`${path}: ${axe.violations.length} axe-Verstöße (Q-USE-2)`);

      report.network[path] = [...external];
      if (external.size) report.errors.push(`${path}: Anfragen an fremde Hosts ${[...external].join(', ')} (Q-SEC-2)`);

      // Tastatur: Alle sichtbaren interaktiven Elemente erhalten per Tab den Fokus, der Fokus ist sichtbar.
      const interactive = await page.evaluate(() => [...document.querySelectorAll('a[href], button, select, input, textarea, [tabindex]:not([tabindex="-1"])')].filter((e) => e.getClientRects().length > 0 && !e.closest('.leaflet-container')).length);
      const reached = new Set();
      let invisibleFocus = 0;
      for (let i = 0; i < interactive + 5 && i < 200; i++) {
        await page.keyboard.press('Tab');
        const info = await page.evaluate(() => {
          const e = document.activeElement;
          if (!e || e === document.body) return null;
          const s = getComputedStyle(e);
          const id = e.getAttribute('href') ?? e.id ?? e.tagName + e.textContent?.slice(0, 20);
          return { id: `${e.tagName}:${id}`, leaflet: !!e.closest('.leaflet-container'), visible: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0 || s.boxShadow !== 'none' };
        });
        if (info && !info.leaflet) {
          reached.add(info.id);
          if (!info.visible) invisibleFocus++;
        }
      }
      report.keyboard[path] = { interactive, reached: reached.size, invisibleFocus };
      if (reached.size < Math.min(interactive, 1) || invisibleFocus > 0) report.errors.push(`${path}: Tastatur – ${reached.size}/${interactive} erreicht, ${invisibleFocus} ohne sichtbaren Fokus (Q-USE-3)`);
      await page.close();
    }
    // Q-USE-13: Kopfhöhe und Scrollbreite bei schmalen Fenstern (390 px ≤ 5 rem, 320 px ≤ 6 rem, kein horizontales Scrollen).
    for (const [width, height, maxRem] of [[390, 844, 5], [320, 640, 6]]) {
      for (const path of ['/', '/map']) {
        const page = await browser.newPage({ viewport: { width, height } });
        await page.goto(baseUrl + path, { waitUntil: 'networkidle' }).catch(() => undefined);
        await page.waitForSelector('.site-header');
        const m = await page.evaluate(() => ({ rem: document.querySelector('.site-header').getBoundingClientRect().height / parseFloat(getComputedStyle(document.documentElement).fontSize), scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
        report.layout[`${path} @${width}`] = { kopfRem: +m.rem.toFixed(2), scrollWidth: m.scrollWidth, clientWidth: m.clientWidth };
        if (m.rem > maxRem) report.errors.push(`${path} bei ${width} px: Kopf ${m.rem.toFixed(2)} rem > ${maxRem} rem (Q-USE-13)`);
        if (m.scrollWidth > m.clientWidth) report.errors.push(`${path} bei ${width} px: horizontales Scrollen (Q-USE-13)`);
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
  return report;
}

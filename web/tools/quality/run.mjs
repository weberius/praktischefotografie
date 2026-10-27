// Qualitätsprüfung am Demo-Produktionsbuild (`npm run quality`): SEO, axe, Tastatur, Netzwerk, Lighthouse.
// Voraussetzung: `npm run build:demo` und CHROME_BIN. Aufruf: node tools/quality/run.mjs [--skip-lighthouse]
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { prerenderedPaths } from '../postbuild.mjs';
import { browserCheck, samplePages } from './browser-check.mjs';
import { seoCheck } from './seo-check.mjs';
import { serve } from './static-server.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const dist = resolve(HERE, '../../dist/web/browser');
const executablePath = process.env.CHROME_BIN;
if (!executablePath) throw new Error('CHROME_BIN ist nicht gesetzt.');

const paths = prerenderedPaths(dist);
const { server, url } = await serve(dist);
const report = { seo: seoCheck(dist), browser: null, lighthouse: null };
try {
  report.browser = await browserCheck({ baseUrl: url, paths, executablePath });
  if (!process.argv.includes('--skip-lighthouse')) {
    const { lighthouseCheck } = await import('./lighthouse-check.mjs');
    report.lighthouse = await lighthouseCheck({ baseUrl: url, venuePath: samplePages(paths).find((p) => p.startsWith('/venues/')), chromePath: executablePath });
  }
} finally {
  server.close();
}
const errors = [...report.seo.errors, ...(report.browser?.errors ?? []), ...(report.lighthouse?.errors ?? [])];
mkdirSync(join(HERE, '../../quality-report'), { recursive: true });
writeFileSync(join(HERE, '../../quality-report/report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ seoPages: report.seo.pages, axe: Object.fromEntries(Object.entries(report.browser.axe).map(([k, v]) => [k, v.length])), keyboard: report.browser.keyboard, network: report.browser.network, lighthouse: report.lighthouse ? { scores: report.lighthouse.scores, metrics: report.lighthouse.metrics } : 'übersprungen' }, null, 2));
if (errors.length) {
  console.error(`\n${errors.length} Befunde:\n${errors.join('\n')}`);
  process.exitCode = 1;
} else console.log('\nAlle Prüfungen bestanden.');

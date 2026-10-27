// Rauchtest der Interaktion im echten Browser (zoneless): Filter, Navigation, Karte.
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { serve } from './static-server.mjs';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../../dist/web/browser');
const { server, url } = await serve(dist);
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN, args: ['--no-sandbox'] });
const errors = [];
try {
  const page = await browser.newPage();
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  const count = () => page.locator('ul.card-list > li').count();

  await page.goto(`${url}/venues`);
  await page.waitForSelector('ul.card-list li');
  const all = await count();
  await page.getByLabel('Stadt').selectOption('Köln');
  await page.waitForFunction((n) => document.querySelectorAll('ul.card-list > li').length < n, all);
  const koeln = await count();
  if (!(koeln > 0 && koeln < all)) errors.push(`Ortsfilter: ${all} → ${koeln}`);
  if (!page.url().includes('city=K')) errors.push(`Filter nicht in der Adresse: ${page.url()}`);

  await page.goto(`${url}/map`);
  await page.waitForSelector('ul.card-list li');
  await page.locator('app-venue-map').scrollIntoViewIfNeeded();
  await page.waitForSelector('.leaflet-marker-icon', { timeout: 10000 });
  const markers = await page.locator('.leaflet-marker-icon').count();
  await page.getByLabel('Hat Präsenzbibliothek').check();
  await page.waitForFunction((n) => document.querySelectorAll('.leaflet-marker-icon').length < n, markers);

  await page.goto(`${url}/`);
  await page.getByRole('navigation', { name: 'Hauptnavigation' }).getByRole('link', { name: 'Kalender' }).click();
  await page.waitForURL('**/calendar');
  await page.waitForSelector('h1');
  await page.getByRole('navigation', { name: 'Hauptnavigation' }).getByRole('link', { name: 'Ausstellungen' }).click();
  await page.waitForURL('**/exhibitions');
  await page.getByLabel('Status').selectOption('beendet');
  await page.waitForFunction(() => [...document.querySelectorAll('ul.card-list > li')].every((li) => li.textContent.includes('Beendet')));
  console.log(`Rauchtest: Ortsfilter ${all}→${koeln}, Karte ${markers} Marker, Navigation und Statusfilter ok`);
} catch (e) {
  errors.push(String(e));
} finally {
  await browser.close();
  server.close();
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }

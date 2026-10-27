// Abruf der Webseiten von Orten (FET-*, ADR-006): rücksichtsvoll, lesend, reproduzierbar.
import * as cheerio from 'cheerio';
import robotsParser from 'robots-parser';
import { ageInDays, listSnapshots, loadSnapshot, saveSnapshot } from './snapshots.mjs';
import { normalizeSpace } from './common.mjs';

export const PROJECT = 'praktischefotografie-bot';
export const DEFAULTS = {
  minDelayMs: 2000,
  timeoutMs: 15_000,
  maxBytes: 2 * 1024 * 1024,
  maxPages: 6, // Startseite + bis zu fünf Unterseiten (FET-EV-1)
  maxAgeDays: 7,
  maxRedirects: 3,
};

const LINK_KEYWORDS = /programm|ausstellung|veranstaltung|event|kalender|aktuell|besuch|öffnungszeit|oeffnungszeit|anfahrt|bibliothek|sammlung|exhibition|visit|whatson|was-ist-los/i;
/** Links zu Programm und Ausstellungen sind wichtiger als allgemeine Besuchsseiten; bei gleicher Wertung gilt die Reihenfolge im Dokument. */
const PRIORITY = /ausstellung|exhibition|programm|veranstaltung|kalender|event|whatson|was-ist-los/i;
const SKIP_EXTENSIONS = /\.(pdf|jpe?g|png|gif|webp|svg|zip|mp[34]|docx?|xlsx?)(\?|$)/i;

/** Website-Schlüssel: Host ohne führendes "www." (makk.de und www.makk.de sind dieselbe Website). */
export const siteOf = (url) => new URL(url).host.replace(/^www\./i, '').toLowerCase();

export const userAgent = (contact) => `${PROJECT}/1.0 (+${contact})`;

/** Textinhalt einer HTML-Seite ohne Skripte, Stile und Eingebettetes; Leerraum normalisiert. */
export function extractPage(html, baseUrl) {
  const $ = cheerio.load(html);
  const links = new Map();
  $('a[href]').each((_, a) => {
    try {
      const url = new URL($(a).attr('href'), baseUrl);
      url.hash = '';
      if (!/^https?:$/.test(url.protocol) || siteOf(url.href) !== siteOf(baseUrl)) return;
      if (SKIP_EXTENSIONS.test(url.pathname) || url.href === new URL(baseUrl).href) return;
      const label = `${url.pathname} ${$(a).text()}`;
      if (LINK_KEYWORDS.test(label) && !links.has(url.href)) links.set(url.href, PRIORITY.test(label) ? 0 : 1);
    } catch {
      // ungültige Adresse: ignorieren
    }
  });
  $('script, style, noscript, svg, iframe, template').remove();
  const title = normalizeSpace($('title').first().text());
  const text = normalizeSpace($('body').text() || $.root().text()).slice(0, 200_000);
  const ordered = [...links].sort((a, b) => a[1] - b[1]).map(([href]) => href);
  return { title, text, links: ordered };
}

async function readLimited(response, maxBytes) {
  const declared = Number(response.headers.get('content-length'));
  if (declared > maxBytes) return null;
  const reader = response.body.getReader();
  const chunks = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > maxBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString('utf8');
}

/**
 * Ruft Orte ab. Optionen: contact, offline, maxAgeDays, snapshotDir, now, fetchFn, sleep und die Grenzwerte aus DEFAULTS.
 * Gibt je Ort eine Zusammenfassung zurück; Fehler einzelner Orte stoppen den Lauf nicht (FET-UN-1).
 */
export async function fetchVenues(venues, options) {
  const o = { ...DEFAULTS, fetchFn: globalThis.fetch, sleep: (ms) => new Promise((r) => setTimeout(r, ms)), now: new Date(), offline: false, ...options };
  if (!o.offline && !o.contact) throw new Error('SCRAPE_CONTACT fehlt: Ohne Kontaktadresse im User-Agent wird nicht abgerufen.');
  const ua = o.offline ? '' : userAgent(o.contact);
  const lastRequest = new Map();
  const robotsCache = new Map();

  async function request(url, { redirectsLeft = o.maxRedirects } = {}) {
    const parsed = new URL(url);
    if (!/^https?:$/.test(parsed.protocol)) return { error: `Protokoll ${parsed.protocol} nicht erlaubt` };
    const wait = (lastRequest.get(siteOf(url)) ?? -Infinity) + o.minDelayMs - Date.now();
    if (wait > 0) await o.sleep(wait);
    lastRequest.set(siteOf(url), Date.now());
    let response;
    try {
      response = await o.fetchFn(url, { method: 'GET', redirect: 'manual', headers: { 'user-agent': ua, accept: 'text/html,text/plain;q=0.9' }, signal: AbortSignal.timeout(o.timeoutMs) });
    } catch (e) {
      return { error: e.name === 'TimeoutError' ? `Zeitüberschreitung nach ${o.timeoutMs / 1000} s` : `Netzwerkfehler: ${e.cause?.code ?? e.message}` };
    }
    lastRequest.set(siteOf(url), Date.now()); // Abstand zählt ab dem Eintreffen der Antwort
    if (response.status >= 300 && response.status < 400 && response.headers.get('location')) {
      const target = new URL(response.headers.get('location'), url);
      if (siteOf(target.href) !== siteOf(url)) return { redirect: target.href, error: `Weiterleitung auf andere Website (${target.host}) nicht verfolgt` };
      if (redirectsLeft <= 0) return { error: 'Zu viele Weiterleitungen' };
      return request(target.href, { redirectsLeft: redirectsLeft - 1 });
    }
    return { response, finalUrl: url };
  }

  async function robotsFor(url) {
    const { origin } = new URL(url);
    if (robotsCache.has(origin)) return robotsCache.get(origin);
    const result = await request(`${origin}/robots.txt`);
    let robots;
    if (result.error) robots = { allowed: false, reason: `robots.txt nicht lesbar (${result.error})` };
    else if (result.response.status >= 500) robots = { allowed: false, reason: `robots.txt antwortet mit ${result.response.status}` };
    else if (result.response.status >= 400) robots = { allowed: true, parser: null };
    else robots = { allowed: true, parser: robotsParser(`${origin}/robots.txt`, (await readLimited(result.response, o.maxBytes)) ?? '') };
    robotsCache.set(origin, robots);
    return robots;
  }

  async function fetchPage(venueId, url, summary) {
    if (!/^https?:$/.test(new URL(url).protocol)) {
      summary.errors.push({ url, reason: `Protokoll ${new URL(url).protocol} nicht erlaubt` });
      return null;
    }
    const robots = await robotsFor(url);
    if (!robots.allowed) {
      summary.errors.push({ url, reason: `nicht abgerufen, ${robots.reason}` });
      return null;
    }
    if (robots.parser && robots.parser.isAllowed(url, PROJECT) === false) {
      summary.notes.push(`${url}: laut robots.txt nicht erlaubt`);
      return null;
    }
    const result = await request(url);
    if (result.error) {
      (result.redirect ? summary.notes : summary.errors).push(result.redirect ? `${url}: ${result.error}` : { url, reason: result.error });
      return null;
    }
    const { response } = result;
    if (response.status >= 400) {
      summary.errors.push({ url, reason: `HTTP ${response.status}` });
      return null;
    }
    if (!/text\/html|application\/xhtml/i.test(response.headers.get('content-type') ?? '')) {
      summary.notes.push(`${url}: übersprungen, kein HTML`);
      return null;
    }
    const html = await readLimited(response, o.maxBytes);
    if (html === null) {
      summary.errors.push({ url, reason: `Antwort größer als ${o.maxBytes / 1024 / 1024} MB verworfen` });
      return null;
    }
    const page = extractPage(html, result.finalUrl);
    return saveSnapshot(o.snapshotDir, venueId, { url, fetchedAt: o.now.toISOString(), status: response.status, title: page.title, text: page.text, links: page.links });
  }

  const summaries = [];
  for (const venue of venues) {
    const summary = { venueId: venue.id, status: 'übersprungen', pages: 0, fetched: 0, cached: 0, errors: [], notes: [] };
    summaries.push(summary);
    const fresh = (url) => {
      const snapshot = loadSnapshot(o.snapshotDir, venue.id, url);
      return snapshot && (o.offline || ageInDays(snapshot, o.now) < o.maxAgeDays) ? snapshot : null;
    };
    if (o.offline) {
      const snapshots = listSnapshots(o.snapshotDir, venue.id);
      summary.pages = snapshots.length;
      summary.cached = snapshots.length;
      summary.status = snapshots.length ? 'zwischengespeichert' : 'übersprungen';
      if (!snapshots.length) summary.notes.push('Offline und kein Snapshot vorhanden');
      continue;
    }
    try {
      let start = fresh(venue.website);
      if (start) summary.cached++;
      else {
        start = await fetchPage(venue.id, venue.website, summary);
        if (start) summary.fetched++;
        else start = loadSnapshot(o.snapshotDir, venue.id, venue.website); // alter Snapshot bleibt (FET-UN-1)
      }
      const pages = start ? [start] : [];
      for (const link of (start?.links ?? []).slice(0, o.maxPages - 1)) {
        const cached = fresh(link);
        if (cached) {
          summary.cached++;
          pages.push(cached);
          continue;
        }
        const page = await fetchPage(venue.id, link, summary);
        if (page) {
          summary.fetched++;
          pages.push(page);
        }
      }
      summary.pages = pages.length;
      summary.status = summary.fetched > 0 ? 'abgerufen' : pages.length > 0 ? 'zwischengespeichert' : summary.errors.length > 0 ? 'fehlgeschlagen' : 'übersprungen';
    } catch (e) {
      summary.status = 'fehlgeschlagen';
      summary.errors.push({ url: venue.website, reason: e.message });
    }
  }
  return summaries;
}

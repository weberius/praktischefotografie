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

/** Hostname ohne Port und ohne führendes "www." – Vergleichsgröße für freigegebene Hosts. */
export const hostOf = (url) => new URL(url).hostname.replace(/^www\./i, '').toLowerCase();

/** Hostname für den Vergleich: kleingeschrieben, ohne führendes "www.". */
export const normalizeHost = (host) => String(host).trim().toLowerCase().replace(/^www\./, '');

export const userAgent = (contact) => `${PROJECT}/1.0 (+${contact})`;

// Seiten mit höchstens so viel Text (ohne Skripte) gelten als reine Weiterleitungsseiten (FET-UB-8).
const REDIRECT_PAGE_MAX_TEXT = 60;
const JS_REDIRECTS = [
  /\b(?:window\.|document\.|top\.|self\.)?location(?:\.href)?\s*=(?!=)\s*(['"])([^'"]+)\1/,
  /\blocation\.(?:replace|assign)\(\s*(['"])([^'"]+)\1\s*\)/,
];

/** Meta-Refresh oder statisch erkennbare JavaScript-Weiterleitung einer Seite; JavaScript wird nie ausgeführt (FET-UB-8). */
function findPageRedirect($, text, baseUrl) {
  const resolve = (target) => {
    try {
      const url = new URL(target.trim(), baseUrl);
      url.hash = '';
      return /^https?:$/.test(url.protocol) ? url.href : null;
    } catch {
      return null;
    }
  };
  const content = $('meta[http-equiv]').filter((_, m) => /^refresh$/i.test($(m).attr('http-equiv'))).first().attr('content') ?? '';
  const meta = /^\s*\d+(?:\.\d+)?\s*[;,]\s*url\s*=\s*['"]?([^'"]+?)['"]?\s*$/i.exec(content);
  if (meta && resolve(meta[1])) return { kind: 'Meta-Refresh', target: resolve(meta[1]) };
  if (text.length > REDIRECT_PAGE_MAX_TEXT) return null;
  for (const script of $('script:not([src])').toArray().map((s) => $(s).html() ?? '')) {
    for (const pattern of JS_REDIRECTS) {
      const found = pattern.exec(script);
      if (found && resolve(found[2])) return { kind: 'JavaScript', target: resolve(found[2]) };
    }
  }
  return null;
}

/** Textinhalt einer HTML-Seite ohne Skripte, Stile und Eingebettetes; Leerraum normalisiert. `sites`: Websites, deren Links verfolgt werden (Standard: die der Seite). */
export function extractPage(html, baseUrl, sites = [hostOf(baseUrl)]) {
  const $ = cheerio.load(html);
  const links = new Map();
  $('a[href]').each((_, a) => {
    try {
      const url = new URL($(a).attr('href'), baseUrl);
      url.hash = '';
      if (!/^https?:$/.test(url.protocol) || !sites.includes(hostOf(url.href))) return;
      if (SKIP_EXTENSIONS.test(url.pathname) || url.href === new URL(baseUrl).href) return;
      const label = `${url.pathname} ${$(a).text()}`;
      if (LINK_KEYWORDS.test(label) && !links.has(url.href)) links.set(url.href, PRIORITY.test(label) ? 0 : 1);
    } catch {
      // ungültige Adresse: ignorieren
    }
  });
  const scripts = cheerio.load(html);
  scripts('script, style, noscript, svg, iframe, template').remove();
  const text = normalizeSpace(scripts('body').text() || scripts.root().text()).slice(0, 200_000);
  const redirect = findPageRedirect($, text, baseUrl);
  const title = normalizeSpace(scripts('title').first().text());
  const ordered = [...links].sort((a, b) => a[1] - b[1]).map(([href]) => href);
  return { title, text, links: ordered, redirect };
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
 * Ruft Orte ab. Optionen: contact, redirectHosts (freigegebene Hosts je Orts-/Veranstalter-ID, FET-OP-3), offline, maxAgeDays, snapshotDir, now, fetchFn, sleep und die Grenzwerte aus DEFAULTS.
 * Gibt je Ort eine Zusammenfassung zurück; Fehler einzelner Orte stoppen den Lauf nicht (FET-UN-1).
 */
export async function fetchVenues(venues, options) {
  const o = { ...DEFAULTS, fetchFn: globalThis.fetch, sleep: (ms) => new Promise((r) => setTimeout(r, ms)), now: new Date(), offline: false, ...options };
  if (!o.offline && !o.contact) throw new Error('SCRAPE_CONTACT fehlt: Ohne Kontaktadresse im User-Agent wird nicht abgerufen.');
  const ua = o.offline ? '' : userAgent(o.contact);
  const hostsFor = (id) => (o.redirectHosts?.[id] ?? []).map(normalizeHost);
  const lastRequest = new Map();
  const robotsCache = new Map();

  /** Eine Anfrage ohne automatische Weiterleitung; `redirect` nennt das Ziel einer HTTP-Weiterleitung (3xx). */
  async function request(url) {
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
      return { redirect: new URL(response.headers.get('location'), url).href, kind: 'HTTP' };
    }
    return { response };
  }

  /** Prüft ein Weiterleitungsziel (FET-UB-6, FET-UB-7, FET-UN-3); gibt eine Fehlermeldung oder null zurück. */
  function redirectProblem(chain, target, allowed) {
    if (!allowed.has(hostOf(target))) return { note: true, reason: `Weiterleitung auf andere Website (${new URL(target).host}) nicht verfolgt: ${chain[chain.length - 1]} → ${target}` };
    const first = new URL(chain[0]);
    const t = new URL(target);
    if (first.port === '' && t.port !== '') return { reason: `Weiterleitung auf anderen Port nicht verfolgt: ${chain[chain.length - 1]} → ${target}` };
    if (first.protocol === 'https:' && t.protocol !== 'https:') return { reason: `Weiterleitung von https auf http nicht verfolgt: ${chain[chain.length - 1]} → ${target}` };
    if (chain.includes(target)) return { reason: `Weiterleitungsschleife: ${[...chain, target].join(' → ')}` };
    if (chain.length > o.maxRedirects) return { reason: `Zu viele Weiterleitungen (höchstens ${o.maxRedirects}): ${[...chain, target].join(' → ')}` };
    return null;
  }

  /** Lädt eine Ressource und folgt HTTP-Weiterleitungen innerhalb der erlaubten Websites (nur robots.txt). */
  async function requestFollowing(url, allowed) {
    const chain = [url];
    for (;;) {
      const result = await request(url);
      if (!result.redirect) return result;
      const problem = redirectProblem(chain, result.redirect, allowed);
      if (problem) return { error: problem.reason };
      url = result.redirect;
      chain.push(url);
    }
  }

  async function robotsFor(url, allowed) {
    const { origin } = new URL(url);
    if (robotsCache.has(origin)) return robotsCache.get(origin);
    const result = await requestFollowing(`${origin}/robots.txt`, allowed);
    let robots;
    if (result.error) robots = { allowed: false, reason: `robots.txt nicht lesbar (${result.error})` };
    else if (result.response.status >= 500) robots = { allowed: false, reason: `robots.txt antwortet mit ${result.response.status}` };
    else if (result.response.status >= 400) robots = { allowed: true, parser: null };
    else robots = { allowed: true, parser: robotsParser(`${origin}/robots.txt`, (await readLimited(result.response, o.maxBytes)) ?? '') };
    robotsCache.set(origin, robots);
    return robots;
  }

  /**
   * Ruft eine Seite ab und folgt Weiterleitungen (HTTP, Meta-Refresh, JavaScript) nur auf `allowed` (Host der Website und freigegebene Hosts).
   * robots.txt und Abstand gelten je Zielhost; alle Arten zusammen höchstens `maxRedirects` Mal.
   */
  async function fetchPage(venueId, url, summary, allowed) {
    const chain = [url];
    let current = url;
    for (;;) {
      if (!/^https?:$/.test(new URL(current).protocol)) {
        summary.errors.push({ url, reason: `Protokoll ${new URL(current).protocol} nicht erlaubt` });
        return null;
      }
      const robots = await robotsFor(current, allowed);
      if (!robots.allowed) {
        summary.errors.push({ url: current, reason: `nicht abgerufen, ${robots.reason}` });
        return null;
      }
      if (robots.parser && robots.parser.isAllowed(current, PROJECT) === false) {
        summary.notes.push(`${current}: laut robots.txt nicht erlaubt`);
        return null;
      }
      const result = await request(current);
      let target = result.redirect;
      let page = null;
      let response = result.response;
      if (result.error) {
        summary.errors.push({ url: current, reason: result.error });
        return null;
      }
      if (!target) {
        if (response.status >= 400) {
          summary.errors.push({ url: current, reason: `HTTP ${response.status}` });
          return null;
        }
        if (!/text\/html|application\/xhtml/i.test(response.headers.get('content-type') ?? '')) {
          summary.notes.push(`${current}: übersprungen, kein HTML`);
          return null;
        }
        const html = await readLimited(response, o.maxBytes);
        if (html === null) {
          summary.errors.push({ url: current, reason: `Antwort größer als ${o.maxBytes / 1024 / 1024} MB verworfen` });
          return null;
        }
        page = extractPage(html, current, [...allowed]);
        target = page.redirect?.target;
        if (target?.split('#')[0] === current.split('#')[0]) target = undefined; // Selbstverweis (Auto-Reload) ist keine Weiterleitung
      }
      if (!target) {
        const final = chain.length > 1 && hostOf(current) !== hostOf(url);
        if (final) summary.notes.push(`Weiterleitung verfolgt: ${chain.join(' → ')}`);
        return saveSnapshot(o.snapshotDir, venueId, { url: current, requestedUrl: url, fetchedAt: o.now.toISOString(), status: response.status, title: page.title, text: page.text, links: page.links });
      }
      const problem = redirectProblem(chain, target, allowed);
      if (problem) {
        (problem.note ? summary.notes : summary.errors).push(problem.note ? `${url}: ${problem.reason}` : { url, reason: problem.reason });
        return null;
      }
      current = target;
      chain.push(target);
    }
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
      if (venue.pages) {
        // Explizite Seitenliste (Personen-Websuche, WSP-UB-3): keine Links verfolgen, höchstens maxPages Seiten.
        const pages = [];
        for (const url of venue.pages.slice(0, o.maxPages)) {
          const cached = fresh(url);
          if (cached) {
            summary.cached++;
            pages.push(cached);
            continue;
          }
          const page = await fetchPage(venue.id, url, summary, new Set([hostOf(url), ...hostsFor(venue.id)]));
          if (page) {
            summary.fetched++;
            pages.push(page);
          } else {
            const old = loadSnapshot(o.snapshotDir, venue.id, url);
            if (old) pages.push(old);
          }
        }
        summary.pages = pages.length;
        summary.status = summary.fetched > 0 ? 'abgerufen' : pages.length > 0 ? 'zwischengespeichert' : summary.errors.length > 0 ? 'fehlgeschlagen' : 'übersprungen';
        continue;
      }
      const allowed = new Set([hostOf(venue.website), ...hostsFor(venue.id)]);
      let start = fresh(venue.website);
      if (start) summary.cached++;
      else {
        start = await fetchPage(venue.id, venue.website, summary, allowed);
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
        const page = await fetchPage(venue.id, link, summary, allowed);
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

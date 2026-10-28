// Höflicher Abruf von Wikipedia, Wikidata und Wikimedia Commons (ADR-012, RSF-UB-3, RSF-OP-1).
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

/** Erlaubte Hosts (RSF-UB-3): alle Wikipedia-Sprachversionen, Wikidata, Commons und die Bilderserver (upload, thumb). */
export const ALLOWED_HOST = /^(?:[a-z0-9-]+\.)?wikipedia\.org$|^www\.wikidata\.org$|^commons\.wikimedia\.org$|^upload\.wikimedia\.org$|^thumb\.wikimedia\.org$/;

export const DEFAULTS = { minDelayMs: 1000, timeoutMs: 30_000, maxAgeDays: 30, retryWaitsMs: [5000, 15_000, 30_000] };

export const userAgent = (contact) => `praktischefotografie-photographers/1.0 (${contact})`;

const sha = (text) => createHash('sha256').update(text).digest('hex');
const RETRY_STATUS = new Set([429, 500, 502, 503, 504]);

/**
 * Erzeugt einen Client mit Wartezeit zwischen Anfragen, Cache und Offline-Modus.
 * Optionen: contact, offline, maxAgeDays, cacheDir, now, fetchFn, sleep, minDelayMs, retryWaitsMs, allowHost, endpoints.
 */
export function createClient(options) {
  const o = { ...DEFAULTS, fetchFn: globalThis.fetch, sleep: (ms) => new Promise((r) => setTimeout(r, ms)), now: new Date(), offline: false, allowHost: (h) => ALLOWED_HOST.test(h), ...options };
  if (!o.offline && !o.contact) throw new Error('SCRAPE_CONTACT fehlt: Ohne Kontaktadresse im User-Agent wird nicht abgerufen.');
  const endpoints = {
    wikidata: 'https://www.wikidata.org',
    commons: 'https://commons.wikimedia.org',
    wikipedia: (lang) => `https://${lang}.wikipedia.org`,
    ...o.endpoints,
  };
  const stats = { requests: 0, cached: 0, hosts: new Set() };
  let last = -Infinity;

  const cacheFile = (url) => join(o.cacheDir, `${sha(url)}.json`);
  const fresh = (entry) => (o.now.getTime() - new Date(entry.fetchedAt).getTime()) / 86_400_000 < o.maxAgeDays;

  async function request(url, redirectsLeft = 3) {
    const host = new URL(url).hostname;
    if (!o.allowHost(host)) throw new Error(`Host "${host}" ist nicht erlaubt`);
    if (o.offline) throw new Error(`Offline und nicht im Cache: ${url}`);
    let response;
    for (let attempt = 0; ; attempt++) {
      const wait = last + o.minDelayMs - Date.now();
      if (wait > 0) await o.sleep(wait);
      stats.requests++;
      stats.hosts.add(host);
      try {
        response = await o.fetchFn(url, { headers: { 'user-agent': userAgent(o.contact), accept: 'application/json, image/*;q=0.9' }, signal: AbortSignal.timeout(o.timeoutMs), redirect: 'manual' });
      } catch (e) {
        last = Date.now();
        if (attempt < o.retryWaitsMs.length) { await o.sleep(o.retryWaitsMs[attempt]); continue; }
        throw new Error(`Netzwerkfehler bei ${url}: ${e.cause?.code ?? e.message}`, { cause: e });
      }
      last = Date.now();
      if (RETRY_STATUS.has(response.status) && attempt < o.retryWaitsMs.length) { await o.sleep(o.retryWaitsMs[attempt]); continue; }
      // Weiterleitungen werden einzeln auf erlaubte Hosts geprüft.
      if (response.status >= 300 && response.status < 400 && response.headers.get('location')) {
        if (redirectsLeft <= 0) throw new Error(`Zu viele Weiterleitungen bei ${url}`);
        return request(new URL(response.headers.get('location'), url).href, redirectsLeft - 1);
      }
      return response;
    }
  }

  /** Liefert geparstes JSON oder null bei 404; Antworten werden unter `cacheDir` zwischengespeichert. */
  async function getJson(url) {
    const file = cacheFile(url);
    if (existsSync(file)) {
      try {
        const entry = JSON.parse(readFileSync(file, 'utf8'));
        if (o.offline || fresh(entry)) { stats.cached++; return entry.body; }
      } catch { /* defekter Cache-Eintrag: neu laden */ }
    }
    const response = await request(url);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`HTTP ${response.status} bei ${url}`);
    const body = await response.json();
    mkdirSync(o.cacheDir, { recursive: true });
    writeFileSync(file, JSON.stringify({ url, fetchedAt: o.now.toISOString(), status: response.status, body }));
    return body;
  }

  async function getBuffer(url) {
    const response = await request(url);
    if (!response.ok) throw new Error(`HTTP ${response.status} bei ${url}`);
    return { buffer: Buffer.from(await response.arrayBuffer()), contentType: (response.headers.get('content-type') ?? '').split(';')[0].trim() };
  }

  return { getJson, getBuffer, endpoints, stats, offline: o.offline };
}

// Websuche nach Personen und Linksammlung (WSP-*, ADR-019). Die Suche selbst führt der Skill aus; dieses Modul plant, übernimmt, ruft Seiten ab, prüft und übernimmt.
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { SUMMARY_WORDS, validateData, wordCount } from '../../validate-data.mjs';
import { ROOT, normalizeSpace, readJson } from '../../scrape/lib/common.mjs';
import { fetchVenues } from '../../scrape/lib/fetcher.mjs';
import { sharesSequence, VERBATIM_WORDS, writeReport, candidatesPath, proposalsPath } from './research.mjs';
import { linksPath, webPlanPath, webProposalsPath, webSearchPath } from './webreport.mjs';

export const MAX_QUERIES = 3;
export const MAX_HITS = 10;
export const MAX_PAGES = 5;
export const MAX_SOURCES = 5;
export const WIKIMEDIA_IMAGE_HOSTS = ['commons.wikimedia.org', 'upload.wikimedia.org'];

const fold = (text) => normalizeSpace(text).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const cachePath = (root, id) => join(root, '.cache', 'websearch', `${id}.json`);
const write = (file, data) => {
  mkdirSync(join(file, '..'), { recursive: true });
  writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
};

/** `id` aus dem Namen: Kleinbuchstaben, Umlaute umgeschrieben, Bindestriche (WSP-EV-2). */
export function slugify(name) {
  return normalizeSpace(name)
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Normalisierte Adresse (WSP-UB-2) oder null, wenn kein http/https. */
export function normalizeUrl(input) {
  let url;
  try {
    url = new URL(String(input).trim());
  } catch {
    return null;
  }
  if (!/^https?:$/.test(url.protocol)) return null;
  for (const key of [...url.searchParams.keys()]) if (/^utm_/i.test(key) || /^(fbclid|gclid)$/i.test(key)) url.searchParams.delete(key);
  return `${url.origin}${url.pathname.replace(/\/+$/, '')}${url.search}`;
}

export const queriesFor = (name) => [`"${name}" Fotograf`, `"${name}" Fotografin`, `"${name}" Künstler:in`];

/** Bestimmt die Person: vorhandene über `--photographer`, sonst über `--name` (vorhanden oder neu, WSP-EV-2, WSP-UN-2). */
export function resolveTarget(photographers, { photographerId, name }) {
  if (photographerId) {
    const person = photographers.find((p) => p.id === photographerId);
    if (!person) throw new Error(`Unbekannte Personen-ID "${photographerId}". Gültige IDs: ${photographers.map((p) => p.id).join(', ')}`);
    return { id: person.id, name: person.name, isNew: false };
  }
  const clean = normalizeSpace(name ?? '');
  if (!clean) throw new Error('Die Websuche braucht eine Person: --photographer <id> oder --name "<Name>".');
  const id = slugify(clean);
  if (!id) throw new Error(`Aus dem Namen "${clean}" lässt sich keine id bilden.`);
  const existing = photographers.find((p) => fold(p.name) === fold(clean) || p.id === id);
  return existing ? { id: existing.id, name: existing.name, isNew: false } : { id, name: clean, isNew: true };
}

const cacheFresh = (root, id, maxAgeDays, offline, now) => {
  const file = cachePath(root, id);
  if (!existsSync(file)) return false;
  if (offline) return true;
  const age = (now.getTime() - new Date(readJson(file).fetchedAt).getTime()) / 86_400_000;
  return age < maxAgeDays;
};

/** Plan der Websuche: Person, Suchanfragen, Cache-Treffer. Schreibt photographers-web.json (WSP-UB-1, WSP-OP-1). */
export function planWeb({ root = ROOT, date, photographerId, name, offline = false, maxAgeDays = 30, now = new Date() }) {
  const target = resolveTarget(readJson(join(root, 'data', 'photographers.json')), { photographerId, name });
  const previous = readJson(webPlanPath(root, date), { persons: [] });
  const person = { ...target, queries: queriesFor(target.name), useCache: cacheFresh(root, target.id, maxAgeDays, offline, now) };
  const plan = { date, offline, maxAgeDays, persons: [...previous.persons.filter((p) => p.id !== target.id), person] };
  write(webPlanPath(root, date), plan);
  return { plan, person };
}

/** Übernimmt die Suchdatei in Cache, Linksammlung und Plan (WSP-EV-1, WSP-UB-2, WSP-UN-1, WSP-OP-1). */
export function ingestSearch({ root = ROOT, date, now = new Date() }) {
  const plan = readJson(webPlanPath(root, date), null);
  if (!plan) throw new Error(`Kein Plan für die Websuche: ${webPlanPath(root, date)}`);
  const search = readJson(webSearchPath(root, date), { persons: [] });
  const links = readJson(linksPath(root), {});
  const stamp = now.toISOString();
  const searchOut = { persons: [] };
  for (const person of plan.persons) {
    if (person.status) continue;
    Object.assign(person, { queryCount: 0, hitCount: 0, newLinks: [], status: 'offen' });
    let source;
    if (person.useCache && existsSync(cachePath(root, person.id))) {
      source = readJson(cachePath(root, person.id));
      person.status = 'aus dem Zwischenspeicher';
    } else {
      const entry = (search.persons ?? []).find((p) => p.id === person.id);
      if (plan.offline) {
        Object.assign(person, { status: 'keine Suche', note: 'offline und keine zwischengespeicherte Suchantwort' });
        continue;
      }
      if (!entry) {
        Object.assign(person, { status: 'Fehler', note: 'keine Suchergebnisse in photographers-search.json' });
        continue;
      }
      if (entry.error) {
        Object.assign(person, { status: 'Fehler', note: String(entry.error) });
        continue;
      }
      const queries = (entry.queries ?? []).slice(0, MAX_QUERIES).map((q) => ({
        query: q.query,
        results: (q.results ?? []).slice(0, MAX_HITS).map((r) => ({ title: normalizeSpace(r.title ?? ''), url: r.url, snippet: normalizeSpace(r.snippet ?? ''), query: q.query, foundAt: stamp })),
      }));
      source = { engine: entry.engine ?? search.engine ?? 'unbekannt', fetchedAt: stamp, queries };
      person.queryCount = queries.length;
      person.status = 'gesucht';
      write(cachePath(root, person.id), source);
      searchOut.persons.push({ id: person.id, engine: source.engine, queries });
    }
    person.engine = source.engine;
    const hits = source.queries.flatMap((q) => q.results);
    person.hitCount = hits.length;
    if (hits.length === 0) {
      Object.assign(person, { status: 'keine Treffer', note: 'die Suche lieferte keine Treffer' });
      continue;
    }
    const list = (links[person.id] ??= []);
    const known = new Set(list.map((l) => normalizeUrl(l.url)));
    for (const hit of hits) {
      const url = normalizeUrl(hit.url);
      if (!url || known.has(url)) continue;
      known.add(url);
      list.push({ url, title: hit.title || url, query: hit.query, foundAt: hit.foundAt });
      person.newLinks.push(url);
    }
  }
  write(linksPath(root), links);
  if (searchOut.persons.length > 0) {
    const byId = new Map(searchOut.persons.map((p) => [p.id, p]));
    write(webSearchPath(root, date), { ...search, persons: (search.persons ?? []).map((p) => byId.get(p.id) ?? p) });
  }
  write(webPlanPath(root, date), plan);
  report(root, date);
  return plan;
}

/** Loopback, Link-Local und private Adressen sowie Hosts ohne Punkt werden nie abgerufen (Schutz vor Zugriffen auf interne Ziele). */
export function isInternalHost(url) {
  const host = new URL(url).hostname.replace(/^\[|\]$/g, '').toLowerCase();
  if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || host.endsWith('.internal')) return true;
  if (host.includes(':')) return host === '::1' || /^(fc|fd|fe80)/.test(host) || host.startsWith('::ffff:');
  const m = /^(\d+)\.(\d+)\.\d+\.\d+$/.exec(host);
  if (m) {
    const [a, b] = [Number(m[1]), Number(m[2])];
    return a === 0 || a === 10 || a === 127 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168);
  }
  return !host.includes('.');
}

/** Ruft die Seiten neuer Links höflich ab (WSP-UB-3). `allowInternal` ist nur für Tests mit lokalem Server gedacht. */
export async function fetchPages({ root = ROOT, date, contact, offline = false, maxAgeDays = 30, fetchOptions = {}, allowInternal = false }) {
  const plan = readJson(webPlanPath(root, date), null);
  if (!plan) throw new Error(`Kein Plan für die Websuche: ${webPlanPath(root, date)}`);
  for (const person of plan.persons) {
    if (!person.newLinks?.length) continue;
    const internal = allowInternal ? [] : person.newLinks.filter(isInternalHost);
    const pages = person.newLinks.filter((u) => !internal.includes(u)).slice(0, MAX_PAGES);
    const [summary] = await fetchVenues([{ id: person.id, pages }], {
      contact,
      offline,
      maxAgeDays,
      maxPages: MAX_PAGES,
      snapshotDir: join(root, '.cache', 'snapshots'),
      ...fetchOptions,
    });
    person.pages = { status: summary.status, fetched: summary.fetched, cached: summary.cached, errors: summary.errors, notes: [...internal.map((u) => `${u}: interne Adresse nicht abgerufen`), ...summary.notes] };
  }
  write(webPlanPath(root, date), plan);
  report(root, date);
  return plan;
}

function report(root, date) {
  writeReport({ root, date, candidates: readJson(candidatesPath(root, date), null), proposals: readJson(proposalsPath(root, date), null) });
}

function sourceTexts(root, id) {
  const texts = [];
  const cache = cachePath(root, id);
  if (existsSync(cache)) for (const q of readJson(cache).queries ?? []) for (const r of q.results ?? []) texts.push(`${r.title} ${r.snippet}`);
  const dir = join(root, '.cache', 'snapshots', id);
  if (existsSync(dir)) for (const f of readdirSync(dir)) if (f.endsWith('.json')) texts.push(readJson(join(dir, f)).text ?? '');
  return texts;
}

/** Prüft einen Vorschlag für Person und Webkurztext (WSP-UB-4, WSP-UB-5, WSP-EV-3, WSP-UN-2). */
export function checkWebProposal(proposal, { planPerson, photographers, links, root = ROOT }) {
  const problems = [];
  const existing = photographers.find((p) => p.id === proposal.id);
  if (!planPerson) problems.push(`Person "${proposal.id}" wurde in dieser Websuche nicht recherchiert`);
  if (!proposal.create && !proposal.web) problems.push('Der Vorschlag enthält weder eine neue Person noch einen Webkurztext');
  const name = normalizeSpace(proposal.name ?? planPerson?.name ?? '');
  if (proposal.create) {
    if (existing || photographers.some((p) => fold(p.name) === fold(name))) problems.push(`Person "${name}" existiert bereits`);
    if (planPerson && !planPerson.isNew) problems.push('Die Person ist nicht neu');
    if (!name || slugify(name) !== proposal.id) problems.push(`id "${proposal.id}" passt nicht zum Namen "${name}"`);
    if ((links[proposal.id] ?? []).length === 0) problems.push('Für eine neue Person fehlt mindestens ein Link in der Linksammlung');
  } else if (!existing) problems.push(`Person "${proposal.id}" existiert nicht in data/photographers.json`);
  let web;
  if (proposal.web) {
    if (!planPerson?.newLinks?.length) problems.push('Kein neuer Link in diesem Lauf: kein neuer Webkurztext (WSP-EV-3)');
    const summary = normalizeSpace(proposal.web.summary ?? '');
    const count = wordCount(summary);
    if (count < SUMMARY_WORDS.min || count > SUMMARY_WORDS.max) problems.push(`Zusammenfassung hat ${count} Wörter, erlaubt sind ${SUMMARY_WORDS.min} bis ${SUMMARY_WORDS.max}`);
    const urls = Array.isArray(proposal.web.sources) ? proposal.web.sources : [];
    if (urls.length === 0 || urls.length > MAX_SOURCES) problems.push(`Es sind 1 bis ${MAX_SOURCES} Quellen erforderlich`);
    const known = links[proposal.id] ?? [];
    const sources = [];
    for (const raw of urls) {
      const url = normalizeUrl(raw);
      const link = known.find((l) => normalizeUrl(l.url) === url);
      if (!link) problems.push(`Quelle "${raw}" steht nicht in der Linksammlung`);
      else sources.push({ title: link.title, url: link.url });
    }
    if (sourceTexts(root, proposal.id).some((t) => sharesSequence(summary, t))) problems.push(`Zusammenfassung enthält eine wörtliche Folge von ${VERBATIM_WORDS} Wörtern aus einem Textauszug oder Snapshot`);
    web = { summary, sources };
  }
  if (proposal.image !== undefined) {
    let host = '';
    try {
      host = new URL(proposal.image).hostname;
    } catch { /* ungültige Adresse wird verworfen */ }
    if (!WIKIMEDIA_IMAGE_HOSTS.includes(host)) problems.push(`Bild von "${host || proposal.image}" nicht erlaubt: nur Wikimedia Commons (WSP-UB-5)`);
  }
  const result = problems.length > 0 ? null : { ...(proposal.create ? { create: { id: proposal.id, name } } : {}), ...(web ? { web } : {}) };
  return { problems, result };
}

export function checkWebFile({ root = ROOT, date }) {
  const file = webProposalsPath(root, date);
  if (!existsSync(file)) throw new Error(`Keine Vorschlagsdatei: ${file}`);
  const proposals = readJson(file);
  const plan = readJson(webPlanPath(root, date), { persons: [] });
  const photographers = readJson(join(root, 'data', 'photographers.json'));
  const links = readJson(linksPath(root), {});
  const checked = {
    ...proposals,
    proposals: proposals.proposals.map((p) => {
      if (p.appliedAt) return p;
      const { problems, result } = checkWebProposal(p, { planPerson: plan.persons.find((x) => x.id === p.id), photographers, links, root });
      const person = plan.persons.find((x) => x.id === p.id);
      if (person) person.usedLinks = problems.length === 0 ? (result.web?.sources ?? []).map((s) => s.url) : [];
      return { ...p, problems, result, ...(problems.length > 0 ? { approved: false } : {}) };
    }),
  };
  write(file, checked);
  write(webPlanPath(root, date), plan);
  report(root, date);
  return checked;
}

/** Übernimmt freigegebene, geprüfte Vorschläge; bei ungültigen Daten wird alles zurückgenommen (WSP-UB-6). */
export function applyWebFile({ root = ROOT, date, force = false, now = new Date(), photographerId }) {
  const file = webProposalsPath(root, date);
  if (!existsSync(file)) throw new Error(`Keine Vorschlagsdatei: ${file}`);
  const dataDir = join(root, 'data');
  const photographersFile = join(dataDir, 'photographers.json');
  const original = readFileSync(photographersFile, 'utf8');
  const photographers = JSON.parse(original);
  const proposals = readJson(file);
  const plan = readJson(webPlanPath(root, date), { persons: [] });
  const links = readJson(linksPath(root), {});
  const next = structuredClone(photographers);
  const applied = [];
  const skipped = [];
  for (const p of proposals.proposals) {
    if (p.appliedAt || (photographerId && p.id !== photographerId)) continue;
    const note = (reason) => skipped.push({ id: p.id, reason });
    if (p.approved !== true) { note('keine Freigabe'); continue; }
    const { problems, result } = checkWebProposal(p, { planPerson: plan.persons.find((x) => x.id === p.id), photographers: next, links, root });
    if (problems.length > 0) { note(`ungültig: ${problems[0]}`); continue; }
    let person = next.find((x) => x.id === p.id);
    if (result.web && person?.web && !force) { note('Webkurztext vorhanden: nur mit --force'); continue; }
    if (result.create) {
      person = { id: result.create.id, name: result.create.name };
      next.push(person);
    }
    if (result.web) person.web = result.web;
    applied.push(p.id);
  }
  if (applied.length > 0) {
    writeFileSync(photographersFile, JSON.stringify(next, null, 2) + '\n');
    const { errors } = validateData({ dataDir, rootDir: root, today: now });
    if (errors.length > 0) {
      writeFileSync(photographersFile, original);
      return { ok: false, errors, applied: [], skipped };
    }
  }
  const stamp = now.toISOString().slice(0, 10);
  for (const p of proposals.proposals) if (applied.includes(p.id)) p.appliedAt = stamp;
  write(file, proposals);
  report(root, date);
  return { ok: true, errors: [], applied, skipped };
}

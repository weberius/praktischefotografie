// Recherche der Fotograf:innen über Wikidata, Wikipedia und Commons (ADR-012, RSF-*).
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { MAX_PORTRAIT_BYTES, SUMMARY_WORDS, validateData, wordCount } from '../../validate-data.mjs';
import { ROOT, normalizeSpace, readJson } from '../../scrape/lib/common.mjs';
import { webReportLines } from './webreport.mjs';

export const PREFERRED_LANGS = ['de', 'en', 'fr', 'es', 'it', 'nl'];
export const MAX_ARTICLES = 3;
export const PORTRAIT_WIDTHS = [400, 300, 240];
export const MAX_OCCUPATION = 60;
export const VERBATIM_WORDS = 8;
/** Berufe in Wikidata (P106), die als „Fotograf:in oder Künstler:in“ gelten (RSF-EV-1). */
export const OCCUPATIONS = {
  Q33231: 'Fotograf',
  Q483501: 'Künstler',
  Q3391743: 'bildender Künstler',
  Q1028181: 'Maler',
  Q1281618: 'Bildhauer',
  Q18074503: 'Installationskünstler',
};
const FREE_LICENSE = /^(CC0|CC[ -]BY(?:[ -]SA)?(?:[ -]|$)|Public domain|PD(?:[ -]|$)|Gemeinfrei)/i;
const EXTENSIONS = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/gif': 'gif', 'image/webp': 'webp' };

const fold = (text) => normalizeSpace(text).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
export const candidatesPath = (root, date) => join(root, 'updates', date, 'photographers-candidates.json');
export const proposalsPath = (root, date) => join(root, 'updates', date, 'photographers.json');
export const reportPath = (root, date) => join(root, 'updates', date, 'PHOTOGRAPHERS.md');

/** Reihenfolge der Sprachversionen (RSF-UB-2): bevorzugte zuerst, danach alphabetisch. */
export function orderLangs(langs) {
  const known = PREFERRED_LANGS.filter((l) => langs.includes(l));
  const rest = langs.filter((l) => !PREFERRED_LANGS.includes(l)).sort();
  return [...known, ...rest];
}

const stripHtml = (html) =>
  String(html ?? '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');

const claimIds = (entity, property) => (entity.claims?.[property] ?? []).map((c) => c.mainsnak?.datavalue?.value?.id).filter(Boolean);
const claimYear = (entity, property) => {
  const time = entity.claims?.[property]?.[0]?.mainsnak?.datavalue?.value?.time;
  const m = /^([+-])(\d{4,})/.exec(time ?? '');
  return m && m[1] === '+' ? Number(m[2]) : null;
};

/** Sucht in Wikidata (Deutsch und Englisch) und gibt die passenden Einträge zurück (RSF-EV-1, RSF-UN-1). */
async function findEntities(client, name) {
  const ids = [];
  for (const language of ['de', 'en']) {
    const url = `${client.endpoints.wikidata}/w/api.php?action=wbsearchentities&search=${encodeURIComponent(name)}&language=${language}&uselang=${language}&type=item&limit=10&format=json`;
    const result = await client.getJson(url);
    for (const hit of result?.search ?? []) if (!ids.includes(hit.id)) ids.push(hit.id);
  }
  if (ids.length === 0) return [];
  const url = `${client.endpoints.wikidata}/w/api.php?action=wbgetentities&ids=${ids.join('|')}&props=labels|descriptions|claims|sitelinks&languages=de|en&format=json`;
  const entities = (await client.getJson(url))?.entities ?? {};
  return ids
    .map((id) => entities[id])
    .filter(Boolean)
    .filter((e) => [e.labels?.de?.value, e.labels?.en?.value].some((label) => label && fold(label) === fold(name)))
    .filter((e) => claimIds(e, 'P106').some((q) => q in OCCUPATIONS));
}

/** Dateiname einer Commons-Datei aus einer Bildadresse der Wikipedia; Bilder, die nur in einer Wikipedia liegen, ergeben null. */
export function commonsFileName(url) {
  const m = /\/wikipedia\/commons\/(?:thumb\/)?[0-9a-f]\/[0-9a-f]{2}\/([^/]+)/.exec(url ?? '');
  return m ? decodeURIComponent(m[1]).replace(/_/g, ' ') : null;
}

const wikipediaTitleUrl = (lang, title) => `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`;

async function loadArticles(client, entity) {
  const links = Object.entries(entity.sitelinks ?? {})
    .map(([site, v]) => [/^([a-z]{2,3})wiki$/.exec(site)?.[1], v.title])
    .filter(([lang]) => lang);
  const byLang = new Map(links);
  const articles = [];
  for (const lang of orderLangs([...byLang.keys()])) {
    if (articles.length >= MAX_ARTICLES) break;
    const title = byLang.get(lang);
    const summary = await client.getJson(`${client.endpoints.wikipedia(lang)}/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, '_'))}`);
    if (!summary || summary.type !== 'standard' || !normalizeSpace(summary.extract ?? '')) continue;
    articles.push({ lang, title, url: wikipediaTitleUrl(lang, title), description: summary.description ?? null, extract: normalizeSpace(summary.extract), imageFile: commonsFileName(summary.originalimage?.source ?? summary.thumbnail?.source) });
  }
  return articles;
}

/** Lädt das Bild (RSF-UB-4): nur frei lizenziert, mit Urheber, verkleinert, höchstens 200 kB. */
async function loadPortrait(client, entity, personId, portraitDir, articles = []) {
  // Bild aus Wikidata (P18), ersatzweise das Titelbild des ersten Artikels, sofern es auf Commons liegt.
  const filename = entity.claims?.P18?.[0]?.mainsnak?.datavalue?.value ?? articles.find((a) => a.imageFile)?.imageFile;
  if (!filename) return { portrait: null, note: 'kein Bild in Wikidata oder im Artikel' };
  let lastNote = 'kein verwertbares Bild';
  for (const width of PORTRAIT_WIDTHS) {
    const url = `${client.endpoints.commons}/w/api.php?action=query&titles=${encodeURIComponent(`File:${filename}`)}&prop=imageinfo&iiprop=url|extmetadata|mime|size&iiurlwidth=${width}&format=json&formatversion=2`;
    const info = (await client.getJson(url))?.query?.pages?.[0]?.imageinfo?.[0];
    if (!info) return { portrait: null, note: 'Dateiseite auf Commons nicht gefunden' };
    const meta = info.extmetadata ?? {};
    const license = stripHtml(meta.LicenseShortName?.value).trim();
    const credit = normalizeSpace(stripHtml(meta.Artist?.value));
    if (!FREE_LICENSE.test(license)) return { portrait: null, note: `keine freie Lizenz (${license || 'unbekannt'})` };
    if (!credit) return { portrait: null, note: 'kein Urheber genannt' };
    let source;
    try {
      source = new URL(info.descriptionurl);
    } catch {
      return { portrait: null, note: 'keine Dateiseite genannt' };
    }
    if (source.hostname !== 'commons.wikimedia.org') return { portrait: null, note: 'Dateiseite liegt nicht auf Commons' };
    // Offline wird ein bereits geladenes Vorschaubild weiterverwendet (RSF-OP-1).
    const cached = client.offline ? Object.values(EXTENSIONS).map((e) => `${personId}.${e}`).find((f) => existsSync(join(portraitDir, f))) : null;
    if (cached) {
      return {
        portrait: { cacheFile: join('.cache', 'portraits', cached), file: cached, width: info.thumbwidth ?? width, height: info.thumbheight ?? 1, bytes: statSync(join(portraitDir, cached)).size, source: source.href, credit, license, ...(meta.LicenseUrl?.value ? { licenseUrl: meta.LicenseUrl.value } : {}) },
        note: null,
      };
    }
    const { buffer, contentType } = await client.getBuffer(info.thumburl ?? info.url);
    const ext = EXTENSIONS[contentType];
    if (!ext) return { portrait: null, note: `Bildformat ${contentType || 'unbekannt'} wird nicht unterstützt` };
    if (buffer.length > MAX_PORTRAIT_BYTES) {
      lastNote = `Bild größer als ${MAX_PORTRAIT_BYTES / 1024} kB bei ${width} px`;
      continue;
    }
    mkdirSync(portraitDir, { recursive: true });
    const file = `${personId}.${ext}`;
    writeFileSync(join(portraitDir, file), buffer);
    return {
      portrait: {
        cacheFile: join('.cache', 'portraits', file),
        file,
        width: info.thumbwidth ?? width,
        height: info.thumbheight ?? 1,
        bytes: buffer.length,
        source: source.href,
        credit,
        license,
        ...(meta.LicenseUrl?.value ? { licenseUrl: meta.LicenseUrl.value } : {}),
      },
      note: null,
    };
  }
  return { portrait: null, note: lastNote };
}

/** Bestimmt den Wikidata-Eintrag einer Person und trägt Daten, Artikel und Bild zusammen (RSF-EV-1 bis RSF-UB-4). */
export async function researchPerson(client, person, { root = ROOT, cacheDir = join(root, '.cache') } = {}) {
  const base = { id: person.id, name: person.name };
  let matches;
  try {
    matches = await findEntities(client, person.name);
  } catch (e) {
    return { ...base, status: 'Fehler', note: e.message };
  }
  if (matches.length === 0) return { ...base, status: 'nicht gefunden', note: 'kein Eintrag mit passendem Namen und Beruf' };
  if (matches.length > 1) return { ...base, status: 'mehrdeutig', note: `Einträge: ${matches.map((m) => m.id).join(', ')}`, wikidataIds: matches.map((m) => m.id) };
  const entity = matches[0];
  try {
    const articles = await loadArticles(client, entity);
    const { portrait, note } = await loadPortrait(client, entity, person.id, join(cacheDir, 'portraits'), articles);
    const from = claimYear(entity, 'P569');
    const to = claimYear(entity, 'P570');
    return {
      ...base,
      status: 'gefunden',
      wikidataId: entity.id,
      occupations: claimIds(entity, 'P106').filter((q) => q in OCCUPATIONS).map((q) => OCCUPATIONS[q]),
      wikidataDescription: entity.descriptions?.de?.value ?? entity.descriptions?.en?.value ?? null,
      life: from ? { from, to: to ?? null } : null,
      articles,
      portrait,
      portraitNote: note,
    };
  } catch (e) {
    return { ...base, status: 'Fehler', note: e.message };
  }
}

/** Kandidaten: Personen ohne Wikipedia oder Portrait (RSF-EV-1); `--photographer` und `--force` erweitern die Auswahl (RSF-OP-2). */
export function selectCandidates(photographers, { photographerId, force = false } = {}) {
  if (photographerId) {
    const wanted = String(photographerId).split(',').map((id) => id.trim()).filter(Boolean);
    const unknown = wanted.find((id) => !photographers.some((p) => p.id === id));
    if (unknown) throw new Error(`Unbekannte Personen-ID "${unknown}". Gültige IDs: ${photographers.map((p) => p.id).join(', ')}`);
    return wanted.map((id) => photographers.find((p) => p.id === id));
  }
  return force ? photographers : photographers.filter((p) => !p.wikipedia || !p.portrait);
}

export async function fetchCandidates({ root = ROOT, date, client, photographerId, force = false }) {
  const photographers = readJson(join(root, 'data', 'photographers.json'));
  const persons = selectCandidates(photographers, { photographerId, force });
  const results = [];
  for (const person of persons) results.push(await researchPerson(client, person, { root }));
  const file = { date, offline: client.offline, results };
  mkdirSync(join(root, 'updates', date), { recursive: true });
  writeFileSync(candidatesPath(root, date), JSON.stringify(file, null, 2) + '\n');
  writeReport({ root, date, candidates: file, proposals: readJson(proposalsPath(root, date), null) });
  return file;
}

const words = (text) => fold(text).replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean);

/** Enthält `summary` eine Wortfolge von `n` Wörtern wörtlich aus `source`? (RSF-UB-5) */
export function sharesSequence(summary, source, n = VERBATIM_WORDS) {
  const s = words(summary);
  const grams = new Set();
  const t = words(source);
  for (let i = 0; i + n <= t.length; i++) grams.add(t.slice(i, i + n).join(' '));
  for (let i = 0; i + n <= s.length; i++) if (grams.has(s.slice(i, i + n).join(' '))) return true;
  return false;
}

/** Prüft einen Vorschlag gegen Kandidaten und Daten; liefert Probleme und den daraus gebildeten Datensatz (RSF-UB-5). */
export function checkProposal(proposal, { candidate, person, root = ROOT }) {
  const problems = [];
  if (!person) problems.push(`Person "${proposal.id}" existiert nicht`);
  if (!candidate || candidate.status !== 'gefunden') problems.push(`Kandidat nicht gefunden (${candidate?.status ?? 'keine Kandidatendatei'})`);
  const occupation = normalizeSpace(proposal.occupation ?? '');
  if (!occupation || occupation.length > MAX_OCCUPATION) problems.push(`Berufsbezeichnung fehlt oder ist länger als ${MAX_OCCUPATION} Zeichen`);
  const summary = normalizeSpace(proposal.summary ?? '');
  const count = wordCount(summary);
  if (count < SUMMARY_WORDS.min || count > SUMMARY_WORDS.max) problems.push(`Zusammenfassung hat ${count} Wörter, erlaubt sind ${SUMMARY_WORDS.min} bis ${SUMMARY_WORDS.max}`);
  const langs = Array.isArray(proposal.sources) ? proposal.sources : [];
  const articles = candidate?.articles ?? [];
  if (langs.length === 0 || langs.length > MAX_ARTICLES) problems.push(`Es sind 1 bis ${MAX_ARTICLES} Quellen erforderlich`);
  const sources = [];
  for (const lang of langs) {
    const article = articles.find((a) => a.lang === lang);
    if (!article) problems.push(`Quelle "${lang}" steht nicht in der Kandidatendatei`);
    else sources.push({ lang, url: article.url });
  }
  for (const article of articles) if (sharesSequence(summary, article.extract)) problems.push(`Zusammenfassung enthält eine wörtliche Folge von ${VERBATIM_WORDS} Wörtern aus dem Artikel (${article.lang})`);
  let portrait;
  if (proposal.portrait === true) {
    const p = candidate?.portrait;
    const file = p ? join(root, p.cacheFile) : null;
    if (!p || !existsSync(file)) problems.push('Kein Portrait in der Kandidatendatei oder Datei fehlt');
    else if (statSync(file).size > MAX_PORTRAIT_BYTES) problems.push(`Portrait ist größer als ${MAX_PORTRAIT_BYTES / 1024} kB`);
    else if (!FREE_LICENSE.test(p.license) || !normalizeSpace(p.credit ?? '')) problems.push('Portrait ohne freie Lizenz oder ohne Urheber');
    else portrait = { file: p.file, width: p.width, height: p.height, source: p.source, credit: p.credit, license: p.license, ...(p.licenseUrl ? { licenseUrl: p.licenseUrl } : {}), cacheFile: p.cacheFile };
  }
  const result = problems.length > 0 ? null : {
    occupation,
    ...(candidate.life ? { life: candidate.life } : {}),
    wikipedia: { summary, sources },
    ...(portrait ? { portrait } : {}),
  };
  return { problems, result };
}

export function checkFile({ root = ROOT, date }) {
  const file = proposalsPath(root, date);
  if (!existsSync(file)) throw new Error(`Keine Vorschlagsdatei: ${file}`);
  const proposals = readJson(file);
  const candidates = readJson(candidatesPath(root, date), { results: [] });
  const photographers = readJson(join(root, 'data', 'photographers.json'));
  const checked = {
    ...proposals,
    proposals: proposals.proposals.map((p) => {
      if (p.appliedAt) return p;
      const { problems, result } = checkProposal(p, { candidate: candidates.results.find((c) => c.id === p.id), person: photographers.find((x) => x.id === p.id), root });
      return { ...p, problems, result, ...(problems.length > 0 ? { approved: false } : {}) };
    }),
  };
  writeFileSync(file, JSON.stringify(checked, null, 2) + '\n');
  writeReport({ root, date, candidates, proposals: checked });
  return checked;
}

/** Übernimmt freigegebene, geprüfte Vorschläge (RSF-UB-6, RSF-UN-2). */
export function applyFile({ root = ROOT, date, force = false, now = new Date(), photographerId }) {
  const file = proposalsPath(root, date);
  if (!existsSync(file)) throw new Error(`Keine Vorschlagsdatei: ${file}`);
  const dataDir = join(root, 'data');
  const photographersFile = join(dataDir, 'photographers.json');
  const photographers = readJson(photographersFile);
  const proposals = readJson(file);
  const candidates = readJson(candidatesPath(root, date), { results: [] });
  const next = structuredClone(photographers);
  const applied = [];
  const skipped = [];
  const copies = [];
  for (const p of proposals.proposals) {
    if (p.appliedAt || (photographerId && p.id !== photographerId)) continue;
    const note = (reason) => skipped.push({ id: p.id, reason });
    if (p.approved !== true) { note('keine Freigabe'); continue; }
    const person = next.find((x) => x.id === p.id);
    const { problems, result } = checkProposal(p, { candidate: candidates.results.find((c) => c.id === p.id), person, root });
    if (problems.length > 0) { note(`ungültig: ${problems[0]}`); continue; }
    if ((person.wikipedia || (result.portrait && person.portrait)) && !force) { note('Profil vorhanden: nur mit --force'); continue; }
    const { portrait, ...rest } = result;
    Object.assign(person, rest);
    if (portrait) {
      const { cacheFile, ...record } = portrait;
      person.portrait = record;
      copies.push({ from: join(root, cacheFile), to: join(dataDir, 'portraits', record.file) });
    }
    applied.push(p.id);
  }
  if (applied.length > 0) {
    const backup = [{ path: photographersFile, content: readFileSync(photographersFile, 'utf8') }, ...copies.map((c) => ({ path: c.to, content: existsSync(c.to) ? readFileSync(c.to) : null }))];
    const restore = () => backup.forEach((b) => (b.content === null ? rmSync(b.path, { force: true }) : writeFileSync(b.path, b.content)));
    mkdirSync(join(dataDir, 'portraits'), { recursive: true });
    copies.forEach((c) => copyFileSync(c.from, c.to));
    writeFileSync(photographersFile, JSON.stringify(next, null, 2) + '\n');
    const { errors } = validateData({ dataDir, rootDir: root, today: now });
    if (errors.length > 0) {
      restore();
      return { ok: false, errors, applied: [], skipped };
    }
  }
  const stamp = now.toISOString().slice(0, 10);
  for (const p of proposals.proposals) if (applied.includes(p.id)) p.appliedAt = stamp;
  writeFileSync(file, JSON.stringify(proposals, null, 2) + '\n');
  writeReport({ root, date, candidates, proposals });
  return { ok: true, errors: [], applied, skipped };
}

/** Bericht der Recherche (RSF-EV-2). */
export function writeReport({ root = ROOT, date, candidates, proposals }) {
  const results = candidates?.results ?? [];
  const count = (status) => results.filter((r) => r.status === status).length;
  const list = proposals?.proposals ?? [];
  const lines = [
    `# Recherche der Fotograf:innen ${date}`,
    '',
    `- Personen bearbeitet: ${results.length}`,
    `- Gefunden: ${count('gefunden')}`,
    `- Nicht gefunden: ${count('nicht gefunden')}`,
    `- Mehrdeutig: ${count('mehrdeutig')}`,
    `- Fehler: ${count('Fehler')}`,
    `- Vorschläge geprüft: ${list.filter((p) => p.problems).length}`,
    `- Vorschläge verworfen: ${list.filter((p) => p.problems?.length > 0).length}`,
    `- Übernommen: ${list.filter((p) => p.appliedAt).length}`,
    '',
    '## Personen',
    '',
  ];
  for (const r of results) {
    const prop = list.find((p) => p.id === r.id);
    const langs = (r.articles ?? []).map((a) => a.lang).join(', ') || '–';
    const license = r.portrait ? r.portrait.license : r.portraitNote ? `kein Bild: ${r.portraitNote}` : '–';
    const state = prop ? (prop.appliedAt ? 'übernommen' : prop.problems?.length ? `verworfen: ${prop.problems.join('; ')}` : prop.approved ? 'freigegeben' : 'geprüft') : 'kein Vorschlag';
    lines.push(`- \`${r.id}\` (${r.name}): ${r.status}${r.note ? ` – ${r.note}` : ''}; Sprachen: ${langs}; Bild: ${license}; ${state}`);
  }
  const text = [...lines, ...webReportLines({ root, date })].join('\n') + '\n';
  mkdirSync(join(root, 'updates', date), { recursive: true });
  writeFileSync(reportPath(root, date), text);
  return text;
}

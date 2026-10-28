// Neuigkeiten für das Magazin aus Ausstellungsdaten planen, prüfen und übernehmen (NWS-*, ADR-008).
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { validateData } from '../../validate-data.mjs';
import { ROOT, normalizeSpace, readJson } from '../../scrape/lib/common.mjs';
import { loadDataset } from '../../scrape/lib/proposals.mjs';

export const OCCASIONS = ['neu', 'eroeffnung', 'endet-bald', 'ende'];
export const ENDING_SOON_DAYS = 14; // wie web/src/app/core/exhibition-status.ts
export const MIN_WORDS = 60;
export const MAX_WORDS = 80;
export const MAX_EXCERPT = 300;

const ORPHAN_PATTERN = new RegExp(`^(.+)-(${OCCASIONS.join('|')})$`);
const LABEL = { neu: 'Neu', eroeffnung: 'Eröffnung', 'endet-bald': 'Endet bald', ende: 'Ende' };

export const newsId = (exhibitionId, occasion) => `${exhibitionId}-${occasion}`;
export const planPath = (root, date) => join(root, 'updates', date, 'news.json');
export const reportPath = (root, date) => join(root, 'updates', date, 'NEWS.md');

export function addDays(date, days) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Datum der Neuigkeit je Anlass (NWS-UB-2). */
export function occasionDate(exhibition, occasion, runDate) {
  return { neu: runDate, eroeffnung: exhibition.startDate, 'endet-bald': addDays(exhibition.endDate, -ENDING_SOON_DAYS), ende: addDays(exhibition.endDate, 1) }[occasion];
}

/** Ausstellungen, die der Lauf des Tages über data:apply neu aufgenommen hat (NWS-UB-3). */
export function newExhibitionIds(root, date) {
  const dir = join(root, 'updates', date);
  if (!existsSync(dir)) return new Set();
  const ids = new Set();
  for (const name of readdirSync(dir).filter((n) => n.endsWith('.json') && n !== 'news.json' && n !== 'fetch-summary.json')) {
    for (const c of readJson(join(dir, name), {}).changes ?? []) {
      if (c.dataset === 'exhibitions' && c.op === 'add' && c.appliedAt === date && c.record?.id) ids.add(c.record.id);
    }
  }
  return ids;
}

/** Berechnet die fehlenden bzw. abweichenden Neuigkeiten (NWS-UB-1 bis NWS-UB-4, NWS-UN-1, NWS-UN-3, NWS-EV-1). */
export function planNews({ dataset, date, venueId, newIds = new Set(), previous = null }) {
  const venues = new Map(dataset.venues.map((v) => [v.id, v]));
  const people = new Map(dataset.photographers.map((p) => [p.id, p]));
  const posts = new Map(dataset.posts.map((p) => [p.id, p]));
  const kept = new Map((previous?.items ?? []).map((i) => [i.id, i]));
  const exhibitions = dataset.exhibitions.filter((e) => !venueId || e.venueId === venueId);
  const items = [];

  for (const ex of exhibitions) {
    for (const occasion of OCCASIONS) {
      if (occasion === 'neu' && !newIds.has(ex.id)) continue;
      if (occasion === 'endet-bald' && occasionDate(ex, occasion, date) <= ex.startDate) continue;
      const id = newsId(ex.id, occasion);
      const itemDate = occasionDate(ex, occasion, date);
      const post = posts.get(id);
      if (post && post.date === itemDate) continue;
      const venue = venues.get(ex.venueId);
      const item = {
        id,
        occasion,
        exhibitionId: ex.id,
        venueId: ex.venueId,
        date: itemDate,
        kind: post ? 'angepasst' : 'anlegen',
        ...(post ? { previousDate: post.date } : {}),
        context: {
          exhibition: { title: ex.title, type: ex.type, startDate: ex.startDate, endDate: ex.endDate, description: ex.description ?? null },
          venue: { name: venue?.name, shortName: venue?.shortName, city: venue?.city, website: venue?.website },
          photographers: ex.photographerIds.map((pid) => ({ name: people.get(pid)?.name, bio: people.get(pid)?.bio ?? null })),
        },
      };
      const old = kept.get(id);
      if (old && old.date === itemDate) for (const key of ['title', 'excerpt', 'text', 'approved']) if (old[key] !== undefined) item[key] = old[key];
      items.push(item);
    }
  }

  const exhibitionIds = new Set(dataset.exhibitions.map((e) => e.id));
  const orphans = dataset.posts
    .filter((p) => !venueId || (p.linkedVenueIds ?? []).includes(venueId))
    .filter((p) => ORPHAN_PATTERN.test(p.id) && !exhibitionIds.has(ORPHAN_PATTERN.exec(p.id)[1]))
    .map((p) => p.id);
  return { date, ...(venueId ? { venueId } : {}), items, orphans };
}

const normalized = (text) => normalizeSpace(text).toLowerCase();
const contains = (text, needle) => normalized(text).includes(normalized(needle));

export function wordCount(text) {
  return String(text ?? '').split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

/** Formale Prüfung eines Planeintrags gegen die Daten (NWS-UB-5); liefert die Probleme. */
export function checkItem(item, dataset) {
  const ex = dataset.exhibitions.find((e) => e.id === item.exhibitionId);
  if (!ex) return [`Ausstellung "${item.exhibitionId}" existiert nicht`];
  const problems = [];
  const venue = dataset.venues.find((v) => v.id === ex.venueId);
  const text = item.text ?? '';
  if (!normalizeSpace(text)) return ['Text fehlt'];
  const words = wordCount(text);
  if (words < MIN_WORDS || words > MAX_WORDS) problems.push(`Wortzahl ${words} liegt außerhalb von ${MIN_WORDS} bis ${MAX_WORDS}`);
  if (/[<>]/.test(text)) problems.push('Text enthält HTML-Zeichen');
  if (!contains(text, ex.title)) problems.push(`Text nennt den Titel "${ex.title}" nicht`);
  if (venue && !contains(text, venue.name) && !contains(text, venue.shortName)) problems.push(`Text nennt den Ort "${venue.shortName}" nicht`);
  for (const pid of ex.photographerIds) {
    const name = dataset.photographers.find((p) => p.id === pid)?.name;
    if (name && !contains(text, name)) problems.push(`Text nennt "${name}" nicht`);
  }
  if (!normalizeSpace(item.title ?? '')) problems.push('Titel fehlt');
  const excerpt = normalizeSpace(item.excerpt ?? '');
  if (!excerpt || excerpt.length > MAX_EXCERPT) problems.push(`Kurztext fehlt oder hat mehr als ${MAX_EXCERPT} Zeichen`);
  return problems;
}

/** Prüft alle Planeinträge; ungültige verlieren ihre Freigabe (NWS-UB-5, NWS-UB-6). */
export function checkPlan(plan, dataset) {
  return {
    ...plan,
    items: plan.items.map((item) => {
      if (item.appliedAt) return item;
      const problems = checkItem(item, dataset);
      return { ...item, problems, ...(problems.length > 0 ? { approved: false } : {}) };
    }),
  };
}

/** Bericht der Neuigkeiten als Markdown (NWS-EV-3, NWS-UN-3). */
export function newsReport(plan) {
  const rows = OCCASIONS.map((o) => {
    const own = plan.items.filter((i) => i.occasion === o);
    const done = own.filter((i) => i.appliedAt).length;
    const invalid = own.filter((i) => i.problems?.length > 0).length;
    return `| ${LABEL[o]} | ${own.length} | ${invalid} | ${own.filter((i) => i.approved === true).length} | ${done} |`;
  });
  const lines = [`# Neuigkeiten ${plan.date}`, '', '| Anlass | Geplant | Verworfen | Freigegeben | Übernommen |', '| --- | --- | --- | --- | --- |', ...rows, ''];
  for (const i of plan.items) {
    const state = i.appliedAt ? 'übernommen' : i.problems?.length ? `verworfen: ${i.problems.join('; ')}` : i.approved ? 'freigegeben' : 'offen';
    lines.push(`- \`${i.id}\` (${i.kind}, ${i.date}): ${state}`);
  }
  if (plan.orphans.length > 0) lines.push('', '## Verwaist (nicht gelöscht)', ...plan.orphans.map((id) => `- \`${id}\``));
  return lines.join('\n') + '\n';
}

function save(root, plan) {
  mkdirSync(join(root, 'updates', plan.date), { recursive: true });
  writeFileSync(planPath(root, plan.date), JSON.stringify(plan, null, 2) + '\n');
  writeFileSync(reportPath(root, plan.date), newsReport(plan));
}

export function runPlan({ root = ROOT, date, venueId }) {
  const previous = readJson(planPath(root, date), null);
  const plan = planNews({ dataset: loadDataset(join(root, 'data')), date, venueId, newIds: newExhibitionIds(root, date), previous });
  save(root, plan);
  return plan;
}

export function runCheck({ root = ROOT, date }) {
  const file = planPath(root, date);
  if (!existsSync(file)) throw new Error(`Kein Plan vorhanden: ${file} (zuerst npm run news:plan)`);
  const plan = checkPlan(readJson(file), loadDataset(join(root, 'data')));
  save(root, plan);
  return plan;
}

const markdownFor = (item) => `---\ntitle: ${JSON.stringify(item.title)}\ndate: ${item.date}\n---\n\n${normalizeSpace(item.text)}\n`;

/** Übernimmt freigegebene, gültige Einträge; bei ungültigem Ergebnis bleibt alles unverändert (NWS-UB-6, NWS-EV-2, NWS-UN-2). */
export function runApply({ root = ROOT, date, now = new Date() }) {
  const file = planPath(root, date);
  if (!existsSync(file)) throw new Error(`Kein Plan vorhanden: ${file} (zuerst npm run news:plan)`);
  const dataDir = join(root, 'data');
  const dataset = loadDataset(dataDir);
  const plan = readJson(file);
  const posts = structuredClone(dataset.posts);
  const writes = [];
  const applied = [];
  const skipped = [];

  for (const item of plan.items) {
    const note = (reason) => skipped.push({ id: item.id, reason });
    if (item.appliedAt) continue;
    if (item.approved !== true) { note('keine Freigabe'); continue; }
    const problems = checkItem(item, dataset);
    if (problems.length > 0) { note(`ungültig: ${problems[0]}`); continue; }
    const index = posts.findIndex((p) => p.id === item.id);
    if (item.kind === 'anlegen' && index !== -1) { note('Beitrag existiert bereits'); continue; }
    if (item.kind === 'angepasst' && index === -1) { note('Beitrag existiert nicht mehr'); continue; }
    const record = {
      id: item.id,
      slug: item.id,
      title: normalizeSpace(item.title),
      date: item.date,
      excerpt: normalizeSpace(item.excerpt),
      linkedVenueIds: [item.venueId],
      linkedExhibitionIds: [item.exhibitionId],
      contentFile: `content/posts/${item.id}.md`,
    };
    if (index === -1) posts.push(record);
    else posts[index] = record;
    writes.push({ path: join(root, record.contentFile), content: markdownFor(item) });
    applied.push(item.id);
  }

  if (applied.length > 0) {
    const postsFile = join(dataDir, 'posts.json');
    const backup = [{ path: postsFile, content: readFileSync(postsFile, 'utf8') }, ...writes.map((w) => ({ path: w.path, content: existsSync(w.path) ? readFileSync(w.path, 'utf8') : null }))];
    const restore = () => backup.forEach((b) => (b.content === null ? rmSync(b.path, { force: true }) : writeFileSync(b.path, b.content)));
    mkdirSync(join(root, 'content', 'posts'), { recursive: true });
    writes.forEach((w) => writeFileSync(w.path, w.content));
    writeFileSync(postsFile, JSON.stringify(posts, null, 2) + '\n');
    const { errors } = validateData({ dataDir, rootDir: root, today: now });
    if (errors.length > 0) {
      restore();
      return { ok: false, errors, applied: [], skipped };
    }
  }

  const stamp = now.toISOString().slice(0, 10);
  for (const item of plan.items) if (applied.includes(item.id)) item.appliedAt = stamp;
  save(root, plan);
  return { ok: true, errors: [], applied, skipped };
}


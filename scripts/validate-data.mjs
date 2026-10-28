// Validiert data/*.json gegen schema/*.schema.json und prüft semantische Regeln.
// Aufruf: npm run validate:data [-- --data-dir <pfad>]
import { readFileSync, existsSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export const DATASETS = ['venues', 'exhibitions', 'events', 'organizers', 'festivals', 'photographers', 'posts'];

export const MAX_PORTRAIT_BYTES = 200 * 1024;
export const SUMMARY_WORDS = { min: 40, max: 90 };
export const wordCount = (text) => String(text ?? '').split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
const norm = (text) => String(text ?? '').replace(/\s+/g, ' ').trim().toLowerCase();

// NRW-Grenzen (VEN-UB-2). Bei der Ausweitung auf Deutschland anpassen (ADR-001).
export const NRW_BBOX = { latMin: 50.3, latMax: 52.6, lngMin: 5.8, lngMax: 9.5 };

function readJson(file) {
  return JSON.parse(readFileSync(file, 'utf8'));
}

function recordId(records, index) {
  const id = records?.[index]?.id;
  return typeof id === 'string' ? id : `#${index}`;
}

function schemaErrors(name, records, validate) {
  if (validate(records)) return [];
  const errors = [];
  for (const e of validate.errors) {
    if (e.keyword === 'if') continue;
    const [, index, ...rest] = e.instancePath.split('/');
    const where = index === undefined ? 'Datei' : recordId(records, Number(index));
    const field = e.keyword === 'required' ? [...rest, e.params.missingProperty] : rest;
    errors.push(`${name}.json: ${where} ${field.join('/') || '-'} – ${e.message}`);
  }
  return errors;
}

function duplicateIds(name, records) {
  const seen = new Set();
  const errors = [];
  for (const r of records) {
    if (seen.has(r.id)) errors.push(`${name}.json: ${r.id} id – doppelte id`);
    seen.add(r.id);
  }
  return errors;
}

export function validateData({ dataDir = join(ROOT, 'data'), schemaDir = join(ROOT, 'schema'), rootDir = ROOT, today = new Date() } = {}) {
  const ajv = new Ajv2020({ allErrors: true, strict: true, strictTypes: false, strictRequired: false });
  addFormats(ajv);

  const errors = [];
  const data = {};
  const counts = {};

  for (const name of DATASETS) {
    const file = join(dataDir, `${name}.json`);
    if (!existsSync(file)) {
      errors.push(`${name}.json: Datei fehlt`);
      continue;
    }
    let records;
    try {
      records = readJson(file);
    } catch (e) {
      errors.push(`${name}.json: kein gültiges JSON – ${e.message}`);
      continue;
    }
    const validate = ajv.compile(readJson(join(schemaDir, `${name}.schema.json`)));
    const found = schemaErrors(name, records, validate);
    errors.push(...found);
    if (found.length === 0) {
      data[name] = records;
      counts[name] = records.length;
      errors.push(...duplicateIds(name, records));
    }
  }

  const ids = (name) => new Set((data[name] ?? []).map((r) => r.id));
  const venueIds = ids('venues');
  const exhibitionIds = ids('exhibitions');
  const organizerIds = ids('organizers');
  const festivalIds = ids('festivals');
  const photographerIds = ids('photographers');

  const ref = (file, record, field, value, known) => {
    if (!known.has(value)) errors.push(`${file}.json: ${record.id} ${field} – unbekannte Referenz "${value}"`);
  };

  for (const v of data.venues ?? []) {
    const { lat, lng } = v.address;
    const b = NRW_BBOX;
    if (lat < b.latMin || lat > b.latMax || lng < b.lngMin || lng > b.lngMax) {
      errors.push(`venues.json: ${v.id} address/lat,lng – außerhalb NRW (${lat}, ${lng})`);
    }
    if (new Date(v.source.checkedAt) > today) {
      errors.push(`venues.json: ${v.id} source/checkedAt – Datum liegt in der Zukunft`);
    }
  }

  const seenNames = new Map();
  for (const person of data.photographers ?? []) {
    const key = norm(person.name);
    if (seenNames.has(key)) errors.push(`photographers.json: ${person.id} name – doppelter Name "${person.name}" (auch ${seenNames.get(key)})`);
    else seenNames.set(key, person.id);
    if (person.life && person.life.to !== null && person.life.to < person.life.from) errors.push(`photographers.json: ${person.id} life – Todesjahr liegt vor dem Geburtsjahr`);
    const summary = person.wikipedia?.summary;
    if (summary !== undefined) {
      const words = wordCount(summary);
      if (words < SUMMARY_WORDS.min || words > SUMMARY_WORDS.max) errors.push(`photographers.json: ${person.id} wikipedia/summary – ${words} Wörter, erlaubt sind ${SUMMARY_WORDS.min} bis ${SUMMARY_WORDS.max}`);
      for (const s of person.wikipedia.sources ?? []) {
        let host = '';
        try { host = new URL(s.url).hostname; } catch { /* Schema meldet die ungültige URL */ }
        if (host !== `${s.lang}.wikipedia.org`) errors.push(`photographers.json: ${person.id} wikipedia/sources – "${s.url}" gehört nicht zu ${s.lang}.wikipedia.org`);
      }
    }
    const portrait = person.portrait;
    if (portrait) {
      let host = '';
      try { host = new URL(portrait.source).hostname; } catch { /* Schema meldet die ungültige URL */ }
      if (host !== 'commons.wikimedia.org') errors.push(`photographers.json: ${person.id} portrait/source – Dateiseite muss auf commons.wikimedia.org liegen`);
      const file = join(rootDir, 'data', 'portraits', portrait.file);
      if (!existsSync(file)) errors.push(`photographers.json: ${person.id} portrait/file – Datei "data/portraits/${portrait.file}" nicht vorhanden`);
      else if (statSync(file).size > MAX_PORTRAIT_BYTES) errors.push(`photographers.json: ${person.id} portrait/file – Datei ist größer als ${MAX_PORTRAIT_BYTES / 1024} kB`);
    }
  }

  for (const file of ['exhibitions', 'events']) {
    for (const r of data[file] ?? []) {
      if (r.endDate < r.startDate) errors.push(`${file}.json: ${r.id} endDate – liegt vor startDate`);
      ref(file, r, 'venueId', r.venueId, venueIds);
    }
  }
  for (const id of venueIds) {
    // Orte und Veranstalter teilen sich den Namensraum der Quellen (ADR-010, FES-UN-3).
    if (organizerIds.has(id)) {
      errors.push(`venues.json: ${id} id – doppelte id (auch Veranstalter)`);
      errors.push(`organizers.json: ${id} id – doppelte id (auch Ort)`);
    }
  }
  for (const r of data.festivals ?? []) {
    if (r.endDate < r.startDate) errors.push(`festivals.json: ${r.id} endDate – liegt vor startDate`);
    ref('festivals', r, 'organizerId', r.organizerId, organizerIds);
  }
  for (const r of data.exhibitions ?? []) {
    if (r.festivalId) ref('exhibitions', r, 'festivalId', r.festivalId, festivalIds);
    // Die Art `solo` bzw. `group` muss zur Zahl der Personen passen (PRF-UN-3); die Webanwendung leitet „Einzel-“ und „Gruppenausstellung“ daraus ab.
    if (r.type === 'solo' && r.photographerIds.length > 1) errors.push(`exhibitions.json: ${r.id} type – "solo" erlaubt höchstens eine Person, verknüpft sind ${r.photographerIds.length}`);
    if (r.type === 'group' && r.photographerIds.length < 2) errors.push(`exhibitions.json: ${r.id} type – "group" erfordert mindestens zwei Personen, verknüpft sind ${r.photographerIds.length}`);
    if (r.photographerIds.length > 0) {
      const description = norm(r.description);
      const names = r.photographerIds.map((id) => (data.photographers ?? []).find((x) => x.id === id)?.name).filter(Boolean);
      if (!description) errors.push(`exhibitions.json: ${r.id} description – fehlt, obwohl Fotograf:innen verknüpft sind`);
      else for (const name of names) if (!description.includes(norm(name))) errors.push(`exhibitions.json: ${r.id} description – nennt "${name}" nicht`);
    }
    if (r.isOfficialFestivalPartner === true && !r.festivalId) errors.push(`exhibitions.json: ${r.id} isOfficialFestivalPartner – erfordert festivalId`);
    for (const p of r.photographerIds) ref('exhibitions', r, 'photographerIds', p, photographerIds);
  }
  for (const r of data.posts ?? []) {
    for (const v of r.linkedVenueIds ?? []) ref('posts', r, 'linkedVenueIds', v, venueIds);
    for (const x of r.linkedExhibitionIds ?? []) ref('posts', r, 'linkedExhibitionIds', x, exhibitionIds);
    if (!existsSync(join(rootDir, r.contentFile))) {
      errors.push(`posts.json: ${r.id} contentFile – Datei "${r.contentFile}" nicht vorhanden`);
    }
  }

  return { errors, counts };
}

function main() {
  const i = process.argv.indexOf('--data-dir');
  const options = i > -1 ? { dataDir: resolve(process.argv[i + 1]), rootDir: resolve(process.argv[i + 1], '..') } : {};
  const { errors, counts } = validateData(options);
  if (errors.length > 0) {
    console.error(errors.join('\n'));
    console.error(`\n${errors.length} Fehler.`);
    process.exitCode = 1;
    return;
  }
  for (const [name, n] of Object.entries(counts)) console.log(`${name}.json: ${n} Datensätze`);
  console.log('Validierung bestanden.');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();

// Validiert data/*.json gegen schema/*.schema.json und prüft semantische Regeln.
// Aufruf: npm run validate:data [-- --data-dir <pfad>]
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export const DATASETS = ['venues', 'exhibitions', 'events', 'organizers', 'festivals', 'photographers', 'posts'];

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

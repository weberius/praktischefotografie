// Vorschläge prüfen und übernehmen (UPD-*, ADR-007). Seitentexte werden nie verändert; Daten nur nach Freigabe.
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DATASETS, validateData } from '../../validate-data.mjs';
import { ROOT, normalizeSpace, readJson } from './common.mjs';
import { listSnapshots } from './snapshots.mjs';

const SETTABLE = ['venues', 'exhibitions', 'events', 'photographers', 'organizers', 'festivals'];
const ADDABLE = ['exhibitions', 'events', 'photographers', 'organizers', 'festivals'];

export const loadDataset = (dataDir) => Object.fromEntries(DATASETS.map((n) => [n, readJson(join(dataDir, `${n}.json`), [])]));
const clone = (value) => structuredClone(value);

export function getPath(record, field) {
  return field.split('.').reduce((value, key) => (value == null ? undefined : value[key]), record);
}

export function setPath(record, field, value) {
  const keys = field.split('.');
  const last = keys.pop();
  let target = record;
  for (const key of keys) target = target[key] ??= {};
  target[last] = value;
}

const slug = (text) =>
  String(text).toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/** Eindeutige kebab-case-id für neue Datensätze (UPD-UB-5, UPD-UB-7): Name bei Personen und Veranstaltern, sonst Titel plus Jahr (bei Festivals nur, wenn das Jahr nicht im Titel steht). */
export function makeId(dataset, record, existingIds) {
  const year = String(record.startDate).slice(0, 4);
  const base =
    dataset === 'photographers' || dataset === 'organizers'
      ? slug(record.name)
      : dataset === 'festivals' && String(record.title).includes(year)
        ? slug(record.title)
        : `${slug(record.title)}-${year}`;
  let id = base;
  for (let n = 2; existingIds.has(id); n++) id = `${base}-${n}`;
  return id;
}

/** Validiert einen Datensatz im Speicher mit dem Validator aus ADR-001. */
export function validateDataset(dataset, root = ROOT) {
  const tmp = mkdtempSync(join(tmpdir(), 'pf-validate-'));
  try {
    for (const name of DATASETS) writeFileSync(join(tmp, `${name}.json`), JSON.stringify(dataset[name] ?? []));
    return validateData({ dataDir: tmp, rootDir: root }).errors;
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

const isDate = (value) => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
const isEmpty = (value) => value === undefined || value === null || value === '';
const contains = (haystack, needle) => normalizeSpace(haystack).toLowerCase().includes(normalizeSpace(needle).toLowerCase());

/** Setzt eine Änderung auf den Datensatz an; gibt Fehlertext zurück, wenn sie nicht anwendbar ist. */
function applyChange(dataset, change) {
  const list = dataset[change.dataset];
  if (change.op === 'add') {
    list.push(change.record);
    return null;
  }
  const record = list.find((r) => r.id === change.recordId);
  if (!record) return `Datensatz "${change.recordId}" existiert nicht`;
  setPath(record, change.field, clone(change.newValue));
  return null;
}

/** Prüft die Änderungen einer Vorschlagsdatei (UPD-EV-1, UPD-UB-1, UPD-UB-2, UPD-UB-4, UPD-UB-5). */
export function checkProposal(proposal, { dataset, snapshots, root = ROOT }) {
  const venue = proposal.organizerId ? undefined : dataset.venues.find((v) => v.id === proposal.venueId);
  const organizer = proposal.organizerId ? dataset.organizers.find((o) => o.id === proposal.organizerId) : undefined;
  if (!venue && !organizer) throw new Error(`Quelle "${proposal.organizerId ?? proposal.venueId}" existiert weder als Ort noch als Veranstalter`);
  const conflict = venue?.source.status === 'verifiziert';
  const festivalsOfOrganizer = (data) => new Set(data.festivals.filter((f) => f.organizerId === organizer?.id).map((f) => f.id));
  const working = clone(dataset);
  const accepted = [];
  const rejected = [...(proposal.rejected ?? [])];
  const reject = (change, reason) => rejected.push({ ...change, reason });

  for (const raw of proposal.changes ?? []) {
    // Bereits übernommene Änderungen bleiben unverändert (sonst würden sie beim erneuten Prüfen als Dublette verworfen).
    if (raw.appliedAt) {
      accepted.push(raw);
      continue;
    }
    const change = { ...raw, op: raw.op ?? 'set' };
    const op = change.op;
    if (!SETTABLE.includes(change.dataset) || (op === 'add' && !ADDABLE.includes(change.dataset)) || !['set', 'add'].includes(op)) {
      reject(change, `Datensatztyp "${change.dataset}" mit Operation "${op}" ist nicht vorgesehen`);
      continue;
    }
    // Zuordnung zur Quelle (UPD-UB-1, UPD-UB-6)
    if (op === 'set') {
      const target = working[change.dataset].find((r) => r.id === change.recordId);
      if (!target) { reject(change, `Datensatz "${change.recordId}" existiert nicht`); continue; }
      const belongs = venue
        ? change.dataset === 'venues'
          ? target.id === venue.id
          : change.dataset === 'photographers'
            ? true
            : ['exhibitions', 'events'].includes(change.dataset) && target.venueId === venue.id
        : change.dataset === 'organizers'
          ? target.id === organizer.id
          : change.dataset === 'festivals'
            ? target.organizerId === organizer.id
            : change.dataset === 'exhibitions'
              ? festivalsOfOrganizer(working).has(target.festivalId)
              : change.dataset === 'photographers';
      if (!belongs) { reject(change, venue ? 'Datensatz gehört nicht zu diesem Ort' : 'Datensatz gehört nicht zu diesem Veranstalter'); continue; }
      if (!change.field || change.field === 'id') { reject(change, 'Feld fehlt oder ist nicht änderbar'); continue; }
      if (change.field === 'source' || change.field.startsWith('source.')) { reject(change, 'source wird nur von der Übernahme gesetzt, nie vorgeschlagen'); continue; }
    } else if (!change.record || typeof change.record !== 'object') {
      reject(change, 'Neuer Datensatz fehlt');
      continue;
    } else {
      const record = change.record;
      const ok = venue
        ? ['exhibitions', 'events'].includes(change.dataset)
          ? record.venueId === venue.id
          : true // Personen, Veranstalter und Festivals darf jede Ort-Website neu aufnehmen (UPD-UB-6)
        : change.dataset === 'festivals'
          ? record.organizerId === organizer.id
          : change.dataset === 'exhibitions'
            ? !!record.festivalId && festivalsOfOrganizer(working).has(record.festivalId)
            : ['photographers', 'organizers'].includes(change.dataset);
      if (!ok) { reject(change, venue ? 'Neuer Datensatz gehört nicht zu diesem Ort' : 'Neuer Datensatz gehört nicht zu diesem Veranstalter'); continue; }
      if (change.dataset === 'festivals' && !(isDate(record.startDate) && isDate(record.endDate))) {
        reject(change, 'Festival ohne gültigen Zeitraum (startDate und endDate erforderlich)');
        continue;
      }
    }
    // Fundstelle (UPD-UB-2)
    const excerpt = change.evidence?.excerpt;
    const snapshot = snapshots.find((s) => s.url === change.evidence?.url);
    if (!excerpt || !snapshot) { reject(change, 'Fundstelle fehlt: URL ohne Snapshot oder Textauszug leer'); continue; }
    if (!contains(snapshot.text, excerpt)) { reject(change, 'Fundstelle: Textauszug steht nicht im Snapshot'); continue; }
    const needle = op === 'add' ? change.record.title ?? change.record.name : change.newValue;
    if (typeof needle === 'string' && !contains(excerpt, needle)) { reject(change, `Fundstelle: Textauszug enthält "${needle}" nicht`); continue; }

    let oldValue;
    if (op === 'set') {
      const target = working[change.dataset].find((r) => r.id === change.recordId);
      oldValue = getPath(target, change.field);
      if (JSON.stringify(oldValue) === JSON.stringify(change.newValue)) { reject(change, 'Wert ist bereits vorhanden'); continue; }
    } else {
      const sameTitle = (r) => normalizeSpace(r.title).toLowerCase() === normalizeSpace(change.record.title).toLowerCase() && r.startDate === change.record.startDate;
      const same = (r) =>
        ['photographers', 'organizers'].includes(change.dataset)
          ? normalizeSpace(r.name).toLowerCase() === normalizeSpace(change.record.name).toLowerCase()
          : change.dataset === 'festivals'
            ? r.organizerId === change.record.organizerId && sameTitle(r)
            : r.venueId === change.record.venueId && sameTitle(r);
      if (working[change.dataset].some(same)) { reject(change, 'Dublette: Datensatz ist bereits vorhanden'); continue; }
      const ids = new Set(working[change.dataset].map((r) => r.id));
      if (change.record.id && ids.has(change.record.id)) { reject(change, `id "${change.record.id}" ist bereits vergeben`); continue; }
      change.record = { ...change.record, id: change.record.id ?? makeId(change.dataset, change.record, ids) };
    }
    // Alle verknüpften Fotograf:innen stehen in der Beschreibung (UPD-UB-9, PRF-UB-4)
    if (op === 'add' && change.dataset === 'exhibitions' && change.record.photographerIds?.length > 0) {
      const description = normalizeSpace(change.record.description ?? '').toLowerCase();
      const names = change.record.photographerIds.map((pid) => working.photographers.find((x) => x.id === pid)?.name).filter(Boolean);
      const missing = description ? names.filter((n) => !description.includes(normalizeSpace(n).toLowerCase())) : names;
      if (!description || missing.length > 0) {
        reject(change, description ? `Beschreibung nennt ${missing.map((n) => `"${n}"`).join(', ')} nicht` : 'Beschreibung fehlt, obwohl Fotograf:innen verknüpft sind');
        continue;
      }
    }
    // Schema und Referenzen (UPD-UB-1)
    const trial = clone(working);
    const problem = applyChange(trial, change);
    const errors = problem ? [problem] : validateDataset(trial, root);
    if (errors.length > 0) { reject(change, `Schema: ${errors[0]}`); continue; }

    Object.assign(working, trial);
    accepted.push({
      ...change,
      ...(op === 'set' ? { oldValue: oldValue ?? null } : {}),
      kind: op === 'add' || isEmpty(oldValue) ? 'ergänzt' : 'geändert',
      conflict,
      approved: raw.approved === true,
    });
  }
  return { ...proposal, changes: accepted, rejected };
}

export function checkProposalFile(file, { dataDir, snapshotDir, root = ROOT }) {
  const proposal = readJson(file);
  const result = checkProposal(proposal, { dataset: loadDataset(dataDir), snapshots: listSnapshots(snapshotDir, proposal.organizerId ?? proposal.venueId), root });
  writeFileSync(file, JSON.stringify(result, null, 2) + '\n');
  return result;
}

/**
 * Übernimmt freigegebene Änderungen (UPD-UB-3, UPD-EV-2, UPD-UB-4, UPD-UN-1).
 * Nichts wird geschrieben, wenn die Validierung des Ergebnisses fehlschlägt.
 */
export function applyProposals(files, { dataDir, root = ROOT, now = new Date() }) {
  const dataset = loadDataset(dataDir);
  const working = clone(dataset);
  const applied = [];
  const skipped = [];
  const proposals = files.map((file) => ({ file, proposal: readJson(file) }));

  for (const { proposal } of proposals) {
    const venue = proposal.organizerId ? undefined : working.venues.find((v) => v.id === proposal.venueId);
    const sourceId = proposal.organizerId ?? proposal.venueId;
    let firstUrl = null;
    for (const change of proposal.changes ?? []) {
      const note = (reason) => skipped.push({ venueId: sourceId, id: change.id, reason });
      if (change.appliedAt) continue;
      if (change.approved !== true) { note('keine Freigabe'); continue; }
      if (!change.kind) { note('nicht geprüft (data:check fehlt)'); continue; }
      if (change.conflict || venue?.source.status === 'verifiziert') { note('Konflikt: Ort ist verifiziert'); continue; }
      if (change.op === 'set') {
        const target = working[change.dataset].find((r) => r.id === change.recordId);
        if (!target) { note('Datensatz existiert nicht mehr'); continue; }
        if (JSON.stringify(getPath(target, change.field) ?? null) !== JSON.stringify(change.oldValue ?? null)) { note('veraltet: Wert hat sich seit der Prüfung geändert'); continue; }
      } else if (working[change.dataset].some((r) => r.id === change.record.id)) { note('id ist bereits vergeben'); continue; }
      const problem = applyChange(working, change);
      if (problem) { note(problem); continue; }
      firstUrl ??= change.evidence.url;
      applied.push({ venueId: sourceId, id: change.id });
      change.appliedAt = now.toISOString().slice(0, 10);
    }
    if (firstUrl && venue) {
      venue.source.url = firstUrl;
      venue.source.checkedAt = proposal.fetchedAt;
    }
  }

  const errors = validateDataset(working, root);
  if (errors.length > 0) return { ok: false, errors, applied: [], skipped };

  for (const name of DATASETS) {
    if (JSON.stringify(working[name]) !== JSON.stringify(dataset[name])) writeFileSync(join(dataDir, `${name}.json`), JSON.stringify(working[name], null, 2) + '\n');
  }
  for (const { file, proposal } of proposals) writeFileSync(file, JSON.stringify(proposal, null, 2) + '\n');
  return { ok: true, errors: [], applied, skipped };
}

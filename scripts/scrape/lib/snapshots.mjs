// Snapshots abgerufener Seiten unter .cache/snapshots/<venue-id>/ (FET-UB-4, ADR-006). Nicht versioniert, nicht veröffentlicht.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export const sha = (text, algorithm = 'sha256') => createHash(algorithm).update(text).digest('hex');

const dirOf = (snapshotDir, venueId) => join(snapshotDir, venueId);
const fileOf = (snapshotDir, venueId, url) => join(dirOf(snapshotDir, venueId), `${sha(url, 'sha1')}.json`);

export function saveSnapshot(snapshotDir, venueId, snapshot) {
  mkdirSync(dirOf(snapshotDir, venueId), { recursive: true });
  const record = { ...snapshot, hash: sha(snapshot.text) };
  writeFileSync(fileOf(snapshotDir, venueId, snapshot.url), JSON.stringify(record, null, 2));
  return record;
}

export function loadSnapshot(snapshotDir, venueId, url) {
  const file = fileOf(snapshotDir, venueId, url);
  return existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : null;
}

export function listSnapshots(snapshotDir, venueId) {
  const dir = dirOf(snapshotDir, venueId);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(dir, f), 'utf8')))
    .sort((a, b) => a.url.localeCompare(b.url));
}

export const ageInDays = (snapshot, now) => (now.getTime() - new Date(snapshot.fetchedAt).getTime()) / 86_400_000;

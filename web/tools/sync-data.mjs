// Führt data/ (und mit --demo demo/data/) zusammen, validiert das Ergebnis und kopiert es nach web/public.
// Aufruf: node tools/sync-data.mjs [--demo] [--root <repo>] [--out <public>]
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DATASETS, validateData } from '../../scripts/validate-data.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const NAME_FIELD = { venues: 'name', organizers: 'name', festivals: 'title', photographers: 'name', exhibitions: 'title', events: 'title', posts: 'title' };

const readArray = (file) => (existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : []);

function demoErrors(name, records) {
  const errors = [];
  for (const r of records) {
    if (typeof r.id !== 'string' || !r.id.startsWith('demo-')) errors.push(`demo/${name}.json: ${r.id} id – Demo-Datensätze müssen mit "demo-" beginnen`);
    if (typeof r[NAME_FIELD[name]] !== 'string' || !r[NAME_FIELD[name]].startsWith('[Demo]')) {
      errors.push(`demo/${name}.json: ${r.id} ${NAME_FIELD[name]} – muss mit "[Demo]" beginnen`);
    }
  }
  return errors;
}

export function syncData({ root, out, demo = false, today = new Date() }) {
  const tmp = mkdtempSync(join(tmpdir(), 'pf-sync-'));
  try {
    const errors = [];
    mkdirSync(join(tmp, 'data'));
    for (const name of DATASETS) {
      const real = readArray(join(root, 'data', `${name}.json`));
      let merged = real;
      if (demo) {
        const extra = readArray(join(root, 'demo', 'data', `${name}.json`));
        errors.push(...demoErrors(name, extra));
        merged = [...real, ...extra];
      }
      writeFileSync(join(tmp, 'data', `${name}.json`), JSON.stringify(merged, null, 2));
    }
    if (existsSync(join(root, 'content'))) cpSync(join(root, 'content'), join(tmp, 'content'), { recursive: true });
    if (existsSync(join(root, 'data', 'portraits'))) cpSync(join(root, 'data', 'portraits'), join(tmp, 'data', 'portraits'), { recursive: true });
    if (demo && existsSync(join(root, 'demo', 'content'))) cpSync(join(root, 'demo', 'content'), join(tmp, 'content'), { recursive: true });
    if (errors.length === 0) errors.push(...validateData({ dataDir: join(tmp, 'data'), rootDir: tmp, today }).errors);
    if (errors.length > 0) return { errors };

    for (const dir of ['data', 'content']) {
      rmSync(join(out, dir), { recursive: true, force: true });
      if (existsSync(join(tmp, dir))) cpSync(join(tmp, dir), join(out, dir), { recursive: true });
    }
    // Portraits liegen im Repository unter data/portraits und erscheinen in der Webanwendung unter portraits/ (PRF-UB-5).
    rmSync(join(out, 'portraits'), { recursive: true, force: true });
    rmSync(join(out, 'data', 'portraits'), { recursive: true, force: true });
    if (existsSync(join(tmp, 'data', 'portraits'))) cpSync(join(tmp, 'data', 'portraits'), join(out, 'portraits'), { recursive: true });
    return { errors: [] };
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

function main() {
  const arg = (flag, fallback) => {
    const i = process.argv.indexOf(flag);
    return i > -1 ? resolve(process.argv[i + 1]) : fallback;
  };
  const demo = process.argv.includes('--demo');
  const { errors } = syncData({ root: arg('--root', resolve(HERE, '../..')), out: arg('--out', resolve(HERE, '../public')), demo });
  if (errors.length > 0) {
    console.error(errors.join('\n'));
    console.error(`\n${errors.length} Fehler – nichts kopiert.`);
    process.exitCode = 1;
    return;
  }
  console.log(`Daten synchronisiert (${demo ? 'mit Demo-Daten' : 'Produktion'}).`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();

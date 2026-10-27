// Q-PERF-3: Lighthouse-Performance (mobil) auf /, /map und einer Ortsseite.
// Chrome wird selbst gestartet: chrome-launcher erkennt WSL und übergibt Windows-Pfade, die unter Linux als Ordner im Projekt landen.
import lighthouse from 'lighthouse';
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

function startChrome(chromePath) {
  const userDataDir = mkdtempSync(join(tmpdir(), 'lh-'));
  const child = spawn(chromePath, ['--headless=new', '--no-sandbox', '--disable-gpu', '--remote-debugging-port=0', `--user-data-dir=${userDataDir}`, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
  return new Promise((resolve, reject) => {
    let log = '';
    child.stderr.on('data', (chunk) => {
      log += chunk;
      const match = /DevTools listening on ws:\/\/127\.0\.0\.1:(\d+)/.exec(log);
      if (match) resolve({ port: Number(match[1]), stop: () => new Promise((done) => { child.removeAllListeners('exit'); child.once('exit', () => { rmSync(userDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }); done(); }); child.kill(); }) });
    });
    child.on('error', reject);
    child.on('exit', () => reject(new Error(`Chrome beendet: ${log}`)));
  });
}

export async function lighthouseCheck({ baseUrl, venuePath, chromePath, minScore = 0.9 }) {
  const chrome = await startChrome(chromePath);
  const result = { scores: {}, metrics: {}, errors: [] };
  try {
    for (const path of ['/', '/map', venuePath].filter(Boolean)) {
      const run = await lighthouse(baseUrl + path, { port: chrome.port, onlyCategories: ['performance'], output: 'json', logLevel: 'error' });
      const score = run?.lhr.categories.performance.score ?? 0;
      result.scores[path] = Math.round(score * 100);
      const a = run.lhr.audits;
      result.metrics[path] = Object.fromEntries(['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index'].map((k) => [k, a[k]?.displayValue]));
      if (score < minScore) result.errors.push(`${path}: Performance ${Math.round(score * 100)} < ${minScore * 100} (Q-PERF-3)`);
    }
  } finally {
    await chrome.stop();
  }
  return result;
}

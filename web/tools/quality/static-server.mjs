// Kleiner statischer Server für den Produktionsbuild (Prüfungen laufen gegen echte Dateien, wie auf GitHub Pages).
import { createServer } from 'node:http';
import { gzipSync } from 'node:zlib';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain', '.png': 'image/png', '.ico': 'image/x-icon', '.md': 'text/markdown; charset=utf-8', '.svg': 'image/svg+xml' };

export function serve(dist) {
  const server = createServer((req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = normalize(join(dist, path));
    if (!file.startsWith(dist)) return void res.writeHead(403).end();
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    let status = 200;
    if (!existsSync(file)) {
      file = join(dist, '404.html');
      status = 404;
    }
    // Wie GitHub Pages: textbasierte Dateien werden gzip-komprimiert ausgeliefert.
    const type = TYPES[extname(file)] ?? 'application/octet-stream';
    const body = readFileSync(file);
    if (/text|javascript|json|xml|svg/.test(type) && /gzip/.test(req.headers['accept-encoding'] ?? '')) {
      res.writeHead(status, { 'content-type': type, 'content-encoding': 'gzip', 'cache-control': 'public, max-age=600' });
      return void res.end(gzipSync(body));
    }
    res.writeHead(status, { 'content-type': type });
    res.end(body);
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve({ server, url: `http://127.0.0.1:${server.address().port}` })));
}

import { createServer } from 'node:http';

/** Lokaler Testserver für Abruftests: routes = { '/pfad': { status, headers, body, delay } }. Zeichnet Anfragen auf. */
export async function testServer(routes) {
  const requests = [];
  const server = createServer((req, res) => {
    requests.push({ path: req.url, method: req.method, userAgent: req.headers['user-agent'], at: Date.now() });
    const route = routes[req.url] ?? (req.url === '/robots.txt' ? { status: 404, body: '' } : { status: 404, body: 'nicht gefunden' });
    const send = () => {
      res.writeHead(route.status ?? 200, { 'content-type': 'text/html; charset=utf-8', ...route.headers });
      res.end(route.body ?? '');
    };
    route.delay ? setTimeout(send, route.delay) : send();
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  return { url: `http://127.0.0.1:${port}`, port, requests, close: () => new Promise((resolve) => (server.closeAllConnections(), server.close(resolve))) };
}

export const page = (title, body = '') => `<html><head><title>${title}</title><script>var x=1</script></head><body><h1>${title}</h1>${body}</body></html>`;

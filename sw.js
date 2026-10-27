// Service worker de Dragolingüe: permite usar la app sin conexión.
// Primero intenta la red (así siempre llegan las correcciones del contenido) y, si no hay, usa la copia guardada.
const CACHE = 'dragolingue-v2';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'src/content/contenido.json', 'web/icon-192.png', 'web/icon-512.png', 'web/logo.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});

const CACHE_NAME = 'muse-club-v4';
const STATIC_CACHE = 'muse-static-v4';
const IMAGE_CACHE = 'muse-images-v4';

const STATIC_ASSETS = [
  '/',
  '/index.html'
];

const CDN_ORIGINS = [
  'https://cdn.poehali.dev',
  'https://lbc.core.corecdn.net'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE && cacheName !== IMAGE_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  const isCDNResource = CDN_ORIGINS.some(origin => url.origin === origin);
  const isImage = request.destination === 'image' || /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url.pathname);
  const isScript = request.destination === 'script' || url.pathname.endsWith('.js');
  const isStyle = request.destination === 'style' || url.pathname.endsWith('.css');
  const isFont = request.destination === 'font' || /\.(woff|woff2|ttf|otf)$/i.test(url.pathname);

  if (isCDNResource && isImage) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            return response;
          }
          return fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  if (isScript || isStyle || isFont) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          const fetchPromise = fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          });
          return response || fetchPromise;
        });
      })
    );
    return;
  }

  if (isCDNResource) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            return response;
          }
          return fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((response) => {
      return response || fetch(request);
    })
  );
});
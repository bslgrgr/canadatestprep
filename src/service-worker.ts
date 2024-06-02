/// <reference lib="webworker" />

const CACHE_NAME = 'canadatestprep-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.bundle.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', (event: Event) => {
  const swEvent = event as ExtendableEvent; // Cast to ExtendableEvent
  swEvent.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
        return Promise.all(
          urlsToCache.map(url => {
            return fetch(url)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Request for ${url} failed with status ${response.status}`);
                }
                return cache.put(url, response);
              })
              .catch(error => {
                console.error(`Failed to cache ${url}:`, error);
              });
          })
        );
      })
      .catch(error => {
        console.error('Failed to open cache:', error);
      })
  );
});

self.addEventListener('fetch', (event: Event) => {
  const swEvent = event as FetchEvent; // Cast to FetchEvent
  swEvent.respondWith(
    caches.match(swEvent.request)
      .then(response => {
        return response || fetch(swEvent.request);
      })
  );
});

self.addEventListener('activate', (event: Event) => {
  const swEvent = event as ExtendableEvent; // Cast to ExtendableEvent
  const cacheWhitelist = [CACHE_NAME];
  swEvent.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
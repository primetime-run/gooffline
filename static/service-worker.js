// service worker

// add data to cache
var dataCacheName = 'data-cache-v1';
var cacheName = 'data-cache';
var files = [
  '/',
  '/manifest.json',
  'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
  '/js/app.js'
];

// service worker installation
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(files);
    })
  );
});

// service worker activation
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

// service worker fetch operation
self.addEventListener('fetch', function(event) {
  console.log('[ServiceWorker] Fetch ' + event.request, event);
  event.respondWith(
    caches.match(event.request).then(function(res) {
      return res || fetch(event.request).then(function(response) {
        caches.open(cacheName).then(function(cache) {
          console.log('[ServiceWorker] Caches open match', response);
          cache.put(event.request, response.clone());
        });
        return response;
      });
    }).catch(function(e) {
      console.log('[ServiceWorker] Fetch catch error', e);
    })
  );
});
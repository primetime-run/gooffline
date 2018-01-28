// service worker

// add data to cache
var log = console.log.bind(console),
	err = console.error.bind(console),
	cacheData = 'data-cache-v1',
	cacheName = 'data-cache',
	files = [
  		'/',
  		'/manifest.json',
  		'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
  		'/js/app.js'
	];

// service worker installation
self.addEventListener('install', (e) => { 
	log('[Service Worker] Install'); 
	e.waitUntil(
		caches.open(cacheName).then((cache) => {
  			log('[Service Worker] Caching app shell');
  			return cache.addAll(files);
		})
	);
});

// service worker activation
self.addEventListener('activate',(e) => { 
	log('[Service Worker] Activate');
  	e.waitUntil(
    	caches.keys().then((keyList) => {
      		return Promise.all(keyList.map((key) => {
        		if (key !== cacheName && key !== cacheData) {
          			log('[Service Worker] Removing old cache', key);
          			return caches.delete(key);
        		}
      		}));
    	})
  	);
  	return self.clients.claim();
});

// service worker fetch
self.addEventListener('fetch', (e) => { 
	log('[Service Worker] Fetch', e);
  	e.respondWith(
    	caches.match(e.request).then((res) => {
      		return res || fetch(e.request).then((response) => {
        		caches.open(cacheName).then((cache) => {
          			log('[Service Worker] Caches open match', response);
          			cache.put(e.request, response.clone());
        		});
        		return response;
      		});
    	}).catch((e) => {
      		err('[Service Worker] Fetch catch error', e);
      		// add cache match fallback
    	})
  	);
});

// service worker push notification
self.addEventListener('push', (e) => {
	log('[Service Worker] Push Notification')
	e.waitUntil(
		fetch('/pushdata').then((response) => {
  			return response.json();
		}).then((data) => {
			log('[Service Worker] Push data', data);
		}).catch((e) => {
			err('[Service Worker] Push catch error',e);

		})
	);
});
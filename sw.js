let staticCacheName = 'fxcal-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll([
        '/',
        '/currency.html',
        '/js/main.js',
        '/js/db.js',
        '/js/idb.js',
        '/js/index.js',
        '/js/currency.js',
        '/css/main.css',
        '/css/currency.css',
        '/css/index.css',
        '/img/search.gif',
        'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css',
        'https://code.jquery.com/jquery-3.3.1.slim.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
        'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js',
        'https://unpkg.com/@babel/standalone/babel.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/fonts/open-iconic.ttf',
        'https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/fonts/open-iconic.otf',
        'https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/fonts/open-iconic.woff'
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName.startsWith('fxcal-') &&
                 cacheName != staticCacheName;
        }).map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request)
      .catch(() => {
        alert('You are not connected to the internet and can\'t use this particular service');
      });
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
'use strict';

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

var staticCacheName = 'fxcal-v1';

self.addEventListener('install', function (event) {
  _newArrowCheck(undefined, undefined);

  event.waitUntil(caches.open(staticCacheName).then(function (cache) {
    _newArrowCheck(undefined, undefined);

    return cache.addAll(['/', '/currencies', '/js/main.js', '/js/db.js', '/js/idb.js', '/js/index.js', '/js/currency.js', '/css/main.css', '/css/currency.css', '/css/index.css', '/img/search.gif', 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css', 'https://code.jquery.com/jquery-3.3.1.slim.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js', 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js', 'https://unpkg.com/@babel/standalone/babel.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/fonts/open-iconic.ttf', 'https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/fonts/open-iconic.otf', 'https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/fonts/open-iconic.woff']);
  }.bind(undefined)));
}.bind(undefined));

self.addEventListener('activate', function (event) {
  _newArrowCheck(undefined, undefined);

  event.waitUntil(caches.keys().then(function (cacheNames) {
    _newArrowCheck(undefined, undefined);

    return Promise.all(cacheNames.filter(function (cacheName) {
      _newArrowCheck(undefined, undefined);

      return cacheName.startsWith('fxcal-') && cacheName != staticCacheName;
    }.bind(undefined)).map(function (cacheName) {
      _newArrowCheck(undefined, undefined);

      return caches.delete(cacheName);
    }.bind(undefined)));
  }.bind(undefined)));
}.bind(undefined));

self.addEventListener('fetch', function (event) {
  _newArrowCheck(undefined, undefined);

  event.respondWith(caches.match(event.request).then(function (response) {
    var _this = this;

    return response || fetch(event.request).catch(function () {
      _newArrowCheck(this, _this);

      alert('You are not connected to the internet and can\'t use this particular service');
    }.bind(this));
  }));
}.bind(undefined));

self.addEventListener('message', function (event) {
  _newArrowCheck(undefined, undefined);

  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
}.bind(undefined));
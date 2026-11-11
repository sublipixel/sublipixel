var CACHE = 'sublipixel-v1';
var CORE = [
  './',
  './index.html',
  './manifest.json',
  './img/logo.png',
  './img/icon-192.png',
  './img/icon-512.png',
  './img/hero.jpg',
  './img/laser.jpg',
  './img/vinil.jpg',
  './img/3d.jpg',
  './img/sublimacion.jpg',
  './img/serigrafia.jpg',
  './img/galeria-1.jpg',
  './img/galeria-2.jpg',
  './img/galeria-3.jpg',
  './img/galeria-4.jpg',
  './img/galeria-5.jpg',
  './img/galeria-6.jpg',
  './img/galeria-7.jpg',
  './img/galeria-8.jpg',
  './img/galeria-9.jpg'
];

self.addEventListener('install', function(e){
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(c){ return c.addAll(CORE); })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function(hit){
      if (hit) return hit;
      return fetch(e.request).then(function(res){
        var url = new URL(e.request.url);
        if (res.ok && url.origin === self.location.origin) {
          var copy = res.clone();
          caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
        }
        return res;
      });
    })
  );
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('get-annie-chan').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/annie_chan.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

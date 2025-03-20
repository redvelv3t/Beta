self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("get-annie-chan").then((cache) => {
            return cache.addAll([
                "/index.html",
                "/manifest.json",
                "/service-worker.js",
                "/annie_chan.png"
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((fetchResponse) => {
                return caches.open("get-annie-chan").then((cache) => {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        }).catch(() => caches.match("/index.html"))
    );
});
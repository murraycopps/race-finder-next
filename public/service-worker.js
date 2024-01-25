const CACHE_NAME = 'my-cache';
const urlsToCache = [
    // '/',
    // '/home',
    // '/tools',
    // '/tools/convert',
    // '/tools/hill',
    // '/tools/pacing',
    // '/tools/relay',
    // '/tools/scoring',
    // '/tools/unusual',
    // '/tools/vdot',

];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
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
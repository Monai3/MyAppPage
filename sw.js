
const CACHE_NAME = 'in-techindia-myapp-v1748316134782';
const urlsToCache = [
  './',
  'index html',
  'app_icon.jpeg',
  'manifest.json',
  'index.html'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => {
    if (!key.startsWith('in-techindia-myapp') || key === CACHE_NAME) return;
    return caches.delete(key);
  }))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
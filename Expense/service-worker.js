const CACHE_NAME = "expense-tracker-cache-v1";

const ASSETS_TO_CACHE = [
  "expenseTracker.html",
  "manifest.json",
  "android-chrome-192x192.png",
  "android-chrome-512x512.png"
];

/* Install */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // activate immediately
});

/* Activate (clear old cache) */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

/* Fetch */
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() => {
          // Optional: fallback page/image
        })
      );
    })
  );
});

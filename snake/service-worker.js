const CACHE_NAME = "snake-game-cache-v1";
const ASSETS_TO_CACHE = [
  "snake_game.html",
  "manifest.json",
  "Icon-1.png",
  "Icon-2.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});


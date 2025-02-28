const CACHE_NAME = "pwa-dynamic-cache-v1";
const MAX_CACHE_ITEMS = 50; // Limit the number of cached files
const MAX_CACHE_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event - Network first, then cache, with expiration
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          cleanUpCache(); // Remove old cache items
          return networkResponse;
        });
      })
      .catch(() => caches.match(event.request)) // If offline, serve from cache
  );
});

// Function to clean up cache based on size and age
async function cleanUpCache() {
  const cache = await caches.open(CACHE_NAME);
  const keys = await cache.keys();

  if (keys.length > MAX_CACHE_ITEMS) {
    await cache.delete(keys[0]); // Remove oldest entry if cache exceeds limit
  }

  keys.forEach(async (key) => {
    const response = await cache.match(key);
    if (!response) return;

    const date = new Date(response.headers.get("date"));
    if (Date.now() - date.getTime() > MAX_CACHE_AGE) {
      await cache.delete(key); // Remove outdated items
    }
  });
}

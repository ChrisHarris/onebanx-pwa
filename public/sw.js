const CACHE_NAME = "pwa-runtime-cache-v6";

function offlineResponse() {
  return new Response("Offline", {
    status: 503,
    statusText: "Offline",
    headers: { "Content-Type": "text/plain" },
  });
}

self.addEventListener("install", (event) => {
  // Activate immediately after install.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Clean up old caches and take control of open clients.
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET") {
    return;
  }

  // For navigation requests, keep an offline copy of the shell (index.html).
  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(request));
    return;
  }

  // Cache-first strategy for icons (they don't change often)
  if (url.pathname.startsWith("/icons/")) {
    event.respondWith(handleStaticAsset(request));
    return;
  }

  // Cache-first strategy for fonts
  if (url.pathname.startsWith("/fonts/")) {
    event.respondWith(handleStaticAsset(request));
    return;
  }

  event.respondWith(handleRequest(request));
});

async function handleNavigation(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request, { ignoreSearch: true });

  try {
    const network = await fetch(request);
    cache.put(request, network.clone());
    return network;
  } catch {
    return cached ? cached.clone() : offlineResponse();
  }
}

async function handleRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  try {
    const network = await fetch(request);
    // Ignore opaque cross-origin responses that can't be cached safely.
    if (network && network.type !== "opaque") {
      cache.put(request, network.clone());
    }
    return network;
  } catch {
    return cached ? cached.clone() : offlineResponse();
  }
}

// Cache-first strategy for static assets (icons, fonts) - serve from cache if available
async function handleStaticAsset(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  if (cached) {
    return cached.clone();
  }

  try {
    const network = await fetch(request);
    if (network.ok) {
      cache.put(request, network.clone());
    }
    return network;
  } catch {
    return offlineResponse();
  }
}

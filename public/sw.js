const CACHE_NAME = "pwa-runtime-cache-v7";

// Essential assets to pre-cache during install
const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/images/icon.svg",
  "/images/icon-192x192.png",
  "/images/icon-512x512.png",
];

function offlineResponse() {
  return new Response(
    `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Offline</title>
  <style>
    body { font-family: system-ui; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f1f1f1; }
    .msg { text-align: center; padding: 20px; }
  </style>
</head>
<body>
  <div class="msg">
    <h1>You're offline</h1>
    <p>Please check your internet connection and try again.</p>
  </div>
</body>
</html>`,
    {
      status: 503,
      statusText: "Offline",
      headers: { "Content-Type": "text/html" },
    }
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
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

  // Only handle same-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  if (request.method !== "GET") {
    return;
  }

  // For navigation requests, serve cached index.html when offline
  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(request));
    return;
  }

  // Cache-first strategy for static assets (icons, fonts, images)
  if (
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/fonts/") ||
    url.pathname.startsWith("/images/")
  ) {
    event.respondWith(handleStaticAsset(request));
    return;
  }

  // Network-first for JS/CSS bundles (they have hashed names)
  event.respondWith(handleRequest(request));
});

// Network-first for navigation, fall back to cached index.html
async function handleNavigation(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const network = await fetch(request);
    // Cache the response for offline use
    cache.put(request, network.clone());
    // Also update the root cache
    cache.put("/", network.clone());
    return network;
  } catch {
    // Offline - try to serve cached version
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    // Fall back to cached root index
    const cachedIndex = await cache.match("/");
    if (cachedIndex) {
      return cachedIndex;
    }
    return offlineResponse();
  }
}

// Network-first for other requests
async function handleRequest(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const network = await fetch(request);
    // Cache successful responses
    if (network.ok) {
      cache.put(request, network.clone());
    }
    return network;
  } catch {
    const cached = await cache.match(request);
    return cached || offlineResponse();
  }
}

// Cache-first for static assets
async function handleStaticAsset(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
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

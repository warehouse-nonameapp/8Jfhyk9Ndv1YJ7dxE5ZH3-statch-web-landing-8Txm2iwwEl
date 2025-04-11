// Service Worker for Statch Landing Page
const CACHE_NAME = 'statch-landing-cache-v2';
const WASM_CACHE_NAME = 'statch-wasm-cache-v1';

// Cache HTML, CSS, and images but not WASM yet (will handle separately)
const STATIC_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './images/ic_statch.png',
];

// WASM files to precache
const WASM_ASSETS = [
  './composeApp.js'
];

// Install event - cache critical assets
self.addEventListener('install', event => {
  // Skip waiting to update immediately
  self.skipWaiting();
  
  // Cache static assets first (fast loading)
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        // Then cache WASM assets separately (can take longer)
        return caches.open(WASM_CACHE_NAME).then(wasmCache => {
          console.log('Caching WASM assets');
          // Store each WASM asset with its own promise to prevent one failure from blocking all
          return Promise.allSettled(
            WASM_ASSETS.map(asset => 
              fetch(asset)
                .then(response => {
                  if (response.ok) {
                    return wasmCache.put(asset, response);
                  }
                  throw new Error(`Failed to fetch ${asset}`);
                })
                .catch(error => {
                  console.error(`Failed to cache ${asset}:`, error);
                })
            )
          );
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Keep our current caches, delete any others
          if (cacheName !== CACHE_NAME && cacheName !== WASM_CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - optimized for different resource types
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip cross-origin requests
  if (requestUrl.origin !== location.origin) return;
  
  // For WASM files - special handling with dedicated cache
  if (requestUrl.pathname.endsWith('.wasm')) {
    event.respondWith(
      caches.open(WASM_CACHE_NAME)
        .then(cache => cache.match(event.request))
        .then(response => {
          // Return from cache if exists
          if (response) return response;
          
          // Otherwise fetch from network and cache
          return fetch(event.request)
            .then(networkResponse => {
              // Cache valid responses
              if (networkResponse && networkResponse.status === 200) {
                const clonedResponse = networkResponse.clone();
                caches.open(WASM_CACHE_NAME).then(cache => {
                  cache.put(event.request, clonedResponse);
                });
              }
              return networkResponse;
            });
        })
        .catch(() => fetch(event.request)) // Fallback to network
    );
    return;
  }
  
  // For JS files (including composeApp.js) - network first with cache fallback
  if (requestUrl.pathname.endsWith('.js')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const clonedResponse = response.clone();
            caches.open(WASM_CACHE_NAME).then(cache => {
              cache.put(event.request, clonedResponse);
            });
          }
          return response;
        })
        .catch(() => {
          console.log('Falling back to cache for:', event.request.url);
          return caches.open(WASM_CACHE_NAME)
            .then(cache => cache.match(event.request));
        })
    );
    return;
  }
  
  // For HTML - network first, fallback to cache
  if (requestUrl.pathname.endsWith('.html') || requestUrl.pathname === '/' || 
      requestUrl.pathname === '' || requestUrl.pathname.endsWith('/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If valid response, clone and store in cache
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        })
        .catch(() => {
          // If network fails, try cache
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // For static assets (CSS, images, fonts) - cache first, network fallback
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cache hit immediately
        if (response) {
          return response;
        }
        
        // Otherwise fetch from network and cache for next time
        return fetch(event.request.clone()).then(
          response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone and cache for future
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
            
            return response;
          }
        );
      })
  );
});
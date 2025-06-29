// sw.js - Service Worker
const CACHE_NAME = 'directivas-os10-cache-v1.2'; // Increment version for updates

// Lista de archivos y recursos a cachear durante la instalación
const urlsToCache = [
  '.', // Cache the root directory
  'index.html',
  'credenciales.html',
  'manifest.json',
  'assets/css/style.css',
  'assets/css/credenciales.css',
  'assets/js/main.js',
  'assets/js/credenciales.js',
  'assets/images/icon-192x192.png',
  'assets/images/icon-512x512.png',
  'assets/images/logo-os10.png',
  'assets/images/101.jpg',
  'assets/images/qr.png',
  'assets/images/qrcred.png',
  'assets/images/foto.jpg',
  'assets/images/valores.png',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;600&display=swap'
];

// Evento 'install': Se dispara cuando el Service Worker se instala.
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cache abierta, añadiendo recursos principales.');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Todos los recursos han sido cacheados. Instalación completa.');
        return self.skipWaiting();
      })
  );
});

// Evento 'activate': Se dispara cuando el Service Worker se activa.
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`Service Worker: Eliminando caché antigua: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
        console.log('Service Worker: Activado y listo para controlar la página.');
        return self.clients.claim();
    })
  );
});

// Evento 'fetch': Implementa una estrategia "Cache first, then network".
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Si el recurso está en la caché, lo devolvemos desde ahí.
        if (cachedResponse) {
          return cachedResponse;
        }

        // Si no está en la caché, vamos a la red.
        return fetch(event.request).then((networkResponse) => {
            // Guardamos una copia de la respuesta en la caché para futuras peticiones.
            return caches.open(CACHE_NAME).then((cache) => {
              if (networkResponse.status === 200 && !event.request.url.startsWith('chrome-extension://')) {
                  cache.put(event.request, networkResponse.clone());
              }
              return networkResponse;
            });
          }
        ).catch(() => {
            // Opcional: Devolver una página de fallback si falla la red
            console.warn(`Service Worker: Falló la obtención desde red: ${event.request.url}`);
        });
      })
  );
});

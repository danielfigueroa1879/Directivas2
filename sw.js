// sw.js - Service Worker Optimizado
const CACHE_NAME = 'directivas-os10-cache-v2.0'; // Versión incrementada para forzar la actualización

// Lista de archivos y recursos a cachear durante la instalación
const urlsToCache = [
  '/',
  './index.html',
  './manifest.json',
  './assets/css/styles.css?v=25',
  './assets/css/carousel.css',
  './assets/css/credenciales.css',
  './assets/css/search.css?v=1',
  './assets/css/custom-styles.css',
  './assets/js/main.js',
  './assets/js/inicio.js?v=4',
  './assets/js/carousel.js',
  './assets/js/credenciales.js',
  './assets/js/chatbot.js',
  './assets/js/search.js?v=1',
  './assets/js/spd-componentes.js?v=2',
  './assets/js/firebase-counter.js',
  './assets/js/ui-enhancements.js',
  './assets/js/pdf-generator.js',
  './rules/chatbot-rules.js',
  // Iconos y logos
  './assets/images/icon-192x192.png',
  './assets/images/icon-512x512.png',
  './assets/images/logo-os10.png',
  './assets/images/poli.png',
  './assets/images/favicon.ico',
  // Imágenes críticas y del carrusel (versiones WebP)
  './assets/images/foto (1).webp',
  './assets/images/foto (2).webp',
  './assets/images/foto (3).webp',
  './assets/images/foto (3a).webp',
  './assets/images/foto (4).webp',
  './assets/images/foto (5).webp',
  './assets/images/foto (6).webp',
  './assets/images/foto (7).webp',
  './assets/images/foto (8).webp',
  './assets/images/foto (9).webp',
  './assets/images/foto (10).webp',
  './assets/images/foto (11).webp',
  './assets/images/foto (12).webp',
  './assets/images/foto (13).webp',
  './assets/images/foto (14).webp',
  './assets/images/foto (15).webp',
  './assets/images/foto (16).webp',
  './assets/images/foto (17).webp',
  './assets/images/foto (18).webp',
  './assets/images/foto (19).webp',
  './assets/images/foto (20).webp',
  './assets/images/foto (21).webp',
  './assets/images/foto (22).webp',
  './assets/images/foto (23).webp',
  './assets/images/foto (24).webp',
  './assets/images/foto (25).webp',
  './assets/images/foto (26).webp',
  './assets/images/foto (27).webp',
  './assets/images/foto (28).webp',
  './assets/images/valores.webp',
  './assets/images/qr.webp',
  './assets/images/qrcred.webp',
  './assets/images/foto.webp',
  // Fonts
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap'
];

// Evento 'install': Se dispara cuando el Service Worker se instala.
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker: Cache abierta, añadiendo recursos principales.');
        return Promise.allSettled(
          urlsToCache.map(url => 
            cache.add(url).catch(err => {
              console.warn(`⚠️ No se pudo cachear: ${url}`, err);
              return null;
            })
          )
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Recursos principales cacheados. Instalación completa.');
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('❌ Error durante instalación SW:', err);
      })
  );
});

// Evento 'activate': Se dispara cuando el Service Worker se activa para limpiar cachés viejos.
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`🗑️ Service Worker: Eliminando caché antigua: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
        console.log('✅ Service Worker: Activado y listo para controlar la página.');
        return self.clients.claim();
    })
  );
});

// Evento 'fetch': Estrategia híbrida optimizada
self.addEventListener('fetch', (event) => {
  // Ignorar peticiones que no son GET o son de extensiones.
  if (event.request.method !== 'GET' ||
      event.request.url.startsWith('chrome-extension://') ||
      event.request.url.startsWith('moz-extension://') ||
      event.request.url.includes('netlify/functions/') ||
      event.request.url.includes('firebasejs') ||
      event.request.url.includes('firebase')) {
    return;
  }

  const url = new URL(event.request.url);

  // Estrategia "Cache First" para recursos estáticos (mejor rendimiento)
  const isStaticAsset = url.pathname.match(/\.(css|js|webp|png|jpg|jpeg|svg|woff2?|ttf)$/i);

  if (isStaticAsset) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          // Devolver del cache y actualizar en background
          fetch(event.request).then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, networkResponse.clone());
              });
            }
          }).catch(() => {});
          return cachedResponse;
        }
        // Si no está en cache, ir a la red
        return fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          }
          return networkResponse;
        });
      })
    );
  } else {
    // Estrategia "Network First" para HTML y datos dinámicos
    event.respondWith(
      fetch(event.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          if (networkResponse.type === 'basic' && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      }).catch(() => {
        console.log(`🔌 Sin red, buscando en caché: ${event.request.url}`);
        return caches.match(event.request);
      })
    );
  }
});

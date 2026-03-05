// Asignar nombre y versión de la cache
const CACHE_NAME = 'v23cache_rocky';

// Archivos a cachear en la aplicación
const urlsToCache = [
  './',
  './index.html',
  './main.js',
  './style.css',
  './manifest.json',
  './sw.js',

  './image2/16.png',
  './image2/32.png',
  './image2/64.png',
  './image2/96.png',
  './image2/128.png',
  './image2/256.png',
  './image2/384.png',
  './image2/512.png',
  './image2/1024.png',

  './img/BD.jpeg',
  './img/DB.jpg',
  './img/download.png',
  './img/Image.jpg',
  './img/image2.jpg',
  './img/Lenguaje.jpg',
  './img/soporte.jpg',
  './img/virtualizacion.jpg'
];

// Evento install
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
      .catch((err) => console.log('No se ha registrado el cache', err))
  );
});

// Evento activate (limpia caches anteriores)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

//evento fetch (intercepta las peticiones y responde con el cache o la petición a la url)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      if (response) return response; // Devuelve el recurso cacheado
      return fetch(e.request); // Realiza la petición a la URL
    })
  );
});

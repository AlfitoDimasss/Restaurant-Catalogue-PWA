import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';

// Daftar asset yang akan dicaching
const assetsToCache = [
  './',
  './heros/hero-image_2.jpg',
  './heros/hero-image_2.webp',
  './heros/hero-image_2-large.jpg',
  './heros/hero-image_2-large.webp',
  './heros/hero-image_2-medium.jpg',
  './heros/hero-image_2-medium.webp',
  './heros/hero-image_2-small.jpg',
  './heros/hero-image_2-small.webp',
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png',
  './index.html',
  './favicon.png',
  './app.bundle.js',
  './app.webmanifest',
  './sw.bundle.js',
  './666.bundle.js',
  './app~4e5ec22b.bundle.js',
  './app~4e5ec22b.css',
  './app~ca0940c6.bundle.js',
  './app~e96e9bea.bundle.js',
  './app~e4317507.bundle.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});

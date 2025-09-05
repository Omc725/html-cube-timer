const CACHE_NAME = 'cube-timer-pwa-cache-v1';
const urlsToCache = [
    './', // Kök dizini (index.html'i temsil eder)
    './index.html', // Ana dosyayı açıkça belirtmek iyidir
    'https://cdn.jsdelivr.net/npm/chart.js' // Dışarıdan çekilen kütüphane
];

// Yükleme olayı: Gerekli dosyaları önbelleğe alır
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch olayı: Önbellekteki dosyaları sunar veya ağdan getirir
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Önbellekte varsa, önbellekten sun
                if (response) {
                    return response;
                }
                // Yoksa, ağdan getirmeyi dene
                return fetch(event.request);
            })
    );
});

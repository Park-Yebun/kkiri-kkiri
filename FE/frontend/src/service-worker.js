// service-worker.js 예시
self.addEventListener('install', (event) => {
  // 캐싱할 리소스 지정
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/index.html',
        '/src/App.css',
        '/src/App.jsx',
        '/src/main.jsx',
        // 기타 캐싱할 리소스
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

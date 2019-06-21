let cacheName = "v1"; 

self.addEventListener('install', e => {
  console.log('installed');
});

self.addEventListener('activate', e => {
  // do nothing
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            return cache.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
    .then(res => {
      resClone = res.clone();
      caches.open(cacheName)
      .then(cache => {
        cache.put(e.request,resClone);
      });
      return res;
    }).catch(err => caches.match(e.request).then(res => res))
  );
});

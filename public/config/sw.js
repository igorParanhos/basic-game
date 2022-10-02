function wipeCache() {
    caches.keys().then((names) => {
        for (let name of names)
            caches.delete(name);
    });
}

self.addEventListener('install', e => {
    console.log('Installing')
    e.waitUntil(
        caches.open('static').then(cache => {
            return cache.addAll(['/assets', '/images'])
        })
    )
})

self.addEventListener('fetch', e => {
    console.log(`Intercepting fetch request for: ${e.request.url}`)
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request)
        })
    )
})
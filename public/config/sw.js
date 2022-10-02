function wipeCache() {
  caches.keys().then((names) => {
    for (let name of names) caches.delete(name);
  });
}

const images = [
  "/images/android-chrome-192x192.png",
  "/images/favicon-32x32.png",
  "/images/safari-pinned-tab.svg",
];
const config = [
    '/config/manifest.json',
    '/config/browserconfig.xml',
]

self.addEventListener("install", (e) => {
  console.log("Installing");
  e.waitUntil(
    caches.open("static").then((cache) => {
      return cache.addAll(["./assets", ...images, ...config]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  console.log(`Intercepting fetch request for: ${e.request.url}`);
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

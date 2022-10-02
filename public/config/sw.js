function wipeCache() {
  caches.keys().then((names) => {
    for (let name of names) caches.delete(name);
  });
}

const images = [
  "/images/android-chrome-192x192.png",
  "/images/favicon-32x32.png",
  "/images/mstile-310x150.png",
  "/images/screenshot1.png",
  "/images/android-chrome-512x512.png",
  "/images/favicon.ico",
  "/images/mstile-310x310.png",
  "/images/apple-touch-icon.png",
  "/images/mstile-144x144.png",
  "/images/mstile-70x70.png",
  "/images/favicon-16x16.png",
  "/images/mstile-150x150.png",
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

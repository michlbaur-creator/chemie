// Chemie Mibaso – Offline-Cache. Bei Änderungen VERSION hochzählen.
const VERSION = "chemie-v10";
const CORE = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "img/portrait-garten.jpg",
  "clips/gefaehrlich.mp4", "clips/gefaehrlich.jpg", "clips/alltag.mp4", "clips/alltag.jpg", "clips/indikator.mp4", "clips/indikator.jpg",
  "clips/kohlensaeure.mp4", "clips/kohlensaeure.jpg", "clips/chlorwasserstoff.mp4", "clips/chlorwasserstoff.jpg", "clips/springbrunnen.mp4", "clips/springbrunnen.jpg",
  "clips/laugen-alltag.mp4", "clips/laugen-alltag.jpg", "clips/laugen-aetzend.mp4", "clips/laugen-aetzend.jpg", "clips/hydroxid.mp4", "clips/hydroxid.jpg", "clips/laugen-indikator.mp4", "clips/laugen-indikator.jpg", "clips/ammoniak-brunnen.mp4", "clips/ammoniak-brunnen.jpg", "clips/ammoniak-modell.mp4", "clips/ammoniak-modell.jpg", "clips/salmiak.mp4", "clips/salmiak.jpg",
  "clips/salz-kristalle.mp4", "clips/salz-kristalle.jpg", "clips/natrium-chlor.mp4", "clips/natrium-chlor.jpg", "clips/ionengitter.mp4", "clips/ionengitter.jpg", "clips/kristalle-wachsen.mp4", "clips/kristalle-wachsen.jpg"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || r.headers.has("range")) return; // Videos streamen direkt
  e.respondWith(caches.match(r).then(hit => hit || fetch(r).then(res => {
    if (res.ok) { const c = res.clone(); caches.open(VERSION).then(x => x.put(r, c)); }
    return res;
  }).catch(() => caches.match("index.html"))));
});

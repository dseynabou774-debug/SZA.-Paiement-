/* =====================================================================
   SERVICE WORKER — Seyda Zeynab Academy — Paiements
   Objectif : rendre l'application 100% utilisable hors ligne après le
   tout premier chargement (mise en cache de l'app + des bibliothèques).
===================================================================== */

const CACHE_NAME = "sza-paiements-cache-v1";

// Fichiers de l'application (même origine)
const APP_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];

// Bibliothèques externes utilisées par l'app (mises en cache si disponibles)
const CDN_ASSETS = [
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Amiri:wght@400;700&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"
];

/* ---------------- INSTALLATION : mise en cache initiale ---------------- */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Les fichiers de l'app doivent réussir
      await cache.addAll(APP_ASSETS);
      // Les fichiers CDN sont mis en cache un par un : si l'un échoue
      // (pas de réseau au moment de l'installation), on ignore l'erreur
      // pour ne pas bloquer l'installation du service worker.
      await Promise.all(
        CDN_ASSETS.map((url) =>
          fetch(url, { mode: "cors" })
            .then((res) => cache.put(url, res))
            .catch(() => null)
        )
      );
    })
  );
  self.skipWaiting();
});

/* ---------------- ACTIVATION : nettoyage des anciens caches ---------------- */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/* ---------------- FETCH : stratégie "cache d'abord, réseau ensuite" ---------------- */
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          // On met en cache la nouvelle ressource pour un usage hors ligne futur
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            try { cache.put(event.request, copy); } catch (e) {}
          });
          return response;
        })
        .catch(() => {
          // Hors ligne et pas en cache : on retombe sur la page principale
          // pour éviter un écran blanc (utile pour la navigation).
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }
        });
    })
  );
});

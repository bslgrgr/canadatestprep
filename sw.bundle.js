(()=>{"use strict";const e="canadatestprep-cache-v1",t=["/","/index.html","/styles.css","/main.bundle.js","/icons/icon-192x192.png","/icons/icon-512x512.png"];self.addEventListener("install",(s=>{s.waitUntil(caches.open(e).then((e=>Promise.all(t.map((t=>fetch(t).then((s=>{if(!s.ok)throw new Error(`Request for ${t} failed with status ${s.status}`);return e.put(t,s)})).catch((e=>{console.error(`Failed to cache ${t}:`,e)}))))))).catch((e=>{console.error("Failed to open cache:",e)})))})),self.addEventListener("fetch",(e=>{const t=e;t.respondWith(caches.match(t.request).then((e=>e||fetch(t.request))))})),self.addEventListener("activate",(t=>{const s=[e];t.waitUntil(caches.keys().then((e=>Promise.all(e.map((e=>{if(-1===s.indexOf(e))return caches.delete(e)}))))))}))})();
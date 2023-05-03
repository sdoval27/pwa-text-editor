const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});
 
//TODO: offlineFallback, registerRoute

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(
  //asset caching, removes load on backend resources
  ({ request }) => request.mode === 'navigate', pageCache);
  new offlineFallback({
    cacheName: 'asset-cache',
    plugins:[
      //plugin caches responses with these headers for a max-age of 30 days
      new CacheableResponsePlugin({
        statuses: [0, 200],
      })
    ],
  })

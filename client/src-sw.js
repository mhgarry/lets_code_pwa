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

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// implmenting asset caching
registerRoute(
	// callback function to check for a style, script, or worker asset
	({ request }) => ['style', 'script', 'worker'].includes(request.destination),
	new StaleWhileRevalidate({
		// cache storage
		cacheName: 'asset-cache',
		plugins: [
			// cache responses for 30 days
			new CacheableResponsePlugin({
				statuses: [0, 200],
			}),
		],
	}));


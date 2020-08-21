self.__WB_MANIFEST = [].concat(self.__WB_MANIFEST || []);
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

workbox.routing.registerRoute(
    "/",
    new workbox.strategies.StaleWhileRevalidate(),
    "GET"
);
workbox.routing.registerRoute(
    new RegExp(process.env.REMOTE_REGEX + ".*\\.jpg"),
    new workbox.strategies.CacheFirst(),
    "GET"
);
workbox.routing.registerRoute(
    new RegExp(process.env.REMOTE_REGEX + ".*\\.basket\\..*\\.json"),
    new workbox.strategies.NetworkOnly(),
    "GET"
);
workbox.routing.registerNavigationRoute(
    workbox.precaching.getCacheKeyForURL("/index.html")
);
workbox.googleAnalytics.initialize();

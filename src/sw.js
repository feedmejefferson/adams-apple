self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerRoute(
    "/",
    new workbox.strategies.StaleWhileRevalidate(),
    "GET"
);
workbox.routing.registerRoute(
    new RegExp(process.env.REMOTE_REGEX),
    new workbox.strategies.StaleWhileRevalidate(),
    "GET"
);
workbox.routing.registerNavigationRoute(
    workbox.precaching.getCacheKeyForURL("/index.html")
);
workbox.googleAnalytics.initialize();

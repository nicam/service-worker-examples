const version = 'v2';

this.addEventListener('install', function(event) {
  console.log('install');
  event.waitUntil(
    caches.open(version).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/images/offline.jpg',
        '/socket.io/socket.io.js',
        '/index.js'
      ]);
    })
  );
});

this.addEventListener("activate", function(e) {
  console.log('activated');

  importScripts('/socket.io/socket.io.js');
  var socket = io.connect('http://localhost:3000', {
      jsonp: false
  });
  setInterval(function () {
    socket.emit('timer', "3PO!, come in 3P0! shut down the gargabe mashers!");
  }, 3000);

});

function fetchIfNecessaryWithCachingAndFallback(event) {
  var response;
  return event.respondWith(caches.match(event.request)
  .then(function(response) {
    return response || fetch(event.request);
  }).then(function(r) {
    response = r;
    caches.open('v2').then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }).catch(function() {
    return caches.match('/images/offline.jpg');
  }));
}

function fetchWithFallback (event) {
  return event.respondWith(
      fetch(event.request).catch(error => {
        return caches.match('/images/offline.jpg')
      })
    )
}
// this.addEventListener('fetch', fetchIfNecessaryWithCachingAndFallback);
this.addEventListener('fetch', function(event) {
  console.log('Handling fetch event for', event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Found response in cache:', response);
        return response;
      }
      console.log('No response found in cache. About to fetch from network...');

      return fetch(event.request).then(function(response) {
        console.log('Response from network is:', response);

        caches.open('v2').then(function(cache) {
          cache.put(event.request, response);
        });
        return response.clone();
        // return response;
      }).catch(function(error) {
        console.error('Fetching failed:', error);
        return caches.match('/images/offline.jpg');
        // throw error;
      });
    })
  );
});
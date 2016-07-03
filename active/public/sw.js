const version = 'v1';

this.addEventListener('install', function(event) {
  console.log('install');
  event.waitUntil(
    caches.open(version).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/images/trooper.jpg',
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
this.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
});

this.addEventListener("activate", function(event) {
  event.waitUntil(self.clients.claim().then(function () {
    importScripts('/socket.io/socket.io.js');
    var socket = io.connect('http://localhost:3000', {
        jsonp: false
    });

    setInterval(function () {
      socket.emit('timer', (new Date).toLocaleTimeString() + ": 3PO!, come in 3P0! shut down the gargabe mashers!");
    }, 3000);
  }));
});
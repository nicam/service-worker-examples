this.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
});

this.addEventListener("activate", function(event) {
  event.waitUntil(self.clients.claim());
});

this.addEventListener('push', function(event) {
  console.log('Push message received', event);
  var title = 'The empire needs you!';
  event.waitUntil(
    self.registration.showNotification(title, {
      body: 'Join the dark side',
      icon: 'images/trooper.jpg',
      tag: 'my-tag'
    }));
  // TODO
});
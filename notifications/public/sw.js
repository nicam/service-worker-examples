const version = 'v2';

this.addEventListener('install', function(event) {
  console.log('install');
});

this.addEventListener("activate", function(e) {
  console.log('activated');
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
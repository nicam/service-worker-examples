if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function(reg) {
    // registration worked
    console.log(reg);
    reg.pushManager.subscribe().then(
      function(pushSubscription) {
        console.log(pushSubscription.endpoint);
        // The push subscription details needed by the application
        // server are now available, and can be sent to it using,
        // for example, an XMLHttpRequest.
      }, function(error) {
        // During development it often helps to log errors to the
        // console. In a production environment it might make sense to
        // also report information about errors back to the
        // application server.
        console.log(error);
      }
    );
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
};
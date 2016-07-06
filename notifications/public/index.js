if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function(reg) {
    // registration worked
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
  navigator.serviceWorker.ready.then(function (reg) {
    reg.pushManager.subscribe({
        userVisibleOnly: true
    }).then(function(sub) {
        console.log('endpoint:', sub.endpoint);
        document.getElementById('endpoint').innerHTML = sub.endpoint;
    });
    console.log('Registration succeeded. Scope is ' + reg.scope);
  });
};
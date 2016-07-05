if ('serviceWorker' in navigator) {
  var registration, output = document.getElementById("output");
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function(reg) {
      console.log('Registration succeeded. Scope is ' + reg.scope);
      navigator.serviceWorker.ready.then(function(reg) {
        output.innerHTML = 'ServiceWorker is ready<br>';
        registration = reg;
      });
    }).catch(function(error) {
      console.log('Registration failed with ' + error);
    });

    navigator.serviceWorker.onmessage = function(event) {
      output.innerHTML += 'Got reply from service worker - see log for content<br>';
      console.log("Got reply from serviceworker via navigator.serviceWorker", event.data);
    };

    function sendMessageToWorker() {
      registration.active.postMessage({
        text: "Hi!"
      });
    }

    function sendBroadcastRequestToWorker() {
      registration.active.postMessage({
        text: "Hi!",
        type: 'broadcast'
      });
    }

};
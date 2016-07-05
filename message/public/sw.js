this.addEventListener('message', function (event) {
  console.log("Got message in SW", event.data);

  if (event.source && !event.data.type) {
    console.log("event.source present");
    event.source.postMessage("Woop! (via source)");
  } else if (self.clients) {
    console.log("Attempting postMessage via clients API");
    clients.matchAll().then(function(clients) {
      for (var client of clients) {
        client.postMessage("Whoop! (via client api)");
      }
    });
  } else if (event.data.port) {
    event.data.port.postMessage("Woop!");
  } else {
    console.log('No useful return channel');
  }
});

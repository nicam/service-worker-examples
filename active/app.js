var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.use(express.static('public'));

server.listen(3000, function () {
  console.log('listening on port 3000!');
});


io.on('connection', function (socket) {
  console.log('connected');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('timer', function (data) {
    console.log(data);
  });
});
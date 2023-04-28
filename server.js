const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*'
  }
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/client', (req, res) => {
    res.sendFile(__dirname + '/public/client.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('frame', (frame) => {
    socket.broadcast.emit('frame', frame);
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
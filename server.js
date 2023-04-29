const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*'
  }
});

let ids = [];

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/client', (req, res) => {
    res.sendFile(__dirname + '/public/client.html');
});

io.on('connection', (socket) => {
  console.log('user connected id: '+socket.id);
  ids.push(socket.id); 
  io.emit('ids', ids);

  socket.on('frame', (frame) => {
    ids.forEach(id => {
      io.to(id).emit('frame', frame);
    });
  });

  socket.on('disconnect', function () {
    var index = ids.indexOf(socket.id);
    ids.splice(index, 1);
    io.emit('ids', ids);
    console.log('user disconnected id: '+socket.id); 
  });
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});
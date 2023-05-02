const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const options = {
  key: fs.readFileSync('private.key'),     // Path to your private key file
  cert: fs.readFileSync('certificate.crt') // Path to your certificate file
};
const server = https.createServer(options, app);
const io = require('socket.io')(server, {
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
  console.log('user connected id: ' + socket.id);
  ids.push(socket.id); 
  io.emit('ids', ids);

  socket.on('frame', (frame) => {
    ids.forEach(id => {
      io.to(id).emit('frame', frame);
    });
  });

  socket.on('disconnect', function () {
    let index = ids.indexOf(socket.id);
    ids.splice(index, 1);
    io.emit('ids', ids);
    console.log('user disconnected id: ' + socket.id);
  });
});

server.listen(6060, () => {
  console.log('Server is running on port 443');
});




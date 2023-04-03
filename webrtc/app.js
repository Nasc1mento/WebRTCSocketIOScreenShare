const express = require('express');
const app = express();

const server = app.listen(3000, () => {
  console.log('Server started on port 3000');
});



const io = require('socket.io')(server);
const webRTC = require('./webRTC')(io);
const routes = require('./routes')(app);


module.exports = { app };


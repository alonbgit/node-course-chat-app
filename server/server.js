const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage', {
    from: 'someuser@gmail.com',
    text: 'Hi, this is a message from the server',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('New message received from the client', message);
  });

});

app.use(express.static(publicPath));

server.listen(3000, () => {
  console.log('server running on port 3000');
});

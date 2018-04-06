const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('new user connected');

  // socket.emit frmo admin, text - welcome to that chat app
  // socket.broadcast.emit from admin text - new user joined

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('New message received from the client', message);

    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');

  });

});

app.use(express.static(publicPath));

server.listen(3000, () => {
  console.log('server running on port 3000');
});

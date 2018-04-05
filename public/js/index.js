
var socket = io();

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('newMessage', function(message) {
  console.log('New message received from server', message);
});

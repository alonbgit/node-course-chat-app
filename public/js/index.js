
var socket = io();

socket.on('connect', function() {
  console.log('connected to server');

  socket.emit('createMessage', {
    from: 'client@gmail.com',
    text: 'this message is frmo the client!'
  });

});

socket.on('newMessage', function(message) {
  console.log('New message received from server', message);
});

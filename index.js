//Package Declarations

var express = require("express");
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var socket = io.listen(http);

app.use(express.static(__dirname + '/public'));

//Set port to 3000 and log to console

http.listen(3000, function(){
  console.log('listening on *:3000');
});

//Log to console when user connects or disconnects

io.on('connection', function(socket){
  var socketId = socket.id;
  var clientIp = socket.request.connection.remoteAddress;
  console.log('a user connected ' + clientIp);
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

//Log sent messages to console

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

//Retreive messages and display them on webpage

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

//Log usernames to console

io.on('connection', function(socket){
  socket.on('username', function(use){
    console.log('username: ' + use);
  });
});

//Retreive usernames and display them on webpage

io.on('connection', function(socket){
  socket.on('username', function(use){
    io.emit('username', use);
  });
});

io.on('connection', function(socket){
  socket.on('picture', function(pic){
    console.log('Image: ' + pic);
  });
});

io.on('connection', function(socket){
  socket.on('picture', function(pic){
    io.emit('picture', pic);
  });
});
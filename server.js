var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
user = [];
connections = [];


server.listen(3000, () => {
	console.log('Server running');
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', (socket) => {
	connections.push(socket);
	console.log('connected: %s sockets connected ', connections.length);

	//disconnect
	socket.on('disconnect', (data) => {
		connections.splice(connections.indexOf(socket), 1);
	console.log('Diconnected %s sockets connected', connections.length);
	});

	//send Message
	socket.on('send message', (data) => {
		console.log(data);
		io.sockets.emit('new message', {msg: data});
	});
	
});


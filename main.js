var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var lobbyController = require('./Controlles/lobbyControlles');
console.log(lobbyController.getAllLobyes());

var	user = [];

server.listen(80);
app.use("/site/", express.static(__dirname + '/site/'));
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/site/index.html');
});

io.sockets.on('connection', function (socket) {
  console.log("new user connection");
  socket.emit("lobbys", lobbyController.getAllLobyes());
  var userObj = null;
  var lobby = null;
  socket.on('login', function (name, id) {
  	userObj = {"name": name, "id": id, "socket": socket};
  	user.push(userObj);
  	socket.emit("lobbys", lobbyController.getAllLobyes());
  });

  socket.on('newLobby', function (lobbyName, width, height) {
  	if (lobbyController.nameExist(lobbyName) || userObj == null) {
  		return;
  	}
  	var newLobbyObj = lobbyController.newLobby(lobbyName, width, height, userObj);
  	lobbyController.add(newLobbyObj);
  	lobby = newLobbyObj;
  	socket.emit("joinLobby", newLobbyObj.serverUsers(), height, width);
  	console.log("new lobby");
  });
  socket.on('refrestLobby', function() {
  	socket.emit("lobbys", lobbyController.getAllLobyes());
  })
  socket.on('joinLobby', function (roomName) {
  	if (userObj == null) {
  		return;
  	}
  	var lobbyObj = lobbyController.findLobby(roomName);
  	if (lobbyObj != null) {
  		lobbyObj.addUser(userObj);
  		socket.emit("joinLobby", lobbyObj.serverUsers(), lobbyObj.height, lobbyObj.width);
  	}else{
  		console.log("lobby do not exist");
  	}
  })
});

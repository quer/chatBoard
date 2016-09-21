var socket = io.connect();
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var canvasObj = null;
var chatObj = null;
socket.on('lobbys', function (data) {
	$("#login").hide();
	$("#lobbys").show();
	console.log(data);
	$("#lobbys table").html("");
	for (var i = 0; i < data.length; i++) {
		$("#lobbys table").append("<tr><td>"+ data[i].name + "</td><td>"+ data[i].users + "</td><td><button id=\"lJoin\" lobbyName= \""+data[i].name+"\">join</button></td></tr>");
	}
});
socket.on('joinLobby', function(users, height, width) {
	$("#lobbys").hide();
	$("#cancasId").show();
	c.width = width;
	c.height = height;
	chatObj = new chat();
	canvasObj = new board(width, height, users, ctx, chatObj);
	canvasObj.render();
});
socket.on('updateLobby', function (data) {
	if (canvasObj != null) {
		canvasObj.users = data;
		canvasObj.render();
	}
})
$("#lobbys").on("click", "#lCreate", function () {
	var lobbyName = $("#lName").val();
	var lHeight = $("#lHeight").val();
	var lWidth = $("#lWidth").val();
	socket.emit("newLobby", lobbyName, lWidth, lHeight);
	console.log("new lobby");
});
$("#lobbys").on("click", "#lRefresh", function () {
	socket.emit("refrestLobby");
});
$("#lobbys").on("click", "#lJoin", function () {
	var roomName = $(this).attr("lobbyName");
	socket.emit("joinLobby", roomName);
});
$("#lobbys").on("click", "#login", function () {
	socket.emit('login', "test fisker", "10210823945938196");
});

c.onclick = function(e){
    socket.emit('move user', e.x, e.y);
};

$(document).keypress(function(e) {
	// Make sure we get the right event
	e = e || window.event;
	var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

	// Which key was pressed?
	switch (keyCode) {
		// ENTER
		case 13:
			{

				chatObj.emit(socket);
				break;
			}
		default:
			{
				if (chatObj != null) {
					chatObj.addLetter(String.fromCharCode(keyCode));
					canvasObj.render();
				}
			}
	}
});
$(document).keydown(function(e) {
	e = e || window.event;
	var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

	// BACKSPACE
	if (keyCode === 8 && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
		e.preventDefault();
		if (chatObj != null) {
			chatObj.removeLetter();
		}
	}
});
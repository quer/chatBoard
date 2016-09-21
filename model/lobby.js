
module.exports = function (user, name, width, height) {
	this.users = [];
	

	this.name = name;
	this.width = width;
	this.height = height;
	this.addUser = function (user) {
		user.x = Math.floor((Math.random() * this.width));
		user.y = Math.floor((Math.random() * this.height));
		user.chat = null;
		this.users.push(user);
		//console.log(user);
		this.updateUsers();
	}
	this.findUser = function (userid) {
		for (var i = 0; i < this.users.length; i++) {
			if(this.users[i].id == userid)
				return this.users[i];
		}
		return null;
	}
	this.removeUser = function (userid) {
		for (var i = 0; i < this.users.length; i++) {
			if(this.users[i].id == userid){
				this.users.splice(i, 1);
				break;
			}

		}
	}
	this.serverUsers = function () {
		var returnData = [];
		for (var i = 0; i < this.users.length; i++) {
			var chatText = this.users[i].chat != null ? this.users[i].chat.text : null;
			returnData.push({"name": this.users[i].name, "id": this.users[i].id, "chat": chatText, poss: {"x":this.users[i].x , "y":this.users[i].y}});
		}
		return returnData;
	}
	this.updateUsers = function() {
		for (var i = 0; i < this.users.length; i++) {
			this.users[i].socket.emit("updateLobby", this.serverUsers());
		}
	}
	this.update = function(delta) {
		var needUpdate = false;
		for (var i = 0; i < this.users.length; i++) {
			if (this.users[i].chat != null && this.users[i].chat.time + 10000 < new Date().getTime()) {
				needUpdate = true;
				this.users[i].chat = null;
			}
		}
		if (needUpdate) {
			this.updateUsers();
		}
	}
	this.addUser(user);
}
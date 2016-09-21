var lobbyObj = require('./../model/lobby');
module.exports = new function () {
	this.list = [];
	this.add = function (lobby) {
		this.list.push(lobby);
	}
	this.checkForEmty = function() {
		
	}
	this.getAllLobyes = function() {
		var returnData = [];
		for (var i = 0; i < this.list.length; i++) {
			returnData.push({"name": this.list[i].name, "users": this.list[i].users.length});
		}
		return returnData;
	}
	this.newLobby = function(name, width, height, user) {
		return new lobbyObj(user, name, width, height);
	}
	this.findLobby = function (name) {
		for (var i = 0; i < this.list.length; i++) {
			if (this.list[i].name == name) {
				return this.list[i];
			}
		}
		return null;
	}
	this.nameExist = function (name) {
		for (var i = 0; i < this.list.length; i++) {
			if (this.list[i].name == name) {
				return true;
			}
		}
		return false;
	}
	this.update = function (delta) {
		for (var i = 0; i < this.list.length; i++) {
			this.list[i].update(delta);
		}
	}
}
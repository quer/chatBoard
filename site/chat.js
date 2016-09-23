var chat = function (argument) {
	this.text = "";
	this.addLetter = function(letter) {
		this.text += letter;
	}
	this.removeLetter = function () {
		this.text = this.text.slice(0, -1);
	}
	this.emit = function (socket) {
		socket.emit("chat", this.text);
		this.text = "";
	}
}
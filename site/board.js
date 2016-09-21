var board = function (width, height, users, ctx, chat) {
	this.width = width;
	this.height = height;
	this.users = users;
	this.chat = chat;
	this.ctx = ctx;
	this.render = function () {
		this.ctx.font="15px Georgia";
		this.ctx.fillStyle="black";
		this.ctx.textAlign="center"; 
        this.ctx.save();
        this.ctx.translate(0, 0);
        // clear the viewport
        this.ctx.clearRect(0, 0, this.width, this.height);
        	console.log(this.users);
        	var that = this;
            for (var i = 0; i < this.users.length; i++) {
				var imageObj = new Image();
				var index = i;
            	imageObj.onload = (function(nr) {
            		return function() {
			            console.log("index: "+index);
				        that.ctx.drawImage(this, that.users[nr].poss.x, that.users[nr].poss.y);
	       				that.ctx.textAlign="center"; 
	       				that.ctx.fillText(that.users[nr].name, that.users[nr].poss.x + (this.width /2), that.users[nr].poss.y + this.height + 18);
	       				if (that.users[nr].chat != null) {
	       					ctx.textAlign="left";
	       					var realText = that.createText(that.users[nr].chat);
	       					var x = that.users[nr].poss.x + (this.width /2);
	       					if (realText.textWidth + x > that.width) {
	       						x - realText.textWidth;
	       					}
	       					var user = that.users[nr];
	       					for (var ii = 0; ii < realText.text.length; ii++) {
	       						
	       						that.ctx.fillText(realText.text[ii], x, that.users[nr].poss.y - ((realText.text.length - ii) * 15));
	       					}
	       				}
		            }
			    }(index))

            	imageObj.src = 'https://graph.facebook.com/'+this.users[index].id+'/picture';
        		//this.ctx.drawimage(imageObj, 0, 0, imageObj.width, imageObj.height, this.users[i].x, this.users[i].y, imageObj.width, imageObj.height);    	
            	
				//this.ctx.fillText(this.users[i].name,this.users[i].x + (imageObj.width /2),this.users[i].y + imageObj.height);
            }
            this.ctx.textAlign="center"; 
            this.ctx.fillText(this.chat.text, this.width/2, this.height-20);

        this.ctx.restore();
	}
	this.createText = function (text) {
		var textArray = text.split("");
		var returnStringArray = new Array();
		var outputString = '';
	 	var index = 0;
		var textWidth = 0;
		for (var i = 0; i < textArray.length; i++) {
			if (index == 18) {
				returnStringArray.push(outputString);
				if (this.ctx.measureText(outputString).width > textWidth) {
	 				//console.log("do new width:" + ctx.measureText(outputString).width);
	 				textWidth = this.ctx.measureText(outputString).width;
	 			};
				outputString = "";
				index = 0;
			}
			outputString += textArray[i];
			index++;
		}
		return {"textWidth": textWidth, "text": returnStringArray};
	}
}

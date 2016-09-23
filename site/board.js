var board = function (width, height, users, ctx, chat) {
	this.width = width;
	this.height = height;
	this.users = users;
	this.loadetImages = [];
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
				var imageExist = this.haveLoadetImage(this.users[i].id);
				if (imageExist != null) {
					this.drawUser(this.users[i], imageExist.image)
				}else{
					var imageObj = new Image();
	            	imageObj.onload = (function(nr) {
	            		return function() {
				            console.log("index: "+ nr);
					        that.loadetImages.push({"id": that.users[nr].id, "image": this});
			            	that.drawUser(that.users[nr], this);
			            }
				    }(i))

	            	imageObj.src = 'https://graph.facebook.com/'+this.users[i].id+'/picture';	
				}
				
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
		returnStringArray.push(outputString);
		if (this.ctx.measureText(outputString).width > textWidth) {
			textWidth = this.ctx.measureText(outputString).width;
		};
		return {"textWidth": textWidth, "text": returnStringArray};
	}
	this.haveLoadetImage = function (userId) {
		
		for (var i = 0; i < this.loadetImages.length; i++) {
			if (this.loadetImages[i].id = userId) {
				return this.loadetImages[i];
			}
		}
		return null;
	}
	this.drawUser = function (user, image) {
		console.log(user.id + " | " + image.src);
		this.ctx.drawImage(image, user.poss.x, user.poss.y);
		this.ctx.textAlign="center"; 
		this.ctx.fillText(user.name, user.poss.x + (image.width /2), user.poss.y + image.height + 18);
		if (user.chat != null) {
			this.ctx.textAlign="left";
			var realText = this.createText(user.chat);
			
			var x = user.poss.x + (image.width /2);
			if (realText.textWidth + x > this.width) {
				console.log("over width");
				x -= realText.textWidth;
			}
			for (var ii = 0; ii < realText.text.length; ii++) {
				
				this.ctx.fillText(realText.text[ii], x, user.poss.y - ((realText.text.length - ii) * 15));
			}
		}
	}
}
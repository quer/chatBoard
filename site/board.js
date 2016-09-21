var board = function (width, height, users, ctx) {
	this.width = width;
	this.height = height;
	this.users = users;
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
	       				that.ctx.fillText(that.users[nr].name, that.users[nr].poss.x + (this.width /2), that.users[nr].poss.y + this.height+ 18);
		            }
			    }(index))
            	imageObj.src = 'https://graph.facebook.com/'+this.users[index].id+'/picture';
        		//this.ctx.drawimage(imageObj, 0, 0, imageObj.width, imageObj.height, this.users[i].x, this.users[i].y, imageObj.width, imageObj.height);    	
            	
				//this.ctx.fillText(this.users[i].name,this.users[i].x + (imageObj.width /2),this.users[i].y + imageObj.height);
            }
            
        this.ctx.restore();
	}
}
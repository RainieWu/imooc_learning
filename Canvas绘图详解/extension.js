// JavaScript Document

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var originalMoveTo = CanvasRenderingContext2D.prototype.moveTo;
CanvasRenderingContext2D.prototype.lastMoveToLoc = {};

CanvasRenderingContext2D.prototype.moveTo = function(x, y) {
	originalMoveTo.apply(this, [x, y]);
	
	this.lastMoveToLoc.x = x;
	this.lastMoveToLoc.y = y;
}

CanvasRenderingContext2D.prototype.fillStar1 = function(x, y, r, R, rotation) {
	this.beginPath();
	for(var i = 0; i < 5; i ++) {
		this.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * R + x, -Math.sin((18 + i * 72 - rotation) / 180 * Math.PI) * R + y);
		this.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * r + x, -Math.sin((54 + i * 72 - rotation) / 180 * Math.PI) * r + y);
	}
	this.closePath();
	this.fill();
}

CanvasRenderingContext2D.prototype.fillStar2 = function(r, R, rotation) {
	this.beginPath();
	for(var i = 0; i < 5; i ++) {
		this.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * R + this.lastMoveToLoc.x, -Math.sin((18 + i * 72 - rotation) / 180 * Math.PI) * R + this.lastMoveToLoc.y);
		this.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * r + this.lastMoveToLoc.x, -Math.sin((54 + i * 72 - rotation) / 180 * Math.PI) * r + this.lastMoveToLoc.y);
	}
	this.closePath();
	this.fill();
}

window.onload = function() {
	canvas.width = 1330;
	canvas.height = 613;
	
	context.fillStyle = "#058";
	context.fillStar1(400, 350, 150, 300, 0);
	
	context.fillStyle = "#058";
	context.moveTo(900, 350);
	context.fillStar2(150, 300, 0);
}
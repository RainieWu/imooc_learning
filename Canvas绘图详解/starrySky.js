// JavaScript Document

window.onload = function() {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	canvas.width = 1330;
	canvas.height = 613;
	
	// 天空
	//var skyStyle = context.createLinearGradient(0, 0, 0, canvas.height);
	var skyStyle = context.createRadialGradient(canvas.width / 2, canvas.height, 0, canvas.width / 2, canvas.height, canvas.height);
	skyStyle.addColorStop(0.0, "#035");
	skyStyle.addColorStop(1.0, "#000");
	context.fillStyle = skyStyle;
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	// 星星
	for(var i = 0; i < 250; i ++) {
		var x = Math.random() * canvas.width;
		var y = Math.random() * canvas.height * 0.6;
		var r = Math.random() * 3 + 3;
		var rotation = Math.random() * 360;
		drawStar(context, x, y, r, rotation);
	}
	
	// 月亮
	fillMoon(context, 2, 1100, 120, 50, 30);
	
	// 草地
	drawLand(context);
}

// 草地
function drawLand(context) {
	context.save();
	
	context.beginPath();
	context.moveTo(0, 450);
	context.bezierCurveTo(540, 300, 460, 650, 1330, 500);
	context.lineTo(1330, 613);
	context.lineTo(0, 613);
	context.closePath();
	
	var landStyle = context.createLinearGradient(0, 613, 0, 0);
	landStyle.addColorStop(0.0, "#030");
	landStyle.addColorStop(1.0, "#580");
	context.fillStyle = landStyle;
	
	context.fill();
	
	context.restore();
}


// 月亮
function fillMoon(context, d, x, y, r, rotation, fillColor) {
	context.save();
	context.translate(x, y);
	context.rotate(rotation * Math.PI / 180);
	context.scale(r, r);
	moon(context, d);
	context.fillStyle = fillColor || "#fb5";
	context.fill();
	context.restore();
}

function moon(context, d) {
	context.beginPath();
	context.arc(0, 0, 1, 0.5 * Math.PI, 1.5 * Math.PI, true);
	context.moveTo(0, -1);
	//context.arcTo(d, 0, 0, 1, distance(0, -1, d, 0) / d);
	context.quadraticCurveTo(1.2, 0, 0, 1);
	context.closePath();
}

/*
// 两点间的距离
function distance(x1, y1, x2, y2) {
	return Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
}
*/

// 星星
function drawStar(context, x, y, r, rotation) {
	context.save();
	context.translate(x, y);
	context.rotate(rotation / 180 * Math.PI);
	context.scale(r, r);
	star(context);
	context.fillStyle = "#fd3";
	//context.strokeStyle = "#fd5";
	//context.lineWidth = 3;
	context.lineJoin = "round";
	context.fill();
	//context.stroke();
	context.restore();
}

function star(context) {
	context.beginPath();
	for(var i = 0; i < 5; i ++) {
		context.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI), -Math.sin((18 + i * 72) / 180 * Math.PI));
		context.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * 0.5, -Math.sin((54 + i * 72) / 180 * Math.PI) * 0.5);
	}
	context.closePath();
}
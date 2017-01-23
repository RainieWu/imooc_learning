// JavaScript Document

window.onload = function() {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	canvas.width = 1330;
	canvas.height = 613;
	
	var searchlight = {x : canvas.width / 2, y : canvas.height / 2, radius : 100, vx : Math.random() * 5 + 10, vy : Math.random() * 5 + 10};
	
	setInterval(function() {
		draw(context, searchlight);
		update(canvas.width, canvas.height, searchlight);
	}, 40);
}

function draw(context, searchlight) {
	var canvas = context.canvas;
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	context.save();
	
	context.beginPath();
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.beginPath();
	context.arc(searchlight.x, searchlight.y, searchlight.radius, 0, Math.PI * 2);
	context.fillStyle = "white";
	context.fill();
	context.clip();
	
	context.font = "bold 120px Microsoft YaHei";
	context.textAlign = "center";
	context.textBaseline = "bottom";
	context.fillStyle = "black";
	context.fillText("哈哈哈哈哈哈哈哈哈哈哈", canvas.width / 2, canvas.height * 1 / 5);
	context.fillText("哈哈哈哈哈哈哈哈哈哈哈", canvas.width / 2, canvas.height * 2 / 5);
	context.fillText("哈哈哈哈哈哈哈哈哈哈哈", canvas.width / 2, canvas.height * 3 / 5);
	context.fillText("哈哈哈哈哈哈哈哈哈哈哈", canvas.width / 2, canvas.height * 4 / 5);
	context.fillText("哈哈哈哈哈哈哈哈哈哈哈", canvas.width / 2, canvas.height * 5 / 5);
	
	context.restore();
}

function update(canvasWidth, canvasHeight, searchlight) {
	searchlight.x += searchlight.vx;
	searchlight.y += searchlight.vy;
		
	if(searchlight.x - searchlight.radius <= 0) {
		searchlight.vx = -searchlight.vx;
		searchlight.x = searchlight.radius;
	}
		
	if(searchlight.x + searchlight.radius >= canvasWidth) {
		searchlight.vx = -searchlight.vx;
		searchlight.x = canvasWidth - searchlight.radius;
	}
		
	if(searchlight.y - searchlight.radius <= 0) {
		searchlight.vy = -searchlight.vy;
		searchlight.y = searchlight.radius;
	}
		
	if(searchlight.y + searchlight.radius >= canvasHeight) {
		searchlight.vy = -searchlight.vy;
		searchlight.y = canvasHeight - searchlight.radius;
	}
}
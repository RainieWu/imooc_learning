// JavaScript Document

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var balls = [];

window.onload = function() {
	
	canvas.width = 1330;
	canvas.height = 613;
	
	for(var i = 0; i < 20; i++) {
		var R = Math.floor(Math.random() * 255);
		var G = Math.floor(Math.random() * 255);
		var B = Math.floor(Math.random() * 255);
		var ball = {
			c: "rgb(" + R + "," + G + "," + B + ")",
			x : Math.random() * canvas.width,
			y : Math.random() * canvas.height,
			r : Math.random() * 50 + 20
		};
		balls[i] = ball;
	}
	
	drawBall();
	//canvas.addEventListener("click", clickCircle);
	canvas.addEventListener("mousemove", mouseMove);
}

function drawBall() {
	for(var i = 0; i < balls.length; i ++) {
		//context.fillStyle = balls[i].c;
		context.fillStyle = "black";
		context.beginPath();
		context.arc(balls[i].x, balls[i].y, balls[i].r, 0, Math.PI * 2);
		context.closePath();
		context.fill();
	}
}

function clickCircle(event) {
	var x = event.clientX - canvas.getBoundingClientRect().left;
	var y = event.clientY - canvas.getBoundingClientRect().top;
	
	for(var i = 0; i < balls.length; i++) {
		context.beginPath();
		context.arc(balls[i].x, balls[i].y, balls[i].r, 0, Math.PI * 2);
		
		if(context.isPointInPath(x, y)) {
			context.fillStyle = "white";
			context.fill();
		}
	}
}

function mouseMove(event) {
	var x = event.clientX - canvas.getBoundingClientRect().left;
	var y = event.clientY - canvas.getBoundingClientRect().top;
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	for(var i = 0; i < balls.length; i++) {
		context.beginPath();
		context.arc(balls[i].x, balls[i].y, balls[i].r, 0, Math.PI * 2);
		
		if(context.isPointInPath(x, y)) {
			context.fillStyle = "white";
		}
		else {
			context.fillStyle = "black";
		}
		context.fill();
	}
}
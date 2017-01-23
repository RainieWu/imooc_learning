// JavaScript Document

var stopButton = document.getElementById("canvasButton");
var whiteButton = document.getElementById("whiteButton");
var blackButton = document.getElementById("blackButton");

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var balls = [];

var isMoving = true;
var themeColor = "white";

window.onload = function() {
	canvas.width = 1330;
	canvas.height = 613;
	
	for(var i = 0; i < 100; i ++) {
		var R = Math.floor(Math.random() * 255);
		var G = Math.floor(Math.random() * 255);
		var B = Math.floor(Math.random() * 255);
		var radius = Math.random() * 50 + 20;
		ball = {
			color: "rgb(" + R + "," + G + "," + B + ")",
			radius: radius,
			x : Math.random() * (canvas.width - radius * 2) + radius,
			y : Math.random() * (canvas.height - radius * 2) + radius,
			vx : (Math.random() * 5 + 5) * Math.pow(-1, Math.floor(Math.random() * 100)),
			vy : (Math.random() * 5 + 5) * Math.pow(-1, Math.floor(Math.random() * 100))
		};
		balls[i] = ball;
	}
	
	setInterval(function() {
		drawBall();
		if(isMoving) {
			update(canvas.width, canvas.height);
		}
	}, 50);
	
	stopButton.addEventListener("click", function() {
		if(isMoving) {
			isMoving = false;
			this.text = "RUN";
		}
		else {
			isMoving = true;
			this.text = "STOP";
		}
	});
	
	whiteButton.addEventListener("click", function() {
		themeColor = "white"
		return false;
	});
	
	blackButton.addEventListener("click", function() {
		themeColor = "black"
		return false;
	});
}

function drawBall() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = themeColor;
	context.fillRect(0, 0, canvas.width, canvas.height);
	for(var i = 0; i < balls.length; i ++) {
		context.fillStyle = balls[i].color;
		context.beginPath();
		context.arc(balls[i].x, balls[i].y, balls[i].radius, 0, Math.PI * 2);
		context.closePath();
		context.fill();
	}
}

function update(canvasWidth, canvasHeight) {
	for(var i = 0; i < balls.length; i ++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		
		if(balls[i].x - balls[i].radius <= 0) {
			balls[i].vx = -balls[i].vx;
			balls[i].x = balls[i].radius;
		}
		
		if(balls[i].x + balls[i].radius >= canvasWidth) {
			balls[i].vx = -balls[i].vx;
			balls[i].x = canvasWidth - balls[i].radius;
		}
		
		if(balls[i].y - balls[i].radius <= 0) {
			balls[i].vy = -balls[i].vy;
			balls[i].y = balls[i].radius;
		}
		
		if(balls[i].y + balls[i].radius >= canvasHeight) {
			balls[i].vy = -balls[i].vy;
			balls[i].y = canvasHeight - balls[i].radius;
		}
	}
}
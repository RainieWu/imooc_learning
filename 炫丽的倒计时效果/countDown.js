// JavaScript Document

var endTime = new Date();
endTime.setTime(endTime.getTime() + 3600 * 1000);

var currentShowTimeSeconds = 0;

var balls = [];

window.onload = function() {
	windowWidth = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
	windowHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
	marginLeft = Math.round(windowWidth / 10);
	marginTop = Math.round(windowHeight / 5);
	radius = Math.round(windowWidth * 4 / 5 / 116) - 1;
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	canvas.width = windowWidth;
	canvas.height = windowHeight;
	
	currentShowTimeSeconds = getCurrentShowTimeSeconds();
	
	setInterval(function() {
		render(context);
		update();
	}, 50);
}

function getCurrentShowTimeSeconds() {
	var currentTime = new Date();
	var result = endTime.getTime() - currentTime.getTime();
	result = Math.round(result / 1000);
	return result >= 0 ? result : 0;
}

function render(context) {
	context.clearRect(0, 0, windowWidth, windowHeight);
	
	var hours = parseInt(currentShowTimeSeconds / 3600);
	var minutes = parseInt(currentShowTimeSeconds / 60 % 60);
	var seconds = currentShowTimeSeconds % 60;
	
	renderDigit(marginLeft + 0 * 16 * (radius + 1) + 0 * 10 * (radius + 1), marginTop, parseInt(hours / 10), context);
	renderDigit(marginLeft + 1 * 16 * (radius + 1) + 0 * 10 * (radius + 1), marginTop, parseInt(hours % 10), context);
	renderDigit(marginLeft + 2 * 16 * (radius + 1) + 0 * 10 * (radius + 1), marginTop, parseInt(10), context);
	renderDigit(marginLeft + 2 * 16 * (radius + 1) + 1 * 10 * (radius + 1), marginTop, parseInt(minutes / 10), context);
	renderDigit(marginLeft + 3 * 16 * (radius + 1) + 1 * 10 * (radius + 1), marginTop, parseInt(minutes % 10), context);
	renderDigit(marginLeft + 4 * 16 * (radius + 1) + 1 * 10 * (radius + 1), marginTop, parseInt(10), context);
	renderDigit(marginLeft + 4 * 16 * (radius + 1) + 2 * 10 * (radius + 1), marginTop, parseInt(seconds / 10), context);
	renderDigit(marginLeft + 5 * 16 * (radius + 1) + 2 * 10 * (radius + 1), marginTop, parseInt(seconds % 10), context);
	
	for(var i = 0; i < balls.length; i ++) {
		context.fillStyle = balls[i].color;
		
		context.beginPath();
		context.arc(balls[i].x, balls[i].y, radius, 0, 2 * Math.PI, true);
		context.closePath();
		
		context.fill();
	}
}

function renderDigit(x, y, num, context) {
	context.fillStyle = "black";
	
	for(var i = 0; i < digit[num].length; i ++) {
		for(var j = 0; j < digit[num][i].length; j ++) {
			if(digit[num][i][j] == 1) {
				context.beginPath();
				context.arc(x + j * 2 * (radius + 1) + (radius + 1), y + i * 2 * (radius + 1) + (radius + 1), radius, 0, 2 * Math.PI);
				context.closePath();
				context.fill();
			}
		}
	}
}

function update() {
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();
	
	var nextHours = parseInt(nextShowTimeSeconds / 3600);
	var nextMinutes = parseInt(nextShowTimeSeconds / 60 % 60);
	var nextSeconds = nextShowTimeSeconds % 60;
	
	var currentHours = parseInt(currentShowTimeSeconds / 3600);
	var currentMinutes = parseInt(currentShowTimeSeconds / 60 % 60);
	var currentSeconds = currentShowTimeSeconds % 60;
	
	if(nextSeconds != currentSeconds) {
		if(parseInt(currentHours / 10) != parseInt(nextHours / 10)) {
			addBalls(marginLeft + 0 * 16 * (radius + 1) + 0 * 10 * (radius + 1), marginTop, parseInt(currentHours / 10));
		}
		if(parseInt(currentHours % 10) != parseInt(nextHours % 10)) {
			addBalls(marginLeft + 1 * 16 * (radius + 1) + 0 * 10 * (radius + 1), marginTop, parseInt(currentHours % 10));
		}
		if(parseInt(currentMinutes / 10) != parseInt(nextMinutes / 10)) {
			addBalls(marginLeft + 2 * 16 * (radius + 1) + 1 * 10 * (radius + 1), marginTop, parseInt(currentMinutes / 10));
		}
		if(parseInt(currentMinutes % 10) != parseInt(nextMinutes % 10)) {
			addBalls(marginLeft + 3 * 16 * (radius + 1) + 1 * 10 * (radius + 1), marginTop, parseInt(currentMinutes % 10));
		}
		if(parseInt(currentSeconds / 10) != parseInt(nextSeconds / 10)) {
			addBalls(marginLeft + 4 * 16 * (radius + 1) + 2 * 10 * (radius + 1), marginTop, parseInt(currentSeconds / 10));
		}
		if(parseInt(currentSeconds % 10) != parseInt(nextSeconds % 10)) {
			addBalls(marginLeft + 5 * 16 * (radius + 1) + 2 * 10 * (radius + 1), marginTop, parseInt(currentSeconds % 10));
		}
		currentShowTimeSeconds = nextShowTimeSeconds;
	}
	updateBalls();
}

function updateBalls() {
	for(var i = 0; i < balls.length; i ++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		
		if(balls[i].y >= windowHeight - radius) {
			balls[i].y = windowHeight - radius;
			balls[i].vy = -balls[i].vy * 0.75;
		}
	}
	
	var count = 0;
	for(var i = 0; i < balls.length; i ++) {
		if(balls[i].x + radius > 0 && balls[i].x - radius < windowWidth) {
			balls[count ++] = balls[i];
		}
	}
	while(balls.length > Math.min(300, count)) {
		balls.pop();
	}
}

function addBalls(x, y, num) {
	for(var i = 0; i < digit[num].length; i ++) {
		for(var j = 0; j < digit[num][i].length; j ++) {
			if(digit[num][i][j] == 1) {
				var ball = {
					x:x + j * 2 * (radius + 1) + (radius + 1),
					y:y + i * 2 * (radius + 1) + (radius + 1),
					g:1.5 + Math.random(),
					// vx为+4或-4
					vx:Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
					vy:-5,
					color:"black"
				}
				balls.push(ball);
			}
		}
	}
}
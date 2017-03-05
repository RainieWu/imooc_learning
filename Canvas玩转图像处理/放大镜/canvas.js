var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var image = new Image();

// 放大镜
var magnifierCanvas = document.getElementById("magnifier");
var magnifierContext = magnifierCanvas.getContext("2d");
var isMouseDown = false;
var magnifierScale;

window.onload = function() {
	canvas.width = window.innerWidth - 22;
	canvas.height = window.innerHeight - 22;
	
	
	image.src = "../1.jpg";
	image.onload = function() {
		magnifierCanvas.width = image.width;
		magnifierCanvas.height = image.height;
		magnifierScale = magnifierCanvas.width / canvas.width;
		
		context.drawImage(image, 0, 0, canvas.width, canvas.height);
		magnifierContext.drawImage(image, 0, 0);
	}
	
	
	// 放大镜鼠标事件
	canvas.onmousedown = function(e) {
		e.preventDefault();
		isMouseDown = true;
		drawCanvasWithMagnifier(e);
	}
	
	canvas.onmousemove = function(e) {
		e.preventDefault();
		if(isMouseDown) {
			drawCanvasWithMagnifier(e);
		}
	}
	
	canvas.onmouseup = function(e) {
		e.preventDefault();
		isMouseDown = false;
		drawCanvasWithMagnifier(e);
	}
	
	canvas.onmouseout = function(e) {
		e.preventDefault();
		isMouseDown = false;
		drawCanvasWithMagnifier(e);
	}
}


// 放大镜
function drawCanvasWithMagnifier(e) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(image, 0, 0, canvas.width, canvas.height);
	if(isMouseDown) {
		drawMagnifier(e);
	}	
}

function drawMagnifier(e) {
	var magnifierX = e.offsetX + 1;
	var magnifierY = e.offsetY + 1;
	
	var magnifierRadiu = 200;
	
	var sx = magnifierX - magnifierRadiu;
	var sy = magnifierY - magnifierRadiu;
	
	var dx = e.offsetX + 1 - magnifierRadiu;
	var dy = e.offsetY + 1 - magnifierRadiu;
	
	
	context.save();
	
	context.lineWidth = 10;
	context.strokeStyle = "#000000";
	context.beginPath();
	context.arc(e.offsetX + 1, e.offsetY + 1, magnifierRadiu, 0, Math.PI * 2);
	context.stroke();
	context.clip();
	context.drawImage(image, sx, sy, magnifierRadiu * 2, magnifierRadiu * 2, dx, dy, magnifierRadiu * 2, magnifierRadiu * 2);
	
	context.restore();
}
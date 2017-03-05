var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var image = new Image();

// 滑动条
var slider = document.getElementById("slider");
var sliderScale = slider.value;

window.onload = function() {
	canvas.width = window.innerWidth - 22;
	canvas.height = window.innerHeight - 43;
	
	image.src = "../1.jpg";
	image.onload = function() {
		context.drawImage(image, 0, 0, canvas.width, canvas.height);
		
		// 滑动条缩放
		drawImageByScale();
		slider.onmousemove = function() {
			sliderScale = slider.value;
			drawImageByScale();
		}
	}
}


// 滑动条缩放
function drawImageByScale() {
	var imageWidth = image.width * sliderScale;
	var imageHeight = image.height * sliderScale;
	
	var dx = (canvas.width - imageWidth) / 2;
	var dy = (canvas.height - imageHeight) / 2;
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(image, dx, dy, imageWidth, imageHeight);
}
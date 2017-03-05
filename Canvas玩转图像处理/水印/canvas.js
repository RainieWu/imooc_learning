var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var image = new Image();

// 水印
var watermarkCanvas = document.getElementById("watermark");
var watermarkContext = watermarkCanvas.getContext("2d");

window.onload = function() {
	canvas.width = window.innerWidth - 22;
	canvas.height = window.innerHeight - 22;
	
	image.src = "../1.jpg";
	image.onload = function() {
		context.drawImage(image, 0, 0, canvas.width, canvas.height);
		
		
		// 水印
		watermarkCanvas.width = 150;
		watermarkCanvas.height = 100;
	
		watermarkContext.font = "20px Arial";
		watermarkContext.fillStyle = "rgba(255, 255, 255, 0.5)";
		watermarkContext.textBaseline = "middle";
		watermarkContext.fillText("@ RainieWu", 20, 50);
		
		context.drawImage(watermarkCanvas, (canvas.width - watermarkCanvas.width) / 2, (canvas.height - watermarkCanvas.height) / 2);
	}
}
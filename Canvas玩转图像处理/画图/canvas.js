var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var image = new Image();

window.onload = function() {
	canvas.width = window.innerWidth - 2;
	canvas.height = window.innerHeight - 2;
	
	var imageData = context.createImageData(canvas.width, canvas.height);
	var data = imageData.data;
	
	for(var i = 0; i < canvas.width; i ++) {
		for(var j = 0; j < canvas.height; j ++) {
			// 图像1
			var p = j * canvas.width + i;
			data[p * 4 + 0] = parseInt(Math.pow(Math.cos(Math.atan2(j - canvas.height / 2, i - canvas.width / 2) / 2), 2) * 255);
			data[p * 4 + 1] = parseInt(Math.pow(Math.cos(Math.atan2(j - canvas.height / 2, i - canvas.width / 2) / 2 - 2 * Math.acos(-1) / 3), 2) * 255);
			data[p * 4 + 2] = parseInt(Math.pow(Math.cos(Math.atan2(j - canvas.height / 2, i - canvas.width / 2) / 2 + 2 * Math.acos(-1) / 3), 2) * 255);
			data[p * 4 + 3] = 255;
			
			/*
			// 图像2
			var a = 0;
			var b = 0;
			var c = 0;
			var d = 0;
			var n = 0;
			var p = j * canvas.width + i;
			while((c = a * a) + (d = b * b) < 4 && n ++ < 880) {
				b = 2 * a * b + j * 8e-9 - 0.645411;
				a = c - d + i * 8e-9 + 0.356888;
			}
			data[p * 4 + 0] = 255 * Math.pow((n - 80) / 800, 0.3);
			data[p * 4 + 1] = 255 * Math.pow((n - 80) / 800, 0.5);
			data[p * 4 + 2] = 255 * Math.pow((n - 80) / 800, 0.3);
			data[p * 4 + 3] = 255;
			*/
		}
	}
	
	context.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height);
}
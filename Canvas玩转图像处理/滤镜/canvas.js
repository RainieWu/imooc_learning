var canvas1 = document.getElementById("canvas1");
var context1 = canvas1.getContext("2d");

var canvas2 = document.getElementById("canvas2");
var context2 = canvas2.getContext("2d");

var image = new Image();

window.onload = function() {
	canvas1.width = window.innerWidth / 2 - 30;
	canvas1.height = window.innerHeight - 52;
	
	canvas2.width = window.innerWidth / 2 - 30;
	canvas2.height = window.innerHeight - 52;
	
	image.src = "../1.jpg";
	image.onload = function() {
		context1.drawImage(image, 0, 0, canvas1.width, canvas1.height);
	}
}

// 灰度滤镜
function grayscale() {
	var imageData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
	var data = imageData.data;
	
	for(var i = 0; i < canvas1.width * canvas1.height; i ++) {
		var r = data[i * 4 + 0];
		var g = data[i * 4 + 1];
		var b = data[i * 4 + 2];
		
		var grayscale = r * 0.3 + g * 0.59 + b * 0.11;
		
		data[i * 4 + 0] = grayscale;
		data[i * 4 + 1] = grayscale;
		data[i * 4 + 2] = grayscale;
	}
	
	context2.putImageData(imageData, 0, 0, 0, 0, canvas2.width, canvas2.height);
}

// 黑白滤镜
function blackandwhite() {
	var imageData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
	var data = imageData.data;
	
	for(var i = 0; i < canvas1.width * canvas1.height; i ++) {
		var r = data[i * 4 + 0];
		var g = data[i * 4 + 1];
		var b = data[i * 4 + 2];
		
		var grayscale = r * 0.3 + g * 0.59 + b * 0.11;
		if(grayscale > 255 / 2) {
			var value = 255;
		} else {
			var value = 0;
		}
		
		data[i * 4 + 0] = value;
		data[i * 4 + 1] = value;
		data[i * 4 + 2] = value;
	}
	
	context2.putImageData(imageData, 0, 0, 0, 0, canvas2.width, canvas2.height);
}

// 反色滤镜
function inversion() {
	var imageData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
	var data = imageData.data;
	
	for(var i = 0; i < canvas1.width * canvas1.height; i ++) {
		var r = data[i * 4 + 0];
		var g = data[i * 4 + 1];
		var b = data[i * 4 + 2];
		
		data[i * 4 + 0] = 255 - r;
		data[i * 4 + 1] = 255 - g;
		data[i * 4 + 2] = 255 - b;
	}
	
	context2.putImageData(imageData, 0, 0, 0, 0, canvas2.width, canvas2.height);
}

// 模糊滤镜（上边缘未处理）
function blurFliter() {
	var imageData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
	var data = imageData.data;
	
	var referenceImageData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
	var referenceData = imageData.data;
	
	var blurRadius = 1;
	var totalNum = (blurRadius * 2 + 1) * (blurRadius * 2 + 1);
	
	for(var i = blurRadius; i < canvas1.width + blurRadius; i ++) {
		for(var j = blurRadius; j < canvas1.height + blurRadius; j ++) {
			var totalR = 0;
			var totalG = 0;
			var totalB = 0;
			
			for(var m = -blurRadius; m <= blurRadius; m ++) {
				for(var n = -blurRadius; n <= blurRadius; n ++) {
					var x = i + m;
					var y = j + n;
					
					var p = y * canvas1.width + x;
					totalR += referenceData[p * 4 + 0];
					totalG += referenceData[p * 4 + 1];
					totalB += referenceData[p * 4 + 2];
				}
			}
			
			var p = j * canvas1.width + i;
			data[p * 4 + 0] = totalR / totalNum;
			data[p * 4 + 1] = totalG / totalNum;
			data[p * 4 + 2] = totalB / totalNum;
		}
	}
	
	context2.putImageData(imageData, 0, 0, 0, 0, canvas2.width, canvas2.height);
}

// 马赛克滤镜（下边缘为处理）
function mosaic() {
	var imageData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
	var data = imageData.data;
	
	var referenceImageData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
	var referenceData = imageData.data;
	
	var size = 5;
	var totalNum = size * size;
	
	for(var i = 0; i < canvas1.width; i += size) {
		for(var j = 0; j < canvas1.height; j += size) {
			var totalR = 0;
			var totalG = 0;
			var totalB = 0;
			
			for(var m = 0; m < size; m ++) {
				for(var n = 0; n < size; n ++) {
					var x = i + m;
					var y = j + n;
					
					var p = y * canvas1.width + x;
					totalR += referenceData[p * 4 + 0];
					totalG += referenceData[p * 4 + 1];
					totalB += referenceData[p * 4 + 2];
				}
			}
			
			var p = j * canvas1.width + i;
			var resultR = totalR / totalNum;
			var resultG = totalG / totalNum;
			var resultB = totalB / totalNum;
			
			for(var m = 0; m < size; m ++) {
				for(var n = 0; n < size; n ++) {
					var x = i + m;
					var y = j + n;
					
					var p = y * canvas1.width + x;
					data[p * 4 + 0] = resultR;
					data[p * 4 + 1] = resultG;
					data[p * 4 + 2] = resultB;
				}
			}
		}
	}
	
	context2.putImageData(imageData, 0, 0, 0, 0, canvas2.width, canvas2.height);
}
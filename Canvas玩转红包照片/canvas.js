var width = window.innerWidth;
var height = window.innerHeight;

var imgBox = document.getElementById("imgBox");
var img = document.getElementById("img");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var image = new Image();

// 剪辑区域半径
var radius = 50;
// 剪辑区域
var clippingRegion;

// 动画定时器
var timer;


window.onload = function() {
	imgBox.style.width = width + "px";
	imgBox.style.height = height + "px";
	
	canvas.width = width;
	canvas.height = height;
	
	img.height = Math.min(img.height, canvas.height);
	img.style.top = (canvas.height - img.height) / 2 + "px";
	img.style.marginLeft = -img.width / 2 + "px";
	
	image.src = "img.jpg";
	image.onload = function() {
		initCanvas();
	}
}


// 重置剪辑区域事件
function reSet() {
	initCanvas();
}

// 显示图像事件
function show() {
	clearInterval(timer);
	timer = setInterval(function() {
		clippingRegion.r += 20;
		drawImage();
		if(clippingRegion.r >= img.width + img.height) {
			clearInterval(timer);
		}
	}, 30);
}


// 初始化
function initCanvas() {
	clearInterval(timer);
	
	if(img.width >= canvas.width) {
		clippingRegionX = Math.random() * (canvas.width - radius * 2) + radius;
	} else {
		clippingRegionX = Math.random() * (img.width - radius * 2) + radius + img.offsetLeft;
	}
	if(img.height >= canvas.height) {
		clippingRegionY = Math.random() * (canvas.height - radius * 2) + radius;
	} else {
		clippingRegionY = Math.random() * (img.height - radius * 2) + radius + img.offsetTop;
	}
	
	clippingRegion = {x:clippingRegionX, y:clippingRegionY, r:radius};
	drawImage();
}

// 显示图像
function drawImage() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.save();
	setClippingRegion();
	context.drawImage(image, (canvas.width - img.width) / 2, (canvas.height - img.height) / 2, img.width, img.height);
	context.restore();
}

// 设置剪辑区域
function setClippingRegion() {
	context.beginPath();
	context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI * 2);
	context.clip();
}


// 取消屏幕滑动事件
canvas.addEventListener("touchstart", function(e) {
	e.preventDefault();
});
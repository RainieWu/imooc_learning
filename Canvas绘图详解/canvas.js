// JavaScript Document

window.onload = function() {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	canvas.width = 1330;
	canvas.height = 613;
	
	
	/*
	// 椭圆
	if(context.ellipse) {
		context.beginPath();
		context.ellipse(400, 400, 100, 200, 0, 0, Math.PI * 2);
		context.stroke();
	}
	else {
		alert("no ellipse");
	}
	*/
	
	
	/*
	// 剪纸效果
	context.beginPath();
	context.rect(canvas.width / 2 - 200, canvas.height / 2 - 200, 400, 400);
	Rectangle(context, canvas.width / 2 - 200 + 50, canvas.height / 2 - 200 + 30, 300, 150);
	Triangle(context, canvas.width / 2 - 200 + 120, canvas.height / 2 - 200 + 200, canvas.width / 2 - 200 + 120 - 100, canvas.height / 2 - 200 + 200 + 180, canvas.width / 2 - 200 + 120 + 100, canvas.height / 2 - 200 + 200 + 180);
	context.arc(canvas.width / 2 - 200 + 300, canvas.height / 2 - 200 + 300, 80, 0, Math.PI * 2, true);
	context.closePath();
	context.fillStyle = "black";
	context.shadowColor = "gray";
	context.shadowOffsetX = 10;
	context.shadowOffsetY = 10;
	context.shadowBlur = 10;
	context.fill();
	*/
	
	/*
	// 同心圆
	context.beginPath();
	context.arc(600, 300, 250, 0, Math.PI * 2, false);
	context.arc(600, 300, 150, 0, Math.PI * 2, true);
	context.closePath();
	context.fillStyle = "black";
	context.shadowColor = "gray";
	context.shadowOffsetX = 10;
	context.shadowOffsetY = 10;
	context.shadowBlur = 10;
	context.fill();
	*/
	
	
	/*
	// clip()剪辑区域
	context.beginPath();
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.beginPath();
	context.arc(600, 300, 50, 0, Math.PI * 2);
	context.fillStyle = "white";
	context.fill();
	context.clip();
	context.font = "bold 100px Arial";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillStyle = "#058";
	context.fillText("23333", canvas.width / 2, canvas.height / 2);
	*/
	
	
	/*
	// globalCompositeOperation属性
	context.fillStyle = "blue";
	context.fillRect(100, 100, 300, 300);
	context.globalCompositeOperation = "destination-over";
	context.fillStyle = "red";
	context.beginPath();
	context.moveTo(300, 200);
	context.lineTo(550, 500);
	context.lineTo(50, 500);
	context.closePath();
	context.fill();
	*/
	
	/*
	// globalAlpha属性
	context.globalAlpha = 0.7;
	for(var i = 0; i < 200; i ++) {
		var R = Math.floor(Math.random() * 255);
		var G = Math.floor(Math.random() * 255);
		var B = Math.floor(Math.random() * 255);
		context.fillStyle = "rgb(" + R + "," + G + "," + B + ")";
		context.beginPath();
		context.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 50, 0, Math.PI * 2);
		context.fill();
	}
	*/
	
	
	/*
	// 阴影
	context.fillStyle = "#058";
	context.shadowColor = "gray";
	context.shadowOffsetX = 20;
	context.shadowOffsetY = 20;
	context.shadowBlur = 50;
	context.fillRect(100, 100, 400, 400);
	*/
	
	
	/*
	// 字体渲染
	context.font = "bold 100px Arial";
	context.fillStyle = "#058";
	context.fillText("Welcome", 40, 100);
	context.lineWidth = 1;
	context.strokeStyle = "#058";
	context.strokeText("Welcome", 40, 200);
	*/
	
	
	/*
	// 图案背景
	var img = new Image();
	img.src = "1.jpg";
	img.onload = function() {
		var pattern = context.createPattern(img, "repeat");
		context.fillStyle = pattern;
		context.fillRect(0, 0, canvas.width, canvas.height);
	}
	*/
	
	/*
	// 自制图案背景
	var img = background();
	var pattern = context.createPattern(img, "repeat");
	context.fillStyle = pattern;
	context.fillRect(0, 0, canvas.width, canvas.height);
	*/
}

// 逆时针方向矩形
function Rectangle(context, x, y, width, height) {
	context.moveTo(x, y);
	context.lineTo(x, y + height);
	context.lineTo(x + width, y + height);
	context.lineTo(x + width, y);
	context.lineTo(x, y);
}

// 逆时针方向三角形
function Triangle(context, x1, y1, x2, y2, x3, y3) {
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.lineTo(x3, y3);
	context.lineTo(x1, y1);
}


// 圆角矩形
function drawRoundRect(context, x, y, width, height, radius) {
	context.save();
	context.translate(x, y);
	RoundRect(context, width, height, radius);
	context.strokeStyle = "black";
	context.stroke();
	context.restore();
}

function RoundRect(context, width, height, radius){
	context.beginPath();
	context.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
	context.lineTo(radius, height);
	context.arc(radius, height-radius, radius, Math.PI / 2, Math.PI);
	context.lineTo(0, radius);
	context.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);
	context.lineTo(width - radius, 0);
	context.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);
	context.closePath();
}


// 自制图案背景
function background() {
	var background = document.createElement("canvas");
	var bContext = background.getContext("2d");
	background.width = 100;
	background.height = 100;
	drawStar(bContext, 50, 50, 50, 0);
	return background;
}


// 星星
function drawStar(context, x, y, r, rotation) {
	context.save();
	context.translate(x, y);
	context.rotate(rotation / 180 * Math.PI);
	context.scale(r, r);
	star(context);
	context.fillStyle = "#fd3";
	//context.strokeStyle = "#fd5";
	//context.lineWidth = 3;
	context.lineJoin = "round";
	context.fill();
	//context.stroke();
	context.restore();
}

function star(context) {
	context.beginPath();
	for(var i = 0; i < 5; i ++) {
		context.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI), -Math.sin((18 + i * 72) / 180 * Math.PI));
		context.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * 0.5, -Math.sin((54 + i * 72) / 180 * Math.PI) * 0.5);
	}
	context.closePath();
}
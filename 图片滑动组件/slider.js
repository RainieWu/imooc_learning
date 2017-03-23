// 图片资源
img = [
{
	src:"images/1.jpg",
	width:497,
	height:710,
},
{
	src:"images/2.jpg",
	width:600,
	height:449,
},
{
	src:"images/3.jpg",
	width:498,
	height:700,
},
{
	src:"images/4.jpg",
	width:499,
	height:547,
},
{
	src:"images/5.jpg",
	width:600,
	height:425,
},
{
	src:"images/6.jpg",
	width:600,
	height:769,
},
{
	src:"images/7.jpg",
	width:400,
	height:558,
}
];


function slider(obj) {
	this.ul = obj.ul;
	this.img = obj.img;
	
	this.init();
	this.render();
	this.bindEvent();
}


// 初始化
slider.prototype.init = function() {
	this.height = window.innerHeight;
	this.width = window.innerWidth;
	// 屏幕高宽比
	this.aspectRatio = this.height / this.width;
	this.imgIndex = 0;
	
	var canvas = document.getElementById("canvas");
	canvas.style.height = this.height + "px";
	canvas.style.width = this.width + "px";
}

// 渲染
slider.prototype.render = function() {
	for(var i = 0; i < img.length; i ++) {
		var li = document.createElement("li");
		var item = img[i];
		// 图片高宽比
		var imgRadio = item["height"] / item["width"];
		
		if(item) {
			li.innerHTML = "<img src='" + item['src'] +"'>";
			if(imgRadio > this.aspectRatio) {
				// 高度较大的图片左右居中
				var liWidth = Math.round(this.height * item["width"] / item["height"]);
				li.style.height = this.height + "px";
				li.style.width = liWidth + "px";
				li.style.paddingLeft = (this.width - liWidth) / 2 + "px";
				li.style.paddingRight = (this.width - liWidth) / 2 + "px";
			} else {
				// 宽度较大的图片上下居中
				var liHeight = Math.round(this.width * item["height"] / item["width"]);
				li.style.height = liHeight + "px";
				li.style.width = this.width + "px";
				li.style.paddingTop = (this.height - liHeight) / 2 + "px";
				li.style.paddingBottm = (this.height - liHeight) / 2 + "px";
			}
			li.style.left = this.width * i + "px";
		}
		this.ul.appendChild(li);
	}
}

// 绑定事件
slider.prototype.bindEvent = function() {
	var self = this;
	
	this.ul.addEventListener("touchstart", function(event) {
		self.startX = Math.round(event.touches[0].pageX);
		self.startTime = new Date() * 1;
	});
	
	this.ul.addEventListener("touchmove", function(event) {
		event.preventDefault();
		self.offsetX = Math.round(event.touches[0].pageX) - self.startX;
		
		var li = self.ul.getElementsByTagName("li");
		var i = self.imgIndex - 1;
		var m = i + 3;
		// 当前图片及前后两张图片
		for(i; i < m; i ++) {
			if(li[i]) {
				li[i].style.left = self.width * (i - self.imgIndex) + self.offsetX + "px";
			}
		}
	});
	
	this.ul.addEventListener("touchend", function(event) {
		self.boundary = self.width / 3;
		self.endTime = new Date() * 1;
		
		var li = self.ul.getElementsByTagName("li");
		
		if(self.endTime - self.startTime > 500) {
			// 慢操作
			if(self.offsetX >= self.boundary) {
				self.page("-1");
			} else if(self.offsetX <= -self.boundary) {
				self.page("+1");
			} else {
				self.page("0");
			}
		} else {
			// 快操作
			if(self.offsetX >= self.boundary / 2) {
				self.page("-1");
			} else if(self.offsetX <= -self.boundary / 2) {
				self.page("+1");
			} else {
				self.page("0");
			}
		}
	});
}

// 翻页
slider.prototype.page = function(n) {
	var currentIndex = this.imgIndex + parseInt(n);
	var li = this.ul.getElementsByTagName("li");
	
	// 防止溢出
	if(currentIndex > li.length - 1) {
		currentIndex = li.length - 1
	} else if(currentIndex < 0) {
		currentIndex = 0
	}
	
	this.imgIndex = currentIndex;
	
	// 当前页的前一页
	if(li[currentIndex - 1]) {
		li[currentIndex - 1].style.left = -this.width + "px";
	}
	// 当前页
	li[currentIndex].style.left = 0 + "px";
	// 当前页的后一页
	if(li[currentIndex + 1]) {
		li[currentIndex + 1].style.left = this.width + "px";
	}
}


new slider({
	"ul":document.getElementsByTagName("ul")[0],
	"img":img
});
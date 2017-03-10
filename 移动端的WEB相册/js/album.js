// 图片总数
var totalNum = 10;

// 获取窗口的长宽
var windowWidth = $(window).width();
var windowHeight = $(window).height();

// li的大小
var liSize;

// 图片间间隔
var imgSpace = 2;

// 当前图片的索引
var imageID;

// 大图的长宽
var largeWidth;
var largeHeight;


render();

// 事件代理，每张图片的点击事件
$("#album").delegate("li", "tap", function() {
	imageID = $(this).attr("data-id");
	loadImage(imageID);
});

// 大图状态下的点击事件、左右滑动事件
$("#largeBox").tap(function() {
	$(this).hide();
	resetLargeImage();
}).swipeLeft(function() {
	imageID ++;
	if(imageID > totalNum) {
		imageID = totalNum;
		popup("已经是最后一张图片了！");
	} else {
		resetLargeImage();
		loadImage(imageID, function() {
			$("#largeImage")[0].addEventListener("webkitAnimationEnd", function() {
				$("#largeImage").removeClass("animated bounceInRight");
				$("#largeImage")[0].removeEventListener("webkitAnimationEnd", false);
			});
			$("#largeImage").addClass("animated bounceInRight");
		});
	}
}).swipeRight(function() {
	imageID --;
	if(imageID < 1) {
		imageID = 1;
		popup("已经是第一张图片了！");
	} else {
		resetLargeImage();
		loadImage(imageID, function() {
			$("#largeImage")[0].addEventListener("webkitAnimationEnd", function() {
				$("#largeImage").removeClass("animated bounceInLeft");
				$("#largeImage")[0].removeEventListener("webkitAnimationEnd", false);
			});
			$("#largeImage").addClass("animated bounceInLeft");
		});
	}
});


// 渲染图片
function render() {
	liSize = Math.floor((windowWidth - imgSpace * 5) / 4);
	$("li").css({"width":liSize, "height":liSize});
	$("img").each(function(index, element) {
		if($(this).width() > $(this).height()) {
			$(this).height("100%");
			$(this).css("margin-left", ($("li").width() - $(this).width()) / 2);
		} else {
			$(this).width("100%");
			$(this).css("margin-top", ($("li").height() - $(this).height()) / 2);
		}
    });
}

// 加载图片
function loadImage(id, callback) {
	$("#largeBox").show();
	$("#largeImage").attr("src", $("img")[id - 1].src);
	largeWidth = $("#largeImage").width();
	largeHeight = $("#largeImage").height();
	if(largeWidth / largeHeight > windowWidth / windowHeight) {
		$("#largeImage").css({"width":windowWidth, "height":(windowWidth / largeWidth * largeHeight)});
		$("#largeImage").css("margin-top", (windowHeight - $("#largeImage").height()) / 2);
	} else {
		$("#largeImage").css({"width":(windowHeight / largeHeight * largeWidth), "height":windowHeight});
		$("#largeImage").css({"margin-top":0, "margin-left":(windowWidth - $("#largeImage").width()) / 2});
	}
	callback&&callback();
}

// 重置大图样式
function resetLargeImage() {
	$("#largeImage").attr("src", "");
	$("#largeImage").width("100%");
	$("#largeImage").height("");
	$("#largeImage").css("margin-left", 0);
}

// 弹框
function popup(text) {
	$("#mask").show();
	$("#mask").width(windowWidth);
	$("#mask").height(windowHeight);
	$("#popup").show();
	$("#popup").css({"top":(windowHeight - $("#popup").height()) / 2, "left":(windowWidth - $("#popup").width()) / 2});
	$("#text").text(text);
}

// 关闭弹框
function closePopup() {
	$("#mask").hide();
	$("#popup").hide();
}
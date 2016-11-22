// JavaScript Document

function waterfall(){
	var boxs=$("#main>div");
	var boxWidth=boxs.eq(0).outerWidth();
	var heights=new Array();
	boxs.each(function(index,element){
		var height=boxs.eq(index).outerHeight();
		//一共4列图片
		if(index<4) heights[index]=height;
		else{
			var minHeight=Math.min.apply(null,heights);
			var minIndex=$.inArray(minHeight,heights);
			$(element).css({
				'position':'absolute',
				'top':minHeight+'px',
				'left':minIndex*boxWidth+'px'
			});
			heights[minIndex]=heights[minIndex]+boxs.eq(index).outerHeight();
		}
    });
}

//检测是否具备加载数据块的条件
function checkScrollSlide(){
	var lastBox=$("#main").last();
	var lastBoxHeight=lastBox.offset().top+Math.floor(lastBox.outerHeight()/2);
	var scrollTop=$(window).scrollTop();
	var clientHeight=$(window).height();
	if(lastBoxHeight<=scrollTop+clientHeight) return true;
	else return false;
}

$(window).on('load',function(){
	waterfall();
	
	//后台数据
	var bgdata={"data":[{"src":"images/01.jpg"},{"src":"images/02.jpg"},{"src":"images/03.jpg"},{"src":"images/04.jpg"},{"src":"images/05.jpg"},{"src":"images/06.jpg"},{"src":"images/07.jpg"},{"src":"images/08.jpg"},{"src":"images/09.jpg"},{"src":"images/10.jpg"},{"src":"images/11.jpg"},{"src":"images/12.jpg"},{"src":"images/13.jpg"},{"src":"images/14.jpg"},{"src":"images/15.jpg"},{"src":"images/16.jpg"},{"src":"images/17.jpg"},{"src":"images/18.jpg"}]};
	
	//加载数据块
	$(window).on('scroll',function(){
		if(checkScrollSlide()){
			$.each(bgdata.data,function(index,value){
				var newBox=$("<div>").addClass("box").appendTo($("#main"));
				var newPic=$("<div>").addClass("pic").appendTo($(newBox));
				$("<img>").attr("src",$(value).attr("src")).appendTo($(newPic));
			});
			waterfall();
		}
	});
});
// JavaScript Document

$(document).ready(function(){
	var menu=$("#menu");
	
	//监听滚动条事件
	$(window).scroll(function(){
		var top=$(document).scrollTop();
		var items=$("#content").find(".item");
		var currentId="";//当前所在楼层的ID
		items.each(function(){
			var ithis=$(this);
			var itemTop=ithis.offset().top;
			if(top>itemTop-200){
				currentId="#"+ithis.attr("id");
			}
			else return false;
        });
		
		//给相应楼层设置class="current"
		var current=menu.find(".current");
		if(currentId!=""&&current.attr("href")!=currentId){
			current.removeClass("current");
			menu.find("[href='"+currentId+"']").addClass("current");
		}
	});
	
	//菜单悬浮样式
	var menulist=menu.find("a");
	menulist.each(function(){
		$(this).mouseover(function(){
			$(this).animate({width:80});
		});
		$(this).mouseout(function(){
			$(this).animate({width:50});
		});
    });
});
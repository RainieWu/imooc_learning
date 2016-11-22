// JavaScript Document

window.onload=function(){
	//鼠标悬浮切换
	var tab_1=document.getElementById("tab_1");
	var title_1=tab_1.getElementsByClassName("title");
	var titles_1=title_1[0].getElementsByTagName("li");
	var content_1=tab_1.getElementsByClassName("content");
	var contents_1=content_1[0].getElementsByTagName("div");
	
	for(var i=1;i<contents_1.length;i++){
		contents_1[i].style.display="none";
	}
	
	for(var i=0;i<titles_1.length;i++){
		titles_1[i].i=i;
		eventUtil.addEvent(titles_1[i],'mouseover',function(){
			for(var j=0;j<titles_1.length;j++){
				titles_1[j].className="";
				contents_1[j].style.display="none";
			}
			this.className="selected";
			contents_1[this.i].style.display="block";
		});
	}
	
	//鼠标悬浮延时切换
	var tab_2=document.getElementById("tab_2");
	var title_2=tab_2.getElementsByClassName("title");
	var titles_2=title_2[0].getElementsByTagName("li");
	var content_2=tab_2.getElementsByClassName("content");
	var contents_2=content_2[0].getElementsByTagName("div");
	var timer_2=null;
	
	for(var i=1;i<contents_2.length;i++){
		contents_2[i].style.display="none";
	}
	
	for(var i=0;i<titles_2.length;i++){
		titles_2[i].i=i;
		eventUtil.addEvent(titles_2[i],'mouseover',function(){
			var that=this;
			if(timer_2){
				clearTimeout(timer_2);
				timer_2=null;
			}
			timer_2=setTimeout(function(){
				for(var j=0;j<titles_2.length;j++){
					titles_2[j].className="";
					contents_2[j].style.display="none";
				}
				that.className="selected";
				contents_2[that.i].style.display="block";
			},500);
		});
	}
	
	//自动切换及鼠标悬浮切换
	var tab_3=document.getElementById("tab_3");
	var title_3=tab_3.getElementsByClassName("title");
	var titles_3=title_3[0].getElementsByTagName("li");
	var content_3=tab_3.getElementsByClassName("content");
	var contents_3=content_3[0].getElementsByTagName("div");
	var index=0;
	var timer_3=null;
	
	function changeTab(index){
		for(var i=0;i<titles_3.length;i++){
			titles_3[i].className="";
			contents_3[i].style.display="none";
		}
		titles_3[index].className="selected";
		contents_3[index].style.display="block";
	}
	
	function autoChange(){
		index++;
		if(index>titles_3.length-1){
			index=0;
		}
		changeTab(index);
	}
	
	for(var i=1;i<contents_3.length;i++){
		contents_3[i].style.display="none";
	}
	
	if(timer_3){
		clearInterval(timer_3);
		timer_3=null;
	}
	timer_3=setInterval(autoChange,3000);
	
	for(var i=0;i<titles_3.length;i++){
		titles_3[i].i=i;
		eventUtil.addEvent(titles_3[i],'mouseover',function(){
			index=this.i;
			clearInterval(timer_3);
			changeTab(this.i);
		});
		eventUtil.addEvent(titles_3[i],'mouseout',function(){
			timer_3=setInterval(autoChange,3000);
		});
		
		eventUtil.addEvent(contents_3[i],'mouseover',function(){
			clearInterval(timer_3);
		});
		eventUtil.addEvent(contents_3[i],'mouseout',function(){
			timer_3=setInterval(autoChange,3000);
		});
	}
};
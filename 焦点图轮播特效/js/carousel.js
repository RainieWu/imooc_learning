// JavaScript Document

window.onload=function(){
	var carousel=document.getElementById("carousel");
	var left=document.getElementById("left");
	var right=document.getElementById("right");
	var pic=document.getElementById("pic");
	var spot=document.getElementById("spot");
	var spots=spot.getElementsByTagName("img");
	var index=1;
	var timer;
	
	playSwitch();
	
	function playSwitch(){
		timer=setInterval(function(){
			if(index==4) index=1;
			else index++;
			showSpot();
			switchPic(-960);
		},3000);
	}
	function switchPic(offset){
		if(pic.offsetLeft==-(960*0)||pic.offsetLeft==-(960*1)||pic.offsetLeft==-(960*2)||pic.offsetLeft==-(960*3)||pic.offsetLeft==-(960*4)||pic.offsetLeft==-(960*5)){
			if(pic.offsetLeft==0) pic.style.left=-(960*4)+"px";
			else if(pic.offsetLeft==-(960*5)) pic.style.left=-(960*1)+"px";
			animation(pic,{left:pic.offsetLeft+offset},5);
		}
	}
	function showSpot(){
		for(var i=0;i<spots.length;i++) spots[i].className="";
		spots[index-1].className="active";
	}
	function stopSwitch(){
		clearInterval(timer);
	}
	
	eventUtil.addEvent(carousel,'mouseover',function(){
		stopSwitch();
		left.style.display="block";
		right.style.display="block";
	});
	eventUtil.addEvent(carousel,'mouseout',function(){
		playSwitch();
		left.style.display="none";
		right.style.display="none";
	});
	eventUtil.addEvent(left,'mouseover',function(){
		left.style.opacity=0.5;
	});
	eventUtil.addEvent(left,'mouseout',function(){
		left.style.opacity=0.3;
	});
	eventUtil.addEvent(right,'mouseover',function(){
		right.style.opacity=0.5;
	});
	eventUtil.addEvent(right,'mouseout',function(){
		right.style.opacity=0.3;
	});
	eventUtil.addEvent(left,'click',function(){
		if(pic.offsetLeft==-(960*0)||pic.offsetLeft==-(960*1)||pic.offsetLeft==-(960*2)||pic.offsetLeft==-(960*3)||pic.offsetLeft==-(960*4)||pic.offsetLeft==-(960*5)){
			if(index==1) index=4;
			else index--;
			showSpot();
			switchPic(960);
		}
	});
	eventUtil.addEvent(right,'click',function(){
		if(pic.offsetLeft==-(960*0)||pic.offsetLeft==-(960*1)||pic.offsetLeft==-(960*2)||pic.offsetLeft==-(960*3)||pic.offsetLeft==-(960*4)||pic.offsetLeft==-(960*5)){
			if(index==4) index=1;
			else index++;
			showSpot();
			switchPic(-960);
		}
	});
	for(var i=0;i<spots.length;i++){
		eventUtil.addEvent(spots[i],'click',function(){
			if(pic.offsetLeft==-(960*0)||pic.offsetLeft==-(960*1)||pic.offsetLeft==-(960*2)||pic.offsetLeft==-(960*3)||pic.offsetLeft==-(960*4)||pic.offsetLeft==-(960*5)){
				var myIndex=parseInt(this.getAttribute("index"));
				if(myIndex!=index){
					var offset=-960*(myIndex-index);
					index=myIndex;
					switchPic(offset);
					showSpot();
				}
			}
		});
	}
}
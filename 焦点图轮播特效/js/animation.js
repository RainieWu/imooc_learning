// JavaScript Document

function getStyle(obj,attr){
	//IE浏览器
	if(obj.currentStyle) return obj.currentStyle[attr];
	//firefox浏览器
	else return getComputedStyle(obj,false)[attr];
}

function animation(obj,json,velocity,nextFunction){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var flag=true;
		for(var attr in json){
			//取当前值
			var current=0;
			if(attr=="opacity") current=Math.round(parseFloat(getStyle(obj,attr))*100);
			else current=parseInt(getStyle(obj,attr));
			//计算运动速度
			if(!velocity) velocity=10;
			var speed=(json[attr]-current)/velocity;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			//检测停止
			if(current!=json[attr]) flag=false;
			//透明度属性
			if(attr=="opacity"){
				obj.style.filter="alpha(opacity:"+current+speed+")";
				obj.style.opacity=(current+speed)/100;
			}
			//其他属性
			else obj.style[attr]=current+speed+"px";
		}
		//检测停止并执行链式动画
		if(flag==true){
			clearInterval(obj.timer);
			if(nextFunction) nextFunction();
		}
	},30);
}
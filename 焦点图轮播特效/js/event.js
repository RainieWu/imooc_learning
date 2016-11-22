// JavaScript Document

//跨浏览器事件处理程序
var eventUtil={
	//添加事件
	addEvent:function(element,type,handle){
		//DOM2级事件
		if(element.addEventListener) element.addEventListener(type,handle,false);
		//IE事件
		else if(element.attachEvent) element.attachEvent('on'+type,handle);
		//DOM0级事件
		else element['on'+type]=handle;
	},
	//删除事件
	removeEvent:function(element,type,handle){
		//DOM2级事件
		if(element.removeEventListener) element.removeEventListener(type,handle,false);
		//IE事件
		else if(element.detachEvent) element.detachEvent('on'+type,handle);
		//DOM0级事件
		else element['on'+type]=null;
	},
	//获取事件
	getEvent:function(event){
		return event?event:window.event;
	},
	//获取事件类型
	getType:function(event){
		return event.type;
	},
	//获取事件元素
	getElement:function(event){
		return event.target||event.srcElement;
	},
	//阻止事件默认行为
	preventDefault:function(event){
		if(event.preventDefault) event.preventDefault();
		//IE中的事件对象
		else event.returnValue=false;
	},
	//阻止事件冒泡
	stopPropagation:function(event){
		if(event.stopPropagation) event.stopPropagation(); 
		//IE中的事件对象
		else event.cancelBubble=true;
	}
}
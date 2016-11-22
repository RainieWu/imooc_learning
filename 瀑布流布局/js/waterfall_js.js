// JavaScript Document

//根据class获取元素
function getByClass(idName,className){
	var boxs=new Array();
	var elements=idName.getElementsByTagName("*");//获取idName下所有子元素
	for(var i=0;i<elements.length;i++){
		if(elements[i].className==className) boxs.push(elements[i]);
	}
	return boxs;
}

function waterfall(main,box){
	var imain=document.getElementById(main);
	var ibox=getByClass(imain,box);
	var heights=new Array();//存储每列的高度
	for(var i=0;i<ibox.length;i++){
		//一共4列图片
		if(i<4) heights.push(ibox[i].offsetHeight);
		else{
			var minHeight=Math.min.apply(null,heights);//找数组中的最小值
			//找数组中最小值的索引值
			for(var j=0;j<heights.length;j++){
				if(minHeight==heights[j]) var index=j;
			}
			ibox[i].style.position="absolute";
			ibox[i].style.top=minHeight+"px";
			ibox[i].style.left=ibox[index].offsetLeft+"px";
			heights[index]=heights[index]+ibox[i].offsetHeight;//更新heights数组
		}
	}
}

//检测是否具备加载数据块的条件
function checkScrollSlide(){
	var main=document.getElementById("main");
	var box=getByClass(main,"box");
	var lastBoxHeight=box[box.length-1].offsetTop+Math.floor(box[box.length-1].offsetHeight/2);
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;//获取页面滚动的高度
	var clientHeight=document.body.clientHeight||document.documentElement.clientHeight;//获取浏览器当前高度
	if(lastBoxHeight<=scrollTop+clientHeight) return true;
	else return false;
}

window.onload=function(){
	waterfall("main","box");
	
	//后台数据
	var bgdata={"data":[{"src":"images/01.jpg"},{"src":"images/02.jpg"},{"src":"images/03.jpg"},{"src":"images/04.jpg"},{"src":"images/05.jpg"},{"src":"images/06.jpg"},{"src":"images/07.jpg"},{"src":"images/08.jpg"},{"src":"images/09.jpg"},{"src":"images/10.jpg"},{"src":"images/11.jpg"},{"src":"images/12.jpg"},{"src":"images/13.jpg"},{"src":"images/14.jpg"},{"src":"images/15.jpg"},{"src":"images/16.jpg"},{"src":"images/17.jpg"},{"src":"images/18.jpg"}]};
	
	//加载数据块
	window.onscroll=function(){
		if(checkScrollSlide()){
			var main=document.getElementById("main");
			//将数据块渲染到页面尾部
			for(var i=0;i<bgdata.data.length;i++){
				var newBox=document.createElement("div");
				newBox.className="box";
				main.appendChild(newBox);
				var newPic=document.createElement("div");
				newPic.className="pic";
				newBox.appendChild(newPic);
				var newImg=document.createElement("img");
				newImg.src=bgdata.data[i].src;
				newPic.appendChild(newImg);
			}
			waterfall("main","box");
		}
	}
}


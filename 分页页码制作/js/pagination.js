// JavaScript Document

function judge(index,alist){
	if(index==1){
		prev.className="invalid";
		prev.style.border="1px solid #ffe3c6";
		prev.style.backgroundColor="#ffffff";
		next.className="";
		next.style.border="1px solid #ff9600";
	}
	else if(index==alist.length-2){
		prev.className="";
		prev.style.border="1px solid #ff9600";
		next.className="invalid";
		next.style.border="1px solid #ffe3c6";
		next.style.backgroundColor="#ffffff";
	}
	else{
		prev.className="";
		prev.style.border="1px solid #ff9600";
		next.className="";
		next.style.border="1px solid #ff9600";
	}
}

function show(index,alist){
	if(index>2&&index<alist.length-3){
		for(var i=1;i<alist.length-1;i++){
			if(i<index-2||i>index+2){
				alist[i].style.display="none";
			}
			else{
				alist[i].style.display="inline-block";
			}
		}
	}
	else if(index==1||index==2){
		for(var i=1;i<alist.length-1;i++){
			if(i>5){
				alist[i].style.display="none";
			}
			else{
				alist[i].style.display="inline-block";
			}
		}
	}
	else{
		for(var i=1;i<alist.length-1;i++){
			if(i<6){
				alist[i].style.display="none";
			}
			else{
				alist[i].style.display="inline-block";
			}
		}
	}
}

window.onload=function(){
	var page=document.getElementById("page");
	var alist=page.getElementsByTagName("a");
	var prev=document.getElementById("prev");
	var next=document.getElementById("next");
	var index=1;
	var content=document.getElementById("content");
	
	judge(index,alist);
	show(index,alist);
	
	for(var i=1;i<alist.length-1;i++){
		alist[i].i=i;
		eventUtil.addEvent(alist[i],'click',function(){
			for(var j=1;j<alist.length-1;j++){
				alist[j].className="";
			}
			this.className="current";
			index=this.i;
			content.innerHTML="PAGE "+this.i;
			judge(index,alist);
			show(index,alist);
		});
	}
	
	eventUtil.addEvent(prev,'mouseover',function(){
		if(prev.className=="invalid"){
			prev.style.border="1px solid #ffe3c6";
			prev.style.backgroundColor="#ffffff";
		}
		else{
			prev.style.border="1px solid #ff6500";
			prev.style.backgroundColor="#ffbe94";
		}
	});
	eventUtil.addEvent(prev,'mouseout',function(){
		if(prev.className!="invalid"){
			prev.style.border="1px solid #ff9600";
			prev.style.backgroundColor="#ffffff";
		}
	});
	eventUtil.addEvent(prev,'click',function(){
		if(index>1){
			alist[index].className="";
			index--;
			alist[index].className="current";
			content.innerHTML="PAGE "+index;
		}
		judge(index,alist);
		show(index,alist);
	});
	
	eventUtil.addEvent(next,'mouseover',function(){
		if(next.className=="invalid"){
			next.style.border="1px solid #ffe3c6";
			next.style.backgroundColor="#ffffff";
		}
		else{
			next.style.border="1px solid #ff6500";
			next.style.backgroundColor="#ffbe94";
		}
	});
	eventUtil.addEvent(next,'mouseout',function(){
		if(next.className!="invalid"){
			next.style.border="1px solid #ff9600";
			next.style.backgroundColor="#ffffff";
		}
	});
	eventUtil.addEvent(next,'click',function(){
		if(index<alist.length-2){
			alist[index].className="";
			index++;
			alist[index].className="current";
			content.innerHTML="PAGE "+index;
		}
		judge(index,alist);
		show(index,alist);
	});
}
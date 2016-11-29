// JavaScript Document

function addHeight(obj) {
	/*
	var time = null;
	if(time) {
		clearTimeout(time);
	}
	*/
	var height = obj.offsetHeight;
	console.log(height);
	height ++;
	if(height <= 200) {
		obj.style.height = height + "px";
		setTimeout(addHeight(obj), 10);
	}
	else {
		return;
	}
}

function subHeight(obj) {
	var height = obj.offsetHeight;
	console.log(height);
	height --;
	if(height > 0) {
		obj.style.height = height + "px";
		setTimeout(subHeight(obj), 10);
	}
	else {
		return;
	}
}

function changeHeight(obj, count) {
	
	var height = obj.offsetHeight;
	console.log(height + obj.innerHTML);
	height = height + count;
	if(count > 0) {
		if(height <= 200) {
			obj.style.height = height + "px";
			setTimeout(changeHeight(obj, 1), 10);
		}
		else {
			return;
		}
	}
	else {
		if(height > 0) {
			obj.style.height = height + "px";
			time = setTimeout(changeHeight(obj, -1), 10);
		}
		else {
			return;
		}
	}
}

window.onload = function() {
	var menu = document.getElementById("menu2");
	var li = menu.getElementsByClassName("list");
	for(var i = 0; i < li.length; i++) {
		li[i].onmouseover = function() {
			var ul = this.getElementsByTagName("ul")[0];
			//console.log(ul.style.height);
			ul.style.display = "block";
			changeHeight(ul, 1);
		}
		li[i].onmouseout = function() {
			var ul = this.getElementsByTagName("ul")[0];
			changeHeight(ul, -1);
			ul.style.display = "none";
		}
	}
}
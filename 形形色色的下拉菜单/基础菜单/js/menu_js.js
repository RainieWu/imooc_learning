// JavaScript Document

function show(li) {
	var submenu = li.getElementsByTagName("ul")[0];
	submenu.style.display = "block";
}

function hide(li) {
	var submenu = li.getElementsByTagName("ul")[0];
	submenu.style.display = "none";
}
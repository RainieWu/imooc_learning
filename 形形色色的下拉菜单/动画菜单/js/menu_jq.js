// JavaScript Document

$(document).ready(function() {
    $("#menu1 li").mousemove(function() {
		$(this).find("ul").slideDown("1000");
	});
	$("#menu1 li").mouseleave(function() {
		$(this).find("ul").slideUp("1000");
	});
});
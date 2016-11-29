// JavaScript Document

$(function() {
	$("#menu3 li").mouseover(function() {
		$(this).children("ul").show();
	});
	$("#menu3 li").mouseout(function() {
		$(this).children("ul").hide();
	});
})